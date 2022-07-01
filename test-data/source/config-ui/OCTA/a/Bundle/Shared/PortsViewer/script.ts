import { OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  AdjustmentType,
  ApprovalItem,
  CfgStatus,
  ChargeItem,
  LineItem,
  PortDomain,
  PriceAdjustment,
} from '@veloce/core';
import {
  ConfigurationService,
  ElementDefinition,
  generateLineItem,
  LineItemWorker,
  mapAttributes,
  ScriptHost,
} from '@veloce/sdk/cms';
import { Dictionary, isEmpty } from 'lodash';
import { BehaviorSubject, combineLatest, map, Observable, Subject, takeUntil } from 'rxjs';

type SelectionMode = 'single' | 'multiple';

interface ScriptContent {
  // inputs
  lineItem$: BehaviorSubject<LineItem | undefined>;
  portsNames$: BehaviorSubject<string[]>;
  hidden$: Observable<boolean>;
  discountsEnabled: Observable<string>;
  approvalsEnabled: Observable<string>;
  approvalItems: Observable<ApprovalItem[]>;
  sidebarMode: boolean;
  closeHandler: () => void;
  backHandler: () => void;

  // outputs
  openAttrsSidebar: BehaviorSubject<LineItem>;
  openPortsSidebar: BehaviorSubject<LineItem>;

  // calculated
  tables$: Observable<TableData[]>;
  cols: ColumnDef[];

  // handlers
  getCellValue: (data: any, col: ColumnDef) => any;
  onRowSelect: (data: RowData, tableData: TableData) => void;
  onToggleSelectAll: (select: boolean, tableData: TableData) => void;
}

interface TableData {
  rows: RowData[];
  allSelected: boolean;
  selectionMode: SelectionMode;
  portDomain: PortDomain;
}

interface RowData {
  id: string;
  type: string;
  name: string;
  qty: number;
  listPrice: string;
  netPrice: string;
  attributes: Dictionary<any>;
  selected: boolean;
  model?: LineItem;
}

interface SelectItem<T = any> {
  value?: T;
  label: string;
}

interface ColumnDef {
  field: string;
  headerName: string;
  width?: string;
  class?: string;
  classRules?: (data: RowData) => { [key: string]: boolean };
  valueGetter?: (data: RowData) => any;
  editFormat?: 'text' | 'number' | 'select';
  valueOptions?: (data: RowData) => SelectItem[];
  onValueChange?: (value: any, data: RowData) => void;
  onClick?: (data: RowData) => void;
  isDisabled?: (data: RowData) => boolean;
  tooltip?: (data: RowData) => string;
  disabledReason?: string;
}

const discountTypeOptions: SelectItem<AdjustmentType | ''>[] = [
  { value: '', label: '' },
  { value: 'MARKUP_PERCENT', label: 'Markup (+%)' },
  { value: 'DISCOUNT_PERCENT', label: 'Discount (-%)' },
  { value: 'MARKUP_AMOUNT', label: 'Markup (+$)' },
  { value: 'DISCOUNT_AMOUNT', label: 'Discount (-$)' },
  { value: 'OVERRIDE_AMOUNT', label: 'Price Override ($)' },
];

@ElementDefinition({
  name: 'PortsViewer',
  type: 'CUSTOM',
  isShared: true,
  inputs: {
    discountsEnabled: '/Bundle',
    approvalsEnabled: '/Bundle',
    approvalItems: '@Shared/MessagesPanel',
  },
  outputs: {
    openAttrsSidebar: '@Shared/AttributesSidebar',
    openPortsSidebar: '@Shared/PortsSidebar',
  },
})
export class Script implements OnInit, OnDestroy {
  private configurationService: ConfigurationService;
  private approvalItems: ApprovalItem[] = [];

  private destroy$ = new Subject<void>();

  constructor(public host: ScriptHost<ScriptContent>) {
    this.configurationService = this.host.injector.get(ConfigurationService);

    this.host.getCellValue = this.getCellValue;
    this.host.onRowSelect = this.onRowSelect;
    this.host.onToggleSelectAll = this.onToggleSelectAll;
  }

  ngOnInit(): void {
    combineLatest([this.host.discountsEnabled, this.host.approvalsEnabled])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([discountsEnabled, approvalsEnabled]) => {
        this.host.cols = this.getDefaultColumns(discountsEnabled === 'true', approvalsEnabled === 'true');
      });

    this.host.tables$ = combineLatest([this.host.lineItem$, this.host.portsNames$]).pipe(
      map(([lineItem, portsNames]) => portsNames.map((portName) => this.getTableData(lineItem, portName)) ?? []),
      map((tablesData) => tablesData.filter((data) => !!data) as TableData[]),
    );

