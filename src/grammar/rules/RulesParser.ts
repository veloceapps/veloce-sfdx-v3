// Generated from src/grammar/rules/Rules.g4 by ANTLR 4.9.0-SNAPSHOT

/*
 *
 *  Veloce configuration and pricing engine
 *
 *  @2017-2023 Veloce Inc. All rights reserved
 *
 */

import { ATN } from 'antlr4ts/atn/ATN';
import { ATNDeserializer } from 'antlr4ts/atn/ATNDeserializer';
import { FailedPredicateException } from 'antlr4ts/FailedPredicateException';
import { NotNull } from 'antlr4ts/Decorators';
import { NoViableAltException } from 'antlr4ts/NoViableAltException';
import { Override } from 'antlr4ts/Decorators';
import { Parser } from 'antlr4ts/Parser';
import { ParserRuleContext } from 'antlr4ts/ParserRuleContext';
import { ParserATNSimulator } from 'antlr4ts/atn/ParserATNSimulator';
import { ParseTreeListener } from 'antlr4ts/tree/ParseTreeListener';
import { ParseTreeVisitor } from 'antlr4ts/tree/ParseTreeVisitor';
import { RecognitionException } from 'antlr4ts/RecognitionException';
import { RuleContext } from 'antlr4ts/RuleContext';
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from 'antlr4ts/tree/TerminalNode';
import { Token } from 'antlr4ts/Token';
import { TokenStream } from 'antlr4ts/TokenStream';
import { Vocabulary } from 'antlr4ts/Vocabulary';
import { VocabularyImpl } from 'antlr4ts/VocabularyImpl';

import * as Utils from 'antlr4ts/misc/Utils';

import { RulesListener } from './RulesListener';

export class RulesParser extends Parser {
  public static readonly T__0 = 1;
  public static readonly T__1 = 2;
  public static readonly T__2 = 3;
  public static readonly T__3 = 4;
  public static readonly T__4 = 5;
  public static readonly T__5 = 6;
  public static readonly T__6 = 7;
  public static readonly T__7 = 8;
  public static readonly T__8 = 9;
  public static readonly T__9 = 10;
  public static readonly T__10 = 11;
  public static readonly T__11 = 12;
  public static readonly T__12 = 13;
  public static readonly T__13 = 14;
  public static readonly T__14 = 15;
  public static readonly T__15 = 16;
  public static readonly T__16 = 17;
  public static readonly T__17 = 18;
  public static readonly T__18 = 19;
  public static readonly T__19 = 20;
  public static readonly T__20 = 21;
  public static readonly T__21 = 22;
  public static readonly T__22 = 23;
  public static readonly T__23 = 24;
  public static readonly T__24 = 25;
  public static readonly T__25 = 26;
  public static readonly T__26 = 27;
  public static readonly T__27 = 28;
  public static readonly T__28 = 29;
  public static readonly COMMA = 30;
  public static readonly DOT = 31;
  public static readonly ACTION_TYPE = 32;
  public static readonly OBJECT_TYPE = 33;
  public static readonly SCRIPT_TEXT = 34;
  public static readonly SIN = 35;
  public static readonly COS = 36;
  public static readonly TAN = 37;
  public static readonly COT = 38;
  public static readonly SQRT = 39;
  public static readonly ABS = 40;
  public static readonly CEIL = 41;
  public static readonly FLOOR = 42;
  public static readonly ROUND = 43;
  public static readonly YEAR = 44;
  public static readonly MONTH = 45;
  public static readonly DAY = 46;
  public static readonly DAYOFYEAR = 47;
  public static readonly DAYOFMONTH = 48;
  public static readonly DAYOFWEEK = 49;
  public static readonly WORKDAYS = 50;
  public static readonly LEAPYEAR = 51;
  public static readonly LENGTHOFMONTH = 52;
  public static readonly LENGTHOFYEAR = 53;
  public static readonly PLUSWEEKS = 54;
  public static readonly PLUSMONTHS = 55;
  public static readonly PLUSYEARS = 56;
  public static readonly MINUSWEEKS = 57;
  public static readonly MINUSMONTHS = 58;
  public static readonly MINUSYEARS = 59;
  public static readonly STRLEN = 60;
  public static readonly TRIM = 61;
  public static readonly SUBSTRING = 62;
  public static readonly FORMAT = 63;
  public static readonly STRTOINT = 64;
  public static readonly STRTOFLOAT = 65;
  public static readonly STRTODATE = 66;
  public static readonly STRCONCAT = 67;
  public static readonly STRSPLIT = 68;
  public static readonly STRCONTAIN = 69;
  public static readonly REGEXPMATCH = 70;
  public static readonly REGEXPREPLACE = 71;
  public static readonly FINDRECORD = 72;
  public static readonly FINDRECORDIF = 73;
  public static readonly ACCUMULATE = 74;
  public static readonly APPLY = 75;
  public static readonly MAX = 76;
  public static readonly MIN = 77;
  public static readonly SEGMENT_DISTANCE = 78;
  public static readonly TUPLEN = 79;
  public static readonly GET = 80;
  public static readonly TODAY = 81;
  public static readonly INCLUDE = 82;
  public static readonly EXCLUDE = 83;
  public static readonly SEQ = 84;
  public static readonly LPAREN = 85;
  public static readonly RPAREN = 86;
  public static readonly LFIGBR = 87;
  public static readonly RFIGBR = 88;
  public static readonly LSQBR = 89;
  public static readonly RSQBR = 90;
  public static readonly RANGE = 91;
  public static readonly NULLLITERAL = 92;
  public static readonly BOOLLITERAL = 93;
  public static readonly INTLITERAL = 94;
  public static readonly STRINGLITERAL = 95;
  public static readonly DOUBLELITERAL = 96;
  public static readonly AND = 97;
  public static readonly OR = 98;
  public static readonly NOT = 99;
  public static readonly EQ = 100;
  public static readonly NE = 101;
  public static readonly LT = 102;
  public static readonly GT = 103;
  public static readonly LE = 104;
  public static readonly GE = 105;
  public static readonly MATCH = 106;
  public static readonly IN = 107;
  public static readonly PLUS = 108;
  public static readonly MINUS = 109;
  public static readonly TIMES = 110;
  public static readonly DIVIDE = 111;
  public static readonly DIV = 112;
  public static readonly MOD = 113;
  public static readonly POW = 114;
  public static readonly COND = 115;
  public static readonly IDENTIFIER = 116;
  public static readonly WHITE_SPACE = 117;
  public static readonly COMMENT = 118;
  public static readonly LINE_COMMENT = 119;
  public static readonly RULE_compilationUnit = 0;
  public static readonly RULE_header = 1;
  public static readonly RULE_ruleDeclaration = 2;
  public static readonly RULE_sequence = 3;
  public static readonly RULE_filterDeclaration = 4;
  public static readonly RULE_property = 5;
  public static readonly RULE_filterExpression = 6;
  public static readonly RULE_transformationDeclaration = 7;
  public static readonly RULE_transformationStatement = 8;
  public static readonly RULE_script = 9;
  public static readonly RULE_conditionalActionDeclaration = 10;
  public static readonly RULE_actionDeclaration = 11;
  public static readonly RULE_setPropertyAction = 12;
  public static readonly RULE_removePropertyAction = 13;
  public static readonly RULE_setFieldValueAction = 14;
  public static readonly RULE_setScore = 15;
  public static readonly RULE_addMessageAction = 16;
  public static readonly RULE_setStartDateAction = 17;
  public static readonly RULE_setEndDateAction = 18;
  public static readonly RULE_setEffectiveDateAction = 19;
  public static readonly RULE_adjustCostAction = 20;
  public static readonly RULE_adjustPriceAction = 21;
  public static readonly RULE_adjustListPriceAction = 22;
  public static readonly RULE_setMetricAction = 23;
  public static readonly RULE_addApprovalDataAction = 24;
  public static readonly RULE_eligibilityCondition = 25;
  public static readonly RULE_eligibilityAll = 26;
  public static readonly RULE_eligibilityMessage = 27;
  public static readonly RULE_metricName = 28;
  public static readonly RULE_totalMetricName = 29;
  public static readonly RULE_transformationVariable = 30;
  public static readonly RULE_variableName = 31;
  public static readonly RULE_relatedConditionVariable = 32;
  public static readonly RULE_targetFieldName = 33;
  public static readonly RULE_explanation = 34;
  public static readonly RULE_value = 35;
  public static readonly RULE_allowOverride = 36;
  public static readonly RULE_expressionRoot = 37;
  public static readonly RULE_qualifiedIdentifier = 38;
  public static readonly RULE_expressionList = 39;
  public static readonly RULE_optionalExpression = 40;
  public static readonly RULE_expression = 41;
  public static readonly RULE_intConstant = 42;
  public static readonly RULE_doubleConstant = 43;
  public static readonly RULE_literalExpression = 44;
  public static readonly RULE_identifierExpression = 45;
  public static readonly RULE_functionExpression = 46;
  public static readonly RULE_tupleExpression = 47;
  public static readonly RULE_lambdaCapture = 48;
  public static readonly RULE_lambdaCaptureList = 49;
  public static readonly RULE_lambdaParam = 50;
  public static readonly RULE_lambdaParamList = 51;
  public static readonly RULE_lambdaBody = 52;
  public static readonly RULE_lambdaExpression = 53;
  public static readonly RULE_primaryExpression = 54;
  public static readonly RULE_functionName = 55;
  // tslint:disable:no-trailing-whitespace
  public static readonly ruleNames: string[] = [
    'compilationUnit',
    'header',
    'ruleDeclaration',
    'sequence',
    'filterDeclaration',
    'property',
    'filterExpression',
    'transformationDeclaration',
    'transformationStatement',
    'script',
    'conditionalActionDeclaration',
    'actionDeclaration',
    'setPropertyAction',
    'removePropertyAction',
    'setFieldValueAction',
    'setScore',
    'addMessageAction',
    'setStartDateAction',
    'setEndDateAction',
    'setEffectiveDateAction',
    'adjustCostAction',
    'adjustPriceAction',
    'adjustListPriceAction',
    'setMetricAction',
    'addApprovalDataAction',
    'eligibilityCondition',
    'eligibilityAll',
    'eligibilityMessage',
    'metricName',
    'totalMetricName',
    'transformationVariable',
    'variableName',
    'relatedConditionVariable',
    'targetFieldName',
    'explanation',
    'value',
    'allowOverride',
    'expressionRoot',
    'qualifiedIdentifier',
    'expressionList',
    'optionalExpression',
    'expression',
    'intConstant',
    'doubleConstant',
    'literalExpression',
    'identifierExpression',
    'functionExpression',
    'tupleExpression',
    'lambdaCapture',
    'lambdaCaptureList',
    'lambdaParam',
    'lambdaParamList',
    'lambdaBody',
    'lambdaExpression',
    'primaryExpression',
    'functionName',
  ];

