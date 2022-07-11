import { ParserRuleContext } from 'antlr4ts';
import { RulesParser } from '../../rules/RulesParser';
import { RuleCondition, RuleObjectTypes } from '../../../types/rule.types';
import { ParseTreeVisitor } from './ParseTreeVisitor';

export class RuleConditionVisitor extends ParseTreeVisitor {
  public condition: RuleCondition = {};

  public visit(ctx: ParserRuleContext): void {
    switch (ctx.ruleIndex) {
      case RulesParser.RULE_variableName: {
        this.condition.variableName = ctx.text;
        super.visit(ctx);
        break;
      }
      case RulesParser.RULE_filterExpression: {
        if (ctx.children?.[0].text) {
          this.condition.objectType = RuleObjectTypes[ctx.children?.[0].text];
        }
        const expression = ctx.children?.[2].text;
        if (expression !== ')') {
          this.condition.expression = expression;
        }
        super.visit(ctx);
        break;
      }
      default:
        super.visit(ctx);
    }
  }
}
