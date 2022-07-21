// Generated from libs/grammar/rules/Rules.g4 by ANTLR 4.9.0-SNAPSHOT

/*
  Veloce configuration and pricing engine

  @2017-2021 Veloce Inc. All rights reserved
*/

/*
  Veloce configuration and pricing engine

  @2017-2021 Veloce Inc. All rights reserved
*/

import { ParseTreeListener } from 'antlr4ts/tree/ParseTreeListener';

import { CompilationUnitContext } from './RulesParser';
import { HeaderContext } from './RulesParser';
import { RuleDeclarationContext } from './RulesParser';
import { SequenceContext } from './RulesParser';
import { FilterDeclarationContext } from './RulesParser';
import { FilterExpressionContext } from './RulesParser';
import { TransformationDeclarationContext } from './RulesParser';
import { TransformationStatementContext } from './RulesParser';
import { ScriptContext } from './RulesParser';
import { ScriptDeclarationContext } from './RulesParser';
import { ActionDeclarationContext } from './RulesParser';
import { SetPropertyActionContext } from './RulesParser';
import { SetFieldValueActionContext } from './RulesParser';
import { SetScoreContext } from './RulesParser';
import { AddMessageActionContext } from './RulesParser';
import { SetStartDateActionContext } from './RulesParser';
import { SetEndDateActionContext } from './RulesParser';
import { SetEffectiveDateActionContext } from './RulesParser';
import { AdjustCostActionContext } from './RulesParser';
import { AdjustPriceActionContext } from './RulesParser';
import { AdjustListPriceActionContext } from './RulesParser';
import { SetMetricActionContext } from './RulesParser';
import { MetricNameContext } from './RulesParser';
import { TotalMetricNameContext } from './RulesParser';
import { TransformationVariableContext } from './RulesParser';
import { VariableNameContext } from './RulesParser';
import { TargetFieldNameContext } from './RulesParser';
import { ExplanationContext } from './RulesParser';
import { ValueContext } from './RulesParser';
import { ExpressionRootContext } from './RulesParser';
import { QualifiedIdentifierContext } from './RulesParser';
import { ExpressionListContext } from './RulesParser';
import { OptionalExpressionContext } from './RulesParser';
import { ExpressionContext } from './RulesParser';
import { IntConstantContext } from './RulesParser';
import { DoubleConstantContext } from './RulesParser';
import { LiteralExpressionContext } from './RulesParser';
import { IdentifierExpressionContext } from './RulesParser';
import { FunctionExpressionContext } from './RulesParser';
import { TupleExpressionContext } from './RulesParser';
import { LambdaCaptureContext } from './RulesParser';
import { LambdaCaptureListContext } from './RulesParser';
import { LambdaParamContext } from './RulesParser';
import { LambdaParamListContext } from './RulesParser';
import { LambdaBodyContext } from './RulesParser';
import { LambdaExpressionContext } from './RulesParser';
import { PrimaryExpressionContext } from './RulesParser';
import { FunctionNameContext } from './RulesParser';

/**
 * This interface defines a complete listener for a parse tree produced by
 * `RulesParser`.
 */
export interface RulesListener extends ParseTreeListener {
  /**
   * Enter a parse tree produced by `RulesParser.compilationUnit`.
   *
   * @param ctx the parse tree
   */
  enterCompilationUnit?: (ctx: CompilationUnitContext) => void;
  /**
   * Exit a parse tree produced by `RulesParser.compilationUnit`.
   *
   * @param ctx the parse tree
   */
  exitCompilationUnit?: (ctx: CompilationUnitContext) => void;

  /**
   * Enter a parse tree produced by `RulesParser.header`.
   *
   * @param ctx the parse tree
   */
  enterHeader?: (ctx: HeaderContext) => void;
  /**
   * Exit a parse tree produced by `RulesParser.header`.
   *
   * @param ctx the parse tree
   */
  exitHeader?: (ctx: HeaderContext) => void;

  /**
   * Enter a parse tree produced by `RulesParser.ruleDeclaration`.
   *
   * @param ctx the parse tree
   */
  enterRuleDeclaration?: (ctx: RuleDeclarationContext) => void;
  /**
   * Exit a parse tree produced by `RulesParser.ruleDeclaration`.
   *
   * @param ctx the parse tree
   */
  exitRuleDeclaration?: (ctx: RuleDeclarationContext) => void;

  /**
   * Enter a parse tree produced by `RulesParser.sequence`.
   *
   * @param ctx the parse tree
   */
  enterSequence?: (ctx: SequenceContext) => void;
  /**
   * Exit a parse tree produced by `RulesParser.sequence`.
   *
   * @param ctx the parse tree
   */
  exitSequence?: (ctx: SequenceContext) => void;

