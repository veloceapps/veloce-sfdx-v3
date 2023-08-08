import { AfterViewInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Attribute, LineItem } from '@veloce/core';
import { AttributeElement, ConfigurationService, ElementDefinition, ScriptHost } from '@veloce/sdk/cms';
import { first, map, Observable, Subject, takeUntil } from 'rxjs';

type AttributeType = 'text' | 'number' | 'boolean';

interface ScriptContent extends AttributeElement {
  options$: Observable<string[] | undefined>;
  model$: Observable<LineItem | undefined>;
  type$: Observable<AttributeType>;
  control: FormControl;
}

@ElementDefinition({
  name: 'bundleName',
  type: 'CUSTOM',
  children: [],
  model: {
    lineItem: '/Bundle/attributes/bundleName',
  },
})
export class Script implements OnDestroy, AfterViewInit {
  configurationService: ConfigurationService;
  cdr: ChangeDetectorRef;
  destroy$ = new Subject<void>();

  constructor(public host: ScriptHost<ScriptContent>) {
    this.configurationService = this.host.injector.get(ConfigurationService);
    this.cdr = host.injector.get(ChangeDetectorRef);
    this.host.control = new FormControl();

    this.host.type$ = this.host.model$.pipe(
      map((model) => model?.attributes.find(({ name }) => name === this.host.boundName)),
      map((attribute) => this.getType(attribute)),
    );
    this.host.options$ = this.host.model$.pipe(map((model) => model?.attributeDomains[this.host.boundName] ?? []));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngAfterViewInit(): void {
    this.host.value$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      this.host.control.setValue(value);
      this.cdr.detectChanges();
    });

    this.host.model$.pipe(first()).subscribe((model) => {
      if (this.isAttributeReadonly(model?.type)) {
        this.host.control.disable();
        this.cdr.detectChanges();
      }
    });
  }

  private isAttributeReadonly(modelType?: string): boolean {
    const runtimeModel = this.configurationService.getRuntimeModel();

    if (!runtimeModel || !modelType) {
      return true;
    }

    const type = runtimeModel.components.get(modelType);
    const attr: any = type?.attributes.find(({ name }) => name === this.host.boundName);
    return attr?.calculated;
  }

  private getType(attribute?: Attribute): AttributeType {
    if (!attribute?.type) {
      return 'text';
    }

    if (attribute.type === 'BOOLEAN') {
      return 'boolean';
    } else if (['INT', 'DOUBLE', 'DECIMAL'].includes(attribute.type)) {
      return 'number';
    }

    return 'text';
  }
}
