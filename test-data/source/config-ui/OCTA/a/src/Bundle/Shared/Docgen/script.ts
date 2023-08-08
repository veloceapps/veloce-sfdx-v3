import { ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { DocumentAttachmentApiService, DocumentTemplatesApiService, QuoteApiService } from '@veloce/api';
import { DocumentTemplate, QuoteDraft, TemplateAttachment, TemplateProperty } from '@veloce/core';
import { ConfigurationService, ElementDefinition, IntegrationState, ScriptHost } from '@veloce/sdk/cms';
import {
  BehaviorSubject,
  finalize,
  first,
  map,
  Observable,
  of,
  skip,
  startWith,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';

interface ScriptContent {
  // inputs
  inline: Observable<string>;
  preview: Observable<string>;
  openDocgen: Observable<void>;
  Id: Observable<string>;

  // handlers
  closeHandler: () => void;
  generateHandler: () => void;
  selectTabHandler: (id: TabId) => void;
  fileSelectHandler: (event: Event) => void;
  removeAttachmentHandler: (group: FormControl) => void;
  attachmentDropHandler: (e: DragDropEvent) => void;

  // other
  recordId?: string;
  visible$: BehaviorSubject<boolean>;
  tabs: Tab[];
  allowedAttachmentTypes: string;
  activeTab: TabId;
  isPreview: boolean;
  templates$: BehaviorSubject<DocumentTemplate[]>;
  attributes$: Observable<TemplateProperty[]>;
  attributesForm: FormGroup;
  attachments$: BehaviorSubject<TemplateAttachment[]>;
  attachmentsFormArray: FormArray;
  attachmentInProgress$: BehaviorSubject<boolean>;
  generateInProgress$: BehaviorSubject<boolean>;

  // controls
  templateControl: FormControl;
  attachmentControl: FormControl;
}

type TabId = 'GENERAL' | 'ATTACHMENTS';

interface Tab {
  id: TabId;
  name: string;
}

interface DragDropEvent {
  previousIndex: number;
  currentIndex: number;
}

interface IntegrationStateModel {
  docgenTemplates?: DocumentTemplate[];
}

enum IntegrationAction {
  DOCGEN_ATTRIBUTES_UPDATED = 'DOCGEN_ATTRIBUTES_UPDATED',
}

const tabs: Tab[] = [
  { id: 'GENERAL', name: 'General' },
  { id: 'ATTACHMENTS', name: 'Attachments' },
];

const ATTACHMENT_TYPES = ['application/pdf'];

function attachmentTypeValidator(allowedTypes: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const file: File | undefined = control.value;

    if (file && !allowedTypes.includes(file.type)) {
      return { fileType: {} };
    }
    return null;
  };
}

@ElementDefinition({
  name: 'Docgen',
  type: 'CUSTOM',
  inputs: {
    inline: '"false"',
    preview: '"false"',
    openDocgen: null,
    Id: null,
  },
})
export class Script implements OnInit, OnDestroy {
  templatesService: DocumentTemplatesApiService;
  attachmentService: DocumentAttachmentApiService;
  configurationService: ConfigurationService;
  integrationService: IntegrationState<IntegrationStateModel>;
  quoteService: QuoteApiService;
  cdr: ChangeDetectorRef;

  selectedTemplate$ = new BehaviorSubject<DocumentTemplate | undefined>(undefined);

  destroy$ = new Subject<void>();

  constructor(public host: ScriptHost<ScriptContent>) {
    this.templatesService = this.host.injector.get(DocumentTemplatesApiService);
    this.attachmentService = this.host.injector.get(DocumentAttachmentApiService);
    this.configurationService = this.host.injector.get(ConfigurationService);
    this.integrationService = this.host.injector.get(IntegrationState);
    this.quoteService = this.host.injector.get(QuoteApiService);
    this.cdr = this.host.injector.get(ChangeDetectorRef);

    this.host.visible$ = new BehaviorSubject<boolean>(false);
    this.host.tabs = tabs;
    this.host.allowedAttachmentTypes = ATTACHMENT_TYPES.join(',');
    this.host.activeTab = tabs[0].id;
    this.host.templates$ = new BehaviorSubject<DocumentTemplate[]>([]);
    this.host.attachments$ = new BehaviorSubject<TemplateAttachment[]>([]);
    this.host.attachmentsFormArray = new FormArray([]);
    this.host.attachmentInProgress$ = new BehaviorSubject<boolean>(false);
    this.host.generateInProgress$ = new BehaviorSubject<boolean>(false);

    this.host.templateControl = new FormControl();
    this.host.attachmentControl = new FormControl(null, attachmentTypeValidator(ATTACHMENT_TYPES));

    this.host.closeHandler = this.closeHandler.bind(this);
    this.host.generateHandler = this.generateHandler.bind(this);
    this.host.fileSelectHandler = this.fileSelectHandler.bind(this);
    this.host.selectTabHandler = this.selectTabHandler.bind(this);
    this.host.removeAttachmentHandler = this.removeAttachmentHandler.bind(this);
    this.host.attachmentDropHandler = this.attachmentDropHandler.bind(this);

    this.host.openDocgen.pipe(skip(1), takeUntil(this.destroy$)).subscribe(() => {
      this.host.visible$.next(true);
    });

    this.host.Id.pipe(
      map((id) => id || this.configurationService.getRuntimeContext()?.properties?.Id),
      takeUntil(this.destroy$),
    ).subscribe((recordId) => (this.host.recordId = recordId));

    this.host.preview
      .pipe(first(), takeUntil(this.destroy$))
      .subscribe((preview) => (this.host.isPreview = preview === 'true'));
  }

  ngOnInit(): void {
    // auto-select the first template
    this.host.templates$.pipe(takeUntil(this.destroy$)).subscribe((templates) => {
      const selectedId = this.host.templateControl.value;
      if (!selectedId || !templates.some(({ id }) => id === selectedId)) {
        this.host.templateControl.setValue(templates[0]?.id);
      }
    });

    // store selected template entity
    this.host.templateControl.valueChanges
      .pipe(
        startWith(undefined),
        map((templateId) => this.host.templates$.value.find(({ id }) => id === templateId)),
        takeUntil(this.destroy$),
      )
      .subscribe((template) => this.selectedTemplate$.next(template));

    // selected template attributes
    this.host.attributes$ = this.selectedTemplate$.pipe(
      map((template) => template?.properties?.filter((p) => !p.isTechnical) ?? []),
    );

    this.host.attributes$.pipe(takeUntil(this.destroy$)).subscribe((attributes) => {
      this.initAttributesForm(attributes);
    });

    this.host.attachments$.pipe(takeUntil(this.destroy$)).subscribe((attachments) => {
      this.initAttachmentsForm(attachments);
    });

    const docgenTemplates = this.integrationService.state.docgenTemplates;
    if (docgenTemplates) {
      this.host.templates$.next(docgenTemplates);
    } else {
      this.fetchTemplates();
    }

    this.fetchAttachments$().pipe(first()).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private fetchTemplates = () => {
    this.templatesService
      .getTemplates()
      .pipe(
        map((templates) => templates.filter((template) => template.active)),
        takeUntil(this.destroy$),
      )
      .subscribe((templates) => this.host.templates$.next(templates));
  };

  private fetchAttachments$ = (): Observable<TemplateAttachment[]> => {
    return of([]).pipe(
      switchMap(() =>
        this.host.recordId ? this.templatesService.getAttachments({ linkedEntityId: this.host.recordId }) : of([]),
      ),
      tap((attachments) => this.host.attachments$.next(attachments)),
    );
  };

  private initAttributesForm = (attributes: TemplateProperty[]): void => {
    const controls = attributes.reduce((acc, attr) => {
      return attr.name ? { ...acc, [attr.name]: new FormControl(attr.value) } : acc;
    }, {} as { [key: string]: FormControl });

    this.host.attributesForm = new FormGroup(controls);

    this.host.attributesForm.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      this.integrationService.dispatch({ type: IntegrationAction.DOCGEN_ATTRIBUTES_UPDATED, payload: value });
    });
  };

  private initAttachmentsForm = (attachments: TemplateAttachment[]): void => {
    this.host.attachmentControl.setValue(null);
    this.host.attachmentsFormArray.clear();
    attachments.forEach((attachment) => this.addAttachmentControl(attachment));
    this.cdr.detectChanges();
  };

  private addAttachmentControl = (attachment: TemplateAttachment): void => {
    const controls = {
      id: new FormControl(attachment.id),
      name: new FormControl(attachment.fileName),
      checked: new FormControl(true),
      isRemoving: new FormControl(false),
    };
    const array = this.host.attachmentsFormArray;
    array.insert(array.length, new FormGroup(controls));
  };

  private selectTabHandler = (id: TabId) => {
    this.host.activeTab = id;
  };

  private removeAttachmentHandler = (group: FormControl) => {
    group.patchValue({ isRemoving: true });

    this.templatesService
      .removeAttachment(group.value.id)
      .pipe(switchMap(() => this.fetchAttachments$()))
      .subscribe();
  };

  private attachmentDropHandler = (e: DragDropEvent) => {
    const attachments = [...this.host.attachments$.value];

    const item = attachments[e.previousIndex];
    attachments.splice(e.previousIndex, 1);
    attachments.splice(e.currentIndex, 0, item);

    this.host.attachments$.next(attachments);
  };

  private fileSelectHandler = (event: Event): void => {
    const el = event.target as HTMLInputElement;
    const file = el?.files?.[0];

    this.host.attachmentControl.setValue(file);

    if (this.host.attachmentControl.invalid || this.host.attachmentInProgress$.value || !this.host.recordId || !file) {
      return;
    }

    this.host.attachmentInProgress$.next(true);

    this.templatesService
      .createAttachment({ linkedEntityId: this.host.recordId } as TemplateAttachment, file)
      .pipe(
        switchMap(() => this.fetchAttachments$()),
        finalize(() => this.host.attachmentInProgress$.next(false)),
      )
      .subscribe();
  };

  private getQuoteDraft = (quoteId: string): Observable<QuoteDraft | undefined> => {
    const rootLineItem = this.configurationService.getSnapshot();

    return this.quoteService.getQuote(quoteId).pipe(
      map((quoteDraft) => {
        return {
          ...quoteDraft,
          currentState: rootLineItem ? [rootLineItem] : quoteDraft.currentState,
        };
      }),
    );
  };

  private generateDocument = (quoteDraft: QuoteDraft): Observable<any> => {
    const template = this.selectedTemplate$.value;

    if (!template) {
      return of(undefined);
    }

    const attributes = template.properties?.map((attr) => ({
      ...attr,
      value: this.host.attributesForm.value[attr.name] ?? attr.value,
    }));
    const attachments = this.host.attachments$.value.filter(({ id }) =>
      this.host.attachmentsFormArray.value.some((item: any) => item.id === id && item.checked),
    );

    const updatedTemplate = {
      ...template,
      properties: attributes,
      attachments,
    };
    const data = {
      ...quoteDraft,
      context: quoteDraft?.context ?? {},
    };
    const params = { attachToQuote: true };

    return this.templatesService.generateDocument(updatedTemplate, data, params);
  };

  private generateHandler = () => {
    if (!this.host.recordId || this.host.generateInProgress$.value) {
      return;
    }

    this.host.generateInProgress$.next(true);

    this.getQuoteDraft(this.host.recordId)
      .pipe(
        switchMap((quoteDraft) => (quoteDraft ? this.generateDocument(quoteDraft) : of([]))),
        switchMap(() => this.fetchAttachments$()),
        finalize(() => this.host.generateInProgress$.next(false)),
      )
      .subscribe();
  };

  private closeHandler = () => {
    this.host.visible$.next(false);
  };
}