  /**
   * Enter a parse tree produced by `RulesParser.filterDeclaration`.
   *
   * @param ctx the parse tree
   */
  enterFilterDeclaration?: (ctx: FilterDeclarationContext) => void;
  /**
   * Exit a parse tree produced by `RulesParser.filterDeclaration`.
   *
   * @param ctx the parse tree
   */
  exitFilterDeclaration?: (ctx: FilterDeclarationContext) => void;

  /**
   * Enter a parse tree produced by `RulesParser.filterExpression`.
   *
   * @param ctx the parse tree
   */
  enterFilterExpression?: (ctx: FilterExpressionContext) => void;
  /**
   * Exit a parse tree produced by `RulesParser.filterExpression`.
   *
   * @param ctx the parse tree
   */
  exitFilterExpression?: (ctx: FilterExpressionContext) => void;

  /**
   * Enter a parse tree produced by `RulesParser.transformationDeclaration`.
   *
   * @param ctx the parse tree
   */
  enterTransformationDeclaration?: (ctx: TransformationDeclarationContext) => void;
  /**
   * Exit a parse tree produced by `RulesParser.transformationDeclaration`.
   *
   * @param ctx the parse tree
   */
  exitTransformationDeclaration?: (ctx: TransformationDeclarationContext) => void;

  /**
   * Enter a parse tree produced by `RulesParser.transformationStatement`.
   *
   * @param ctx the parse tree
   */
  enterTransformationStatement?: (ctx: TransformationStatementContext) => void;
  /**
   * Exit a parse tree produced by `RulesParser.transformationStatement`.
   *
   * @param ctx the parse tree
   */
  exitTransformationStatement?: (ctx: TransformationStatementContext) => void;

  /**
   * Enter a parse tree produced by `RulesParser.script`.
   *
   * @param ctx the parse tree
   */
  enterScript?: (ctx: ScriptContext) => void;
  /**
   * Exit a parse tree produced by `RulesParser.script`.
   *
   * @param ctx the parse tree
   */
  exitScript?: (ctx: ScriptContext) => void;

  /**
   * Enter a parse tree produced by `RulesParser.scriptDeclaration`.
   *
   * @param ctx the parse tree
   */
  enterScriptDeclaration?: (ctx: ScriptDeclarationContext) => void;
  /**
   * Exit a parse tree produced by `RulesParser.scriptDeclaration`.
   *
   * @param ctx the parse tree
   */
  exitScriptDeclaration?: (ctx: ScriptDeclarationContext) => void;

  /**
   * Enter a parse tree produced by `RulesParser.actionDeclaration`.
   *
   * @param ctx the parse tree
   */
  enterActionDeclaration?: (ctx: ActionDeclarationContext) => void;
  /**
   * Exit a parse tree produced by `RulesParser.actionDeclaration`.
   *
   * @param ctx the parse tree
   */
  exitActionDeclaration?: (ctx: ActionDeclarationContext) => void;

  /**
   * Enter a parse tree produced by `RulesParser.setPropertyAction`.
   *
   * @param ctx the parse tree
   */
  enterSetPropertyAction?: (ctx: SetPropertyActionContext) => void;
  /**
   * Exit a parse tree produced by `RulesParser.setPropertyAction`.
   *
   * @param ctx the parse tree
   */
  exitSetPropertyAction?: (ctx: SetPropertyActionContext) => void;

  /**
   * Enter a parse tree produced by `RulesParser.setFieldValueAction`.
   *
   * @param ctx the parse tree
   */
  enterSetFieldValueAction?: (ctx: SetFieldValueActionContext) => void;
  /**
   * Exit a parse tree produced by `RulesParser.setFieldValueAction`.
   *
   * @param ctx the parse tree
   */
  exitSetFieldValueAction?: (ctx: SetFieldValueActionContext) => void;

  /**
   * Enter a parse tree produced by `RulesParser.setScore`.
   *
   * @param ctx the parse tree
   */
  enterSetScore?: (ctx: SetScoreContext) => void;
  /**
   * Exit a parse tree produced by `RulesParser.setScore`.
   *
   * @param ctx the parse tree
   */
  exitSetScore?: (ctx: SetScoreContext) => void;

  /**
   * Enter a parse tree produced by `RulesParser.addMessageAction`.
   *
   * @param ctx the parse tree
   */
  enterAddMessageAction?: (ctx: AddMessageActionContext) => void;
  /**
   * Exit a parse tree produced by `RulesParser.addMessageAction`.
   *
   * @param ctx the parse tree
   */
  exitAddMessageAction?: (ctx: AddMessageActionContext) => void;

