import { ParserRuleContext } from 'antlr4ts';
import { RulesParser } from '../../rules/RulesParser';
import { Rule } from '../../../types/rule.types';
import { ParseTreeVisitor } from './ParseTreeVisitor';
import { RuleConditionVisitor } from './ruleCondition.visitor';
import { RuleTransformationVisitor } from './ruleTransformation.visitor';
import { RuleActionVisitor } from './ruleAction.visitor';

export class RuleVisitor extends ParseTreeVisitor {
  public rules: Partial<Rule>[] = [];

  public visit(ctx: ParserRuleContext): void {
    switch (ctx.ruleIndex) {
      case RulesParser.RULE_ruleDeclaration:
        this.rules.push(this.generateEmptyRule());
        super.visit(ctx);
        break;
      case RulesParser.RULE_sequence: {
        const rule = this.rules[this.rules.length - 1];
        rule.sequence = +ctx.text;
        super.visit(ctx);
        break;
      }
      case RulesParser.RULE_filterDeclaration: {
        const rule = this.rules[this.rules.length - 1];
        const ruleConditionVisitor = new RuleConditionVisitor();
        ruleConditionVisitor.visit(ctx);
        rule.conditions?.push(ruleConditionVisitor.condition);
        super.visit(ctx);
        break;
      }
      case RulesParser.RULE_transformationDeclaration: {
        const rule = this.rules[this.rules.length - 1];
        const ruleTransformationVisitor = new RuleTransformationVisitor();
        ruleTransformationVisitor.visit(ctx);
        rule.transformations?.push(ruleTransformationVisitor.transformation);
        super.visit(ctx);
        break;
      }
      case RulesParser.RULE_actionDeclaration: {
        if (!ctx.text) {
          return;
        }
        const rule = this.rules[this.rules.length - 1];
        const ruleActionVisitor = new RuleActionVisitor();
        const variables: (string | undefined)[] = [
          ...(rule.conditions || []).map((condition) => condition.variableName),
          ...(rule.transformations || []).map((transformation) => transformation.resultPath),
        ].filter((variable) => variable);
        ruleActionVisitor.defineVariables(variables);
        ruleActionVisitor.visit(ctx);
        rule.mappers?.push(ruleActionVisitor.action);
        super.visit(ctx);
        break;
      }
      default:
        super.visit(ctx);
    }
  }

  private generateEmptyRule(): Partial<Rule> {
    return { conditions: [], transformations: [], mappers: [] };
  }
}