    this.host.approvalItems
      .pipe(takeUntil(this.destroy$))
      .subscribe((approvalItems) => (this.approvalItems = approvalItems));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getTableData(lineItem?: LineItem, portName?: string): TableData | undefined {
    if (!lineItem || !portName) {
      return;
    }

    const portDomain = lineItem.portDomains[portName];
    if (!portDomain) {
      return;
    }

    const rows = this.getRows(lineItem, portName, portDomain);
    const allSelected = rows.every((row) => row.selected);
    const selectionMode: SelectionMode = portDomain.minCard === 1 && portDomain.maxCard === 1 ? 'single' : 'multiple';

    return {
      rows,
      allSelected,
      selectionMode,
      portDomain,
    };
  }

  private getCellValue(data: RowData, col: ColumnDef): any {
    return col.valueGetter ? col.valueGetter(data) : (data as any)[col.field];
  }

  private getRows(lineItem: LineItem, portName: string, portDomain: PortDomain): any[] {
    const products = this.getProducts(lineItem, portDomain, portName);
    const rows = products.map((product) => this.productToRow(product, lineItem, portDomain));

    return rows;
  }

  private getProducts(lineItem: LineItem, portDomain: PortDomain, portName: string): any[] {
    const runtimeModel = this.configurationService.getRuntimeModel();
    if (!runtimeModel) {
      return [];
    }

    const products = runtimeModel.getProductsByType(portDomain.type);
    if (products.length > 0) {
      return products;
    }

    const domainTypes = lineItem.portDomains[portName]?.domainTypes ?? [];
    return domainTypes.map((type) => runtimeModel.components.get(type.name)).filter((c) => !!c);
  }

