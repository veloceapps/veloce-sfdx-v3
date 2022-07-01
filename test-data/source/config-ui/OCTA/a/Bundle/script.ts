import { OnDestroy, OnInit } from '@angular/core';
import { QuoteApiService } from '@veloce/api';
import { ChargeGroupItem, LineItem } from '@veloce/core';
import { ConfigurationService, ElementDefinition, ScriptHost, TemplatesService } from '@veloce/sdk/cms';
import { BehaviorSubject, finalize, map, Observable, Subject, switchMap, takeUntil } from 'rxjs';

interface ScriptContext {
  model$: BehaviorSubject<LineItem | undefined>;
  templatesService: TemplatesService;

  // inputs
  docgenEnabled: Observable<string>;
  discountsEnabled: Observable<string>;
  approvalsEnabled: Observable<string>;

  // outputs
  activeTab: BehaviorSubject<Tab>;
  rootLineItem: BehaviorSubject<LineItem | undefined>;
  openDocgen: BehaviorSubject<void>;

  // other
  tabs: Tab[];
  totalRecurring$: Observable<string>;
  totalNonRecurring$: Observable<string>;
  saveInProgress$: BehaviorSubject<boolean>;
  submitInProgress$: BehaviorSubject<boolean>;
  docgenHandler: () => void;
  saveHandler: () => void;
  submitHandler: () => void;
  cancelHandler: () => void;
}

interface Tab {
  name: string;
  items: string[];
}

@ElementDefinition({
  name: 'Bundle',
  type: 'CUSTOM',
  children: ['bundleName', 'country', 'Phones', 'Plans', 'Deliveries', 'Shared'],
  model: {
    lineItem: '/Bundle',
  },
  inputs: {
    docgenEnabled: '"true"',
    discountsEnabled: '"true"',
    approvalsEnabled: '"true"',
  },
  outputs: {
    activeTab: null,
    rootLineItem: null,
    openDocgen: '/Bundle/Shared/Docgen',
  },
})
export class Script implements OnInit, OnDestroy {
  private configurationService: ConfigurationService;
  private quoteService: QuoteApiService;

  private destroy$ = new Subject<void>();

  constructor(public host: ScriptHost<ScriptContext>) {
    this.configurationService = this.host.injector.get(ConfigurationService);
    this.quoteService = this.host.injector.get(QuoteApiService);
    this.host.templatesService = this.host.injector.get(TemplatesService);

    this.host.saveInProgress$ = new BehaviorSubject<boolean>(false);
    this.host.submitInProgress$ = new BehaviorSubject<boolean>(false);

    this.host.tabs = [];

    this.host.docgenHandler = this.docgenHandler;
    this.host.saveHandler = this.saveHandler;
    this.host.submitHandler = this.submitHandler;
    this.host.cancelHandler = this.cancelHandler;
  }

  ngOnInit(): void {
    setTimeout(() => {
      const dummyTab = { name: 'Dummy', items: Object.keys(this.host.model$.value?.portDomains ?? {}) };
      this.host.activeTab.next(this.host.tabs[0] ?? dummyTab);
    });

    const chargeGroupItems$ = this.host.model$.pipe(map((model) => model?.chargeGroupItems ?? []));

    this.host.totalRecurring$ = chargeGroupItems$.pipe(
      map((items) => items.filter(({ chargeMethod }) => chargeMethod === 'RECURRING')),
      map((items) => this.getNetPrice(items)),
    );

    this.host.totalNonRecurring$ = chargeGroupItems$.pipe(
      map((items) => items.filter(({ chargeMethod }) => chargeMethod !== 'RECURRING')),
      map((items) => this.getNetPrice(items)),
    );

    this.host.model$.pipe(takeUntil(this.destroy$)).subscribe((model) => this.host.rootLineItem.next(model));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getNetPrice = (chargeGroupItems: ChargeGroupItem[]): string => {
    const netPrice = chargeGroupItems.reduce((total, item) => total + (item.netPrice ?? 0), 0);

    if (!netPrice) {
      return '$0.00';
    }
    return `$${netPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
  };

  private docgenHandler = (): void => {
    this.host.openDocgen.next();
  };

  private cancelHandler = (): void => {
    const backFn = (window as any).VELO_BACK_FN;
    const id = this.configurationService.getRuntimeContext()?.properties?.Id;

    backFn?.(id);
  };

  private saveHandler = (): void => {
    if (this.host.saveInProgress$.value) {
      return;
    }

    const context = this.configurationService.getRuntimeContext();
    const quoteId = context?.properties?.Id;

    if (!context || !quoteId || context.runtimeMode === 0) {
      alert('TEST MODE: Save');
      return;
    }

    const rootLineItem = this.configurationService.getSnapshot();
    const currentState = rootLineItem ? [rootLineItem] : [];

    this.host.saveInProgress$.next(true);

    this.quoteService
      .getQuote(quoteId)
      .pipe(
        switchMap((quoteDraft) => this.quoteService.upsertQuote({ ...quoteDraft, currentState })),
        finalize(() => this.host.saveInProgress$.next(false)),
      )
      .subscribe();
  };

  private submitHandler = (): void => {
    if (this.host.submitInProgress$.value) {
      return;
    }

    const context = this.configurationService.getRuntimeContext();
    const quoteId = context?.properties?.Id;

    if (!context || !quoteId || context.runtimeMode === 0) {
      alert('TEST MODE: Submit for approval');
      return;
    }

    const rootLineItem = this.configurationService.getSnapshot();
    const currentState = rootLineItem ? [rootLineItem] : [];

    this.host.submitInProgress$.next(true);

    this.quoteService
      .getQuote(quoteId)
      .pipe(
        switchMap((quoteDraft) => this.quoteService.submitQuote({ ...quoteDraft, currentState })),
        finalize(() => this.host.submitInProgress$.next(false)),
      )
      .subscribe();
  };
}
