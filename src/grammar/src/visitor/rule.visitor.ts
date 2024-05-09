import { ParserRuleContext } from 'antlr4ts';
import { RulesParser } from '../../rules/RulesParser';
import { Rule } from '../../../types/rule.types';
import { getStringContent } from '../../../utils/rule.utils';
import { ParseTreeVisitor } from './ParseTreeVisitor';
import { RuleConditionVisitor } from './ruleCondition.visitor';
import { RuleTransformationVisitor } from './ruleTransformation.visitor';
import { RuleActionVisitor } from './ruleAction.visitor';

export class RuleVisitor extends ParseTreeVisitor {
  public rules: Partial<Rule>[] = [];

  public visit(ctx: ParserRuleContext): void {
    switch (ctx.ruleIndex) {
      case RulesParser.RULE_ruleDeclaration: {
        const name = getStringContent(ctx.children?.[1]?.text || '');
        if (ctx.exception) {
          console.log(`Can't parse rule ${name}. Please check it.`);
          return;
        }
        this.rules.push(this.generateEmptyRule(name));
        super.visit(ctx);
        break;
      }
      case RulesParser.RULE_sequence: {
        const rule = this.rules[this.rules.length - 1];
        rule.sequence = +ctx.text;
        super.visit(ctx);
        break;
      }
      case RulesParser.RULE_filterDeclaration: {
        const rule = this.rules[this.rules.length - 1];
        if (ctx.exception) {
          console.log(`Can't parse rule condition ${rule.name}. Please check it.`);
          return;
        }
        const ruleConditionVisitor = new RuleConditionVisitor();
        ruleConditionVisitor.visit(ctx);
        if (!ruleConditionVisitor.condition.objectType) {
          console.log(`Can't parse rule condition ${rule.name}. Please check it.`);
          return;
        }
        rule.conditions?.push(ruleConditionVisitor.condition);
        super.visit(ctx);
        break;
      }
      case RulesParser.RULE_transformationDeclaration: {
        const rule = this.rules[this.rules.length - 1];
        if (ctx.exception) {
          console.log(`Can't parse rule transformation ${rule.name}. Please check it.`);
          return;
        }
        const ruleTransformationVisitor = new RuleTransformationVisitor();
        ruleTransformationVisitor.visit(ctx);
        rule.transformations?.push(ruleTransformationVisitor.transformation);
        super.visit(ctx);
        break;
      }
      case RulesParser.RULE_ifBlockCondition:
      case RulesParser.RULE_actionDeclaration: {
        const rule = this.rules[this.rules.length - 1];
        if (!ctx.text || ctx.exception) {
          console.log(`Can't parse rule action ${rule.name}. Please check it.`);
          return;
        }
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

  private generateEmptyRule(name: string | undefined): Partial<Rule> {
    return { name, conditions: [], transformations: [], mappers: [] };
  }
}