  private productToRow(product: any, model: LineItem, portDomain: PortDomain): any {
    const li = model?.lineItems.find(({ type }) => type === product?.typeName);

    const values = li ? mapAttributes(li.attributes) : {};
    const attributes = (product?.attributes ?? []).reduce((acc: any, attr: any) => {
      const { name, ...rest } = attr;
      return name ? { ...acc, [name]: { ...rest, value: values[name] } } : acc;
    }, {} as Dictionary<any>);

    const price = this.getPrices(portDomain, product?.typeName, li);

    const row = {
      id: product?.productId,
      name: product?.productName || product?.typeName,
      qty: 1,
      listPrice: `$${price.list.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      netPrice: `$${price.net.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      type: product?.typeName,
      attributes,
      selected: !!li,
      model: li,
    };

    const controls = this.host.cols
      .filter((col) => col.editFormat && li)
      .reduce((acc, col) => {
        const control = new FormControl(this.getCellValue(row, col));
        if (col.isDisabled?.(row)) {
          control.disable();
        }
        return { ...acc, [col.field]: control };
      }, {} as { [key: string]: FormControl });

    return { ...row, controls };
  }

  private getPrices = (portDomain: PortDomain, type: string, lineItem?: LineItem): { net: number; list: number } => {
    const chargeItems = lineItem?.chargeItems;
    const domainType = portDomain.domainTypes.find(({ name }) => name === type);

    const pricesSource: Pick<ChargeItem, 'chargeMethod' | 'netPrice' | 'listPrice'>[] =
      chargeItems ?? domainType?.recommendedPrices ?? [];
    const showRecurring = pricesSource.some(({ chargeMethod }) => chargeMethod === 'RECURRING');

    const [net, list] = pricesSource
      .filter(({ chargeMethod }) => (showRecurring ? chargeMethod === 'RECURRING' : chargeMethod !== 'RECURRING'))
      .reduce(
        (acc, rp) => {
          const [netPrice, listPrice] = acc;
          return [netPrice + rp.netPrice, listPrice + rp.listPrice];
        },
        [0, 0],
      ) ?? [0, 0];

    return { net, list };
  };

  private getDefaultColumns = (discountsEnabled: boolean, approvalsEnabled: boolean): ColumnDef[] => {
    return [
      ...(approvalsEnabled
        ? [
            {
              field: 'status',
              headerName: '',
              width: '28px',
              classRules: (data) => ({
                status: !!data.model,
                warning: this.approvalItems.some((item) => item.lineItemId === data.model?.id),
              }),
              tooltip: (data) =>
                this.approvalItems
                  .filter((item) => item.lineItemId === data.model?.id)
                  .map((item) => `&#8226; ${item.reason}`)
                  .join('<br/>'),
            } as ColumnDef,
          ]
        : []),

      {
        field: 'name',
        headerName: 'Name',
        classRules: (data) => ({ clickable: !isEmpty(data.model?.portDomains) }),
        onClick: (data) =>
          data.model && !isEmpty(data.model?.portDomains) && this.host.openPortsSidebar.next(data.model),
      },
      {
        field: 'qty',
        headerName: 'QTY',
        class: 'text-right',
        width: '10%',
        valueGetter: (data) => data.model?.qty?.toString() ?? '',
        editFormat: 'number',
        onValueChange: this.changeQtyHandler,
      },
      { field: 'listPrice', headerName: 'List Price', width: '15%', class: 'text-right' },
      ...(discountsEnabled
        ? ([
            {
              field: 'discountType',
              headerName: 'Discount Type',
              width: '15%',
              valueGetter: (data) => data.model?.chargeItems?.[0]?.priceAdjustment?.type,
              editFormat: 'select',
              valueOptions: () => discountTypeOptions,
              onValueChange: (value, data) => this.priceAdjustmentHandler(data, { type: value || null }),
              isDisabled: (data) => !this.isPriceAdjustmentEnabled(data.model),
              tooltip: (data) =>
                this.isPriceAdjustmentEnabled(data.model)
                  ? ''
                  : 'To enable Discount Types, turn on the Enable Price Adjustment option for the Price List.',
            },
            {
              field: 'discount',
              headerName: 'Discount',
              class: 'text-right',
              width: '7%',
              valueGetter: (data) => data.model?.chargeItems?.[0]?.priceAdjustment?.amount,
              editFormat: 'number',
              onValueChange: (value, data) => this.priceAdjustmentHandler(data, { amount: value }),
              isDisabled: (data) => !this.isPriceAdjustmentEnabled(data.model),
              tooltip: (data) =>
                this.isPriceAdjustmentEnabled(data.model)
                  ? ''
                  : 'To enable Discounts, turn on the Enable Price Adjustment option for the Price List.',
            },
          ] as ColumnDef[])
        : []),

      { field: 'netPrice', headerName: 'Net Price', width: '15%', class: 'text-right' },
    ];
  };

  private isPriceAdjustmentEnabled = (li?: LineItem): boolean => {
    if (!li) {
      return false;
    }
    return this.configurationService.chargesSnapshot[li.chargeItems?.[0]?.chargeId ?? '']?.enablePriceAdjustment;
  };

  private onToggleSelectAll = (select: boolean, tableData: TableData): void => {
    if (!this.host.lineItem$.value) {
      return;
    }

    const model = this.host.lineItem$.value;

    const alreadyAdded = tableData.rows.filter((row) => !!row.model).map((row) => row.model?.type) as string[];

    // on select - set cfgStatus to 'User' to all existing lineItems on port
    const lineItems = select
      ? [
          ...model.lineItems.map((li) =>
            alreadyAdded.includes(li.type) ? { ...li, cfgStatus: 'User' as CfgStatus } : li,
          ),
          ...tableData.rows
            .filter(({ type }) => !model.lineItems.some((li) => li.type === type))
            .map(({ type }) => generateLineItem(tableData.portDomain.name, type, model.id)),
        ]
      : model.lineItems.filter(({ port }) => port !== tableData.portDomain.name);

    this.configurationService.patch({ ...model, cfgStatus: 'User', lineItems });
  };

  private onRowSelect = (data: RowData, tableData: TableData): void => {
    if (!this.host.lineItem$.value) {
      return;
    }

    const model = this.host.lineItem$.value;
    const portDomain = tableData.portDomain;

    const lineItem: LineItem = {
      ...model,
      cfgStatus: 'User',
      lineItems:
        tableData.selectionMode === 'multiple'
          ? data.model
            ? model.lineItems.filter(({ type }) => type !== data.type)
            : [...model.lineItems, generateLineItem(portDomain.name, data.type, model.id)]
          : [
              ...model.lineItems.filter(({ port }) => port !== portDomain.name),
              generateLineItem(portDomain.name, data.type, model.id),
            ],
    };

    this.configurationService.patch(lineItem);
  };

  private changeQtyHandler = (value: any, data: RowData): void => {
    const lineItem = this.host.lineItem$.value;
    const { qty } = data.model ?? {};
    const numeric = Number(value);

    if (!lineItem || !data.model) {
      return;
    }

    if (typeof numeric !== 'number' || value === qty) {
      return;
    }

    const updatedLi = new LineItemWorker({ ...lineItem, cfgStatus: 'User' }).replace({
      ...data.model,
      cfgStatus: 'User',
      qty: numeric,
    }).li;

    this.configurationService.patch(updatedLi);
  };

  private priceAdjustmentHandler = (data: RowData, adjustment: Partial<PriceAdjustment>): void => {
    const lineItem = this.host.lineItem$.value;
    if (!lineItem || !data.model) {
      return;
    }

    const charges: ChargeItem[] = data.model.chargeItems;
    const [charge] = charges;

    if (!charge) {
      return;
    }

    const typeChanged = adjustment.type !== undefined;

    const priceAdjustment: PriceAdjustment | undefined = typeChanged
      ? adjustment.type
        ? {
            amount: charge.priceAdjustment?.amount ?? 0,
            type: adjustment.type,
            explanation: '',
          }
        : undefined
      : {
          amount: adjustment.amount ?? 0,
          type: charge.priceAdjustment?.type ?? 'DISCOUNT_PERCENT',
          explanation: '',
        };

    const updatedProductLi: LineItem = {
      ...data.model,
      cfgStatus: 'User',
      chargeItems: charges.map((c) => {
        if (c.id === charge.id) {
          return { ...charge, priceAdjustment };
        }
        return c;
      }),
    };
    const updatedLi = new LineItemWorker({ ...lineItem, cfgStatus: 'User' }).replace(updatedProductLi).li;

    this.configurationService.patch(updatedLi);
  };
}