  private static readonly _LITERAL_NAMES: Array<string | undefined> = [
    undefined,
    "'unit'",
    "';'",
    "'rule'",
    "'sequence'",
    "'condition'",
    "'transformation'",
    "'action'",
    "'end'",
    "'|'",
    "':'",
    "'from'",
    "'if'",
    "'then'",
    "'setProperty'",
    "'removeProperty'",
    "'setFieldValue'",
    "'setScore'",
    "'addMessage'",
    "'setStartDate'",
    "'setEndDate'",
    "'setEffectiveDate'",
    "'adjustCost'",
    "'adjustPrice'",
    "'adjustListPrice'",
    "'setMetric'",
    "'addApprovalData'",
    "'eligibilityCondition'",
    "'eligibilityAll'",
    "'eligibilityMessage'",
    "','",
    "'.'",
    undefined,
    undefined,
    undefined,
    "'sin'",
    "'cos'",
    "'tan'",
    "'cot'",
    "'sqrt'",
    "'abs'",
    "'ceil'",
    "'floor'",
    "'round'",
    "'year'",
    "'month'",
    "'epochday'",
    "'dayofyear'",
    "'dayofmonth'",
    "'dayofweek'",
    "'workdays'",
    "'leapyear'",
    "'lengthofmonth'",
    "'lengthofyear'",
    "'plusweeks'",
    "'plusmonths'",
    "'plusyears'",
    "'minusweeks'",
    "'minusmonths'",
    "'minusyears'",
    "'strlen'",
    "'trim'",
    "'substr'",
    "'strformat'",
    "'strtoint'",
    "'strtofloat'",
    "'strtodate'",
    "'strconcat'",
    "'strsplit'",
    "'strcontain'",
    "'regexpmatch'",
    "'regexpreplace'",
    "'findrecord'",
    "'findrecordif'",
    "'accumulate'",
    "'apply'",
    "'max'",
    "'min'",
    "'segment_distance'",
    "'tuplen'",
    "'get'",
    "'today'",
    "'include'",
    "'exclude'",
    "'='",
    "'('",
    "')'",
    "'{'",
    "'}'",
    "'['",
    "']'",
    "'..'",
    "'null'",
    undefined,
    undefined,
    undefined,
    undefined,
    "'&&'",
    "'||'",
    "'!'",
    "'=='",
    "'!='",
    "'<'",
    "'>'",
    "'<='",
    "'>='",
    "'=~'",
    "'in'",
    "'+'",
    "'-'",
    "'*'",
    "'/'",
    "'div'",
    undefined,
    "'^'",
    "'?'",
  ];
  private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    'COMMA',
    'DOT',
    'ACTION_TYPE',
    'OBJECT_TYPE',
    'SCRIPT_TEXT',
    'SIN',
    'COS',
    'TAN',
    'COT',
    'SQRT',
    'ABS',
    'CEIL',
    'FLOOR',
    'ROUND',
    'YEAR',
    'MONTH',
    'DAY',
    'DAYOFYEAR',
    'DAYOFMONTH',
    'DAYOFWEEK',
    'WORKDAYS',
    'LEAPYEAR',
    'LENGTHOFMONTH',
    'LENGTHOFYEAR',
    'PLUSWEEKS',
    'PLUSMONTHS',
    'PLUSYEARS',
    'MINUSWEEKS',
    'MINUSMONTHS',
    'MINUSYEARS',
    'STRLEN',
    'TRIM',
    'SUBSTRING',
    'FORMAT',
    'STRTOINT',
    'STRTOFLOAT',
    'STRTODATE',
    'STRCONCAT',
    'STRSPLIT',
    'STRCONTAIN',
    'REGEXPMATCH',
    'REGEXPREPLACE',
    'FINDRECORD',
    'FINDRECORDIF',
    'ACCUMULATE',
    'APPLY',
    'MAX',
    'MIN',
    'SEGMENT_DISTANCE',
    'TUPLEN',
    'GET',
    'TODAY',
    'INCLUDE',
    'EXCLUDE',
    'SEQ',
    'LPAREN',
    'RPAREN',
    'LFIGBR',
    'RFIGBR',
    'LSQBR',
    'RSQBR',
    'RANGE',
    'NULLLITERAL',
    'BOOLLITERAL',
    'INTLITERAL',
    'STRINGLITERAL',
    'DOUBLELITERAL',
    'AND',
    'OR',
    'NOT',
    'EQ',
    'NE',
    'LT',
    'GT',
    'LE',
    'GE',
    'MATCH',
    'IN',
    'PLUS',
    'MINUS',
    'TIMES',
    'DIVIDE',
    'DIV',
    'MOD',
    'POW',
    'COND',
    'IDENTIFIER',
    'WHITE_SPACE',
    'COMMENT',
    'LINE_COMMENT',
  ];
  public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(
    RulesParser._LITERAL_NAMES,
    RulesParser._SYMBOLIC_NAMES,
    [],
  );

  // @Override
  // @NotNull
  public get vocabulary(): Vocabulary {
    return RulesParser.VOCABULARY;
  }
  // tslint:enable:no-trailing-whitespace

  // @Override
  public get grammarFileName(): string {
    return 'Rules.g4';
  }

  // @Override
  public get ruleNames(): string[] {
    return RulesParser.ruleNames;
  }

  // @Override
  public get serializedATN(): string {
    return RulesParser._serializedATN;
  }

  protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
    return new FailedPredicateException(this, predicate, message);
  }

  constructor(input: TokenStream) {
    super(input);
    this._interp = new ParserATNSimulator(RulesParser._ATN, this);
  }
  // @RuleVersion(0)
  public compilationUnit(): CompilationUnitContext {
    let _localctx: CompilationUnitContext = new CompilationUnitContext(this._ctx, this.state);
    this.enterRule(_localctx, 0, RulesParser.RULE_compilationUnit);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 113;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === RulesParser.T__0) {
          {
            this.state = 112;
            this.header();
          }
        }

        this.state = 118;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === RulesParser.T__2) {
          {
            {
              this.state = 115;
              this.ruleDeclaration();
            }
          }
          this.state = 120;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
        this.state = 121;
        this.match(RulesParser.EOF);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public header(): HeaderContext {
    let _localctx: HeaderContext = new HeaderContext(this._ctx, this.state);
    this.enterRule(_localctx, 2, RulesParser.RULE_header);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 123;
        this.match(RulesParser.T__0);
        this.state = 124;
        this.match(RulesParser.IDENTIFIER);
        this.state = 125;
        this.match(RulesParser.T__1);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public ruleDeclaration(): RuleDeclarationContext {
    let _localctx: RuleDeclarationContext = new RuleDeclarationContext(this._ctx, this.state);
    this.enterRule(_localctx, 4, RulesParser.RULE_ruleDeclaration);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 127;
        this.match(RulesParser.T__2);
        this.state = 128;
        this.match(RulesParser.STRINGLITERAL);
        this.state = 129;
        this.match(RulesParser.T__3);
        this.state = 130;
        this.sequence();
        this.state = 137;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === RulesParser.T__4) {
          {
            this.state = 131;
            this.match(RulesParser.T__4);
            this.state = 133;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            do {
              {
                {
                  this.state = 132;
                  this.filterDeclaration();
                }
              }
              this.state = 135;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
            } while (_la === RulesParser.IDENTIFIER);
          }
        }

        this.state = 145;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === RulesParser.T__5) {
          {
            this.state = 139;
            this.match(RulesParser.T__5);
            this.state = 141;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            do {
              {
                {
                  this.state = 140;
                  this.transformationDeclaration();
                }
              }
              this.state = 143;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
            } while (_la === RulesParser.IDENTIFIER);
          }
        }

        this.state = 153;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === RulesParser.T__6) {
          {
            this.state = 147;
            this.match(RulesParser.T__6);
            this.state = 149;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            do {
              {
                {
                  this.state = 148;
                  this.conditionalActionDeclaration();
                }
              }
              this.state = 151;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
            } while (_la === RulesParser.T__11 || _la === RulesParser.IDENTIFIER);
          }
        }

        this.state = 155;
        this.match(RulesParser.T__7);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public sequence(): SequenceContext {
    let _localctx: SequenceContext = new SequenceContext(this._ctx, this.state);
    this.enterRule(_localctx, 6, RulesParser.RULE_sequence);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 157;
        this.match(RulesParser.INTLITERAL);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public filterDeclaration(): FilterDeclarationContext {
    let _localctx: FilterDeclarationContext = new FilterDeclarationContext(this._ctx, this.state);
    this.enterRule(_localctx, 8, RulesParser.RULE_filterDeclaration);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 159;
        this.variableName();
        this.state = 162;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === RulesParser.T__8) {
          {
            this.state = 160;
            this.match(RulesParser.T__8);
            this.state = 161;
            this.property();
          }
        }

        this.state = 164;
        this.match(RulesParser.T__9);
        this.state = 165;
        this.filterExpression();
        this.state = 168;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === RulesParser.T__10) {
          {
            this.state = 166;
            this.match(RulesParser.T__10);
            this.state = 167;
            this.relatedConditionVariable();
          }
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public property(): PropertyContext {
    let _localctx: PropertyContext = new PropertyContext(this._ctx, this.state);
    this.enterRule(_localctx, 10, RulesParser.RULE_property);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 170;
        this.match(RulesParser.IDENTIFIER);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public filterExpression(): FilterExpressionContext {
    let _localctx: FilterExpressionContext = new FilterExpressionContext(this._ctx, this.state);
    this.enterRule(_localctx, 12, RulesParser.RULE_filterExpression);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 172;
        this.match(RulesParser.OBJECT_TYPE);
        this.state = 173;
        this.match(RulesParser.LPAREN);
        this.state = 175;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (
          (((_la - 35) & ~0x1f) === 0 &&
            ((1 << (_la - 35)) &
              ((1 << (RulesParser.SIN - 35)) |
                (1 << (RulesParser.COS - 35)) |
                (1 << (RulesParser.TAN - 35)) |
                (1 << (RulesParser.COT - 35)) |
                (1 << (RulesParser.SQRT - 35)) |
                (1 << (RulesParser.ABS - 35)) |
                (1 << (RulesParser.CEIL - 35)) |
                (1 << (RulesParser.FLOOR - 35)) |
                (1 << (RulesParser.ROUND - 35)) |
                (1 << (RulesParser.YEAR - 35)) |
                (1 << (RulesParser.MONTH - 35)) |
                (1 << (RulesParser.DAY - 35)) |
                (1 << (RulesParser.DAYOFYEAR - 35)) |
                (1 << (RulesParser.DAYOFMONTH - 35)) |
                (1 << (RulesParser.DAYOFWEEK - 35)) |
                (1 << (RulesParser.WORKDAYS - 35)) |
                (1 << (RulesParser.LEAPYEAR - 35)) |
                (1 << (RulesParser.LENGTHOFMONTH - 35)) |
                (1 << (RulesParser.LENGTHOFYEAR - 35)) |
                (1 << (RulesParser.PLUSWEEKS - 35)) |
                (1 << (RulesParser.PLUSMONTHS - 35)) |
                (1 << (RulesParser.PLUSYEARS - 35)) |
                (1 << (RulesParser.MINUSWEEKS - 35)) |
                (1 << (RulesParser.MINUSMONTHS - 35)) |
                (1 << (RulesParser.MINUSYEARS - 35)) |
                (1 << (RulesParser.STRLEN - 35)) |
                (1 << (RulesParser.TRIM - 35)) |
                (1 << (RulesParser.SUBSTRING - 35)) |
                (1 << (RulesParser.FORMAT - 35)) |
                (1 << (RulesParser.STRTOINT - 35)) |
                (1 << (RulesParser.STRTOFLOAT - 35)) |
                (1 << (RulesParser.STRTODATE - 35)))) !==
              0) ||
          (((_la - 67) & ~0x1f) === 0 &&
            ((1 << (_la - 67)) &
              ((1 << (RulesParser.STRCONCAT - 67)) |
                (1 << (RulesParser.STRSPLIT - 67)) |
                (1 << (RulesParser.STRCONTAIN - 67)) |
                (1 << (RulesParser.REGEXPMATCH - 67)) |
                (1 << (RulesParser.REGEXPREPLACE - 67)) |
                (1 << (RulesParser.FINDRECORD - 67)) |
                (1 << (RulesParser.FINDRECORDIF - 67)) |
                (1 << (RulesParser.ACCUMULATE - 67)) |
                (1 << (RulesParser.APPLY - 67)) |
                (1 << (RulesParser.MAX - 67)) |
                (1 << (RulesParser.MIN - 67)) |
                (1 << (RulesParser.SEGMENT_DISTANCE - 67)) |
                (1 << (RulesParser.TUPLEN - 67)) |
                (1 << (RulesParser.GET - 67)) |
                (1 << (RulesParser.TODAY - 67)) |
                (1 << (RulesParser.LPAREN - 67)) |
                (1 << (RulesParser.LFIGBR - 67)) |
                (1 << (RulesParser.LSQBR - 67)) |
                (1 << (RulesParser.NULLLITERAL - 67)) |
                (1 << (RulesParser.BOOLLITERAL - 67)) |
                (1 << (RulesParser.INTLITERAL - 67)) |
                (1 << (RulesParser.STRINGLITERAL - 67)) |
                (1 << (RulesParser.DOUBLELITERAL - 67)))) !==
              0) ||
          (((_la - 99) & ~0x1f) === 0 &&
            ((1 << (_la - 99)) &
              ((1 << (RulesParser.NOT - 99)) |
                (1 << (RulesParser.PLUS - 99)) |
                (1 << (RulesParser.MINUS - 99)) |
                (1 << (RulesParser.IDENTIFIER - 99)))) !==
              0)
        ) {
          {
            this.state = 174;
            this.expression(0);
          }
        }

        this.state = 177;
        this.match(RulesParser.RPAREN);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public transformationDeclaration(): TransformationDeclarationContext {
    let _localctx: TransformationDeclarationContext = new TransformationDeclarationContext(this._ctx, this.state);
    this.enterRule(_localctx, 14, RulesParser.RULE_transformationDeclaration);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 179;
        this.match(RulesParser.IDENTIFIER);
        this.state = 180;
        this.match(RulesParser.T__9);
        this.state = 181;
        this.transformationStatement();
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public transformationStatement(): TransformationStatementContext {
    let _localctx: TransformationStatementContext = new TransformationStatementContext(this._ctx, this.state);
    this.enterRule(_localctx, 16, RulesParser.RULE_transformationStatement);
    try {
      this.state = 185;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case RulesParser.SIN:
        case RulesParser.COS:
        case RulesParser.TAN:
        case RulesParser.COT:
        case RulesParser.SQRT:
        case RulesParser.ABS:
        case RulesParser.CEIL:
        case RulesParser.FLOOR:
        case RulesParser.ROUND:
        case RulesParser.YEAR:
        case RulesParser.MONTH:
        case RulesParser.DAY:
        case RulesParser.DAYOFYEAR:
        case RulesParser.DAYOFMONTH:
        case RulesParser.DAYOFWEEK:
        case RulesParser.WORKDAYS:
        case RulesParser.LEAPYEAR:
        case RulesParser.LENGTHOFMONTH:
        case RulesParser.LENGTHOFYEAR:
        case RulesParser.PLUSWEEKS:
        case RulesParser.PLUSMONTHS:
        case RulesParser.PLUSYEARS:
        case RulesParser.MINUSWEEKS:
        case RulesParser.MINUSMONTHS:
        case RulesParser.MINUSYEARS:
        case RulesParser.STRLEN:
        case RulesParser.TRIM:
        case RulesParser.SUBSTRING:
        case RulesParser.FORMAT:
        case RulesParser.STRTOINT:
        case RulesParser.STRTOFLOAT:
        case RulesParser.STRTODATE:
        case RulesParser.STRCONCAT:
        case RulesParser.STRSPLIT:
        case RulesParser.STRCONTAIN:
        case RulesParser.REGEXPMATCH:
        case RulesParser.REGEXPREPLACE:
        case RulesParser.FINDRECORD:
        case RulesParser.FINDRECORDIF:
        case RulesParser.ACCUMULATE:
        case RulesParser.APPLY:
        case RulesParser.MAX:
        case RulesParser.MIN:
        case RulesParser.SEGMENT_DISTANCE:
        case RulesParser.TUPLEN:
        case RulesParser.GET:
        case RulesParser.TODAY:
        case RulesParser.LPAREN:
        case RulesParser.LFIGBR:
        case RulesParser.LSQBR:
        case RulesParser.NULLLITERAL:
        case RulesParser.BOOLLITERAL:
        case RulesParser.INTLITERAL:
        case RulesParser.STRINGLITERAL:
        case RulesParser.DOUBLELITERAL:
        case RulesParser.NOT:
        case RulesParser.PLUS:
        case RulesParser.MINUS:
        case RulesParser.IDENTIFIER:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 183;
            this.expression(0);
          }
          break;
        case RulesParser.SCRIPT_TEXT:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 184;
            this.script();
          }
          break;
        default:
          throw new NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public script(): ScriptContext {
    let _localctx: ScriptContext = new ScriptContext(this._ctx, this.state);
    this.enterRule(_localctx, 18, RulesParser.RULE_script);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 187;
        this.match(RulesParser.SCRIPT_TEXT);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public conditionalActionDeclaration(): ConditionalActionDeclarationContext {
    let _localctx: ConditionalActionDeclarationContext = new ConditionalActionDeclarationContext(this._ctx, this.state);
    this.enterRule(_localctx, 20, RulesParser.RULE_conditionalActionDeclaration);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 195;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === RulesParser.T__11) {
          {
            this.state = 189;
            this.match(RulesParser.T__11);
            this.state = 190;
            this.match(RulesParser.LPAREN);
            this.state = 191;
            this.expression(0);
            this.state = 192;
            this.match(RulesParser.RPAREN);
            this.state = 193;
            this.match(RulesParser.T__12);
          }
        }

        this.state = 197;
        this.actionDeclaration();
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public actionDeclaration(): ActionDeclarationContext {
    let _localctx: ActionDeclarationContext = new ActionDeclarationContext(this._ctx, this.state);
    this.enterRule(_localctx, 22, RulesParser.RULE_actionDeclaration);
    try {
      this.state = 215;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 13, this._ctx)) {
        case 1:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 199;
            this.removePropertyAction();
          }
          break;

        case 2:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 200;
            this.setPropertyAction();
          }
          break;

        case 3:
          this.enterOuterAlt(_localctx, 3);
          {
            this.state = 201;
            this.setFieldValueAction();
          }
          break;

        case 4:
          this.enterOuterAlt(_localctx, 4);
          {
            this.state = 202;
            this.addMessageAction();
          }
          break;

        case 5:
          this.enterOuterAlt(_localctx, 5);
          {
            this.state = 203;
            this.addApprovalDataAction();
          }
          break;

        case 6:
          this.enterOuterAlt(_localctx, 6);
          {
            this.state = 204;
            this.setStartDateAction();
          }
          break;

        case 7:
          this.enterOuterAlt(_localctx, 7);
          {
            this.state = 205;
            this.setEndDateAction();
          }
          break;

        case 8:
          this.enterOuterAlt(_localctx, 8);
          {
            this.state = 206;
            this.setEffectiveDateAction();
          }
          break;

        case 9:
          this.enterOuterAlt(_localctx, 9);
          {
            this.state = 207;
            this.adjustCostAction();
          }
          break;

        case 10:
          this.enterOuterAlt(_localctx, 10);
          {
            this.state = 208;
            this.adjustPriceAction();
          }
          break;

        case 11:
          this.enterOuterAlt(_localctx, 11);
          {
            this.state = 209;
            this.adjustListPriceAction();
          }
          break;

        case 12:
          this.enterOuterAlt(_localctx, 12);
          {
            this.state = 210;
            this.setMetricAction();
          }
          break;

        case 13:
          this.enterOuterAlt(_localctx, 13);
          {
            this.state = 211;
            this.setScore();
          }
          break;

        case 14:
          this.enterOuterAlt(_localctx, 14);
          {
            this.state = 212;
            this.eligibilityCondition();
          }
          break;

        case 15:
          this.enterOuterAlt(_localctx, 15);
          {
            this.state = 213;
            this.eligibilityAll();
          }
          break;

        case 16:
          this.enterOuterAlt(_localctx, 16);
          {
            this.state = 214;
            this.eligibilityMessage();
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public setPropertyAction(): SetPropertyActionContext {
    let _localctx: SetPropertyActionContext = new SetPropertyActionContext(this._ctx, this.state);
    this.enterRule(_localctx, 24, RulesParser.RULE_setPropertyAction);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 217;
        this.variableName();
        this.state = 218;
        this.match(RulesParser.DOT);
        this.state = 219;
        this.match(RulesParser.T__13);
        this.state = 220;
        this.match(RulesParser.LPAREN);
        this.state = 221;
        this.targetFieldName();
        this.state = 222;
        this.match(RulesParser.COMMA);
        this.state = 223;
        this.value();
        this.state = 224;
        this.match(RulesParser.RPAREN);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public removePropertyAction(): RemovePropertyActionContext {
    let _localctx: RemovePropertyActionContext = new RemovePropertyActionContext(this._ctx, this.state);
    this.enterRule(_localctx, 26, RulesParser.RULE_removePropertyAction);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 226;
        this.variableName();
        this.state = 227;
        this.match(RulesParser.DOT);
        this.state = 228;
        this.match(RulesParser.T__14);
        this.state = 229;
        this.match(RulesParser.LPAREN);
        this.state = 230;
        this.targetFieldName();
        this.state = 231;
        this.match(RulesParser.RPAREN);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public setFieldValueAction(): SetFieldValueActionContext {
    let _localctx: SetFieldValueActionContext = new SetFieldValueActionContext(this._ctx, this.state);
    this.enterRule(_localctx, 28, RulesParser.RULE_setFieldValueAction);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 233;
        this.variableName();
        this.state = 234;
        this.match(RulesParser.DOT);
        this.state = 235;
        this.match(RulesParser.T__15);
        this.state = 236;
        this.match(RulesParser.LPAREN);
        this.state = 237;
        this.targetFieldName();
        this.state = 238;
        this.match(RulesParser.COMMA);
        this.state = 239;
        this.value();
        this.state = 240;
        this.match(RulesParser.RPAREN);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public setScore(): SetScoreContext {
    let _localctx: SetScoreContext = new SetScoreContext(this._ctx, this.state);
    this.enterRule(_localctx, 30, RulesParser.RULE_setScore);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 242;
        this.variableName();
        this.state = 243;
        this.match(RulesParser.DOT);
        this.state = 244;
        this.match(RulesParser.T__16);
        this.state = 245;
        this.match(RulesParser.LPAREN);
        this.state = 246;
        this.value();
        this.state = 247;
        this.match(RulesParser.RPAREN);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public addMessageAction(): AddMessageActionContext {
    let _localctx: AddMessageActionContext = new AddMessageActionContext(this._ctx, this.state);
    this.enterRule(_localctx, 32, RulesParser.RULE_addMessageAction);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 249;
        this.variableName();
        this.state = 250;
        this.match(RulesParser.DOT);
        this.state = 251;
        this.match(RulesParser.T__17);
        this.state = 252;
        this.match(RulesParser.LPAREN);
        this.state = 253;
        this.value();
        this.state = 254;
        this.match(RulesParser.RPAREN);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public setStartDateAction(): SetStartDateActionContext {
    let _localctx: SetStartDateActionContext = new SetStartDateActionContext(this._ctx, this.state);
    this.enterRule(_localctx, 34, RulesParser.RULE_setStartDateAction);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 256;
        this.variableName();
        this.state = 257;
        this.match(RulesParser.DOT);
        this.state = 258;
        this.match(RulesParser.T__18);
        this.state = 259;
        this.match(RulesParser.LPAREN);
        this.state = 260;
        this.transformationVariable();
        this.state = 261;
        this.match(RulesParser.RPAREN);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public setEndDateAction(): SetEndDateActionContext {
    let _localctx: SetEndDateActionContext = new SetEndDateActionContext(this._ctx, this.state);
    this.enterRule(_localctx, 36, RulesParser.RULE_setEndDateAction);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 263;
        this.variableName();
        this.state = 264;
        this.match(RulesParser.DOT);
        this.state = 265;
        this.match(RulesParser.T__19);
        this.state = 266;
        this.match(RulesParser.LPAREN);
        this.state = 267;
        this.transformationVariable();
        this.state = 268;
        this.match(RulesParser.RPAREN);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public setEffectiveDateAction(): SetEffectiveDateActionContext {
    let _localctx: SetEffectiveDateActionContext = new SetEffectiveDateActionContext(this._ctx, this.state);
    this.enterRule(_localctx, 38, RulesParser.RULE_setEffectiveDateAction);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 270;
        this.variableName();
        this.state = 271;
        this.match(RulesParser.DOT);
        this.state = 272;
        this.match(RulesParser.T__20);
        this.state = 273;
        this.match(RulesParser.LPAREN);
        this.state = 274;
        this.transformationVariable();
        this.state = 275;
        this.match(RulesParser.RPAREN);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public adjustCostAction(): AdjustCostActionContext {
    let _localctx: AdjustCostActionContext = new AdjustCostActionContext(this._ctx, this.state);
    this.enterRule(_localctx, 40, RulesParser.RULE_adjustCostAction);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 277;
        this.variableName();
        this.state = 278;
        this.match(RulesParser.DOT);
        this.state = 279;
        this.match(RulesParser.T__21);
        this.state = 280;
        this.match(RulesParser.LPAREN);
        this.state = 281;
        this.match(RulesParser.ACTION_TYPE);
        this.state = 282;
        this.match(RulesParser.COMMA);
        this.state = 283;
        this.value();
        this.state = 286;
        this._errHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this._input, 14, this._ctx)) {
          case 1:
            {
              this.state = 284;
              this.match(RulesParser.COMMA);
              this.state = 285;
              this.explanation();
            }
            break;
        }
        this.state = 290;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === RulesParser.COMMA) {
          {
            this.state = 288;
            this.match(RulesParser.COMMA);
            this.state = 289;
            this.allowOverride();
          }
        }

        this.state = 292;
        this.match(RulesParser.RPAREN);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public adjustPriceAction(): AdjustPriceActionContext {
    let _localctx: AdjustPriceActionContext = new AdjustPriceActionContext(this._ctx, this.state);
    this.enterRule(_localctx, 42, RulesParser.RULE_adjustPriceAction);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 294;
        this.variableName();
        this.state = 295;
        this.match(RulesParser.DOT);
        this.state = 296;
        this.match(RulesParser.T__22);
        this.state = 297;
        this.match(RulesParser.LPAREN);
        this.state = 298;
        this.match(RulesParser.ACTION_TYPE);
        this.state = 299;
        this.match(RulesParser.COMMA);
        this.state = 300;
        this.value();
        this.state = 303;
        this._errHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this._input, 16, this._ctx)) {
          case 1:
            {
              this.state = 301;
              this.match(RulesParser.COMMA);
              this.state = 302;
              this.explanation();
            }
            break;
        }
        this.state = 307;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === RulesParser.COMMA) {
          {
            this.state = 305;
            this.match(RulesParser.COMMA);
            this.state = 306;
            this.allowOverride();
          }
        }

        this.state = 309;
        this.match(RulesParser.RPAREN);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public adjustListPriceAction(): AdjustListPriceActionContext {
    let _localctx: AdjustListPriceActionContext = new AdjustListPriceActionContext(this._ctx, this.state);
    this.enterRule(_localctx, 44, RulesParser.RULE_adjustListPriceAction);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 311;
        this.variableName();
        this.state = 312;
        this.match(RulesParser.DOT);
        this.state = 313;
        this.match(RulesParser.T__23);
        this.state = 314;
        this.match(RulesParser.LPAREN);
        this.state = 315;
        this.match(RulesParser.ACTION_TYPE);
        this.state = 316;
        this.match(RulesParser.COMMA);
        this.state = 317;
        this.value();
        this.state = 320;
        this._errHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this._input, 18, this._ctx)) {
          case 1:
            {
              this.state = 318;
              this.match(RulesParser.COMMA);
              this.state = 319;
              this.explanation();
            }
            break;
        }
        this.state = 324;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === RulesParser.COMMA) {
          {
            this.state = 322;
            this.match(RulesParser.COMMA);
            this.state = 323;
            this.allowOverride();
          }
        }

        this.state = 326;
        this.match(RulesParser.RPAREN);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public setMetricAction(): SetMetricActionContext {
    let _localctx: SetMetricActionContext = new SetMetricActionContext(this._ctx, this.state);
    this.enterRule(_localctx, 46, RulesParser.RULE_setMetricAction);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 328;
        this.variableName();
        this.state = 329;
        this.match(RulesParser.DOT);
        this.state = 330;
        this.match(RulesParser.T__24);
        this.state = 331;
        this.match(RulesParser.LPAREN);
        this.state = 332;
        this.metricName();
        this.state = 333;
        this.match(RulesParser.COMMA);
        this.state = 334;
        this.transformationVariable();
        this.state = 337;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === RulesParser.COMMA) {
          {
            this.state = 335;
            this.match(RulesParser.COMMA);
            this.state = 336;
            this.totalMetricName();
          }
        }

        this.state = 339;
        this.match(RulesParser.RPAREN);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public addApprovalDataAction(): AddApprovalDataActionContext {
    let _localctx: AddApprovalDataActionContext = new AddApprovalDataActionContext(this._ctx, this.state);
    this.enterRule(_localctx, 48, RulesParser.RULE_addApprovalDataAction);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 341;
        this.variableName();
        this.state = 342;
        this.match(RulesParser.DOT);
        this.state = 343;
        this.match(RulesParser.T__25);
        this.state = 344;
        this.match(RulesParser.LPAREN);
        this.state = 345;
        this.value();
        this.state = 348;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === RulesParser.COMMA) {
          {
            this.state = 346;
            this.match(RulesParser.COMMA);
            this.state = 347;
            this.value();
          }
        }

        this.state = 350;
        this.match(RulesParser.RPAREN);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public eligibilityCondition(): EligibilityConditionContext {
    let _localctx: EligibilityConditionContext = new EligibilityConditionContext(this._ctx, this.state);
    this.enterRule(_localctx, 50, RulesParser.RULE_eligibilityCondition);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 352;
        this.variableName();
        this.state = 353;
        this.match(RulesParser.DOT);
        this.state = 354;
        this.match(RulesParser.T__26);
        this.state = 355;
        this.match(RulesParser.LPAREN);
        this.state = 356;
        this.value();
        this.state = 357;
        this.match(RulesParser.RPAREN);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public eligibilityAll(): EligibilityAllContext {
    let _localctx: EligibilityAllContext = new EligibilityAllContext(this._ctx, this.state);
    this.enterRule(_localctx, 52, RulesParser.RULE_eligibilityAll);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 359;
        this.variableName();
        this.state = 360;
        this.match(RulesParser.DOT);
        this.state = 361;
        this.match(RulesParser.T__27);
        this.state = 362;
        this.match(RulesParser.LPAREN);
        this.state = 363;
        this.value();
        this.state = 364;
        this.match(RulesParser.COMMA);
        this.state = 365;
        this.value();
        this.state = 366;
        this.match(RulesParser.COMMA);
        this.state = 367;
        this.value();
        this.state = 368;
        this.match(RulesParser.RPAREN);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public eligibilityMessage(): EligibilityMessageContext {
    let _localctx: EligibilityMessageContext = new EligibilityMessageContext(this._ctx, this.state);
    this.enterRule(_localctx, 54, RulesParser.RULE_eligibilityMessage);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 370;
        this.variableName();
        this.state = 371;
        this.match(RulesParser.DOT);
        this.state = 372;
        this.match(RulesParser.T__28);
        this.state = 373;
        this.match(RulesParser.LPAREN);
        this.state = 374;
        this.value();
        this.state = 375;
        this.match(RulesParser.COMMA);
        this.state = 376;
        this.value();
        this.state = 377;
        this.match(RulesParser.COMMA);
        this.state = 378;
        this.value();
        this.state = 379;
        this.match(RulesParser.RPAREN);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public metricName(): MetricNameContext {
    let _localctx: MetricNameContext = new MetricNameContext(this._ctx, this.state);
    this.enterRule(_localctx, 56, RulesParser.RULE_metricName);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 381;
        this.match(RulesParser.IDENTIFIER);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public totalMetricName(): TotalMetricNameContext {
    let _localctx: TotalMetricNameContext = new TotalMetricNameContext(this._ctx, this.state);
    this.enterRule(_localctx, 58, RulesParser.RULE_totalMetricName);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 383;
        this.match(RulesParser.IDENTIFIER);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public transformationVariable(): TransformationVariableContext {
    let _localctx: TransformationVariableContext = new TransformationVariableContext(this._ctx, this.state);
    this.enterRule(_localctx, 60, RulesParser.RULE_transformationVariable);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 385;
        this.match(RulesParser.IDENTIFIER);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public variableName(): VariableNameContext {
    let _localctx: VariableNameContext = new VariableNameContext(this._ctx, this.state);
    this.enterRule(_localctx, 62, RulesParser.RULE_variableName);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 387;
        this.match(RulesParser.IDENTIFIER);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public relatedConditionVariable(): RelatedConditionVariableContext {
    let _localctx: RelatedConditionVariableContext = new RelatedConditionVariableContext(this._ctx, this.state);
    this.enterRule(_localctx, 64, RulesParser.RULE_relatedConditionVariable);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 389;
        this.match(RulesParser.IDENTIFIER);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public targetFieldName(): TargetFieldNameContext {
    let _localctx: TargetFieldNameContext = new TargetFieldNameContext(this._ctx, this.state);
    this.enterRule(_localctx, 66, RulesParser.RULE_targetFieldName);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 391;
        this.match(RulesParser.IDENTIFIER);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public explanation(): ExplanationContext {
    let _localctx: ExplanationContext = new ExplanationContext(this._ctx, this.state);
    this.enterRule(_localctx, 68, RulesParser.RULE_explanation);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 393;
        this.match(RulesParser.STRINGLITERAL);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public value(): ValueContext {
    let _localctx: ValueContext = new ValueContext(this._ctx, this.state);
    this.enterRule(_localctx, 70, RulesParser.RULE_value);
    try {
      this.state = 397;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case RulesParser.NULLLITERAL:
        case RulesParser.BOOLLITERAL:
        case RulesParser.INTLITERAL:
        case RulesParser.STRINGLITERAL:
        case RulesParser.DOUBLELITERAL:
        case RulesParser.PLUS:
        case RulesParser.MINUS:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 395;
            this.literalExpression();
          }
          break;
        case RulesParser.IDENTIFIER:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 396;
            this.transformationVariable();
          }
          break;
        default:
          throw new NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public allowOverride(): AllowOverrideContext {
    let _localctx: AllowOverrideContext = new AllowOverrideContext(this._ctx, this.state);
    this.enterRule(_localctx, 72, RulesParser.RULE_allowOverride);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 399;
        this.match(RulesParser.BOOLLITERAL);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public expressionRoot(): ExpressionRootContext {
    let _localctx: ExpressionRootContext = new ExpressionRootContext(this._ctx, this.state);
    this.enterRule(_localctx, 74, RulesParser.RULE_expressionRoot);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 401;
        this.expression(0);
        this.state = 402;
        this.match(RulesParser.EOF);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public qualifiedIdentifier(): QualifiedIdentifierContext {
    let _localctx: QualifiedIdentifierContext = new QualifiedIdentifierContext(this._ctx, this.state);
    this.enterRule(_localctx, 76, RulesParser.RULE_qualifiedIdentifier);
    try {
      let _alt: number;
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 404;
        this.match(RulesParser.IDENTIFIER);
        this.state = 409;
        this._errHandler.sync(this);
        _alt = this.interpreter.adaptivePredict(this._input, 23, this._ctx);
        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            {
              {
                this.state = 405;
                this.match(RulesParser.DOT);
                this.state = 406;
                this.match(RulesParser.IDENTIFIER);
              }
            }
          }
          this.state = 411;
          this._errHandler.sync(this);
          _alt = this.interpreter.adaptivePredict(this._input, 23, this._ctx);
        }
        this.state = 415;
        this._errHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this._input, 24, this._ctx)) {
          case 1:
            {
              this.state = 412;
              this.match(RulesParser.LSQBR);
              this.state = 413;
              this.match(RulesParser.STRINGLITERAL);
              this.state = 414;
              this.match(RulesParser.RSQBR);
            }
            break;
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public expressionList(): ExpressionListContext {
    let _localctx: ExpressionListContext = new ExpressionListContext(this._ctx, this.state);
    this.enterRule(_localctx, 78, RulesParser.RULE_expressionList);
    let _la: number;
    try {
      this.state = 426;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case RulesParser.RPAREN:
        case RulesParser.RFIGBR:
          this.enterOuterAlt(_localctx, 1);
          // tslint:disable-next-line:no-empty
          {
          }
          break;
        case RulesParser.SIN:
        case RulesParser.COS:
        case RulesParser.TAN:
        case RulesParser.COT:
        case RulesParser.SQRT:
        case RulesParser.ABS:
        case RulesParser.CEIL:
        case RulesParser.FLOOR:
        case RulesParser.ROUND:
        case RulesParser.YEAR:
        case RulesParser.MONTH:
        case RulesParser.DAY:
        case RulesParser.DAYOFYEAR:
        case RulesParser.DAYOFMONTH:
        case RulesParser.DAYOFWEEK:
        case RulesParser.WORKDAYS:
        case RulesParser.LEAPYEAR:
        case RulesParser.LENGTHOFMONTH:
        case RulesParser.LENGTHOFYEAR:
        case RulesParser.PLUSWEEKS:
        case RulesParser.PLUSMONTHS:
        case RulesParser.PLUSYEARS:
        case RulesParser.MINUSWEEKS:
        case RulesParser.MINUSMONTHS:
        case RulesParser.MINUSYEARS:
        case RulesParser.STRLEN:
        case RulesParser.TRIM:
        case RulesParser.SUBSTRING:
        case RulesParser.FORMAT:
        case RulesParser.STRTOINT:
        case RulesParser.STRTOFLOAT:
        case RulesParser.STRTODATE:
        case RulesParser.STRCONCAT:
        case RulesParser.STRSPLIT:
        case RulesParser.STRCONTAIN:
        case RulesParser.REGEXPMATCH:
        case RulesParser.REGEXPREPLACE:
        case RulesParser.FINDRECORD:
        case RulesParser.FINDRECORDIF:
        case RulesParser.ACCUMULATE:
        case RulesParser.APPLY:
        case RulesParser.MAX:
        case RulesParser.MIN:
        case RulesParser.SEGMENT_DISTANCE:
        case RulesParser.TUPLEN:
        case RulesParser.GET:
        case RulesParser.TODAY:
        case RulesParser.LPAREN:
        case RulesParser.LFIGBR:
        case RulesParser.LSQBR:
        case RulesParser.NULLLITERAL:
        case RulesParser.BOOLLITERAL:
        case RulesParser.INTLITERAL:
        case RulesParser.STRINGLITERAL:
        case RulesParser.DOUBLELITERAL:
        case RulesParser.NOT:
        case RulesParser.PLUS:
        case RulesParser.MINUS:
        case RulesParser.IDENTIFIER:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 418;
            this.expression(0);
            this.state = 423;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while (_la === RulesParser.COMMA) {
              {
                {
                  this.state = 419;
                  this.match(RulesParser.COMMA);
                  this.state = 420;
                  this.expression(0);
                }
              }
              this.state = 425;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
            }
          }
          break;
        default:
          throw new NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public optionalExpression(): OptionalExpressionContext {
    let _localctx: OptionalExpressionContext = new OptionalExpressionContext(this._ctx, this.state);
    this.enterRule(_localctx, 80, RulesParser.RULE_optionalExpression);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 428;
        this.expression(0);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }

  public expression(): ExpressionContext;
  public expression(_p: number): ExpressionContext;
  // @RuleVersion(0)
  public expression(_p?: number): ExpressionContext {
    if (_p === undefined) {
      _p = 0;
    }

    let _parentctx: ParserRuleContext = this._ctx;
    let _parentState: number = this.state;
    let _localctx: ExpressionContext = new ExpressionContext(this._ctx, _parentState);
    let _prevctx: ExpressionContext = _localctx;
    let _startState: number = 82;
    this.enterRecursionRule(_localctx, 82, RulesParser.RULE_expression, _p);
    let _la: number;
    try {
      let _alt: number;
      this.enterOuterAlt(_localctx, 1);
      {
        {
          this.state = 431;
          this.primaryExpression();
        }
        this._ctx._stop = this._input.tryLT(-1);
        this.state = 468;
        this._errHandler.sync(this);
        _alt = this.interpreter.adaptivePredict(this._input, 28, this._ctx);
        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            if (this._parseListeners != null) {
              this.triggerExitRuleEvent();
            }
            _prevctx = _localctx;
            {
              this.state = 466;
              this._errHandler.sync(this);
              switch (this.interpreter.adaptivePredict(this._input, 27, this._ctx)) {
                case 1:
                  {
                    _localctx = new ExpressionContext(_parentctx, _parentState);
                    this.pushNewRecursionContext(_localctx, _startState, RulesParser.RULE_expression);
                    this.state = 433;
                    if (!this.precpred(this._ctx, 9)) {
                      throw this.createFailedPredicateException('this.precpred(this._ctx, 9)');
                    }
                    this.state = 434;
                    this.match(RulesParser.POW);
                    this.state = 435;
                    this.expression(10);
                  }
                  break;

                case 2:
                  {
                    _localctx = new ExpressionContext(_parentctx, _parentState);
                    this.pushNewRecursionContext(_localctx, _startState, RulesParser.RULE_expression);
                    this.state = 436;
                    if (!this.precpred(this._ctx, 8)) {
                      throw this.createFailedPredicateException('this.precpred(this._ctx, 8)');
                    }
                    this.state = 437;
                    _la = this._input.LA(1);
                    if (
                      !(
                        ((_la - 110) & ~0x1f) === 0 &&
                        ((1 << (_la - 110)) &
                          ((1 << (RulesParser.TIMES - 110)) |
                            (1 << (RulesParser.DIVIDE - 110)) |
                            (1 << (RulesParser.DIV - 110)) |
                            (1 << (RulesParser.MOD - 110)))) !==
                          0
                      )
                    ) {
                      this._errHandler.recoverInline(this);
                    } else {
                      if (this._input.LA(1) === Token.EOF) {
                        this.matchedEOF = true;
                      }

                      this._errHandler.reportMatch(this);
                      this.consume();
                    }
                    this.state = 438;
                    this.expression(9);
                  }
                  break;

                case 3:
                  {
                    _localctx = new ExpressionContext(_parentctx, _parentState);
                    this.pushNewRecursionContext(_localctx, _startState, RulesParser.RULE_expression);
                    this.state = 439;
                    if (!this.precpred(this._ctx, 7)) {
                      throw this.createFailedPredicateException('this.precpred(this._ctx, 7)');
                    }
                    this.state = 440;
                    _la = this._input.LA(1);
                    if (!(_la === RulesParser.PLUS || _la === RulesParser.MINUS)) {
                      this._errHandler.recoverInline(this);
                    } else {
                      if (this._input.LA(1) === Token.EOF) {
                        this.matchedEOF = true;
                      }

                      this._errHandler.reportMatch(this);
                      this.consume();
                    }
                    this.state = 441;
                    this.expression(8);
                  }
                  break;

                case 4:
                  {
                    _localctx = new ExpressionContext(_parentctx, _parentState);
                    this.pushNewRecursionContext(_localctx, _startState, RulesParser.RULE_expression);
                    this.state = 442;
                    if (!this.precpred(this._ctx, 6)) {
                      throw this.createFailedPredicateException('this.precpred(this._ctx, 6)');
                    }
                    this.state = 443;
                    _la = this._input.LA(1);
                    if (
                      !(
                        ((_la - 102) & ~0x1f) === 0 &&
                        ((1 << (_la - 102)) &
                          ((1 << (RulesParser.LT - 102)) |
                            (1 << (RulesParser.GT - 102)) |
                            (1 << (RulesParser.LE - 102)) |
                            (1 << (RulesParser.GE - 102)))) !==
                          0
                      )
                    ) {
                      this._errHandler.recoverInline(this);
                    } else {
                      if (this._input.LA(1) === Token.EOF) {
                        this.matchedEOF = true;
                      }

                      this._errHandler.reportMatch(this);
                      this.consume();
                    }
                    this.state = 444;
                    this.expression(7);
                  }
                  break;

                case 5:
                  {
                    _localctx = new ExpressionContext(_parentctx, _parentState);
                    this.pushNewRecursionContext(_localctx, _startState, RulesParser.RULE_expression);
                    this.state = 445;
                    if (!this.precpred(this._ctx, 5)) {
                      throw this.createFailedPredicateException('this.precpred(this._ctx, 5)');
                    }
                    this.state = 446;
                    _la = this._input.LA(1);
                    if (!(_la === RulesParser.EQ || _la === RulesParser.NE)) {
                      this._errHandler.recoverInline(this);
                    } else {
                      if (this._input.LA(1) === Token.EOF) {
                        this.matchedEOF = true;
                      }

                      this._errHandler.reportMatch(this);
                      this.consume();
                    }
                    this.state = 447;
                    this.expression(6);
                  }
                  break;

                case 6:
                  {
                    _localctx = new ExpressionContext(_parentctx, _parentState);
                    this.pushNewRecursionContext(_localctx, _startState, RulesParser.RULE_expression);
                    this.state = 448;
                    if (!this.precpred(this._ctx, 4)) {
                      throw this.createFailedPredicateException('this.precpred(this._ctx, 4)');
                    }
                    this.state = 449;
                    this.match(RulesParser.MATCH);
                    this.state = 450;
                    this.expression(5);
                  }
                  break;

                case 7:
                  {
                    _localctx = new ExpressionContext(_parentctx, _parentState);
                    this.pushNewRecursionContext(_localctx, _startState, RulesParser.RULE_expression);
                    this.state = 451;
                    if (!this.precpred(this._ctx, 3)) {
                      throw this.createFailedPredicateException('this.precpred(this._ctx, 3)');
                    }
                    this.state = 452;
                    this.match(RulesParser.IN);
                    this.state = 453;
                    this.expression(4);
                  }
                  break;

                case 8:
                  {
                    _localctx = new ExpressionContext(_parentctx, _parentState);
                    this.pushNewRecursionContext(_localctx, _startState, RulesParser.RULE_expression);
                    this.state = 454;
                    if (!this.precpred(this._ctx, 10)) {
                      throw this.createFailedPredicateException('this.precpred(this._ctx, 10)');
                    }
                    this.state = 455;
                    this.match(RulesParser.COND);
                    this.state = 456;
                    this.optionalExpression();
                    this.state = 457;
                    this.match(RulesParser.T__9);
                    this.state = 458;
                    this.optionalExpression();
                  }
                  break;

                case 9:
                  {
                    _localctx = new ExpressionContext(_parentctx, _parentState);
                    this.pushNewRecursionContext(_localctx, _startState, RulesParser.RULE_expression);
                    this.state = 460;
                    if (!this.precpred(this._ctx, 2)) {
                      throw this.createFailedPredicateException('this.precpred(this._ctx, 2)');
                    }
                    this.state = 461;
                    this.match(RulesParser.AND);
                    this.state = 462;
                    this.optionalExpression();
                  }
                  break;

                case 10:
                  {
                    _localctx = new ExpressionContext(_parentctx, _parentState);
                    this.pushNewRecursionContext(_localctx, _startState, RulesParser.RULE_expression);
                    this.state = 463;
                    if (!this.precpred(this._ctx, 1)) {
                      throw this.createFailedPredicateException('this.precpred(this._ctx, 1)');
                    }
                    this.state = 464;
                    this.match(RulesParser.OR);
                    this.state = 465;
                    this.optionalExpression();
                  }
                  break;
              }
            }
          }
          this.state = 470;
          this._errHandler.sync(this);
          _alt = this.interpreter.adaptivePredict(this._input, 28, this._ctx);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.unrollRecursionContexts(_parentctx);
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public intConstant(): IntConstantContext {
    let _localctx: IntConstantContext = new IntConstantContext(this._ctx, this.state);
    this.enterRule(_localctx, 84, RulesParser.RULE_intConstant);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 472;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === RulesParser.PLUS || _la === RulesParser.MINUS) {
          {
            this.state = 471;
            _la = this._input.LA(1);
            if (!(_la === RulesParser.PLUS || _la === RulesParser.MINUS)) {
              this._errHandler.recoverInline(this);
            } else {
              if (this._input.LA(1) === Token.EOF) {
                this.matchedEOF = true;
              }

              this._errHandler.reportMatch(this);
              this.consume();
            }
          }
        }

        this.state = 474;
        this.match(RulesParser.INTLITERAL);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public doubleConstant(): DoubleConstantContext {
    let _localctx: DoubleConstantContext = new DoubleConstantContext(this._ctx, this.state);
    this.enterRule(_localctx, 86, RulesParser.RULE_doubleConstant);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 477;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === RulesParser.PLUS || _la === RulesParser.MINUS) {
          {
            this.state = 476;
            _la = this._input.LA(1);
            if (!(_la === RulesParser.PLUS || _la === RulesParser.MINUS)) {
              this._errHandler.recoverInline(this);
            } else {
              if (this._input.LA(1) === Token.EOF) {
                this.matchedEOF = true;
              }

              this._errHandler.reportMatch(this);
              this.consume();
            }
          }
        }

        this.state = 479;
        this.match(RulesParser.DOUBLELITERAL);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public literalExpression(): LiteralExpressionContext {
    let _localctx: LiteralExpressionContext = new LiteralExpressionContext(this._ctx, this.state);
    this.enterRule(_localctx, 88, RulesParser.RULE_literalExpression);
    try {
      this.state = 486;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 31, this._ctx)) {
        case 1:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 481;
            this.intConstant();
          }
          break;

        case 2:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 482;
            this.doubleConstant();
          }
          break;

        case 3:
          this.enterOuterAlt(_localctx, 3);
          {
            this.state = 483;
            this.match(RulesParser.NULLLITERAL);
          }
          break;

        case 4:
          this.enterOuterAlt(_localctx, 4);
          {
            this.state = 484;
            this.match(RulesParser.BOOLLITERAL);
          }
          break;

        case 5:
          this.enterOuterAlt(_localctx, 5);
          {
            this.state = 485;
            this.match(RulesParser.STRINGLITERAL);
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public identifierExpression(): IdentifierExpressionContext {
    let _localctx: IdentifierExpressionContext = new IdentifierExpressionContext(this._ctx, this.state);
    this.enterRule(_localctx, 90, RulesParser.RULE_identifierExpression);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 488;
        this.qualifiedIdentifier();
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public functionExpression(): FunctionExpressionContext {
    let _localctx: FunctionExpressionContext = new FunctionExpressionContext(this._ctx, this.state);
    this.enterRule(_localctx, 92, RulesParser.RULE_functionExpression);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 492;
        this._errHandler.sync(this);
        switch (this._input.LA(1)) {
          case RulesParser.SIN:
          case RulesParser.COS:
          case RulesParser.TAN:
          case RulesParser.COT:
          case RulesParser.SQRT:
          case RulesParser.ABS:
          case RulesParser.CEIL:
          case RulesParser.FLOOR:
          case RulesParser.ROUND:
          case RulesParser.YEAR:
          case RulesParser.MONTH:
          case RulesParser.DAY:
          case RulesParser.DAYOFYEAR:
          case RulesParser.DAYOFMONTH:
          case RulesParser.DAYOFWEEK:
          case RulesParser.WORKDAYS:
          case RulesParser.LEAPYEAR:
          case RulesParser.LENGTHOFMONTH:
          case RulesParser.LENGTHOFYEAR:
          case RulesParser.PLUSWEEKS:
          case RulesParser.PLUSMONTHS:
          case RulesParser.PLUSYEARS:
          case RulesParser.MINUSWEEKS:
          case RulesParser.MINUSMONTHS:
          case RulesParser.MINUSYEARS:
          case RulesParser.STRLEN:
          case RulesParser.TRIM:
          case RulesParser.SUBSTRING:
          case RulesParser.FORMAT:
          case RulesParser.STRTOINT:
          case RulesParser.STRTOFLOAT:
          case RulesParser.STRTODATE:
          case RulesParser.STRCONCAT:
          case RulesParser.STRSPLIT:
          case RulesParser.STRCONTAIN:
          case RulesParser.REGEXPMATCH:
          case RulesParser.REGEXPREPLACE:
          case RulesParser.FINDRECORD:
          case RulesParser.FINDRECORDIF:
          case RulesParser.ACCUMULATE:
          case RulesParser.APPLY:
          case RulesParser.MAX:
          case RulesParser.MIN:
          case RulesParser.SEGMENT_DISTANCE:
          case RulesParser.TUPLEN:
          case RulesParser.GET:
          case RulesParser.TODAY:
            {
              this.state = 490;
              this.functionName();
            }
            break;
          case RulesParser.IDENTIFIER:
            {
              this.state = 491;
              this.qualifiedIdentifier();
            }
            break;
          default:
            throw new NoViableAltException(this);
        }
        this.state = 494;
        this.match(RulesParser.LPAREN);
        this.state = 495;
        this.expressionList();
        this.state = 496;
        this.match(RulesParser.RPAREN);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public tupleExpression(): TupleExpressionContext {
    let _localctx: TupleExpressionContext = new TupleExpressionContext(this._ctx, this.state);
    this.enterRule(_localctx, 94, RulesParser.RULE_tupleExpression);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 498;
        this.match(RulesParser.LFIGBR);
        this.state = 499;
        this.expressionList();
        this.state = 500;
        this.match(RulesParser.RFIGBR);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public lambdaCapture(): LambdaCaptureContext {
    let _localctx: LambdaCaptureContext = new LambdaCaptureContext(this._ctx, this.state);
    this.enterRule(_localctx, 96, RulesParser.RULE_lambdaCapture);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 502;
        this.match(RulesParser.IDENTIFIER);
        this.state = 505;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === RulesParser.SEQ) {
          {
            this.state = 503;
            this.match(RulesParser.SEQ);
            this.state = 504;
            this.expression(0);
          }
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public lambdaCaptureList(): LambdaCaptureListContext {
    let _localctx: LambdaCaptureListContext = new LambdaCaptureListContext(this._ctx, this.state);
    this.enterRule(_localctx, 98, RulesParser.RULE_lambdaCaptureList);
    let _la: number;
    try {
      this.state = 516;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case RulesParser.RSQBR:
          this.enterOuterAlt(_localctx, 1);
          // tslint:disable-next-line:no-empty
          {
          }
          break;
        case RulesParser.IDENTIFIER:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 508;
            this.lambdaCapture();
            this.state = 513;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while (_la === RulesParser.COMMA) {
              {
                {
                  this.state = 509;
                  this.match(RulesParser.COMMA);
                  this.state = 510;
                  this.lambdaCapture();
                }
              }
              this.state = 515;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
            }
          }
          break;
        default:
          throw new NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public lambdaParam(): LambdaParamContext {
    let _localctx: LambdaParamContext = new LambdaParamContext(this._ctx, this.state);
    this.enterRule(_localctx, 100, RulesParser.RULE_lambdaParam);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 518;
        this.match(RulesParser.IDENTIFIER);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public lambdaParamList(): LambdaParamListContext {
    let _localctx: LambdaParamListContext = new LambdaParamListContext(this._ctx, this.state);
    this.enterRule(_localctx, 102, RulesParser.RULE_lambdaParamList);
    let _la: number;
    try {
      this.state = 529;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case RulesParser.RPAREN:
          this.enterOuterAlt(_localctx, 1);
          // tslint:disable-next-line:no-empty
          {
          }
          break;
        case RulesParser.IDENTIFIER:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 521;
            this.lambdaParam();
            this.state = 526;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while (_la === RulesParser.COMMA) {
              {
                {
                  this.state = 522;
                  this.match(RulesParser.COMMA);
                  this.state = 523;
                  this.lambdaParam();
                }
              }
              this.state = 528;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
            }
          }
          break;
        default:
          throw new NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public lambdaBody(): LambdaBodyContext {
    let _localctx: LambdaBodyContext = new LambdaBodyContext(this._ctx, this.state);
    this.enterRule(_localctx, 104, RulesParser.RULE_lambdaBody);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 531;
        this.expression(0);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public lambdaExpression(): LambdaExpressionContext {
    let _localctx: LambdaExpressionContext = new LambdaExpressionContext(this._ctx, this.state);
    this.enterRule(_localctx, 106, RulesParser.RULE_lambdaExpression);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 533;
        this.match(RulesParser.LSQBR);
        this.state = 534;
        this.lambdaCaptureList();
        this.state = 535;
        this.match(RulesParser.RSQBR);
        this.state = 536;
        this.match(RulesParser.LPAREN);
        this.state = 537;
        this.lambdaParamList();
        this.state = 538;
        this.match(RulesParser.RPAREN);
        this.state = 539;
        this.match(RulesParser.LFIGBR);
        this.state = 540;
        this.lambdaBody();
        this.state = 541;
        this.match(RulesParser.RFIGBR);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public primaryExpression(): PrimaryExpressionContext {
    let _localctx: PrimaryExpressionContext = new PrimaryExpressionContext(this._ctx, this.state);
    this.enterRule(_localctx, 108, RulesParser.RULE_primaryExpression);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 544;
        this._errHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this._input, 38, this._ctx)) {
          case 1:
            {
              this.state = 543;
              _la = this._input.LA(1);
              if (
                !(
                  ((_la - 99) & ~0x1f) === 0 &&
                  ((1 << (_la - 99)) &
                    ((1 << (RulesParser.NOT - 99)) |
                      (1 << (RulesParser.PLUS - 99)) |
                      (1 << (RulesParser.MINUS - 99)))) !==
                    0
                )
              ) {
                this._errHandler.recoverInline(this);
              } else {
                if (this._input.LA(1) === Token.EOF) {
                  this.matchedEOF = true;
                }

                this._errHandler.reportMatch(this);
                this.consume();
              }
            }
            break;
        }
        this.state = 555;
        this._errHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this._input, 39, this._ctx)) {
          case 1:
            {
              this.state = 546;
              this.match(RulesParser.LPAREN);
              this.state = 547;
              this.expression(0);
              this.state = 548;
              this.match(RulesParser.RPAREN);
            }
            break;

          case 2:
            {
              this.state = 550;
              this.identifierExpression();
            }
            break;

          case 3:
            {
              this.state = 551;
              this.literalExpression();
            }
            break;

          case 4:
            {
              this.state = 552;
              this.functionExpression();
            }
            break;

          case 5:
            {
              this.state = 553;
              this.tupleExpression();
            }
            break;

          case 6:
            {
              this.state = 554;
              this.lambdaExpression();
            }
            break;
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public functionName(): FunctionNameContext {
    let _localctx: FunctionNameContext = new FunctionNameContext(this._ctx, this.state);
    this.enterRule(_localctx, 110, RulesParser.RULE_functionName);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 557;
        _la = this._input.LA(1);
        if (
          !(
            (((_la - 35) & ~0x1f) === 0 &&
              ((1 << (_la - 35)) &
                ((1 << (RulesParser.SIN - 35)) |
                  (1 << (RulesParser.COS - 35)) |
                  (1 << (RulesParser.TAN - 35)) |
                  (1 << (RulesParser.COT - 35)) |
                  (1 << (RulesParser.SQRT - 35)) |
                  (1 << (RulesParser.ABS - 35)) |
                  (1 << (RulesParser.CEIL - 35)) |
                  (1 << (RulesParser.FLOOR - 35)) |
                  (1 << (RulesParser.ROUND - 35)) |
                  (1 << (RulesParser.YEAR - 35)) |
                  (1 << (RulesParser.MONTH - 35)) |
                  (1 << (RulesParser.DAY - 35)) |
                  (1 << (RulesParser.DAYOFYEAR - 35)) |
                  (1 << (RulesParser.DAYOFMONTH - 35)) |
                  (1 << (RulesParser.DAYOFWEEK - 35)) |
                  (1 << (RulesParser.WORKDAYS - 35)) |
                  (1 << (RulesParser.LEAPYEAR - 35)) |
                  (1 << (RulesParser.LENGTHOFMONTH - 35)) |
                  (1 << (RulesParser.LENGTHOFYEAR - 35)) |
                  (1 << (RulesParser.PLUSWEEKS - 35)) |
                  (1 << (RulesParser.PLUSMONTHS - 35)) |
                  (1 << (RulesParser.PLUSYEARS - 35)) |
                  (1 << (RulesParser.MINUSWEEKS - 35)) |
                  (1 << (RulesParser.MINUSMONTHS - 35)) |
                  (1 << (RulesParser.MINUSYEARS - 35)) |
                  (1 << (RulesParser.STRLEN - 35)) |
                  (1 << (RulesParser.TRIM - 35)) |
                  (1 << (RulesParser.SUBSTRING - 35)) |
                  (1 << (RulesParser.FORMAT - 35)) |
                  (1 << (RulesParser.STRTOINT - 35)) |
                  (1 << (RulesParser.STRTOFLOAT - 35)) |
                  (1 << (RulesParser.STRTODATE - 35)))) !==
                0) ||
            (((_la - 67) & ~0x1f) === 0 &&
              ((1 << (_la - 67)) &
                ((1 << (RulesParser.STRCONCAT - 67)) |
                  (1 << (RulesParser.STRSPLIT - 67)) |
                  (1 << (RulesParser.STRCONTAIN - 67)) |
                  (1 << (RulesParser.REGEXPMATCH - 67)) |
                  (1 << (RulesParser.REGEXPREPLACE - 67)) |
                  (1 << (RulesParser.FINDRECORD - 67)) |
                  (1 << (RulesParser.FINDRECORDIF - 67)) |
                  (1 << (RulesParser.ACCUMULATE - 67)) |
                  (1 << (RulesParser.APPLY - 67)) |
                  (1 << (RulesParser.MAX - 67)) |
                  (1 << (RulesParser.MIN - 67)) |
                  (1 << (RulesParser.SEGMENT_DISTANCE - 67)) |
                  (1 << (RulesParser.TUPLEN - 67)) |
                  (1 << (RulesParser.GET - 67)) |
                  (1 << (RulesParser.TODAY - 67)))) !==
                0)
          )
        ) {
          this._errHandler.recoverInline(this);
        } else {
          if (this._input.LA(1) === Token.EOF) {
            this.matchedEOF = true;
          }

          this._errHandler.reportMatch(this);
          this.consume();
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }

  public sempred(_localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
    switch (ruleIndex) {
      case 41:
        return this.expression_sempred(_localctx as ExpressionContext, predIndex);
    }
    return true;
  }
  private expression_sempred(_localctx: ExpressionContext, predIndex: number): boolean {
    switch (predIndex) {
      case 0:
        return this.precpred(this._ctx, 9);

      case 1:
        return this.precpred(this._ctx, 8);

      case 2:
        return this.precpred(this._ctx, 7);

      case 3:
        return this.precpred(this._ctx, 6);

      case 4:
        return this.precpred(this._ctx, 5);

      case 5:
        return this.precpred(this._ctx, 4);

      case 6:
        return this.precpred(this._ctx, 3);

      case 7:
        return this.precpred(this._ctx, 10);

      case 8:
        return this.precpred(this._ctx, 2);

      case 9:
        return this.precpred(this._ctx, 1);
    }
    return true;
  }

  public static readonly _serializedATN: string =
    '\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03y\u0232\x04\x02' +
    '\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07' +
    '\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04' +
    '\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04' +
    '\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17\x04' +
    '\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t\x1B\x04\x1C\t\x1C\x04' +
    '\x1D\t\x1D\x04\x1E\t\x1E\x04\x1F\t\x1F\x04 \t \x04!\t!\x04"\t"\x04#' +
    "\t#\x04$\t$\x04%\t%\x04&\t&\x04'\t'\x04(\t(\x04)\t)\x04*\t*\x04+\t+" +
    '\x04,\t,\x04-\t-\x04.\t.\x04/\t/\x040\t0\x041\t1\x042\t2\x043\t3\x044' +
    '\t4\x045\t5\x046\t6\x047\t7\x048\t8\x049\t9\x03\x02\x05\x02t\n\x02\x03' +
    '\x02\x07\x02w\n\x02\f\x02\x0E\x02z\v\x02\x03\x02\x03\x02\x03\x03\x03\x03' +
    '\x03\x03\x03\x03\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x06\x04' +
    '\x88\n\x04\r\x04\x0E\x04\x89\x05\x04\x8C\n\x04\x03\x04\x03\x04\x06\x04' +
    '\x90\n\x04\r\x04\x0E\x04\x91\x05\x04\x94\n\x04\x03\x04\x03\x04\x06\x04' +
    '\x98\n\x04\r\x04\x0E\x04\x99\x05\x04\x9C\n\x04\x03\x04\x03\x04\x03\x05' +
    '\x03\x05\x03\x06\x03\x06\x03\x06\x05\x06\xA5\n\x06\x03\x06\x03\x06\x03' +
    '\x06\x03\x06\x05\x06\xAB\n\x06\x03\x07\x03\x07\x03\b\x03\b\x03\b\x05\b' +
    '\xB2\n\b\x03\b\x03\b\x03\t\x03\t\x03\t\x03\t\x03\n\x03\n\x05\n\xBC\n\n' +
    '\x03\v\x03\v\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x05\f\xC6\n\f\x03\f\x03' +
    '\f\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03' +
    '\r\x03\r\x03\r\x03\r\x03\r\x05\r\xDA\n\r\x03\x0E\x03\x0E\x03\x0E\x03\x0E' +
    '\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0F\x03\x0F\x03\x0F\x03\x0F' +
    '\x03\x0F\x03\x0F\x03\x0F\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10' +
    '\x03\x10\x03\x10\x03\x10\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11' +
    '\x03\x11\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x03\x13' +
    '\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x14\x03\x14\x03\x14' +
    '\x03\x14\x03\x14\x03\x14\x03\x14\x03\x15\x03\x15\x03\x15\x03\x15\x03\x15' +
    '\x03\x15\x03\x15\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16' +
    '\x03\x16\x03\x16\x05\x16\u0121\n\x16\x03\x16\x03\x16\x05\x16\u0125\n\x16' +
    '\x03\x16\x03\x16\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17' +
    '\x03\x17\x03\x17\x05\x17\u0132\n\x17\x03\x17\x03\x17\x05\x17\u0136\n\x17' +
    '\x03\x17\x03\x17\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18' +
    '\x03\x18\x03\x18\x05\x18\u0143\n\x18\x03\x18\x03\x18\x05\x18\u0147\n\x18' +
    '\x03\x18\x03\x18\x03\x19\x03\x19\x03\x19\x03\x19\x03\x19\x03\x19\x03\x19' +
    '\x03\x19\x03\x19\x05\x19\u0154\n\x19\x03\x19\x03\x19\x03\x1A\x03\x1A\x03' +
    '\x1A\x03\x1A\x03\x1A\x03\x1A\x03\x1A\x05\x1A\u015F\n\x1A\x03\x1A\x03\x1A' +
    '\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1C\x03\x1C' +
    '\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1C' +
    '\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D' +
    '\x03\x1D\x03\x1D\x03\x1E\x03\x1E\x03\x1F\x03\x1F\x03 \x03 \x03!\x03!\x03' +
    '"\x03"\x03#\x03#\x03$\x03$\x03%\x03%\x05%\u0190\n%\x03&\x03&\x03\'\x03' +
    "'\x03'\x03(\x03(\x03(\x07(\u019A\n(\f(\x0E(\u019D\v(\x03(\x03(\x03(" +
    '\x05(\u01A2\n(\x03)\x03)\x03)\x03)\x07)\u01A8\n)\f)\x0E)\u01AB\v)\x05' +
    ')\u01AD\n)\x03*\x03*\x03+\x03+\x03+\x03+\x03+\x03+\x03+\x03+\x03+\x03' +
    '+\x03+\x03+\x03+\x03+\x03+\x03+\x03+\x03+\x03+\x03+\x03+\x03+\x03+\x03' +
    '+\x03+\x03+\x03+\x03+\x03+\x03+\x03+\x03+\x03+\x03+\x03+\x03+\x07+\u01D5' +
    '\n+\f+\x0E+\u01D8\v+\x03,\x05,\u01DB\n,\x03,\x03,\x03-\x05-\u01E0\n-\x03' +
    '-\x03-\x03.\x03.\x03.\x03.\x03.\x05.\u01E9\n.\x03/\x03/\x030\x030\x05' +
    '0\u01EF\n0\x030\x030\x030\x030\x031\x031\x031\x031\x032\x032\x032\x05' +
    '2\u01FC\n2\x033\x033\x033\x033\x073\u0202\n3\f3\x0E3\u0205\v3\x053\u0207' +
    '\n3\x034\x034\x035\x035\x035\x035\x075\u020F\n5\f5\x0E5\u0212\v5\x055' +
    '\u0214\n5\x036\x036\x037\x037\x037\x037\x037\x037\x037\x037\x037\x037' +
    '\x038\x058\u0223\n8\x038\x038\x038\x038\x038\x038\x038\x038\x038\x058' +
    '\u022E\n8\x039\x039\x039\x02\x02\x03T:\x02\x02\x04\x02\x06\x02\b\x02\n' +
    '\x02\f\x02\x0E\x02\x10\x02\x12\x02\x14\x02\x16\x02\x18\x02\x1A\x02\x1C' +
    '\x02\x1E\x02 \x02"\x02$\x02&\x02(\x02*\x02,\x02.\x020\x022\x024\x026' +
    '\x028\x02:\x02<\x02>\x02@\x02B\x02D\x02F\x02H\x02J\x02L\x02N\x02P\x02' +
    'R\x02T\x02V\x02X\x02Z\x02\\\x02^\x02`\x02b\x02d\x02f\x02h\x02j\x02l\x02' +
    'n\x02p\x02\x02\b\x03\x02ps\x03\x02no\x03\x02hk\x03\x02fg\x04\x02eeno\x03' +
    '\x02%S\x02\u023E\x02s\x03\x02\x02\x02\x04}\x03\x02\x02\x02\x06\x81\x03' +
    '\x02\x02\x02\b\x9F\x03\x02\x02\x02\n\xA1\x03\x02\x02\x02\f\xAC\x03\x02' +
    '\x02\x02\x0E\xAE\x03\x02\x02\x02\x10\xB5\x03\x02\x02\x02\x12\xBB\x03\x02' +
    '\x02\x02\x14\xBD\x03\x02\x02\x02\x16\xC5\x03\x02\x02\x02\x18\xD9\x03\x02' +
    '\x02\x02\x1A\xDB\x03\x02\x02\x02\x1C\xE4\x03\x02\x02\x02\x1E\xEB\x03\x02' +
    '\x02\x02 \xF4\x03\x02\x02\x02"\xFB\x03\x02\x02\x02$\u0102\x03\x02\x02' +
    '\x02&\u0109\x03\x02\x02\x02(\u0110\x03\x02\x02\x02*\u0117\x03\x02\x02' +
    '\x02,\u0128\x03\x02\x02\x02.\u0139\x03\x02\x02\x020\u014A\x03\x02\x02' +
    '\x022\u0157\x03\x02\x02\x024\u0162\x03\x02\x02\x026\u0169\x03\x02\x02' +
    '\x028\u0174\x03\x02\x02\x02:\u017F\x03\x02\x02\x02<\u0181\x03\x02\x02' +
    '\x02>\u0183\x03\x02\x02\x02@\u0185\x03\x02\x02\x02B\u0187\x03\x02\x02' +
    '\x02D\u0189\x03\x02\x02\x02F\u018B\x03\x02\x02\x02H\u018F\x03\x02\x02' +
    '\x02J\u0191\x03\x02\x02\x02L\u0193\x03\x02\x02\x02N\u0196\x03\x02\x02' +
    '\x02P\u01AC\x03\x02\x02\x02R\u01AE\x03\x02\x02\x02T\u01B0\x03\x02\x02' +
    '\x02V\u01DA\x03\x02\x02\x02X\u01DF\x03\x02\x02\x02Z\u01E8\x03\x02\x02' +
    '\x02\\\u01EA\x03\x02\x02\x02^\u01EE\x03\x02\x02\x02`\u01F4\x03\x02\x02' +
    '\x02b\u01F8\x03\x02\x02\x02d\u0206\x03\x02\x02\x02f\u0208\x03\x02\x02' +
    '\x02h\u0213\x03\x02\x02\x02j\u0215\x03\x02\x02\x02l\u0217\x03\x02\x02' +
    '\x02n\u0222\x03\x02\x02\x02p\u022F\x03\x02\x02\x02rt\x05\x04\x03\x02s' +
    'r\x03\x02\x02\x02st\x03\x02\x02\x02tx\x03\x02\x02\x02uw\x05\x06\x04\x02' +
    'vu\x03\x02\x02\x02wz\x03\x02\x02\x02xv\x03\x02\x02\x02xy\x03\x02\x02\x02' +
    'y{\x03\x02\x02\x02zx\x03\x02\x02\x02{|\x07\x02\x02\x03|\x03\x03\x02\x02' +
    '\x02}~\x07\x03\x02\x02~\x7F\x07v\x02\x02\x7F\x80\x07\x04\x02\x02\x80\x05' +
    '\x03\x02\x02\x02\x81\x82\x07\x05\x02\x02\x82\x83\x07a\x02\x02\x83\x84' +
    '\x07\x06\x02\x02\x84\x8B\x05\b\x05\x02\x85\x87\x07\x07\x02\x02\x86\x88' +
    '\x05\n\x06\x02\x87\x86\x03\x02\x02\x02\x88\x89\x03\x02\x02\x02\x89\x87' +
    '\x03\x02\x02\x02\x89\x8A\x03\x02\x02\x02\x8A\x8C\x03\x02\x02\x02\x8B\x85' +
    '\x03\x02\x02\x02\x8B\x8C\x03\x02\x02\x02\x8C\x93\x03\x02\x02\x02\x8D\x8F' +
    '\x07\b\x02\x02\x8E\x90\x05\x10\t\x02\x8F\x8E\x03\x02\x02\x02\x90\x91\x03' +
    '\x02\x02\x02\x91\x8F\x03\x02\x02\x02\x91\x92\x03\x02\x02\x02\x92\x94\x03' +
    '\x02\x02\x02\x93\x8D\x03\x02\x02\x02\x93\x94\x03\x02\x02\x02\x94\x9B\x03' +
    '\x02\x02\x02\x95\x97\x07\t\x02\x02\x96\x98\x05\x16\f\x02\x97\x96\x03\x02' +
    '\x02\x02\x98\x99\x03\x02\x02\x02\x99\x97\x03\x02\x02\x02\x99\x9A\x03\x02' +
    '\x02\x02\x9A\x9C\x03\x02\x02\x02\x9B\x95\x03\x02\x02\x02\x9B\x9C\x03\x02' +
    '\x02\x02\x9C\x9D\x03\x02\x02\x02\x9D\x9E\x07\n\x02\x02\x9E\x07\x03\x02' +
    '\x02\x02\x9F\xA0\x07`\x02\x02\xA0\t\x03\x02\x02\x02\xA1\xA4\x05@!\x02' +
    '\xA2\xA3\x07\v\x02\x02\xA3\xA5\x05\f\x07\x02\xA4\xA2\x03\x02\x02\x02\xA4' +
    '\xA5\x03\x02\x02\x02\xA5\xA6\x03\x02\x02\x02\xA6\xA7\x07\f\x02\x02\xA7' +
    '\xAA\x05\x0E\b\x02\xA8\xA9\x07\r\x02\x02\xA9\xAB\x05B"\x02\xAA\xA8\x03' +
    '\x02\x02\x02\xAA\xAB\x03\x02\x02\x02\xAB\v\x03\x02\x02\x02\xAC\xAD\x07' +
    'v\x02\x02\xAD\r\x03\x02\x02\x02\xAE\xAF\x07#\x02\x02\xAF\xB1\x07W\x02' +
    '\x02\xB0\xB2\x05T+\x02\xB1\xB0\x03\x02\x02\x02\xB1\xB2\x03\x02\x02\x02' +
    '\xB2\xB3\x03\x02\x02\x02\xB3\xB4\x07X\x02\x02\xB4\x0F\x03\x02\x02\x02' +
    '\xB5\xB6\x07v\x02\x02\xB6\xB7\x07\f\x02\x02\xB7\xB8\x05\x12\n\x02\xB8' +
    '\x11\x03\x02\x02\x02\xB9\xBC\x05T+\x02\xBA\xBC\x05\x14\v\x02\xBB\xB9\x03' +
    '\x02\x02\x02\xBB\xBA\x03\x02\x02\x02\xBC\x13\x03\x02\x02\x02\xBD\xBE\x07' +
    '$\x02\x02\xBE\x15\x03\x02\x02\x02\xBF\xC0\x07\x0E\x02\x02\xC0\xC1\x07' +
    'W\x02\x02\xC1\xC2\x05T+\x02\xC2\xC3\x07X\x02\x02\xC3\xC4\x07\x0F\x02\x02' +
    '\xC4\xC6\x03\x02\x02\x02\xC5\xBF\x03\x02\x02\x02\xC5\xC6\x03\x02\x02\x02' +
    '\xC6\xC7\x03\x02\x02\x02\xC7\xC8\x05\x18\r\x02\xC8\x17\x03\x02\x02\x02' +
    '\xC9\xDA\x05\x1C\x0F\x02\xCA\xDA\x05\x1A\x0E\x02\xCB\xDA\x05\x1E\x10\x02' +
    '\xCC\xDA\x05"\x12\x02\xCD\xDA\x052\x1A\x02\xCE\xDA\x05$\x13\x02\xCF\xDA' +
    '\x05&\x14\x02\xD0\xDA\x05(\x15\x02\xD1\xDA\x05*\x16\x02\xD2\xDA\x05,\x17' +
    '\x02\xD3\xDA\x05.\x18\x02\xD4\xDA\x050\x19\x02\xD5\xDA\x05 \x11\x02\xD6' +
    '\xDA\x054\x1B\x02\xD7\xDA\x056\x1C\x02\xD8\xDA\x058\x1D\x02\xD9\xC9\x03' +
    '\x02\x02\x02\xD9\xCA\x03\x02\x02\x02\xD9\xCB\x03\x02\x02\x02\xD9\xCC\x03' +
    '\x02\x02\x02\xD9\xCD\x03\x02\x02\x02\xD9\xCE\x03\x02\x02\x02\xD9\xCF\x03' +
    '\x02\x02\x02\xD9\xD0\x03\x02\x02\x02\xD9\xD1\x03\x02\x02\x02\xD9\xD2\x03' +
    '\x02\x02\x02\xD9\xD3\x03\x02\x02\x02\xD9\xD4\x03\x02\x02\x02\xD9\xD5\x03' +
    '\x02\x02\x02\xD9\xD6\x03\x02\x02\x02\xD9\xD7\x03\x02\x02\x02\xD9\xD8\x03' +
    '\x02\x02\x02\xDA\x19\x03\x02\x02\x02\xDB\xDC\x05@!\x02\xDC\xDD\x07!\x02' +
    '\x02\xDD\xDE\x07\x10\x02\x02\xDE\xDF\x07W\x02\x02\xDF\xE0\x05D#\x02\xE0' +
    '\xE1\x07 \x02\x02\xE1\xE2\x05H%\x02\xE2\xE3\x07X\x02\x02\xE3\x1B\x03\x02' +
    '\x02\x02\xE4\xE5\x05@!\x02\xE5\xE6\x07!\x02\x02\xE6\xE7\x07\x11\x02\x02' +
    '\xE7\xE8\x07W\x02\x02\xE8\xE9\x05D#\x02\xE9\xEA\x07X\x02\x02\xEA\x1D\x03' +
    '\x02\x02\x02\xEB\xEC\x05@!\x02\xEC\xED\x07!\x02\x02\xED\xEE\x07\x12\x02' +
    '\x02\xEE\xEF\x07W\x02\x02\xEF\xF0\x05D#\x02\xF0\xF1\x07 \x02\x02\xF1\xF2' +
    '\x05H%\x02\xF2\xF3\x07X\x02\x02\xF3\x1F\x03\x02\x02\x02\xF4\xF5\x05@!' +
    '\x02\xF5\xF6\x07!\x02\x02\xF6\xF7\x07\x13\x02\x02\xF7\xF8\x07W\x02\x02' +
    '\xF8\xF9\x05H%\x02\xF9\xFA\x07X\x02\x02\xFA!\x03\x02\x02\x02\xFB\xFC\x05' +
    '@!\x02\xFC\xFD\x07!\x02\x02\xFD\xFE\x07\x14\x02\x02\xFE\xFF\x07W\x02\x02' +
    '\xFF\u0100\x05H%\x02\u0100\u0101\x07X\x02\x02\u0101#\x03\x02\x02\x02\u0102' +
    '\u0103\x05@!\x02\u0103\u0104\x07!\x02\x02\u0104\u0105\x07\x15\x02\x02' +
    '\u0105\u0106\x07W\x02\x02\u0106\u0107\x05> \x02\u0107\u0108\x07X\x02\x02' +
    '\u0108%\x03\x02\x02\x02\u0109\u010A\x05@!\x02\u010A\u010B\x07!\x02\x02' +
    '\u010B\u010C\x07\x16\x02\x02\u010C\u010D\x07W\x02\x02\u010D\u010E\x05' +
    "> \x02\u010E\u010F\x07X\x02\x02\u010F'\x03\x02\x02\x02\u0110\u0111\x05" +
    '@!\x02\u0111\u0112\x07!\x02\x02\u0112\u0113\x07\x17\x02\x02\u0113\u0114' +
    '\x07W\x02\x02\u0114\u0115\x05> \x02\u0115\u0116\x07X\x02\x02\u0116)\x03' +
    '\x02\x02\x02\u0117\u0118\x05@!\x02\u0118\u0119\x07!\x02\x02\u0119\u011A' +
    '\x07\x18\x02\x02\u011A\u011B\x07W\x02\x02\u011B\u011C\x07"\x02\x02\u011C' +
    '\u011D\x07 \x02\x02\u011D\u0120\x05H%\x02\u011E\u011F\x07 \x02\x02\u011F' +
    '\u0121\x05F$\x02\u0120\u011E\x03\x02\x02\x02\u0120\u0121\x03\x02\x02\x02' +
    '\u0121\u0124\x03\x02\x02\x02\u0122\u0123\x07 \x02\x02\u0123\u0125\x05' +
    'J&\x02\u0124\u0122\x03\x02\x02\x02\u0124\u0125\x03\x02\x02\x02\u0125\u0126' +
    '\x03\x02\x02\x02\u0126\u0127\x07X\x02\x02\u0127+\x03\x02\x02\x02\u0128' +
    '\u0129\x05@!\x02\u0129\u012A\x07!\x02\x02\u012A\u012B\x07\x19\x02\x02' +
    '\u012B\u012C\x07W\x02\x02\u012C\u012D\x07"\x02\x02\u012D\u012E\x07 \x02' +
    '\x02\u012E\u0131\x05H%\x02\u012F\u0130\x07 \x02\x02\u0130\u0132\x05F$' +
    '\x02\u0131\u012F\x03\x02\x02\x02\u0131\u0132\x03\x02\x02\x02\u0132\u0135' +
    '\x03\x02\x02\x02\u0133\u0134\x07 \x02\x02\u0134\u0136\x05J&\x02\u0135' +
    '\u0133\x03\x02\x02\x02\u0135\u0136\x03\x02\x02\x02\u0136\u0137\x03\x02' +
    '\x02\x02\u0137\u0138\x07X\x02\x02\u0138-\x03\x02\x02\x02\u0139\u013A\x05' +
    '@!\x02\u013A\u013B\x07!\x02\x02\u013B\u013C\x07\x1A\x02\x02\u013C\u013D' +
    '\x07W\x02\x02\u013D\u013E\x07"\x02\x02\u013E\u013F\x07 \x02\x02\u013F' +
    '\u0142\x05H%\x02\u0140\u0141\x07 \x02\x02\u0141\u0143\x05F$\x02\u0142' +
    '\u0140\x03\x02\x02\x02\u0142\u0143\x03\x02\x02\x02\u0143\u0146\x03\x02' +
    '\x02\x02\u0144\u0145\x07 \x02\x02\u0145\u0147\x05J&\x02\u0146\u0144\x03' +
    '\x02\x02\x02\u0146\u0147\x03\x02\x02\x02\u0147\u0148\x03\x02\x02\x02\u0148' +
    '\u0149\x07X\x02\x02\u0149/\x03\x02\x02\x02\u014A\u014B\x05@!\x02\u014B' +
    '\u014C\x07!\x02\x02\u014C\u014D\x07\x1B\x02\x02\u014D\u014E\x07W\x02\x02' +
    '\u014E\u014F\x05:\x1E\x02\u014F\u0150\x07 \x02\x02\u0150\u0153\x05> \x02' +
    '\u0151\u0152\x07 \x02\x02\u0152\u0154\x05<\x1F\x02\u0153\u0151\x03\x02' +
    '\x02\x02\u0153\u0154\x03\x02\x02\x02\u0154\u0155\x03\x02\x02\x02\u0155' +
    '\u0156\x07X\x02\x02\u01561\x03\x02\x02\x02\u0157\u0158\x05@!\x02\u0158' +
    '\u0159\x07!\x02\x02\u0159\u015A\x07\x1C\x02\x02\u015A\u015B\x07W\x02\x02' +
    '\u015B\u015E\x05H%\x02\u015C\u015D\x07 \x02\x02\u015D\u015F\x05H%\x02' +
    '\u015E\u015C\x03\x02\x02\x02\u015E\u015F\x03\x02\x02\x02\u015F\u0160\x03' +
    '\x02\x02\x02\u0160\u0161\x07X\x02\x02\u01613\x03\x02\x02\x02\u0162\u0163' +
    '\x05@!\x02\u0163\u0164\x07!\x02\x02\u0164\u0165\x07\x1D\x02\x02\u0165' +
    '\u0166\x07W\x02\x02\u0166\u0167\x05H%\x02\u0167\u0168\x07X\x02\x02\u0168' +
    '5\x03\x02\x02\x02\u0169\u016A\x05@!\x02\u016A\u016B\x07!\x02\x02\u016B' +
    '\u016C\x07\x1E\x02\x02\u016C\u016D\x07W\x02\x02\u016D\u016E\x05H%\x02' +
    '\u016E\u016F\x07 \x02\x02\u016F\u0170\x05H%\x02\u0170\u0171\x07 \x02\x02' +
    '\u0171\u0172\x05H%\x02\u0172\u0173\x07X\x02\x02\u01737\x03\x02\x02\x02' +
    '\u0174\u0175\x05@!\x02\u0175\u0176\x07!\x02\x02\u0176\u0177\x07\x1F\x02' +
    '\x02\u0177\u0178\x07W\x02\x02\u0178\u0179\x05H%\x02\u0179\u017A\x07 \x02' +
    '\x02\u017A\u017B\x05H%\x02\u017B\u017C\x07 \x02\x02\u017C\u017D\x05H%' +
    '\x02\u017D\u017E\x07X\x02\x02\u017E9\x03\x02\x02\x02\u017F\u0180\x07v' +
    '\x02\x02\u0180;\x03\x02\x02\x02\u0181\u0182\x07v\x02\x02\u0182=\x03\x02' +
    '\x02\x02\u0183\u0184\x07v\x02\x02\u0184?\x03\x02\x02\x02\u0185\u0186\x07' +
    'v\x02\x02\u0186A\x03\x02\x02\x02\u0187\u0188\x07v\x02\x02\u0188C\x03\x02' +
    '\x02\x02\u0189\u018A\x07v\x02\x02\u018AE\x03\x02\x02\x02\u018B\u018C\x07' +
    'a\x02\x02\u018CG\x03\x02\x02\x02\u018D\u0190\x05Z.\x02\u018E\u0190\x05' +
    '> \x02\u018F\u018D\x03\x02\x02\x02\u018F\u018E\x03\x02\x02\x02\u0190I' +
    '\x03\x02\x02\x02\u0191\u0192\x07_\x02\x02\u0192K\x03\x02\x02\x02\u0193' +
    '\u0194\x05T+\x02\u0194\u0195\x07\x02\x02\x03\u0195M\x03\x02\x02\x02\u0196' +
    '\u019B\x07v\x02\x02\u0197\u0198\x07!\x02\x02\u0198\u019A\x07v\x02\x02' +
    '\u0199\u0197\x03\x02\x02\x02\u019A\u019D\x03\x02\x02\x02\u019B\u0199\x03' +
    '\x02\x02\x02\u019B\u019C\x03\x02\x02\x02\u019C\u01A1\x03\x02\x02\x02\u019D' +
    '\u019B\x03\x02\x02\x02\u019E\u019F\x07[\x02\x02\u019F\u01A0\x07a\x02\x02' +
    '\u01A0\u01A2\x07\\\x02\x02\u01A1\u019E\x03\x02\x02\x02\u01A1\u01A2\x03' +
    '\x02\x02\x02\u01A2O\x03\x02\x02\x02\u01A3\u01AD\x03\x02\x02\x02\u01A4' +
    '\u01A9\x05T+\x02\u01A5\u01A6\x07 \x02\x02\u01A6\u01A8\x05T+\x02\u01A7' +
    '\u01A5\x03\x02\x02\x02\u01A8\u01AB\x03\x02\x02\x02\u01A9\u01A7\x03\x02' +
    '\x02\x02\u01A9\u01AA\x03\x02\x02\x02\u01AA\u01AD\x03\x02\x02\x02\u01AB' +
    '\u01A9\x03\x02\x02\x02\u01AC\u01A3\x03\x02\x02\x02\u01AC\u01A4\x03\x02' +
    '\x02\x02\u01ADQ\x03\x02\x02\x02\u01AE\u01AF\x05T+\x02\u01AFS\x03\x02\x02' +
    '\x02\u01B0\u01B1\b+\x01\x02\u01B1\u01B2\x05n8\x02\u01B2\u01D6\x03\x02' +
    '\x02\x02\u01B3\u01B4\f\v\x02\x02\u01B4\u01B5\x07t\x02\x02\u01B5\u01D5' +
    '\x05T+\f\u01B6\u01B7\f\n\x02\x02\u01B7\u01B8\t\x02\x02\x02\u01B8\u01D5' +
    '\x05T+\v\u01B9\u01BA\f\t\x02\x02\u01BA\u01BB\t\x03\x02\x02\u01BB\u01D5' +
    '\x05T+\n\u01BC\u01BD\f\b\x02\x02\u01BD\u01BE\t\x04\x02\x02\u01BE\u01D5' +
    '\x05T+\t\u01BF\u01C0\f\x07\x02\x02\u01C0\u01C1\t\x05\x02\x02\u01C1\u01D5' +
    '\x05T+\b\u01C2\u01C3\f\x06\x02\x02\u01C3\u01C4\x07l\x02\x02\u01C4\u01D5' +
    '\x05T+\x07\u01C5\u01C6\f\x05\x02\x02\u01C6\u01C7\x07m\x02\x02\u01C7\u01D5' +
    '\x05T+\x06\u01C8\u01C9\f\f\x02\x02\u01C9\u01CA\x07u\x02\x02\u01CA\u01CB' +
    '\x05R*\x02\u01CB\u01CC\x07\f\x02\x02\u01CC\u01CD\x05R*\x02\u01CD\u01D5' +
    '\x03\x02\x02\x02\u01CE\u01CF\f\x04\x02\x02\u01CF\u01D0\x07c\x02\x02\u01D0' +
    '\u01D5\x05R*\x02\u01D1\u01D2\f\x03\x02\x02\u01D2\u01D3\x07d\x02\x02\u01D3' +
    '\u01D5\x05R*\x02\u01D4\u01B3\x03\x02\x02\x02\u01D4\u01B6\x03\x02\x02\x02' +
    '\u01D4\u01B9\x03\x02\x02\x02\u01D4\u01BC\x03\x02\x02\x02\u01D4\u01BF\x03' +
    '\x02\x02\x02\u01D4\u01C2\x03\x02\x02\x02\u01D4\u01C5\x03\x02\x02\x02\u01D4' +
    '\u01C8\x03\x02\x02\x02\u01D4\u01CE\x03\x02\x02\x02\u01D4\u01D1\x03\x02' +
    '\x02\x02\u01D5\u01D8\x03\x02\x02\x02\u01D6\u01D4\x03\x02\x02\x02\u01D6' +
    '\u01D7\x03\x02\x02\x02\u01D7U\x03\x02\x02\x02\u01D8\u01D6\x03\x02\x02' +
    '\x02\u01D9\u01DB\t\x03\x02\x02\u01DA\u01D9\x03\x02\x02\x02\u01DA\u01DB' +
    '\x03\x02\x02\x02\u01DB\u01DC\x03\x02\x02\x02\u01DC\u01DD\x07`\x02\x02' +
    '\u01DDW\x03\x02\x02\x02\u01DE\u01E0\t\x03\x02\x02\u01DF\u01DE\x03\x02' +
    '\x02\x02\u01DF\u01E0\x03\x02\x02\x02\u01E0\u01E1\x03\x02\x02\x02\u01E1' +
    '\u01E2\x07b\x02\x02\u01E2Y\x03\x02\x02\x02\u01E3\u01E9\x05V,\x02\u01E4' +
    '\u01E9\x05X-\x02\u01E5\u01E9\x07^\x02\x02\u01E6\u01E9\x07_\x02\x02\u01E7' +
    '\u01E9\x07a\x02\x02\u01E8\u01E3\x03\x02\x02\x02\u01E8\u01E4\x03\x02\x02' +
    '\x02\u01E8\u01E5\x03\x02\x02\x02\u01E8\u01E6\x03\x02\x02\x02\u01E8\u01E7' +
    '\x03\x02\x02\x02\u01E9[\x03\x02\x02\x02\u01EA\u01EB\x05N(\x02\u01EB]\x03' +
    '\x02\x02\x02\u01EC\u01EF\x05p9\x02\u01ED\u01EF\x05N(\x02\u01EE\u01EC\x03' +
    '\x02\x02\x02\u01EE\u01ED\x03\x02\x02\x02\u01EF\u01F0\x03\x02\x02\x02\u01F0' +
    '\u01F1\x07W\x02\x02\u01F1\u01F2\x05P)\x02\u01F2\u01F3\x07X\x02\x02\u01F3' +
    '_\x03\x02\x02\x02\u01F4\u01F5\x07Y\x02\x02\u01F5\u01F6\x05P)\x02\u01F6' +
    '\u01F7\x07Z\x02\x02\u01F7a\x03\x02\x02\x02\u01F8\u01FB\x07v\x02\x02\u01F9' +
    '\u01FA\x07V\x02\x02\u01FA\u01FC\x05T+\x02\u01FB\u01F9\x03\x02\x02\x02' +
    '\u01FB\u01FC\x03\x02\x02\x02\u01FCc\x03\x02\x02\x02\u01FD\u0207\x03\x02' +
    '\x02\x02\u01FE\u0203\x05b2\x02\u01FF\u0200\x07 \x02\x02\u0200\u0202\x05' +
    'b2\x02\u0201\u01FF\x03\x02\x02\x02\u0202\u0205\x03\x02\x02\x02\u0203\u0201' +
    '\x03\x02\x02\x02\u0203\u0204\x03\x02\x02\x02\u0204\u0207\x03\x02\x02\x02' +
    '\u0205\u0203\x03\x02\x02\x02\u0206\u01FD\x03\x02\x02\x02\u0206\u01FE\x03' +
    '\x02\x02\x02\u0207e\x03\x02\x02\x02\u0208\u0209\x07v\x02\x02\u0209g\x03' +
    '\x02\x02\x02\u020A\u0214\x03\x02\x02\x02\u020B\u0210\x05f4\x02\u020C\u020D' +
    '\x07 \x02\x02\u020D\u020F\x05f4\x02\u020E\u020C\x03\x02\x02\x02\u020F' +
    '\u0212\x03\x02\x02\x02\u0210\u020E\x03\x02\x02\x02\u0210\u0211\x03\x02' +
    '\x02\x02\u0211\u0214\x03\x02\x02\x02\u0212\u0210\x03\x02\x02\x02\u0213' +
    '\u020A\x03\x02\x02\x02\u0213\u020B\x03\x02\x02\x02\u0214i\x03\x02\x02' +
    '\x02\u0215\u0216\x05T+\x02\u0216k\x03\x02\x02\x02\u0217\u0218\x07[\x02' +
    '\x02\u0218\u0219\x05d3\x02\u0219\u021A\x07\\\x02\x02\u021A\u021B\x07W' +
    '\x02\x02\u021B\u021C\x05h5\x02\u021C\u021D\x07X\x02\x02\u021D\u021E\x07' +
    'Y\x02\x02\u021E\u021F\x05j6\x02\u021F\u0220\x07Z\x02\x02\u0220m\x03\x02' +
    '\x02\x02\u0221\u0223\t\x06\x02\x02\u0222\u0221\x03\x02\x02\x02\u0222\u0223' +
    '\x03\x02\x02\x02\u0223\u022D\x03\x02\x02\x02\u0224\u0225\x07W\x02\x02' +
    '\u0225\u0226\x05T+\x02\u0226\u0227\x07X\x02\x02\u0227\u022E\x03\x02\x02' +
    '\x02\u0228\u022E\x05\\/\x02\u0229\u022E\x05Z.\x02\u022A\u022E\x05^0\x02' +
    '\u022B\u022E\x05`1\x02\u022C\u022E\x05l7\x02\u022D\u0224\x03\x02\x02\x02' +
    '\u022D\u0228\x03\x02\x02\x02\u022D\u0229\x03\x02\x02\x02\u022D\u022A\x03' +
    '\x02\x02\x02\u022D\u022B\x03\x02\x02\x02\u022D\u022C\x03\x02\x02\x02\u022E' +
    'o\x03\x02\x02\x02\u022F\u0230\t\x07\x02\x02\u0230q\x03\x02\x02\x02*sx' +
    '\x89\x8B\x91\x93\x99\x9B\xA4\xAA\xB1\xBB\xC5\xD9\u0120\u0124\u0131\u0135' +
    '\u0142\u0146\u0153\u015E\u018F\u019B\u01A1\u01A9\u01AC\u01D4\u01D6\u01DA' +
    '\u01DF\u01E8\u01EE\u01FB\u0203\u0206\u0210\u0213\u0222\u022D';
  public static __ATN: ATN;
  public static get _ATN(): ATN {
    if (!RulesParser.__ATN) {
      RulesParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(RulesParser._serializedATN));
    }

    return RulesParser.__ATN;
  }
}

export class CompilationUnitContext extends ParserRuleContext {
  public EOF(): TerminalNode {
    return this.getToken(RulesParser.EOF, 0);
  }
  public header(): HeaderContext | undefined {
    return this.tryGetRuleContext(0, HeaderContext);
  }
  public ruleDeclaration(): RuleDeclarationContext[];
  public ruleDeclaration(i: number): RuleDeclarationContext;
  public ruleDeclaration(i?: number): RuleDeclarationContext | RuleDeclarationContext[] {
    if (i === undefined) {
      return this.getRuleContexts(RuleDeclarationContext);
    } else {
      return this.getRuleContext(i, RuleDeclarationContext);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return RulesParser.RULE_compilationUnit;
  }
  // @Override
  public enterRule(listener: RulesListener): void {
    if (listener.enterCompilationUnit) {
      listener.enterCompilationUnit(this);
    }
  }
  // @Override
  public exitRule(listener: RulesListener): void {
    if (listener.exitCompilationUnit) {
      listener.exitCompilationUnit(this);
    }
  }
}

export class HeaderContext extends ParserRuleContext {
  public IDENTIFIER(): TerminalNode {
    return this.getToken(RulesParser.IDENTIFIER, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return RulesParser.RULE_header;
  }
  // @Override
  public enterRule(listener: RulesListener): void {
    if (listener.enterHeader) {
      listener.enterHeader(this);
    }
  }
  // @Override
  public exitRule(listener: RulesListener): void {
    if (listener.exitHeader) {
      listener.exitHeader(this);
    }
  }
}

export class RuleDeclarationContext extends ParserRuleContext {
  public STRINGLITERAL(): TerminalNode {
    return this.getToken(RulesParser.STRINGLITERAL, 0);
  }
  public sequence(): SequenceContext {
    return this.getRuleContext(0, SequenceContext);
  }
  public filterDeclaration(): FilterDeclarationContext[];
  public filterDeclaration(i: number): FilterDeclarationContext;
  public filterDeclaration(i?: number): FilterDeclarationContext | FilterDeclarationContext[] {
    if (i === undefined) {
      return this.getRuleContexts(FilterDeclarationContext);
    } else {
      return this.getRuleContext(i, FilterDeclarationContext);
    }
  }
  public transformationDeclaration(): TransformationDeclarationContext[];
  public transformationDeclaration(i: number): TransformationDeclarationContext;
  public transformationDeclaration(i?: number): TransformationDeclarationContext | TransformationDeclarationContext[] {
    if (i === undefined) {
      return this.getRuleContexts(TransformationDeclarationContext);
    } else {
      return this.getRuleContext(i, TransformationDeclarationContext);
    }
  }
  public conditionalActionDeclaration(): ConditionalActionDeclarationContext[];
  public conditionalActionDeclaration(i: number): ConditionalActionDeclarationContext;
  public conditionalActionDeclaration(
    i?: number,
  ): ConditionalActionDeclarationContext | ConditionalActionDeclarationContext[] {
    if (i === undefined) {
      return this.getRuleContexts(ConditionalActionDeclarationContext);
    } else {
      return this.getRuleContext(i, ConditionalActionDeclarationContext);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return RulesParser.RULE_ruleDeclaration;
  }
  // @Override
  public enterRule(listener: RulesListener): void {
    if (listener.enterRuleDeclaration) {
      listener.enterRuleDeclaration(this);
    }
  }
  // @Override
  public exitRule(listener: RulesListener): void {
    if (listener.exitRuleDeclaration) {
      listener.exitRuleDeclaration(this);
    }
  }
}

export class SequenceContext extends ParserRuleContext {
  public INTLITERAL(): TerminalNode {
    return this.getToken(RulesParser.INTLITERAL, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return RulesParser.RULE_sequence;
  }
  // @Override
  public enterRule(listener: RulesListener): void {
    if (listener.enterSequence) {
      listener.enterSequence(this);
    }
  }
  // @Override
  public exitRule(listener: RulesListener): void {
    if (listener.exitSequence) {
      listener.exitSequence(this);
    }
  }
}

export class FilterDeclarationContext extends ParserRuleContext {
  public variableName(): VariableNameContext {
    return this.getRuleContext(0, VariableNameContext);
  }
  public filterExpression(): FilterExpressionContext {
    return this.getRuleContext(0, FilterExpressionContext);
  }
  public property(): PropertyContext | undefined {
    return this.tryGetRuleContext(0, PropertyContext);
  }
  public relatedConditionVariable(): RelatedConditionVariableContext | undefined {
    return this.tryGetRuleContext(0, RelatedConditionVariableContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return RulesParser.RULE_filterDeclaration;
  }
  // @Override
  public enterRule(listener: RulesListener): void {
    if (listener.enterFilterDeclaration) {
      listener.enterFilterDeclaration(this);
    }
  }
  // @Override
  public exitRule(listener: RulesListener): void {
    if (listener.exitFilterDeclaration) {
      listener.exitFilterDeclaration(this);
    }
  }
}

export class PropertyContext extends ParserRuleContext {
  public IDENTIFIER(): TerminalNode {
    return this.getToken(RulesParser.IDENTIFIER, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return RulesParser.RULE_property;
  }
  // @Override
  public enterRule(listener: RulesListener): void {
    if (listener.enterProperty) {
      listener.enterProperty(this);
    }
  }
  // @Override
  public exitRule(listener: RulesListener): void {
    if (listener.exitProperty) {
      listener.exitProperty(this);
    }
  }
}

export class FilterExpressionContext extends ParserRuleContext {
  public OBJECT_TYPE(): TerminalNode {
    return this.getToken(RulesParser.OBJECT_TYPE, 0);
  }
  public LPAREN(): TerminalNode {
    return this.getToken(RulesParser.LPAREN, 0);
  }
  public RPAREN(): TerminalNode {
    return this.getToken(RulesParser.RPAREN, 0);
  }
  public expression(): ExpressionContext | undefined {
    return this.tryGetRuleContext(0, ExpressionContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return RulesParser.RULE_filterExpression;
  }
  // @Override
  public enterRule(listener: RulesListener): void {
    if (listener.enterFilterExpression) {
      listener.enterFilterExpression(this);
    }
  }
  // @Override
  public exitRule(listener: RulesListener): void {
    if (listener.exitFilterExpression) {
      listener.exitFilterExpression(this);
    }
  }
}

export class TransformationDeclarationContext extends ParserRuleContext {
  public IDENTIFIER(): TerminalNode {
    return this.getToken(RulesParser.IDENTIFIER, 0);
  }
  public transformationStatement(): TransformationStatementContext {
    return this.getRuleContext(0, TransformationStatementContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return RulesParser.RULE_transformationDeclaration;
  }
  // @Override
  public enterRule(listener: RulesListener): void {
    if (listener.enterTransformationDeclaration) {
      listener.enterTransformationDeclaration(this);
    }
  }
  // @Override
  public exitRule(listener: RulesListener): void {
    if (listener.exitTransformationDeclaration) {
      listener.exitTransformationDeclaration(this);
    }
  }
}

export class TransformationStatementContext extends ParserRuleContext {
  public expression(): ExpressionContext | undefined {
    return this.tryGetRuleContext(0, ExpressionContext);
  }
  public script(): ScriptContext | undefined {
    return this.tryGetRuleContext(0, ScriptContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return RulesParser.RULE_transformationStatement;
  }
  // @Override
  public enterRule(listener: RulesListener): void {
    if (listener.enterTransformationStatement) {
      listener.enterTransformationStatement(this);
    }
  }
  // @Override
  public exitRule(listener: RulesListener): void {
    if (listener.exitTransformationStatement) {
      listener.exitTransformationStatement(this);
    }
  }
}

export class ScriptContext extends ParserRuleContext {
  public SCRIPT_TEXT(): TerminalNode {
    return this.getToken(RulesParser.SCRIPT_TEXT, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return RulesParser.RULE_script;
  }
  // @Override
  public enterRule(listener: RulesListener): void {
    if (listener.enterScript) {
      listener.enterScript(this);
    }
  }
  // @Override
  public exitRule(listener: RulesListener): void {
    if (listener.exitScript) {
      listener.exitScript(this);
    }
  }
}

export class ConditionalActionDeclarationContext extends ParserRuleContext {
  public actionDeclaration(): ActionDeclarationContext {
    return this.getRuleContext(0, ActionDeclarationContext);
  }
  public LPAREN(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.LPAREN, 0);
  }
  public expression(): ExpressionContext | undefined {
    return this.tryGetRuleContext(0, ExpressionContext);
  }
  public RPAREN(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.RPAREN, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return RulesParser.RULE_conditionalActionDeclaration;
  }
  // @Override
  public enterRule(listener: RulesListener): void {
    if (listener.enterConditionalActionDeclaration) {
      listener.enterConditionalActionDeclaration(this);
    }
  }
  // @Override
  public exitRule(listener: RulesListener): void {
    if (listener.exitConditionalActionDeclaration) {
      listener.exitConditionalActionDeclaration(this);
    }
  }
}

export class ActionDeclarationContext extends ParserRuleContext {
  public removePropertyAction(): RemovePropertyActionContext | undefined {
    return this.tryGetRuleContext(0, RemovePropertyActionContext);
  }
  public setPropertyAction(): SetPropertyActionContext | undefined {
    return this.tryGetRuleContext(0, SetPropertyActionContext);
  }
  public setFieldValueAction(): SetFieldValueActionContext | undefined {
    return this.tryGetRuleContext(0, SetFieldValueActionContext);
  }
  public addMessageAction(): AddMessageActionContext | undefined {
    return this.tryGetRuleContext(0, AddMessageActionContext);
  }
  public addApprovalDataAction(): AddApprovalDataActionContext | undefined {
    return this.tryGetRuleContext(0, AddApprovalDataActionContext);
  }
  public setStartDateAction(): SetStartDateActionContext | undefined {
    return this.tryGetRuleContext(0, SetStartDateActionContext);
  }
  public setEndDateAction(): SetEndDateActionContext | undefined {
    return this.tryGetRuleContext(0, SetEndDateActionContext);
  }
  public setEffectiveDateAction(): SetEffectiveDateActionContext | undefined {
    return this.tryGetRuleContext(0, SetEffectiveDateActionContext);
  }
  public adjustCostAction(): AdjustCostActionContext | undefined {
    return this.tryGetRuleContext(0, AdjustCostActionContext);
  }
  public adjustPriceAction(): AdjustPriceActionContext | undefined {
    return this.tryGetRuleContext(0, AdjustPriceActionContext);
  }
  public adjustListPriceAction(): AdjustListPriceActionContext | undefined {
    return this.tryGetRuleContext(0, AdjustListPriceActionContext);
  }
  public setMetricAction(): SetMetricActionContext | undefined {
    return this.tryGetRuleContext(0, SetMetricActionContext);
  }
  public setScore(): SetScoreContext | undefined {
    return this.tryGetRuleContext(0, SetScoreContext);
  }
  public eligibilityCondition(): EligibilityConditionContext | undefined {
    return this.tryGetRuleContext(0, EligibilityConditionContext);
  }
  public eligibilityAll(): EligibilityAllContext | undefined {
    return this.tryGetRuleContext(0, EligibilityAllContext);
  }
  public eligibilityMessage(): EligibilityMessageContext | undefined {
    return this.tryGetRuleContext(0, EligibilityMessageContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return RulesParser.RULE_actionDeclaration;
  }
  // @Override
  public enterRule(listener: RulesListener): void {
    if (listener.enterActionDeclaration) {
      listener.enterActionDeclaration(this);
    }
  }
  // @Override
  public exitRule(listener: RulesListener): void {
    if (listener.exitActionDeclaration) {
      listener.exitActionDeclaration(this);
    }
  }
}

export class SetPropertyActionContext extends ParserRuleContext {
  public variableName(): VariableNameContext {
    return this.getRuleContext(0, VariableNameContext);
  }
  public DOT(): TerminalNode {
    return this.getToken(RulesParser.DOT, 0);
  }
  public LPAREN(): TerminalNode {
    return this.getToken(RulesParser.LPAREN, 0);
  }
  public targetFieldName(): TargetFieldNameContext {
    return this.getRuleContext(0, TargetFieldNameContext);
  }
  public COMMA(): TerminalNode {
    return this.getToken(RulesParser.COMMA, 0);
  }
  public value(): ValueContext {
    return this.getRuleContext(0, ValueContext);
  }
  public RPAREN(): TerminalNode {
    return this.getToken(RulesParser.RPAREN, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return RulesParser.RULE_setPropertyAction;
  }
  // @Override
  public enterRule(listener: RulesListener): void {
    if (listener.enterSetPropertyAction) {
      listener.enterSetPropertyAction(this);
    }
  }
  // @Override
  public exitRule(listener: RulesListener): void {
    if (listener.exitSetPropertyAction) {
      listener.exitSetPropertyAction(this);
    }
  }
}

export class RemovePropertyActionContext extends ParserRuleContext {
  public variableName(): VariableNameContext {
    return this.getRuleContext(0, VariableNameContext);
  }
  public DOT(): TerminalNode {
    return this.getToken(RulesParser.DOT, 0);
  }
  public LPAREN(): TerminalNode {
    return this.getToken(RulesParser.LPAREN, 0);
  }
  public targetFieldName(): TargetFieldNameContext {
    return this.getRuleContext(0, TargetFieldNameContext);
  }
  public RPAREN(): TerminalNode {
    return this.getToken(RulesParser.RPAREN, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return RulesParser.RULE_removePropertyAction;
  }
  // @Override
  public enterRule(listener: RulesListener): void {
    if (listener.enterRemovePropertyAction) {
      listener.enterRemovePropertyAction(this);
    }
  }
  // @Override
  public exitRule(listener: RulesListener): void {
    if (listener.exitRemovePropertyAction) {
      listener.exitRemovePropertyAction(this);
    }
  }
}

export class SetFieldValueActionContext extends ParserRuleContext {
  public variableName(): VariableNameContext {
    return this.getRuleContext(0, VariableNameContext);
  }
  public DOT(): TerminalNode {
    return this.getToken(RulesParser.DOT, 0);
  }
  public LPAREN(): TerminalNode {
    return this.getToken(RulesParser.LPAREN, 0);
  }
  public targetFieldName(): TargetFieldNameContext {
    return this.getRuleContext(0, TargetFieldNameContext);
  }
  public COMMA(): TerminalNode {
    return this.getToken(RulesParser.COMMA, 0);
  }
  public value(): ValueContext {
    return this.getRuleContext(0, ValueContext);
  }
  public RPAREN(): TerminalNode {
    return this.getToken(RulesParser.RPAREN, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return RulesParser.RULE_setFieldValueAction;
  }
  // @Override
  public enterRule(listener: RulesListener): void {
    if (listener.enterSetFieldValueAction) {
      listener.enterSetFieldValueAction(this);
    }
  }
  // @Override
  public exitRule(listener: RulesListener): void {
    if (listener.exitSetFieldValueAction) {
      listener.exitSetFieldValueAction(this);
    }
  }
}

export class SetScoreContext extends ParserRuleContext {
  public variableName(): VariableNameContext {
    return this.getRuleContext(0, VariableNameContext);
  }
  public DOT(): TerminalNode {
    return this.getToken(RulesParser.DOT, 0);
  }
  public LPAREN(): TerminalNode {
    return this.getToken(RulesParser.LPAREN, 0);
  }
  public value(): ValueContext {
    return this.getRuleContext(0, ValueContext);
  }
  public RPAREN(): TerminalNode {
    return this.getToken(RulesParser.RPAREN, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return RulesParser.RULE_setScore;
  }
  // @Override
  public enterRule(listener: RulesListener): void {
    if (listener.enterSetScore) {
      listener.enterSetScore(this);
    }
  }
  // @Override
  public exitRule(listener: RulesListener): void {
    if (listener.exitSetScore) {
      listener.exitSetScore(this);
    }
  }
}

export class AddMessageActionContext extends ParserRuleContext {
  public variableName(): VariableNameContext {
    return this.getRuleContext(0, VariableNameContext);
  }
  public DOT(): TerminalNode {
    return this.getToken(RulesParser.DOT, 0);
  }
  public LPAREN(): TerminalNode {
    return this.getToken(RulesParser.LPAREN, 0);
  }
  public value(): ValueContext {
    return this.getRuleContext(0, ValueContext);
  }
  public RPAREN(): TerminalNode {
    return this.getToken(RulesParser.RPAREN, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return RulesParser.RULE_addMessageAction;
  }
  // @Override
  public enterRule(listener: RulesListener): void {
    if (listener.enterAddMessageAction) {
      listener.enterAddMessageAction(this);
    }
  }
  // @Override
  public exitRule(listener: RulesListener): void {
    if (listener.exitAddMessageAction) {
      listener.exitAddMessageAction(this);
    }
  }
}

export class SetStartDateActionContext extends ParserRuleContext {
  public variableName(): VariableNameContext {
    return this.getRuleContext(0, VariableNameContext);
  }
  public DOT(): TerminalNode {
    return this.getToken(RulesParser.DOT, 0);
  }
  public LPAREN(): TerminalNode {
    return this.getToken(RulesParser.LPAREN, 0);
  }
  public transformationVariable(): TransformationVariableContext {
    return this.getRuleContext(0, TransformationVariableContext);
  }
  public RPAREN(): TerminalNode {
    return this.getToken(RulesParser.RPAREN, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return RulesParser.RULE_setStartDateAction;
  }
  // @Override
  public enterRule(listener: RulesListener): void {
    if (listener.enterSetStartDateAction) {
      listener.enterSetStartDateAction(this);
    }
  }
  // @Override
  public exitRule(listener: RulesListener): void {
    if (listener.exitSetStartDateAction) {
      listener.exitSetStartDateAction(this);
    }
  }
}

export class SetEndDateActionContext extends ParserRuleContext {
  public variableName(): VariableNameContext {
    return this.getRuleContext(0, VariableNameContext);
  }
  public DOT(): TerminalNode {
    return this.getToken(RulesParser.DOT, 0);
  }
  public LPAREN(): TerminalNode {
    return this.getToken(RulesParser.LPAREN, 0);
  }
  public transformationVariable(): TransformationVariableContext {
    return this.getRuleContext(0, TransformationVariableContext);
  }
  public RPAREN(): TerminalNode {
    return this.getToken(RulesParser.RPAREN, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return RulesParser.RULE_setEndDateAction;
  }
  // @Override
  public enterRule(listener: RulesListener): void {
    if (listener.enterSetEndDateAction) {
      listener.enterSetEndDateAction(this);
    }
  }
  // @Override
  public exitRule(listener: RulesListener): void {
    if (listener.exitSetEndDateAction) {
      listener.exitSetEndDateAction(this);
    }
  }
}

export class SetEffectiveDateActionContext extends ParserRuleContext {
  public variableName(): VariableNameContext {
    return this.getRuleContext(0, VariableNameContext);
  }
  public DOT(): TerminalNode {
    return this.getToken(RulesParser.DOT, 0);
  }
  public LPAREN(): TerminalNode {
    return this.getToken(RulesParser.LPAREN, 0);
  }
  public transformationVariable(): TransformationVariableContext {
    return this.getRuleContext(0, TransformationVariableContext);
  }
  public RPAREN(): TerminalNode {
    return this.getToken(RulesParser.RPAREN, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return RulesParser.RULE_setEffectiveDateAction;
  }
  // @Override
  public enterRule(listener: RulesListener): void {
    if (listener.enterSetEffectiveDateAction) {
      listener.enterSetEffectiveDateAction(this);
    }
  }
  // @Override
  public exitRule(listener: RulesListener): void {
    if (listener.exitSetEffectiveDateAction) {
      listener.exitSetEffectiveDateAction(this);
    }
  }
}

export class AdjustCostActionContext extends ParserRuleContext {
  public variableName(): VariableNameContext {
    return this.getRuleContext(0, VariableNameContext);
  }
  public DOT(): TerminalNode {
    return this.getToken(RulesParser.DOT, 0);
  }
  public LPAREN(): TerminalNode {
    return this.getToken(RulesParser.LPAREN, 0);
  }
  public ACTION_TYPE(): TerminalNode {
    return this.getToken(RulesParser.ACTION_TYPE, 0);
  }
  public COMMA(): TerminalNode[];
  public COMMA(i: number): TerminalNode;
  public COMMA(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(RulesParser.COMMA);
    } else {
      return this.getToken(RulesParser.COMMA, i);
    }
  }
  public value(): ValueContext {
    return this.getRuleContext(0, ValueContext);
  }
  public RPAREN(): TerminalNode {
    return this.getToken(RulesParser.RPAREN, 0);
  }
  public explanation(): ExplanationContext | undefined {
    return this.tryGetRuleContext(0, ExplanationContext);
  }
  public allowOverride(): AllowOverrideContext | undefined {
    return this.tryGetRuleContext(0, AllowOverrideContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return RulesParser.RULE_adjustCostAction;
  }
  // @Override
  public enterRule(listener: RulesListener): void {
    if (listener.enterAdjustCostAction) {
      listener.enterAdjustCostAction(this);
    }
  }
  // @Override
  public exitRule(listener: RulesListener): void {
    if (listener.exitAdjustCostAction) {
      listener.exitAdjustCostAction(this);
    }
  }
}

export class AdjustPriceActionContext extends ParserRuleContext {
  public variableName(): VariableNameContext {
    return this.getRuleContext(0, VariableNameContext);
  }
  public DOT(): TerminalNode {
    return this.getToken(RulesParser.DOT, 0);
  }
  public LPAREN(): TerminalNode {
    return this.getToken(RulesParser.LPAREN, 0);
  }
  public ACTION_TYPE(): TerminalNode {
    return this.getToken(RulesParser.ACTION_TYPE, 0);
  }
  public COMMA(): TerminalNode[];
  public COMMA(i: number): TerminalNode;
  public COMMA(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(RulesParser.COMMA);
    } else {
      return this.getToken(RulesParser.COMMA, i);
    }
  }
  public value(): ValueContext {
    return this.getRuleContext(0, ValueContext);
  }
  public RPAREN(): TerminalNode {
    return this.getToken(RulesParser.RPAREN, 0);
  }
  public explanation(): ExplanationContext | undefined {
    return this.tryGetRuleContext(0, ExplanationContext);
  }
  public allowOverride(): AllowOverrideContext | undefined {
    return this.tryGetRuleContext(0, AllowOverrideContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return RulesParser.RULE_adjustPriceAction;
  }
  // @Override
  public enterRule(listener: RulesListener): void {
    if (listener.enterAdjustPriceAction) {
      listener.enterAdjustPriceAction(this);
    }
  }
  // @Override
  public exitRule(listener: RulesListener): void {
    if (listener.exitAdjustPriceAction) {
      listener.exitAdjustPriceAction(this);
    }
  }
}

export class AdjustListPriceActionContext extends ParserRuleContext {
  public variableName(): VariableNameContext {
    return this.getRuleContext(0, VariableNameContext);
  }
  public DOT(): TerminalNode {
    return this.getToken(RulesParser.DOT, 0);
  }
  public LPAREN(): TerminalNode {
    return this.getToken(RulesParser.LPAREN, 0);
  }
  public ACTION_TYPE(): TerminalNode {
    return this.getToken(RulesParser.ACTION_TYPE, 0);
  }
  public COMMA(): TerminalNode[];
  public COMMA(i: number): TerminalNode;
  public COMMA(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(RulesParser.COMMA);
    } else {
      return this.getToken(RulesParser.COMMA, i);
    }
  }
  public value(): ValueContext {
    return this.getRuleContext(0, ValueContext);
  }
  public RPAREN(): TerminalNode {
    return this.getToken(RulesParser.RPAREN, 0);
  }
  public explanation(): ExplanationContext | undefined {
    return this.tryGetRuleContext(0, ExplanationContext);
  }
  public allowOverride(): AllowOverrideContext | undefined {
    return this.tryGetRuleContext(0, AllowOverrideContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return RulesParser.RULE_adjustListPriceAction;
  }
  // @Override
  public enterRule(listener: RulesListener): void {
    if (listener.enterAdjustListPriceAction) {
      listener.enterAdjustListPriceAction(this);
    }
  }
  // @Override
  public exitRule(listener: RulesListener): void {
    if (listener.exitAdjustListPriceAction) {
      listener.exitAdjustListPriceAction(this);
    }
  }
}

export class SetMetricActionContext extends ParserRuleContext {
  public variableName(): VariableNameContext {
    return this.getRuleContext(0, VariableNameContext);
  }
  public DOT(): TerminalNode {
    return this.getToken(RulesParser.DOT, 0);
  }
  public LPAREN(): TerminalNode {
    return this.getToken(RulesParser.LPAREN, 0);
  }
  public metricName(): MetricNameContext {
    return this.getRuleContext(0, MetricNameContext);
  }
  public COMMA(): TerminalNode[];
  public COMMA(i: number): TerminalNode;
  public COMMA(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(RulesParser.COMMA);
    } else {
      return this.getToken(RulesParser.COMMA, i);
    }
  }
  public transformationVariable(): TransformationVariableContext {
    return this.getRuleContext(0, TransformationVariableContext);
  }
  public RPAREN(): TerminalNode {
    return this.getToken(RulesParser.RPAREN, 0);
  }
  public totalMetricName(): TotalMetricNameContext | undefined {
    return this.tryGetRuleContext(0, TotalMetricNameContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return RulesParser.RULE_setMetricAction;
  }
  // @Override
  public enterRule(listener: RulesListener): void {
    if (listener.enterSetMetricAction) {
      listener.enterSetMetricAction(this);
    }
  }
  // @Override
  public exitRule(listener: RulesListener): void {
    if (listener.exitSetMetricAction) {
      listener.exitSetMetricAction(this);
    }
  }
}

export class AddApprovalDataActionContext extends ParserRuleContext {
  public variableName(): VariableNameContext {
    return this.getRuleContext(0, VariableNameContext);
  }
  public DOT(): TerminalNode {
    return this.getToken(RulesParser.DOT, 0);
  }
  public LPAREN(): TerminalNode {
    return this.getToken(RulesParser.LPAREN, 0);
  }
  public value(): ValueContext[];
  public value(i: number): ValueContext;
  public value(i?: number): ValueContext | ValueContext[] {
    if (i === undefined) {
      return this.getRuleContexts(ValueContext);
    } else {
      return this.getRuleContext(i, ValueContext);
    }
  }
  public RPAREN(): TerminalNode {
    return this.getToken(RulesParser.RPAREN, 0);
  }
  public COMMA(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.COMMA, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return RulesParser.RULE_addApprovalDataAction;
  }
  // @Override
  public enterRule(listener: RulesListener): void {
    if (listener.enterAddApprovalDataAction) {
      listener.enterAddApprovalDataAction(this);
    }
  }
  // @Override
  public exitRule(listener: RulesListener): void {
    if (listener.exitAddApprovalDataAction) {
      listener.exitAddApprovalDataAction(this);
    }
  }
}

export class EligibilityConditionContext extends ParserRuleContext {
  public variableName(): VariableNameContext {
    return this.getRuleContext(0, VariableNameContext);
  }
  public DOT(): TerminalNode {
    return this.getToken(RulesParser.DOT, 0);
  }
  public LPAREN(): TerminalNode {
    return this.getToken(RulesParser.LPAREN, 0);
  }
  public value(): ValueContext {
    return this.getRuleContext(0, ValueContext);
  }
  public RPAREN(): TerminalNode {
    return this.getToken(RulesParser.RPAREN, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return RulesParser.RULE_eligibilityCondition;
  }
  // @Override
  public enterRule(listener: RulesListener): void {
    if (listener.enterEligibilityCondition) {
      listener.enterEligibilityCondition(this);
    }
  }
  // @Override
  public exitRule(listener: RulesListener): void {
    if (listener.exitEligibilityCondition) {
      listener.exitEligibilityCondition(this);
    }
  }
}

export class EligibilityAllContext extends ParserRuleContext {
  public variableName(): VariableNameContext {
    return this.getRuleContext(0, VariableNameContext);
  }
  public DOT(): TerminalNode {
    return this.getToken(RulesParser.DOT, 0);
  }
  public LPAREN(): TerminalNode {
    return this.getToken(RulesParser.LPAREN, 0);
  }
  public value(): ValueContext[];
  public value(i: number): ValueContext;
  public value(i?: number): ValueContext | ValueContext[] {
    if (i === undefined) {
      return this.getRuleContexts(ValueContext);
    } else {
      return this.getRuleContext(i, ValueContext);
    }
  }
  public COMMA(): TerminalNode[];
  public COMMA(i: number): TerminalNode;
  public COMMA(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(RulesParser.COMMA);
    } else {
      return this.getToken(RulesParser.COMMA, i);
    }
  }
  public RPAREN(): TerminalNode {
    return this.getToken(RulesParser.RPAREN, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return RulesParser.RULE_eligibilityAll;
  }
  // @Override
  public enterRule(listener: RulesListener): void {
    if (listener.enterEligibilityAll) {
      listener.enterEligibilityAll(this);
    }
  }
  // @Override
  public exitRule(listener: RulesListener): void {
    if (listener.exitEligibilityAll) {
      listener.exitEligibilityAll(this);
    }
  }
}

export class EligibilityMessageContext extends ParserRuleContext {
  public variableName(): VariableNameContext {
    return this.getRuleContext(0, VariableNameContext);
  }
  public DOT(): TerminalNode {
    return this.getToken(RulesParser.DOT, 0);
  }
  public LPAREN(): TerminalNode {
    return this.getToken(RulesParser.LPAREN, 0);
  }
  public value(): ValueContext[];
  public value(i: number): ValueContext;
  public value(i?: number): ValueContext | ValueContext[] {
    if (i === undefined) {
      return this.getRuleContexts(ValueContext);
    } else {
      return this.getRuleContext(i, ValueContext);
    }
  }
  public COMMA(): TerminalNode[];
  public COMMA(i: number): TerminalNode;
  public COMMA(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(RulesParser.COMMA);
    } else {
      return this.getToken(RulesParser.COMMA, i);
    }
  }
  public RPAREN(): TerminalNode {
    return this.getToken(RulesParser.RPAREN, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return RulesParser.RULE_eligibilityMessage;
  }
  // @Override
  public enterRule(listener: RulesListener): void {
    if (listener.enterEligibilityMessage) {
      listener.enterEligibilityMessage(this);
    }
  }
  // @Override
  public exitRule(listener: RulesListener): void {
    if (listener.exitEligibilityMessage) {
      listener.exitEligibilityMessage(this);
    }
  }
}

export class MetricNameContext extends ParserRuleContext {
  public IDENTIFIER(): TerminalNode {
    return this.getToken(RulesParser.IDENTIFIER, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return RulesParser.RULE_metricName;
  }
  // @Override
  public enterRule(listener: RulesListener): void {
    if (listener.enterMetricName) {
      listener.enterMetricName(this);
    }
  }
  // @Override
  public exitRule(listener: RulesListener): void {
    if (listener.exitMetricName) {
      listener.exitMetricName(this);
    }
  }
}

export class TotalMetricNameContext extends ParserRuleContext {
  public IDENTIFIER(): TerminalNode {
    return this.getToken(RulesParser.IDENTIFIER, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return RulesParser.RULE_totalMetricName;
  }
  // @Override
  public enterRule(listener: RulesListener): void {
    if (listener.enterTotalMetricName) {
      listener.enterTotalMetricName(this);
    }
  }
  // @Override
  public exitRule(listener: RulesListener): void {
    if (listener.exitTotalMetricName) {
      listener.exitTotalMetricName(this);
    }
  }
}

export class TransformationVariableContext extends ParserRuleContext {
  public IDENTIFIER(): TerminalNode {
    return this.getToken(RulesParser.IDENTIFIER, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return RulesParser.RULE_transformationVariable;
  }
  // @Override
  public enterRule(listener: RulesListener): void {
    if (listener.enterTransformationVariable) {
      listener.enterTransformationVariable(this);
    }
  }
  // @Override
  public exitRule(listener: RulesListener): void {
    if (listener.exitTransformationVariable) {
      listener.exitTransformationVariable(this);
    }
  }
}

export class VariableNameContext extends ParserRuleContext {
  public IDENTIFIER(): TerminalNode {
    return this.getToken(RulesParser.IDENTIFIER, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return RulesParser.RULE_variableName;
  }
  // @Override
  public enterRule(listener: RulesListener): void {
    if (listener.enterVariableName) {
      listener.enterVariableName(this);
    }
  }
  // @Override
  public exitRule(listener: RulesListener): void {
    if (listener.exitVariableName) {
      listener.exitVariableName(this);
    }
  }
}

export class RelatedConditionVariableContext extends ParserRuleContext {
  public IDENTIFIER(): TerminalNode {
    return this.getToken(RulesParser.IDENTIFIER, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return RulesParser.RULE_relatedConditionVariable;
  }
  // @Override
  public enterRule(listener: RulesListener): void {
    if (listener.enterRelatedConditionVariable) {
      listener.enterRelatedConditionVariable(this);
    }
  }
  // @Override
  public exitRule(listener: RulesListener): void {
    if (listener.exitRelatedConditionVariable) {
      listener.exitRelatedConditionVariable(this);
    }
  }
}

export class TargetFieldNameContext extends ParserRuleContext {
  public IDENTIFIER(): TerminalNode {
    return this.getToken(RulesParser.IDENTIFIER, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return RulesParser.RULE_targetFieldName;
  }
  // @Override
  public enterRule(listener: RulesListener): void {
    if (listener.enterTargetFieldName) {
      listener.enterTargetFieldName(this);
    }
  }
  // @Override
  public exitRule(listener: RulesListener): void {
    if (listener.exitTargetFieldName) {
      listener.exitTargetFieldName(this);
    }
  }
}

export class ExplanationContext extends ParserRuleContext {
  public STRINGLITERAL(): TerminalNode {
    return this.getToken(RulesParser.STRINGLITERAL, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return RulesParser.RULE_explanation;
  }
  // @Override
  public enterRule(listener: RulesListener): void {
    if (listener.enterExplanation) {
      listener.enterExplanation(this);
    }
  }
  // @Override
  public exitRule(listener: RulesListener): void {
    if (listener.exitExplanation) {
      listener.exitExplanation(this);
    }
  }
}

export class ValueContext extends ParserRuleContext {
  public literalExpression(): LiteralExpressionContext | undefined {
    return this.tryGetRuleContext(0, LiteralExpressionContext);
  }
  public transformationVariable(): TransformationVariableContext | undefined {
    return this.tryGetRuleContext(0, TransformationVariableContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return RulesParser.RULE_value;
  }
  // @Override
  public enterRule(listener: RulesListener): void {
    if (listener.enterValue) {
      listener.enterValue(this);
    }
  }
  // @Override
  public exitRule(listener: RulesListener): void {
    if (listener.exitValue) {
      listener.exitValue(this);
    }
  }
}

export class AllowOverrideContext extends ParserRuleContext {
  public BOOLLITERAL(): TerminalNode {
    return this.getToken(RulesParser.BOOLLITERAL, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return RulesParser.RULE_allowOverride;
  }
  // @Override
  public enterRule(listener: RulesListener): void {
    if (listener.enterAllowOverride) {
      listener.enterAllowOverride(this);
    }
  }
  // @Override
  public exitRule(listener: RulesListener): void {
    if (listener.exitAllowOverride) {
      listener.exitAllowOverride(this);
    }
  }
}

export class ExpressionRootContext extends ParserRuleContext {
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext);
  }
  public EOF(): TerminalNode {
    return this.getToken(RulesParser.EOF, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return RulesParser.RULE_expressionRoot;
  }
  // @Override
  public enterRule(listener: RulesListener): void {
    if (listener.enterExpressionRoot) {
      listener.enterExpressionRoot(this);
    }
  }
  // @Override
  public exitRule(listener: RulesListener): void {
    if (listener.exitExpressionRoot) {
      listener.exitExpressionRoot(this);
    }
  }
}

export class QualifiedIdentifierContext extends ParserRuleContext {
  public IDENTIFIER(): TerminalNode[];
  public IDENTIFIER(i: number): TerminalNode;
  public IDENTIFIER(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(RulesParser.IDENTIFIER);
    } else {
      return this.getToken(RulesParser.IDENTIFIER, i);
    }
  }
  public DOT(): TerminalNode[];
  public DOT(i: number): TerminalNode;
  public DOT(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(RulesParser.DOT);
    } else {
      return this.getToken(RulesParser.DOT, i);
    }
  }
  public LSQBR(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.LSQBR, 0);
  }
  public STRINGLITERAL(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.STRINGLITERAL, 0);
  }
  public RSQBR(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.RSQBR, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return RulesParser.RULE_qualifiedIdentifier;
  }
  // @Override
  public enterRule(listener: RulesListener): void {
    if (listener.enterQualifiedIdentifier) {
      listener.enterQualifiedIdentifier(this);
    }
  }
  // @Override
  public exitRule(listener: RulesListener): void {
    if (listener.exitQualifiedIdentifier) {
      listener.exitQualifiedIdentifier(this);
    }
  }
}

export class ExpressionListContext extends ParserRuleContext {
  public expression(): ExpressionContext[];
  public expression(i: number): ExpressionContext;
  public expression(i?: number): ExpressionContext | ExpressionContext[] {
    if (i === undefined) {
      return this.getRuleContexts(ExpressionContext);
    } else {
      return this.getRuleContext(i, ExpressionContext);
    }
  }
  public COMMA(): TerminalNode[];
  public COMMA(i: number): TerminalNode;
  public COMMA(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(RulesParser.COMMA);
    } else {
      return this.getToken(RulesParser.COMMA, i);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return RulesParser.RULE_expressionList;
  }
  // @Override
  public enterRule(listener: RulesListener): void {
    if (listener.enterExpressionList) {
      listener.enterExpressionList(this);
    }
  }
  // @Override
  public exitRule(listener: RulesListener): void {
    if (listener.exitExpressionList) {
      listener.exitExpressionList(this);
    }
  }
}

export class OptionalExpressionContext extends ParserRuleContext {
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return RulesParser.RULE_optionalExpression;
  }
  // @Override
  public enterRule(listener: RulesListener): void {
    if (listener.enterOptionalExpression) {
      listener.enterOptionalExpression(this);
    }
  }
  // @Override
  public exitRule(listener: RulesListener): void {
    if (listener.exitOptionalExpression) {
      listener.exitOptionalExpression(this);
    }
  }
}

export class ExpressionContext extends ParserRuleContext {
  public primaryExpression(): PrimaryExpressionContext | undefined {
    return this.tryGetRuleContext(0, PrimaryExpressionContext);
  }
  public expression(): ExpressionContext[];
  public expression(i: number): ExpressionContext;
  public expression(i?: number): ExpressionContext | ExpressionContext[] {
    if (i === undefined) {
      return this.getRuleContexts(ExpressionContext);
    } else {
      return this.getRuleContext(i, ExpressionContext);
    }
  }
  public COND(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.COND, 0);
  }
  public optionalExpression(): OptionalExpressionContext[];
  public optionalExpression(i: number): OptionalExpressionContext;
  public optionalExpression(i?: number): OptionalExpressionContext | OptionalExpressionContext[] {
    if (i === undefined) {
      return this.getRuleContexts(OptionalExpressionContext);
    } else {
      return this.getRuleContext(i, OptionalExpressionContext);
    }
  }
  public POW(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.POW, 0);
  }
  public TIMES(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.TIMES, 0);
  }
  public DIVIDE(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.DIVIDE, 0);
  }
  public DIV(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.DIV, 0);
  }
  public MOD(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.MOD, 0);
  }
  public PLUS(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.PLUS, 0);
  }
  public MINUS(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.MINUS, 0);
  }
  public LE(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.LE, 0);
  }
  public GE(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.GE, 0);
  }
  public LT(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.LT, 0);
  }
  public GT(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.GT, 0);
  }
  public EQ(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.EQ, 0);
  }
  public NE(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.NE, 0);
  }
  public MATCH(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.MATCH, 0);
  }
  public IN(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.IN, 0);
  }
  public AND(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.AND, 0);
  }
  public OR(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.OR, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return RulesParser.RULE_expression;
  }
  // @Override
  public enterRule(listener: RulesListener): void {
    if (listener.enterExpression) {
      listener.enterExpression(this);
    }
  }
  // @Override
  public exitRule(listener: RulesListener): void {
    if (listener.exitExpression) {
      listener.exitExpression(this);
    }
  }
}

export class IntConstantContext extends ParserRuleContext {
  public INTLITERAL(): TerminalNode {
    return this.getToken(RulesParser.INTLITERAL, 0);
  }
  public PLUS(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.PLUS, 0);
  }
  public MINUS(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.MINUS, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return RulesParser.RULE_intConstant;
  }
  // @Override
  public enterRule(listener: RulesListener): void {
    if (listener.enterIntConstant) {
      listener.enterIntConstant(this);
    }
  }
  // @Override
  public exitRule(listener: RulesListener): void {
    if (listener.exitIntConstant) {
      listener.exitIntConstant(this);
    }
  }
}

export class DoubleConstantContext extends ParserRuleContext {
  public DOUBLELITERAL(): TerminalNode {
    return this.getToken(RulesParser.DOUBLELITERAL, 0);
  }
  public PLUS(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.PLUS, 0);
  }
  public MINUS(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.MINUS, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return RulesParser.RULE_doubleConstant;
  }
  // @Override
  public enterRule(listener: RulesListener): void {
    if (listener.enterDoubleConstant) {
      listener.enterDoubleConstant(this);
    }
  }
  // @Override
  public exitRule(listener: RulesListener): void {
    if (listener.exitDoubleConstant) {
      listener.exitDoubleConstant(this);
    }
  }
}

export class LiteralExpressionContext extends ParserRuleContext {
  public intConstant(): IntConstantContext | undefined {
    return this.tryGetRuleContext(0, IntConstantContext);
  }
  public doubleConstant(): DoubleConstantContext | undefined {
    return this.tryGetRuleContext(0, DoubleConstantContext);
  }
  public NULLLITERAL(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.NULLLITERAL, 0);
  }
  public BOOLLITERAL(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.BOOLLITERAL, 0);
  }
  public STRINGLITERAL(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.STRINGLITERAL, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return RulesParser.RULE_literalExpression;
  }
  // @Override
  public enterRule(listener: RulesListener): void {
    if (listener.enterLiteralExpression) {
      listener.enterLiteralExpression(this);
    }
  }
  // @Override
  public exitRule(listener: RulesListener): void {
    if (listener.exitLiteralExpression) {
      listener.exitLiteralExpression(this);
    }
  }
}

export class IdentifierExpressionContext extends ParserRuleContext {
  public qualifiedIdentifier(): QualifiedIdentifierContext {
    return this.getRuleContext(0, QualifiedIdentifierContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return RulesParser.RULE_identifierExpression;
  }
  // @Override
  public enterRule(listener: RulesListener): void {
    if (listener.enterIdentifierExpression) {
      listener.enterIdentifierExpression(this);
    }
  }
  // @Override
  public exitRule(listener: RulesListener): void {
    if (listener.exitIdentifierExpression) {
      listener.exitIdentifierExpression(this);
    }
  }
}

export class FunctionExpressionContext extends ParserRuleContext {
  public LPAREN(): TerminalNode {
    return this.getToken(RulesParser.LPAREN, 0);
  }
  public expressionList(): ExpressionListContext {
    return this.getRuleContext(0, ExpressionListContext);
  }
  public RPAREN(): TerminalNode {
    return this.getToken(RulesParser.RPAREN, 0);
  }
  public functionName(): FunctionNameContext | undefined {
    return this.tryGetRuleContext(0, FunctionNameContext);
  }
  public qualifiedIdentifier(): QualifiedIdentifierContext | undefined {
    return this.tryGetRuleContext(0, QualifiedIdentifierContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return RulesParser.RULE_functionExpression;
  }
  // @Override
  public enterRule(listener: RulesListener): void {
    if (listener.enterFunctionExpression) {
      listener.enterFunctionExpression(this);
    }
  }
  // @Override
  public exitRule(listener: RulesListener): void {
    if (listener.exitFunctionExpression) {
      listener.exitFunctionExpression(this);
    }
  }
}

export class TupleExpressionContext extends ParserRuleContext {
  public LFIGBR(): TerminalNode {
    return this.getToken(RulesParser.LFIGBR, 0);
  }
  public expressionList(): ExpressionListContext {
    return this.getRuleContext(0, ExpressionListContext);
  }
  public RFIGBR(): TerminalNode {
    return this.getToken(RulesParser.RFIGBR, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return RulesParser.RULE_tupleExpression;
  }
  // @Override
  public enterRule(listener: RulesListener): void {
    if (listener.enterTupleExpression) {
      listener.enterTupleExpression(this);
    }
  }
  // @Override
  public exitRule(listener: RulesListener): void {
    if (listener.exitTupleExpression) {
      listener.exitTupleExpression(this);
    }
  }
}

export class LambdaCaptureContext extends ParserRuleContext {
  public IDENTIFIER(): TerminalNode {
    return this.getToken(RulesParser.IDENTIFIER, 0);
  }
  public SEQ(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.SEQ, 0);
  }
  public expression(): ExpressionContext | undefined {
    return this.tryGetRuleContext(0, ExpressionContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return RulesParser.RULE_lambdaCapture;
  }
  // @Override
  public enterRule(listener: RulesListener): void {
    if (listener.enterLambdaCapture) {
      listener.enterLambdaCapture(this);
    }
  }
  // @Override
  public exitRule(listener: RulesListener): void {
    if (listener.exitLambdaCapture) {
      listener.exitLambdaCapture(this);
    }
  }
}

export class LambdaCaptureListContext extends ParserRuleContext {
  public lambdaCapture(): LambdaCaptureContext[];
  public lambdaCapture(i: number): LambdaCaptureContext;
  public lambdaCapture(i?: number): LambdaCaptureContext | LambdaCaptureContext[] {
    if (i === undefined) {
      return this.getRuleContexts(LambdaCaptureContext);
    } else {
      return this.getRuleContext(i, LambdaCaptureContext);
    }
  }
  public COMMA(): TerminalNode[];
  public COMMA(i: number): TerminalNode;
  public COMMA(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(RulesParser.COMMA);
    } else {
      return this.getToken(RulesParser.COMMA, i);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return RulesParser.RULE_lambdaCaptureList;
  }
  // @Override
  public enterRule(listener: RulesListener): void {
    if (listener.enterLambdaCaptureList) {
      listener.enterLambdaCaptureList(this);
    }
  }
  // @Override
  public exitRule(listener: RulesListener): void {
    if (listener.exitLambdaCaptureList) {
      listener.exitLambdaCaptureList(this);
    }
  }
}

export class LambdaParamContext extends ParserRuleContext {
  public IDENTIFIER(): TerminalNode {
    return this.getToken(RulesParser.IDENTIFIER, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return RulesParser.RULE_lambdaParam;
  }
  // @Override
  public enterRule(listener: RulesListener): void {
    if (listener.enterLambdaParam) {
      listener.enterLambdaParam(this);
    }
  }
  // @Override
  public exitRule(listener: RulesListener): void {
    if (listener.exitLambdaParam) {
      listener.exitLambdaParam(this);
    }
  }
}

export class LambdaParamListContext extends ParserRuleContext {
  public lambdaParam(): LambdaParamContext[];
  public lambdaParam(i: number): LambdaParamContext;
  public lambdaParam(i?: number): LambdaParamContext | LambdaParamContext[] {
    if (i === undefined) {
      return this.getRuleContexts(LambdaParamContext);
    } else {
      return this.getRuleContext(i, LambdaParamContext);
    }
  }
  public COMMA(): TerminalNode[];
  public COMMA(i: number): TerminalNode;
  public COMMA(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(RulesParser.COMMA);
    } else {
      return this.getToken(RulesParser.COMMA, i);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return RulesParser.RULE_lambdaParamList;
  }
  // @Override
  public enterRule(listener: RulesListener): void {
    if (listener.enterLambdaParamList) {
      listener.enterLambdaParamList(this);
    }
  }
  // @Override
  public exitRule(listener: RulesListener): void {
    if (listener.exitLambdaParamList) {
      listener.exitLambdaParamList(this);
    }
  }
}

export class LambdaBodyContext extends ParserRuleContext {
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return RulesParser.RULE_lambdaBody;
  }
  // @Override
  public enterRule(listener: RulesListener): void {
    if (listener.enterLambdaBody) {
      listener.enterLambdaBody(this);
    }
  }
  // @Override
  public exitRule(listener: RulesListener): void {
    if (listener.exitLambdaBody) {
      listener.exitLambdaBody(this);
    }
  }
}

export class LambdaExpressionContext extends ParserRuleContext {
  public LSQBR(): TerminalNode {
    return this.getToken(RulesParser.LSQBR, 0);
  }
  public lambdaCaptureList(): LambdaCaptureListContext {
    return this.getRuleContext(0, LambdaCaptureListContext);
  }
  public RSQBR(): TerminalNode {
    return this.getToken(RulesParser.RSQBR, 0);
  }
  public LPAREN(): TerminalNode {
    return this.getToken(RulesParser.LPAREN, 0);
  }
  public lambdaParamList(): LambdaParamListContext {
    return this.getRuleContext(0, LambdaParamListContext);
  }
  public RPAREN(): TerminalNode {
    return this.getToken(RulesParser.RPAREN, 0);
  }
  public LFIGBR(): TerminalNode {
    return this.getToken(RulesParser.LFIGBR, 0);
  }
  public lambdaBody(): LambdaBodyContext {
    return this.getRuleContext(0, LambdaBodyContext);
  }
  public RFIGBR(): TerminalNode {
    return this.getToken(RulesParser.RFIGBR, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return RulesParser.RULE_lambdaExpression;
  }
  // @Override
  public enterRule(listener: RulesListener): void {
    if (listener.enterLambdaExpression) {
      listener.enterLambdaExpression(this);
    }
  }
  // @Override
  public exitRule(listener: RulesListener): void {
    if (listener.exitLambdaExpression) {
      listener.exitLambdaExpression(this);
    }
  }
}

export class PrimaryExpressionContext extends ParserRuleContext {
  public LPAREN(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.LPAREN, 0);
  }
  public expression(): ExpressionContext | undefined {
    return this.tryGetRuleContext(0, ExpressionContext);
  }
  public RPAREN(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.RPAREN, 0);
  }
  public identifierExpression(): IdentifierExpressionContext | undefined {
    return this.tryGetRuleContext(0, IdentifierExpressionContext);
  }
  public literalExpression(): LiteralExpressionContext | undefined {
    return this.tryGetRuleContext(0, LiteralExpressionContext);
  }
  public functionExpression(): FunctionExpressionContext | undefined {
    return this.tryGetRuleContext(0, FunctionExpressionContext);
  }
  public tupleExpression(): TupleExpressionContext | undefined {
    return this.tryGetRuleContext(0, TupleExpressionContext);
  }
  public lambdaExpression(): LambdaExpressionContext | undefined {
    return this.tryGetRuleContext(0, LambdaExpressionContext);
  }
  public PLUS(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.PLUS, 0);
  }
  public MINUS(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.MINUS, 0);
  }
  public NOT(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.NOT, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return RulesParser.RULE_primaryExpression;
  }
  // @Override
  public enterRule(listener: RulesListener): void {
    if (listener.enterPrimaryExpression) {
      listener.enterPrimaryExpression(this);
    }
  }
  // @Override
  public exitRule(listener: RulesListener): void {
    if (listener.exitPrimaryExpression) {
      listener.exitPrimaryExpression(this);
    }
  }
}

export class FunctionNameContext extends ParserRuleContext {
  public TODAY(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.TODAY, 0);
  }
  public SIN(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.SIN, 0);
  }
  public COS(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.COS, 0);
  }
  public TAN(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.TAN, 0);
  }
  public COT(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.COT, 0);
  }
  public SQRT(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.SQRT, 0);
  }
  public ABS(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.ABS, 0);
  }
  public CEIL(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.CEIL, 0);
  }
  public FLOOR(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.FLOOR, 0);
  }
  public ROUND(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.ROUND, 0);
  }
  public YEAR(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.YEAR, 0);
  }
  public MONTH(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.MONTH, 0);
  }
  public DAY(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.DAY, 0);
  }
  public DAYOFYEAR(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.DAYOFYEAR, 0);
  }
  public DAYOFMONTH(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.DAYOFMONTH, 0);
  }
  public DAYOFWEEK(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.DAYOFWEEK, 0);
  }
  public LEAPYEAR(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.LEAPYEAR, 0);
  }
  public LENGTHOFMONTH(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.LENGTHOFMONTH, 0);
  }
  public LENGTHOFYEAR(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.LENGTHOFYEAR, 0);
  }
  public PLUSWEEKS(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.PLUSWEEKS, 0);
  }
  public PLUSMONTHS(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.PLUSMONTHS, 0);
  }
  public PLUSYEARS(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.PLUSYEARS, 0);
  }
  public MINUSWEEKS(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.MINUSWEEKS, 0);
  }
  public MINUSMONTHS(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.MINUSMONTHS, 0);
  }
  public MINUSYEARS(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.MINUSYEARS, 0);
  }
  public MIN(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.MIN, 0);
  }
  public MAX(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.MAX, 0);
  }
  public SEGMENT_DISTANCE(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.SEGMENT_DISTANCE, 0);
  }
  public WORKDAYS(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.WORKDAYS, 0);
  }
  public SUBSTRING(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.SUBSTRING, 0);
  }
  public FORMAT(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.FORMAT, 0);
  }
  public STRTOINT(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.STRTOINT, 0);
  }
  public STRTOFLOAT(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.STRTOFLOAT, 0);
  }
  public STRTODATE(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.STRTODATE, 0);
  }
  public STRCONCAT(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.STRCONCAT, 0);
  }
  public STRSPLIT(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.STRSPLIT, 0);
  }
  public STRCONTAIN(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.STRCONTAIN, 0);
  }
  public STRLEN(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.STRLEN, 0);
  }
  public TRIM(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.TRIM, 0);
  }
  public REGEXPMATCH(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.REGEXPMATCH, 0);
  }
  public REGEXPREPLACE(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.REGEXPREPLACE, 0);
  }
  public FINDRECORD(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.FINDRECORD, 0);
  }
  public FINDRECORDIF(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.FINDRECORDIF, 0);
  }
  public ACCUMULATE(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.ACCUMULATE, 0);
  }
  public TUPLEN(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.TUPLEN, 0);
  }
  public GET(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.GET, 0);
  }
  public APPLY(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.APPLY, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return RulesParser.RULE_functionName;
  }
  // @Override
  public enterRule(listener: RulesListener): void {
    if (listener.enterFunctionName) {
      listener.enterFunctionName(this);
    }
  }
  // @Override
  public exitRule(listener: RulesListener): void {
    if (listener.exitFunctionName) {
      listener.exitFunctionName(this);
    }
  }
}