  /**
   * Enter a parse tree produced by `RulesParser.setStartDateAction`.
   *
   * @param ctx the parse tree
   */
  enterSetStartDateAction?: (ctx: SetStartDateActionContext) => void;
  /**
   * Exit a parse tree produced by `RulesParser.setStartDateAction`.
   *
   * @param ctx the parse tree
   */
  exitSetStartDateAction?: (ctx: SetStartDateActionContext) => void;

  /**
   * Enter a parse tree produced by `RulesParser.setEndDateAction`.
   *
   * @param ctx the parse tree
   */
  enterSetEndDateAction?: (ctx: SetEndDateActionContext) => void;
  /**
   * Exit a parse tree produced by `RulesParser.setEndDateAction`.
   *
   * @param ctx the parse tree
   */
  exitSetEndDateAction?: (ctx: SetEndDateActionContext) => void;

  /**
   * Enter a parse tree produced by `RulesParser.setEffectiveDateAction`.
   *
   * @param ctx the parse tree
   */
  enterSetEffectiveDateAction?: (ctx: SetEffectiveDateActionContext) => void;
  /**
   * Exit a parse tree produced by `RulesParser.setEffectiveDateAction`.
   *
   * @param ctx the parse tree
   */
  exitSetEffectiveDateAction?: (ctx: SetEffectiveDateActionContext) => void;

  /**
   * Enter a parse tree produced by `RulesParser.adjustCostAction`.
   *
   * @param ctx the parse tree
   */
  enterAdjustCostAction?: (ctx: AdjustCostActionContext) => void;
  /**
   * Exit a parse tree produced by `RulesParser.adjustCostAction`.
   *
   * @param ctx the parse tree
   */
  exitAdjustCostAction?: (ctx: AdjustCostActionContext) => void;

  /**
   * Enter a parse tree produced by `RulesParser.adjustPriceAction`.
   *
   * @param ctx the parse tree
   */
  enterAdjustPriceAction?: (ctx: AdjustPriceActionContext) => void;
  /**
   * Exit a parse tree produced by `RulesParser.adjustPriceAction`.
   *
   * @param ctx the parse tree
   */
  exitAdjustPriceAction?: (ctx: AdjustPriceActionContext) => void;

  /**
   * Enter a parse tree produced by `RulesParser.adjustListPriceAction`.
   *
   * @param ctx the parse tree
   */
  enterAdjustListPriceAction?: (ctx: AdjustListPriceActionContext) => void;
  /**
   * Exit a parse tree produced by `RulesParser.adjustListPriceAction`.
   *
   * @param ctx the parse tree
   */
  exitAdjustListPriceAction?: (ctx: AdjustListPriceActionContext) => void;

  /**
   * Enter a parse tree produced by `RulesParser.setMetricAction`.
   *
   * @param ctx the parse tree
   */
  enterSetMetricAction?: (ctx: SetMetricActionContext) => void;
  /**
   * Exit a parse tree produced by `RulesParser.setMetricAction`.
   *
   * @param ctx the parse tree
   */
  exitSetMetricAction?: (ctx: SetMetricActionContext) => void;

  /**
   * Enter a parse tree produced by `RulesParser.metricName`.
   *
   * @param ctx the parse tree
   */
  enterMetricName?: (ctx: MetricNameContext) => void;
  /**
   * Exit a parse tree produced by `RulesParser.metricName`.
   *
   * @param ctx the parse tree
   */
  exitMetricName?: (ctx: MetricNameContext) => void;

  /**
   * Enter a parse tree produced by `RulesParser.totalMetricName`.
   *
   * @param ctx the parse tree
   */
  enterTotalMetricName?: (ctx: TotalMetricNameContext) => void;
  /**
   * Exit a parse tree produced by `RulesParser.totalMetricName`.
   *
   * @param ctx the parse tree
   */
  exitTotalMetricName?: (ctx: TotalMetricNameContext) => void;

  /**
   * Enter a parse tree produced by `RulesParser.transformationVariable`.
   *
   * @param ctx the parse tree
   */
  enterTransformationVariable?: (ctx: TransformationVariableContext) => void;
  /**
   * Exit a parse tree produced by `RulesParser.transformationVariable`.
   *
   * @param ctx the parse tree
   */
  exitTransformationVariable?: (ctx: TransformationVariableContext) => void;

  /**
   * Enter a parse tree produced by `RulesParser.variableName`.
   *
   * @param ctx the parse tree
   */
  enterVariableName?: (ctx: VariableNameContext) => void;
  /**
   * Exit a parse tree produced by `RulesParser.variableName`.
   *
   * @param ctx the parse tree
   */
  exitVariableName?: (ctx: VariableNameContext) => void;

