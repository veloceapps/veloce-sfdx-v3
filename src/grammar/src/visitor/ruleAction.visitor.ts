import { ParserRuleContext } from 'antlr4ts';
import { snakeCase } from 'lodash';
import { RulesParser } from '../../rules/RulesParser';
import { RuleAction } from '../../../types/rule.types';
import { getStringContent } from '../../../utils/rule.utils';
import { ParseTreeVisitor } from './ParseTreeVisitor';

const ADJUST_TARGET_FIELDS: Record<string, string> = {
  ADJUST_PRICE: 'NET_PRICE',
  ADJUST_LIST_PRICE: 'LIST_PRICE',
  ADJUST_COST: 'NET_COST',
};

export class RuleActionVisitor extends ParseTreeVisitor {
  public action: RuleAction = {};
  private variables: (string | undefined)[] = [];

  public visit(ctx: ParserRuleContext): void {
    switch (ctx.ruleIndex) {
      case RulesParser.RULE_setPropertyAction:
      case RulesParser.RULE_setFieldValueAction: {
        this.setProperty('variableName', ctx.children?.[0]?.text);
        this.action.action = this.getActionName(ctx.children?.[2]?.text);
        this.setProperty('targetFieldName', ctx.children?.[4]?.text);
        this.setValue(ctx.children?.[6]?.text);

        super.visit(ctx);
        break;
      }
      case RulesParser.RULE_addMessageAction:
      case RulesParser.RULE_setScore: {
        this.setProperty('variableName', ctx.children?.[0]?.text);
        this.action.action = this.getActionName(ctx.children?.[2]?.text);
        this.setValue(ctx.children?.[4]?.text);
        super.visit(ctx);
        break;
      }
      case RulesParser.RULE_setStartDateAction:
      case RulesParser.RULE_setEndDateAction:
      case RulesParser.RULE_setEffectiveDateAction: {
        this.setProperty('variableName', ctx.children?.[0]?.text);
        this.action.action = this.getActionName(ctx.children?.[2]?.text);
        this.setValue(ctx.children?.[4]?.text);
        super.visit(ctx);
        break;
      }
      case RulesParser.RULE_adjustCostAction:
      case RulesParser.RULE_adjustPriceAction:
      case RulesParser.RULE_adjustListPriceAction: {
        this.setProperty('variableName', ctx.children?.[0]?.text);
        const action: string = this.getActionName(ctx.children?.[2]?.text);
        this.action.action = action;
        this.setProperty('type', ctx.children?.[4]?.text);
        this.setProperty(
          'targetFieldName',
          ctx.children?.[4]?.text === 'MARGIN' ? 'MARGIN_PERCENT' : ADJUST_TARGET_FIELDS[action],
        );
        this.setValue(ctx.children?.[6]?.text);
        this.setProperty('explanation', getStringContent(ctx.children?.[8]?.text || ''));
        super.visit(ctx);
        break;
      }
      case RulesParser.RULE_setMetricAction: {
        this.action.action = this.getActionName(ctx.children?.[2]?.text);
        this.setProperty('targetFieldName', ctx.children?.[4]?.text);
        this.setValue(ctx.children?.[6]?.text);
        this.setProperty('totalMetricName', ctx.children?.[8]?.text);
        this.action.isCalculateTotalMetric = !!this.action.totalMetricName;
        super.visit(ctx);
        break;
      }
      case RulesParser.RULE_addApprovalDataAction: {
        this.setProperty('variableName', ctx.children?.[0]?.text);
        this.action.action = this.getActionName(ctx.children?.[2]?.text);
        this.setValue(ctx.children?.[4]?.text);
        if (ctx.children?.[5].text === ',') {
          this.setMessage(ctx.children?.[6].text);
        }

        super.visit(ctx);
        break;
      }
      default:
        super.visit(ctx);
    }
  }

  public defineVariables(variables: (string | undefined)[]): void {
    this.variables = variables;
  }

  private getActionName(action: string | undefined): string {
    return snakeCase(action).toUpperCase();
  }

  private setProperty(property: keyof RuleAction, value: string | undefined): void {
    if (!value) {
      return;
    }
    (this.action[property] as any) = value;
  }

  private setValue(value: string | undefined): void {
    if (!value) {
      return;
    }
    let parsedValue = value;
    this.action.valueType = this.variables.includes(value) ? 'VARIABLE' : 'VALUE';
    if (this.action.valueType === 'VALUE') {
      parsedValue = getStringContent(value);
    }
    this.action.value = parsedValue;
  }

  private setMessage(message: string | undefined): void {
    if (!message) {
      return;
    }

    let parsedMessage = message;
    this.action.messageValueType = this.variables.includes(message) ? 'VARIABLE' : 'VALUE';
    if (this.action.messageValueType === 'VALUE') {
      parsedMessage = getStringContent(message);
    }
    this.action.message = parsedMessage;
  }
}
