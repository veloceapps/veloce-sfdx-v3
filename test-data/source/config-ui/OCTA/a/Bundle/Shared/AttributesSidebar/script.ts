import { OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LineItem, RuntimeModel } from '@veloce/core';
import { ConfigurationService, ElementDefinition, findLineItem, LineItemWorker, ScriptHost } from '@veloce/sdk/cms';
import { BehaviorSubject, filter, map, Observable, shareReplay, Subject, takeUntil, tap } from 'rxjs';

interface ScriptContent {
  lineItem$: BehaviorSubject<LineItem | undefined>;
  isOpened$: Observable<boolean>;

  openAttrsSidebar: Observable<LineItem | undefined>;
  attributesForm$: Observable<FormGroup>;
  attributes$: Observable<Attribute[] | undefined>;
  saveHandler: (form: FormGroup) => void;
  discardHandler: () => void;
  closeHandler: () => void;
}

interface Attribute {
  domain: any[];
  name: string;
  type: string;
  value: any;
  readonly: boolean;
}

@ElementDefinition({
  name: 'AttributesSidebar',
  type: 'CUSTOM',
  module: 'Shared',
  children: [],
  inputs: {
    openAttrsSidebar: null,
  },
})
export class Script implements OnInit, OnDestroy {
  configurationService: ConfigurationService;
  runtimeModel?: RuntimeModel;

  destroy$ = new Subject<void>();

  constructor(public host: ScriptHost<ScriptContent>) {
    this.configurationService = this.host.injector.get(ConfigurationService);
    this.runtimeModel = this.configurationService.getRuntimeModel();

    this.host.lineItem$ = new BehaviorSubject<LineItem | undefined>(undefined);
    this.host.isOpened$ = this.host.lineItem$.pipe(map((lineItem) => !!lineItem));
    this.host.saveHandler = this.saveHandler;
    this.host.discardHandler = this.discardHandler;
    this.host.closeHandler = this.closeHandler;
  }

  ngOnInit(): void {
    this.host.openAttrsSidebar
      .pipe(
        takeUntil(this.destroy$),
        tap((model) => this.host.lineItem$.next(model)),
      )
      .subscribe();

    this.host.attributes$ = this.host.lineItem$.pipe(
      map((model) => {
        const component = model && this.runtimeModel?.components.get(model.type);
        return model
          ? model.attributes.map((attribute) => ({
              ...attribute,
              domain: model.attributeDomains[attribute.name] ?? [],
              readonly: (component?.attributes.find((a) => a.name === attribute.name) as any)?.calculated ?? false,
            }))
          : undefined;
      }),
      map((attributes) => attributes?.filter(({ name }) => name !== '_qty')),
      shareReplay(),
    );

    this.host.attributesForm$ = this.host.attributes$.pipe(
      map((attributes) => {
        const controls = attributes?.reduce((acc, attribute) => {
          const control = new FormControl(attribute.value);
          if (attribute.readonly) {
            control.disable();
          }

          return { ...acc, [attribute.name]: control };
        }, {});

        return new FormGroup(controls ?? {});
      }),
    );

    // update attrs sidebar data on model update
    this.configurationService
      .get()
      .pipe(
        takeUntil(this.destroy$),
        map((m) => m && this.host.lineItem$.value && findLineItem(this.host.lineItem$.value.id, [m])),
        filter((model) => !!model),
        tap((model) => this.host.lineItem$.next(model)),
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private closeHandler = () => {
    this.host.lineItem$.next(undefined);
  };

  private saveHandler = (form: FormGroup): void => {
    if (!this.host.lineItem$.value) {
      return;
    }

    const attributes = Object.entries(form.value).map(([name, value]) => ({ name, value }));
    const updated = new LineItemWorker(this.host.lineItem$.value).patchAttribute(attributes).li;

    this.configurationService.patch(updated);
  };

  private discardHandler = (): void => {
    const model = this.host.lineItem$.value;
    this.host.lineItem$.next(model && { ...model });
  };
}