  /**
   * Enter a parse tree produced by `RulesParser.targetFieldName`.
   *
   * @param ctx the parse tree
   */
  enterTargetFieldName?: (ctx: TargetFieldNameContext) => void;
  /**
   * Exit a parse tree produced by `RulesParser.targetFieldName`.
   *
   * @param ctx the parse tree
   */
  exitTargetFieldName?: (ctx: TargetFieldNameContext) => void;

  /**
   * Enter a parse tree produced by `RulesParser.explanation`.
   *
   * @param ctx the parse tree
   */
  enterExplanation?: (ctx: ExplanationContext) => void;
  /**
   * Exit a parse tree produced by `RulesParser.explanation`.
   *
   * @param ctx the parse tree
   */
  exitExplanation?: (ctx: ExplanationContext) => void;

  /**
   * Enter a parse tree produced by `RulesParser.value`.
   *
   * @param ctx the parse tree
   */
  enterValue?: (ctx: ValueContext) => void;
  /**
   * Exit a parse tree produced by `RulesParser.value`.
   *
   * @param ctx the parse tree
   */
  exitValue?: (ctx: ValueContext) => void;

  /**
   * Enter a parse tree produced by `RulesParser.expressionRoot`.
   *
   * @param ctx the parse tree
   */
  enterExpressionRoot?: (ctx: ExpressionRootContext) => void;
  /**
   * Exit a parse tree produced by `RulesParser.expressionRoot`.
   *
   * @param ctx the parse tree
   */
  exitExpressionRoot?: (ctx: ExpressionRootContext) => void;

  /**
   * Enter a parse tree produced by `RulesParser.qualifiedIdentifier`.
   *
   * @param ctx the parse tree
   */
  enterQualifiedIdentifier?: (ctx: QualifiedIdentifierContext) => void;
  /**
   * Exit a parse tree produced by `RulesParser.qualifiedIdentifier`.
   *
   * @param ctx the parse tree
   */
  exitQualifiedIdentifier?: (ctx: QualifiedIdentifierContext) => void;

  /**
   * Enter a parse tree produced by `RulesParser.expressionList`.
   *
   * @param ctx the parse tree
   */
  enterExpressionList?: (ctx: ExpressionListContext) => void;
  /**
   * Exit a parse tree produced by `RulesParser.expressionList`.
   *
   * @param ctx the parse tree
   */
  exitExpressionList?: (ctx: ExpressionListContext) => void;

  /**
   * Enter a parse tree produced by `RulesParser.optionalExpression`.
   *
   * @param ctx the parse tree
   */
  enterOptionalExpression?: (ctx: OptionalExpressionContext) => void;
  /**
   * Exit a parse tree produced by `RulesParser.optionalExpression`.
   *
   * @param ctx the parse tree
   */
  exitOptionalExpression?: (ctx: OptionalExpressionContext) => void;

  /**
   * Enter a parse tree produced by `RulesParser.expression`.
   *
   * @param ctx the parse tree
   */
  enterExpression?: (ctx: ExpressionContext) => void;
  /**
   * Exit a parse tree produced by `RulesParser.expression`.
   *
   * @param ctx the parse tree
   */
  exitExpression?: (ctx: ExpressionContext) => void;

  /**
   * Enter a parse tree produced by `RulesParser.intConstant`.
   *
   * @param ctx the parse tree
   */
  enterIntConstant?: (ctx: IntConstantContext) => void;
  /**
   * Exit a parse tree produced by `RulesParser.intConstant`.
   *
   * @param ctx the parse tree
   */
  exitIntConstant?: (ctx: IntConstantContext) => void;

  /**
   * Enter a parse tree produced by `RulesParser.doubleConstant`.
   *
   * @param ctx the parse tree
   */
  enterDoubleConstant?: (ctx: DoubleConstantContext) => void;
  /**
   * Exit a parse tree produced by `RulesParser.doubleConstant`.
   *
   * @param ctx the parse tree
   */
  exitDoubleConstant?: (ctx: DoubleConstantContext) => void;

  /**
   * Enter a parse tree produced by `RulesParser.literalExpression`.
   *
   * @param ctx the parse tree
   */
  enterLiteralExpression?: (ctx: LiteralExpressionContext) => void;
  /**
   * Exit a parse tree produced by `RulesParser.literalExpression`.
   *
   * @param ctx the parse tree
   */
  exitLiteralExpression?: (ctx: LiteralExpressionContext) => void;

