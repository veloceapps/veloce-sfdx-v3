import { OnDestroy, OnInit } from '@angular/core';
import { ApprovalItem, LineItem } from '@veloce/core';
import { ElementDefinition, ScriptHost } from '@veloce/sdk/cms';
import { flatMap } from 'lodash';
import { BehaviorSubject, combineLatest, map, Observable, Subject, takeUntil } from 'rxjs';

interface ScriptContent {
  // inputs
  rootLineItem: BehaviorSubject<LineItem | undefined>;
  approvalsEnabled: Observable<string>;

  // outputs
  approvalItems: BehaviorSubject<ApprovalItem[]>;

  // other
  selectedApproval$: BehaviorSubject<ApprovalItem | undefined>;
  selectedApprovalIndex$: BehaviorSubject<number>;
}

@ElementDefinition({
  name: 'MessagesPanel',
  type: 'CUSTOM',
  module: 'Shared',
  inputs: {
    rootLineItem: '/Bundle',
    approvalsEnabled: '/Bundle',
  },
  outputs: {
    approvalItems: null,
  },
})
export class Script implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();

  constructor(public host: ScriptHost<ScriptContent>) {
    this.host.selectedApproval$ = new BehaviorSubject<ApprovalItem | undefined>(undefined);
    this.host.selectedApprovalIndex$ = new BehaviorSubject<number>(0);
  }

  ngOnInit(): void {
    // Approval Items mockup
    this.host.rootLineItem
      .pipe(
        takeUntil(this.destroy$),
        map((rootLineItem) => (rootLineItem ? this.flatten(rootLineItem) : [])),
        map((items) =>
          items.reduce((acc, item) => {
            const [chargeItem] = item.chargeItems;

            return [
              ...acc,
              ...(item.qty > 1
                ? [
                    {
                      id: item.id,
                      lineItemId: item.id,
                      reason: 'Quantity > 1 needs an approval',
                    } as ApprovalItem,
                  ]
                : []),
              ...(chargeItem && chargeItem.netPrice / chargeItem.listPrice <= 0.5
                ? [
                    {
                      id: item.id,
                      lineItemId: item.id,
                      reason: 'Discount > 50% needs an approval',
                    } as ApprovalItem,
                  ]
                : []),
            ];
          }, [] as ApprovalItem[]),
        ),
      )
      .subscribe((approvalItems) => {
        const activeIndex = approvalItems.findIndex(
          (item) => item.lineItemId === this.host.selectedApproval$.value?.lineItemId,
        );
        this.host.selectedApprovalIndex$.next(activeIndex >= 0 ? activeIndex : 0);

        this.host.approvalItems.next(approvalItems);
      });

    combineLatest([this.host.approvalItems, this.host.selectedApprovalIndex$])
      .pipe(
        takeUntil(this.destroy$),
        map(([items, index]) => items[index]),
      )
      .subscribe((selectedItem?: ApprovalItem) => {
        this.host.selectedApproval$.next(selectedItem);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private flatten = (li: LineItem): LineItem[] => {
    return [{ ...li, lineItems: [] }, ...flatMap(li.lineItems.map((child) => this.flatten(child)))];
  };
}
