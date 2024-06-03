import { ParserRuleContext } from 'antlr4ts';
import { RulesParser } from '../../rules/RulesParser';
import { RuleCondition, RuleObjectTypes } from '../../../types/rule.types';
import { ParseTreeVisitor } from './ParseTreeVisitor';

export class RuleConditionVisitor extends ParseTreeVisitor {
  public condition: RuleCondition = {};
  public expressions: { oldText: string; newText: string }[] = [];

  public visit(ctx: ParserRuleContext): void {
    switch (ctx.ruleIndex) {
      case RulesParser.RULE_variableName: {
        this.condition.variableName = ctx.text;
        super.visit(ctx);
        break;
      }
      case RulesParser.RULE_property: {
        this.condition.property = ctx.text;
        super.visit(ctx);
        break;
      }
      case RulesParser.RULE_relatedConditionVariable: {
        this.condition.relatedConditionVariable = ctx.text;
        super.visit(ctx);
        break;
      }
      case RulesParser.RULE_filterExpression: {
        super.visit(ctx);
        if (ctx.children?.[0]?.text) {
          this.condition.objectType = RuleObjectTypes[ctx.children[0].text];
        }
        let expression = ctx.children?.[2]?.text;
        if (expression !== ')') {
          this.expressions?.forEach(({ oldText, newText }) => {
            expression = expression?.replace(oldText, newText);
          });
          this.condition.expression = expression;
        }
        break;
      }
      default:
        super.visit(ctx);
    }
  }

  public visitChildren(ctx: ParserRuleContext): void {
    // if expression contains 'in' operator
    if (ctx.ruleIndex === RulesParser.RULE_expression && ctx.children?.[1]?.text === 'in') {
      this.expressions.push({
        oldText: ctx.text,
        newText: ctx.children
          .map((child) => {
            if (child.text === 'in') {
              return ' in ';
            }
            return child.text;
          })
          .join(''),
      });
    }
    super.visitChildren(ctx);
  }
}