  /**
   * Enter a parse tree produced by `RulesParser.identifierExpression`.
   *
   * @param ctx the parse tree
   */
  enterIdentifierExpression?: (ctx: IdentifierExpressionContext) => void;
  /**
   * Exit a parse tree produced by `RulesParser.identifierExpression`.
   *
   * @param ctx the parse tree
   */
  exitIdentifierExpression?: (ctx: IdentifierExpressionContext) => void;

  /**
   * Enter a parse tree produced by `RulesParser.functionExpression`.
   *
   * @param ctx the parse tree
   */
  enterFunctionExpression?: (ctx: FunctionExpressionContext) => void;
  /**
   * Exit a parse tree produced by `RulesParser.functionExpression`.
   *
   * @param ctx the parse tree
   */
  exitFunctionExpression?: (ctx: FunctionExpressionContext) => void;

  /**
   * Enter a parse tree produced by `RulesParser.tupleExpression`.
   *
   * @param ctx the parse tree
   */
  enterTupleExpression?: (ctx: TupleExpressionContext) => void;
  /**
   * Exit a parse tree produced by `RulesParser.tupleExpression`.
   *
   * @param ctx the parse tree
   */
  exitTupleExpression?: (ctx: TupleExpressionContext) => void;

  /**
   * Enter a parse tree produced by `RulesParser.lambdaCapture`.
   *
   * @param ctx the parse tree
   */
  enterLambdaCapture?: (ctx: LambdaCaptureContext) => void;
  /**
   * Exit a parse tree produced by `RulesParser.lambdaCapture`.
   *
   * @param ctx the parse tree
   */
  exitLambdaCapture?: (ctx: LambdaCaptureContext) => void;

  /**
   * Enter a parse tree produced by `RulesParser.lambdaCaptureList`.
   *
   * @param ctx the parse tree
   */
  enterLambdaCaptureList?: (ctx: LambdaCaptureListContext) => void;
  /**
   * Exit a parse tree produced by `RulesParser.lambdaCaptureList`.
   *
   * @param ctx the parse tree
   */
  exitLambdaCaptureList?: (ctx: LambdaCaptureListContext) => void;

  /**
   * Enter a parse tree produced by `RulesParser.lambdaParam`.
   *
   * @param ctx the parse tree
   */
  enterLambdaParam?: (ctx: LambdaParamContext) => void;
  /**
   * Exit a parse tree produced by `RulesParser.lambdaParam`.
   *
   * @param ctx the parse tree
   */
  exitLambdaParam?: (ctx: LambdaParamContext) => void;

  /**
   * Enter a parse tree produced by `RulesParser.lambdaParamList`.
   *
   * @param ctx the parse tree
   */
  enterLambdaParamList?: (ctx: LambdaParamListContext) => void;
  /**
   * Exit a parse tree produced by `RulesParser.lambdaParamList`.
   *
   * @param ctx the parse tree
   */
  exitLambdaParamList?: (ctx: LambdaParamListContext) => void;

  /**
   * Enter a parse tree produced by `RulesParser.lambdaBody`.
   *
   * @param ctx the parse tree
   */
  enterLambdaBody?: (ctx: LambdaBodyContext) => void;
  /**
   * Exit a parse tree produced by `RulesParser.lambdaBody`.
   *
   * @param ctx the parse tree
   */
  exitLambdaBody?: (ctx: LambdaBodyContext) => void;

  /**
   * Enter a parse tree produced by `RulesParser.lambdaExpression`.
   *
   * @param ctx the parse tree
   */
  enterLambdaExpression?: (ctx: LambdaExpressionContext) => void;
  /**
   * Exit a parse tree produced by `RulesParser.lambdaExpression`.
   *
   * @param ctx the parse tree
   */
  exitLambdaExpression?: (ctx: LambdaExpressionContext) => void;

  /**
   * Enter a parse tree produced by `RulesParser.primaryExpression`.
   *
   * @param ctx the parse tree
   */
  enterPrimaryExpression?: (ctx: PrimaryExpressionContext) => void;
  /**
   * Exit a parse tree produced by `RulesParser.primaryExpression`.
   *
   * @param ctx the parse tree
   */
  exitPrimaryExpression?: (ctx: PrimaryExpressionContext) => void;

  /**
   * Enter a parse tree produced by `RulesParser.functionName`.
   *
   * @param ctx the parse tree
   */
  enterFunctionName?: (ctx: FunctionNameContext) => void;
  /**
   * Exit a parse tree produced by `RulesParser.functionName`.
   *
   * @param ctx the parse tree
   */
  exitFunctionName?: (ctx: FunctionNameContext) => void;
}
