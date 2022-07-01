import { OnDestroy, OnInit } from '@angular/core';
import { LineItem } from '@veloce/core';
import { ConfigurationService, ElementDefinition, findLineItem, ScriptHost } from '@veloce/sdk/cms';
import { BehaviorSubject, map, Observable, Subject, takeUntil, tap } from 'rxjs';

interface ScriptContent {
  lineItem$: BehaviorSubject<LineItem | undefined>;
  portsNames$: BehaviorSubject<string[]>;
  hidden$: Observable<boolean>;
  sidebarMode: boolean;

  openPortsSidebar: Observable<LineItem>;
  closeHandler: () => void;
  backHandler: () => void;
}

@ElementDefinition({
  name: 'PortsSidebar',
  type: 'REFERENCE',
  reference: 'PortsViewer',
  children: [],
})
export class Script implements OnInit, OnDestroy {
  configurationService: ConfigurationService;

  destroy$ = new Subject<void>();

  constructor(public host: ScriptHost<ScriptContent>) {
    this.configurationService = this.host.injector.get(ConfigurationService);

    this.host.lineItem$ = new BehaviorSubject<LineItem | undefined>(undefined);
    this.host.portsNames$ = new BehaviorSubject<string[]>([]);
    this.host.hidden$ = this.host.lineItem$.pipe(map((lineItem) => !lineItem));
    this.host.sidebarMode = true;

    this.host.closeHandler = this.closeHandler;
    this.host.backHandler = this.backHandler;
  }

  ngOnInit(): void {
    this.host.openPortsSidebar
      .pipe(
        takeUntil(this.destroy$),
        tap((model) => this.host.lineItem$.next(model)),
      )
      .subscribe();

    this.host.lineItem$.pipe(takeUntil(this.destroy$)).subscribe((lineItem) => {
      const portsNames = Object.keys(lineItem?.portDomains ?? {});
      this.host.portsNames$.next(portsNames);
    });

    // update ports sidebar data on model update
    this.configurationService
      .get()
      .pipe(
        takeUntil(this.destroy$),
        map((m) => m && this.host.lineItem$.value && findLineItem(this.host.lineItem$.value.id, [m])),
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

  private backHandler = (): void => {
    const model = this.host.lineItem$.value;

    if (model) {
      const rootLi = this.configurationService.getSnapshot();
      const parent = model.parentId && rootLi ? findLineItem(model.parentId, rootLi.lineItems) : undefined;
      this.host.lineItem$.next(parent);
    }
  };
}
