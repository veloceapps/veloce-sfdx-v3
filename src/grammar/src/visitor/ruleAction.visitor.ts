import { ParserRuleContext } from 'antlr4ts';
import { snakeCase } from 'lodash';
import { RulesParser } from '../../rules/RulesParser';
import { RuleAction } from '../../../types/rule.types';
import { ParseTreeVisitor } from './ParseTreeVisitor';

export class RuleActionVisitor extends ParseTreeVisitor {
  public action: RuleAction = {};
  private variables: (string | undefined)[] = [];

  public visit(ctx: ParserRuleContext): void {
    switch (ctx.ruleIndex) {
      case RulesParser.RULE_setPropertyAction:
      case RulesParser.RULE_setFieldAction: {
        this.setProperty('variableName', ctx.children?.[0].text);
        this.action.action = this.getActionName(ctx.children?.[2].text);
        this.setProperty('targetFieldName', ctx.children?.[4].text);
        this.setValue(ctx.children?.[6].text);

        super.visit(ctx);
        break;
      }
      case RulesParser.RULE_addMessageAction: {
        this.setProperty('variableName', ctx.children?.[0].text);
        this.action.action = this.getActionName(ctx.children?.[2].text);
        this.setValue(ctx.children?.[4].text);
        super.visit(ctx);
        break;
      }
      case RulesParser.RULE_setStartDateAction:
      case RulesParser.RULE_setEndDateAction:
      case RulesParser.RULE_setEffectiveDateAction: {
        this.setProperty('variableName', ctx.children?.[0].text);
        this.action.action = this.getActionName(ctx.children?.[2].text);
        this.setValue(ctx.children?.[4].text);
        super.visit(ctx);
        break;
      }
      case RulesParser.RULE_adjustCostAction:
      case RulesParser.RULE_adjustPriceAction:
      case RulesParser.RULE_adjustListPriceAction: {
        this.setProperty('variableName', ctx.children?.[0].text);
        this.action.action = this.getActionName(ctx.children?.[2].text);
        this.setProperty('type', ctx.children?.[4].text);
        this.setValue(ctx.children?.[6].text);
        this.setProperty('explanation', ctx.children?.[8].text);
        super.visit(ctx);
        break;
      }
      case RulesParser.RULE_setMetricAction: {
        this.action.action = this.getActionName(ctx.children?.[2].text);
        this.setProperty('targetFieldName', ctx.children?.[4].text);
        this.setValue(ctx.children?.[6].text);
        this.setProperty('totalMetricName', ctx.children?.[8].text);
        this.action.isCalculateTotalMetric = !!this.action.totalMetricName;
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
    this.action.value = value;
    this.action.valueType = this.variables.includes(value) ? 'VARIABLE' : 'VALUE';
  }
}
