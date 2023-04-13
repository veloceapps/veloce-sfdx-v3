// Generated from libs/grammar/antlr/Rules.g4 by ANTLR 4.9.0-SNAPSHOT

/*
  Veloce configuration and pricing engine

  @2017-2021 Veloce Inc. All rights reserved
*/

/*
 *
 *  Veloce configuration and pricing engine
 *
 *  @2017-2023 Veloce Inc. All rights reserved
 *
 */

/* eslint-disable */
import { FailedPredicateException } from 'antlr4ts/FailedPredicateException';
import { NoViableAltException } from 'antlr4ts/NoViableAltException';
import { Parser } from 'antlr4ts/Parser';
import { ParserRuleContext } from 'antlr4ts/ParserRuleContext';
import { RecognitionException } from 'antlr4ts/RecognitionException';
import { RuleContext } from 'antlr4ts/RuleContext';
import { Token } from 'antlr4ts/Token';
import { TokenStream } from 'antlr4ts/TokenStream';
import { Vocabulary } from 'antlr4ts/Vocabulary';
import { VocabularyImpl } from 'antlr4ts/VocabularyImpl';
import { ATN } from 'antlr4ts/atn/ATN';
import { ATNDeserializer } from 'antlr4ts/atn/ATNDeserializer';
import { ParserATNSimulator } from 'antlr4ts/atn/ParserATNSimulator';
import { TerminalNode } from 'antlr4ts/tree/TerminalNode';

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
  public static readonly COMMA = 22;
  public static readonly DOT = 23;
  public static readonly ACTION_TYPE = 24;
  public static readonly OBJECT_TYPE = 25;
  public static readonly SCRIPT_TEXT = 26;
  public static readonly SIN = 27;
  public static readonly COS = 28;
  public static readonly TAN = 29;
  public static readonly COT = 30;
  public static readonly SQRT = 31;
  public static readonly ABS = 32;
  public static readonly CEIL = 33;
  public static readonly FLOOR = 34;
  public static readonly ROUND = 35;
  public static readonly YEAR = 36;
  public static readonly MONTH = 37;
  public static readonly DAY = 38;
  public static readonly DAYOFYEAR = 39;
  public static readonly DAYOFMONTH = 40;
  public static readonly DAYOFWEEK = 41;
  public static readonly WORKDAYS = 42;
  public static readonly LEAPYEAR = 43;
  public static readonly LENGTHOFMONTH = 44;
  public static readonly LENGTHOFYEAR = 45;
  public static readonly PLUSWEEKS = 46;
  public static readonly PLUSMONTHS = 47;
  public static readonly PLUSYEARS = 48;
  public static readonly MINUSWEEKS = 49;
  public static readonly MINUSMONTHS = 50;
  public static readonly MINUSYEARS = 51;
  public static readonly STRLEN = 52;
  public static readonly TRIM = 53;
  public static readonly SUBSTRING = 54;
  public static readonly FORMAT = 55;
  public static readonly STRTOINT = 56;
  public static readonly STRTOFLOAT = 57;
  public static readonly STRTODATE = 58;
  public static readonly STRCONCAT = 59;
  public static readonly STRSPLIT = 60;
  public static readonly STRCONTAIN = 61;
  public static readonly REGEXPMATCH = 62;
  public static readonly REGEXPREPLACE = 63;
  public static readonly FINDRECORD = 64;
  public static readonly FINDRECORDIF = 65;
  public static readonly ACCUMULATE = 66;
  public static readonly APPLY = 67;
  public static readonly MAX = 68;
  public static readonly MIN = 69;
  public static readonly SEGMENT_DISTANCE = 70;
  public static readonly TUPLEN = 71;
  public static readonly GET = 72;
  public static readonly TODAY = 73;
  public static readonly INCLUDE = 74;
  public static readonly EXCLUDE = 75;
  public static readonly SEQ = 76;
  public static readonly LPAREN = 77;
  public static readonly RPAREN = 78;
  public static readonly LFIGBR = 79;
  public static readonly RFIGBR = 80;
  public static readonly LSQBR = 81;
  public static readonly RSQBR = 82;
  public static readonly RANGE = 83;
  public static readonly NULLLITERAL = 84;
  public static readonly BOOLLITERAL = 85;
  public static readonly INTLITERAL = 86;
  public static readonly STRINGLITERAL = 87;
  public static readonly DOUBLELITERAL = 88;
  public static readonly AND = 89;
  public static readonly OR = 90;
  public static readonly NOT = 91;
  public static readonly EQ = 92;
  public static readonly NE = 93;
  public static readonly LT = 94;
  public static readonly GT = 95;
  public static readonly LE = 96;
  public static readonly GE = 97;
  public static readonly MATCH = 98;
  public static readonly IN = 99;
  public static readonly PLUS = 100;
  public static readonly MINUS = 101;
  public static readonly TIMES = 102;
  public static readonly DIVIDE = 103;
  public static readonly DIV = 104;
  public static readonly MOD = 105;
  public static readonly POW = 106;
  public static readonly COND = 107;
  public static readonly IDENTIFIER = 108;
  public static readonly WHITE_SPACE = 109;
  public static readonly COMMENT = 110;
  public static readonly LINE_COMMENT = 111;
  public static readonly RULE_compilationUnit = 0;
  public static readonly RULE_header = 1;
  public static readonly RULE_ruleDeclaration = 2;
  public static readonly RULE_sequence = 3;
  public static readonly RULE_filterDeclaration = 4;
  public static readonly RULE_filterExpression = 5;
  public static readonly RULE_transformationDeclaration = 6;
  public static readonly RULE_transformationStatement = 7;
  public static readonly RULE_script = 8;
  public static readonly RULE_scriptDeclaration = 9;
  public static readonly RULE_actionDeclaration = 10;
  public static readonly RULE_setPropertyAction = 11;
  public static readonly RULE_setFieldValueAction = 12;
  public static readonly RULE_setScore = 13;
  public static readonly RULE_addMessageAction = 14;
  public static readonly RULE_setStartDateAction = 15;
  public static readonly RULE_setEndDateAction = 16;
  public static readonly RULE_setEffectiveDateAction = 17;
  public static readonly RULE_adjustCostAction = 18;
  public static readonly RULE_adjustPriceAction = 19;
  public static readonly RULE_adjustListPriceAction = 20;
  public static readonly RULE_setMetricAction = 21;
  public static readonly RULE_addApprovalDataAction = 22;
  public static readonly RULE_metricName = 23;
  public static readonly RULE_totalMetricName = 24;
  public static readonly RULE_transformationVariable = 25;
  public static readonly RULE_variableName = 26;
  public static readonly RULE_targetFieldName = 27;
  public static readonly RULE_explanation = 28;
  public static readonly RULE_value = 29;
  public static readonly RULE_expressionRoot = 30;
  public static readonly RULE_qualifiedIdentifier = 31;
  public static readonly RULE_expressionList = 32;
  public static readonly RULE_optionalExpression = 33;
  public static readonly RULE_expression = 34;
  public static readonly RULE_intConstant = 35;
  public static readonly RULE_doubleConstant = 36;
  public static readonly RULE_literalExpression = 37;
  public static readonly RULE_identifierExpression = 38;
  public static readonly RULE_functionExpression = 39;
  public static readonly RULE_tupleExpression = 40;
  public static readonly RULE_lambdaCapture = 41;
  public static readonly RULE_lambdaCaptureList = 42;
  public static readonly RULE_lambdaParam = 43;
  public static readonly RULE_lambdaParamList = 44;
  public static readonly RULE_lambdaBody = 45;
  public static readonly RULE_lambdaExpression = 46;
  public static readonly RULE_primaryExpression = 47;
  public static readonly RULE_functionName = 48;
  // tslint:disable:no-trailing-whitespace
  public static readonly ruleNames: string[] = [
    'compilationUnit',
    'header',
    'ruleDeclaration',
    'sequence',
    'filterDeclaration',
    'filterExpression',
    'transformationDeclaration',
    'transformationStatement',
    'script',
    'scriptDeclaration',
    'actionDeclaration',
    'setPropertyAction',
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
    'metricName',
    'totalMetricName',
    'transformationVariable',
    'variableName',
    'targetFieldName',
    'explanation',
    'value',
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
    "':'",
    "'setProperty'",
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
        this.state = 99;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === RulesParser.T__0) {
          {
            this.state = 98;
            this.header();
          }
        }

        this.state = 104;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === RulesParser.T__2) {
          {
            {
              this.state = 101;
              this.ruleDeclaration();
            }
          }
          this.state = 106;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
        this.state = 107;
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
        this.state = 109;
        this.match(RulesParser.T__0);
        this.state = 110;
        this.match(RulesParser.IDENTIFIER);
        this.state = 111;
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
        this.state = 113;
        this.match(RulesParser.T__2);
        this.state = 114;
        this.match(RulesParser.STRINGLITERAL);
        this.state = 115;
        this.match(RulesParser.T__3);
        this.state = 116;
        this.sequence();
        this.state = 123;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === RulesParser.T__4) {
          {
            this.state = 117;
            this.match(RulesParser.T__4);
            this.state = 119;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            do {
              {
                {
                  this.state = 118;
                  this.filterDeclaration();
                }
              }
              this.state = 121;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
            } while (_la === RulesParser.IDENTIFIER);
          }
        }

        this.state = 131;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === RulesParser.T__5) {
          {
            this.state = 125;
            this.match(RulesParser.T__5);
            this.state = 127;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            do {
              {
                {
                  this.state = 126;
                  this.transformationDeclaration();
                }
              }
              this.state = 129;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
            } while (_la === RulesParser.IDENTIFIER);
          }
        }

        this.state = 139;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === RulesParser.T__6) {
          {
            this.state = 133;
            this.match(RulesParser.T__6);
            this.state = 135;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            do {
              {
                {
                  this.state = 134;
                  this.actionDeclaration();
                }
              }
              this.state = 137;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
            } while (_la === RulesParser.IDENTIFIER);
          }
        }

        this.state = 141;
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
        this.state = 143;
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
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 145;
        this.variableName();
        this.state = 146;
        this.match(RulesParser.T__8);
        this.state = 147;
        this.filterExpression();
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
    this.enterRule(_localctx, 10, RulesParser.RULE_filterExpression);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 149;
        this.match(RulesParser.OBJECT_TYPE);
        this.state = 150;
        this.match(RulesParser.LPAREN);
        this.state = 152;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (
          (((_la - 27) & ~0x1f) === 0 &&
            ((1 << (_la - 27)) &
              ((1 << (RulesParser.SIN - 27)) |
                (1 << (RulesParser.COS - 27)) |
                (1 << (RulesParser.TAN - 27)) |
                (1 << (RulesParser.COT - 27)) |
                (1 << (RulesParser.SQRT - 27)) |
                (1 << (RulesParser.ABS - 27)) |
                (1 << (RulesParser.CEIL - 27)) |
                (1 << (RulesParser.FLOOR - 27)) |
                (1 << (RulesParser.ROUND - 27)) |
                (1 << (RulesParser.YEAR - 27)) |
                (1 << (RulesParser.MONTH - 27)) |
                (1 << (RulesParser.DAY - 27)) |
                (1 << (RulesParser.DAYOFYEAR - 27)) |
                (1 << (RulesParser.DAYOFMONTH - 27)) |
                (1 << (RulesParser.DAYOFWEEK - 27)) |
                (1 << (RulesParser.WORKDAYS - 27)) |
                (1 << (RulesParser.LEAPYEAR - 27)) |
                (1 << (RulesParser.LENGTHOFMONTH - 27)) |
                (1 << (RulesParser.LENGTHOFYEAR - 27)) |
                (1 << (RulesParser.PLUSWEEKS - 27)) |
                (1 << (RulesParser.PLUSMONTHS - 27)) |
                (1 << (RulesParser.PLUSYEARS - 27)) |
                (1 << (RulesParser.MINUSWEEKS - 27)) |
                (1 << (RulesParser.MINUSMONTHS - 27)) |
                (1 << (RulesParser.MINUSYEARS - 27)) |
                (1 << (RulesParser.STRLEN - 27)) |
                (1 << (RulesParser.TRIM - 27)) |
                (1 << (RulesParser.SUBSTRING - 27)) |
                (1 << (RulesParser.FORMAT - 27)) |
                (1 << (RulesParser.STRTOINT - 27)) |
                (1 << (RulesParser.STRTOFLOAT - 27)) |
                (1 << (RulesParser.STRTODATE - 27)))) !==
              0) ||
          (((_la - 59) & ~0x1f) === 0 &&
            ((1 << (_la - 59)) &
              ((1 << (RulesParser.STRCONCAT - 59)) |
                (1 << (RulesParser.STRSPLIT - 59)) |
                (1 << (RulesParser.STRCONTAIN - 59)) |
                (1 << (RulesParser.REGEXPMATCH - 59)) |
                (1 << (RulesParser.REGEXPREPLACE - 59)) |
                (1 << (RulesParser.FINDRECORD - 59)) |
                (1 << (RulesParser.FINDRECORDIF - 59)) |
                (1 << (RulesParser.ACCUMULATE - 59)) |
                (1 << (RulesParser.APPLY - 59)) |
                (1 << (RulesParser.MAX - 59)) |
                (1 << (RulesParser.MIN - 59)) |
                (1 << (RulesParser.SEGMENT_DISTANCE - 59)) |
                (1 << (RulesParser.TUPLEN - 59)) |
                (1 << (RulesParser.GET - 59)) |
                (1 << (RulesParser.TODAY - 59)) |
                (1 << (RulesParser.LPAREN - 59)) |
                (1 << (RulesParser.LFIGBR - 59)) |
                (1 << (RulesParser.LSQBR - 59)) |
                (1 << (RulesParser.NULLLITERAL - 59)) |
                (1 << (RulesParser.BOOLLITERAL - 59)) |
                (1 << (RulesParser.INTLITERAL - 59)) |
                (1 << (RulesParser.STRINGLITERAL - 59)) |
                (1 << (RulesParser.DOUBLELITERAL - 59)))) !==
              0) ||
          (((_la - 91) & ~0x1f) === 0 &&
            ((1 << (_la - 91)) &
              ((1 << (RulesParser.NOT - 91)) |
                (1 << (RulesParser.PLUS - 91)) |
                (1 << (RulesParser.MINUS - 91)) |
                (1 << (RulesParser.IDENTIFIER - 91)))) !==
              0)
        ) {
          {
            this.state = 151;
            this.expression(0);
          }
        }

        this.state = 154;
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
    this.enterRule(_localctx, 12, RulesParser.RULE_transformationDeclaration);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 156;
        this.match(RulesParser.IDENTIFIER);
        this.state = 157;
        this.match(RulesParser.T__8);
        this.state = 158;
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
    this.enterRule(_localctx, 14, RulesParser.RULE_transformationStatement);
    try {
      this.state = 162;
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
            this.state = 160;
            this.expression(0);
          }
          break;
        case RulesParser.SCRIPT_TEXT:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 161;
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
    this.enterRule(_localctx, 16, RulesParser.RULE_script);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 164;
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
  public scriptDeclaration(): ScriptDeclarationContext {
    let _localctx: ScriptDeclarationContext = new ScriptDeclarationContext(this._ctx, this.state);
    this.enterRule(_localctx, 18, RulesParser.RULE_scriptDeclaration);
    try {
      let _alt: number;
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 169;
        this._errHandler.sync(this);
        _alt = this.interpreter.adaptivePredict(this._input, 10, this._ctx);
        while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1 + 1) {
            {
              {
                this.state = 166;
                this.matchWildcard();
              }
            }
          }
          this.state = 171;
          this._errHandler.sync(this);
          _alt = this.interpreter.adaptivePredict(this._input, 10, this._ctx);
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
  public actionDeclaration(): ActionDeclarationContext {
    let _localctx: ActionDeclarationContext = new ActionDeclarationContext(this._ctx, this.state);
    this.enterRule(_localctx, 20, RulesParser.RULE_actionDeclaration);
    try {
      this.state = 184;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 11, this._ctx)) {
        case 1:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 172;
            this.setPropertyAction();
          }
          break;

        case 2:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 173;
            this.setFieldValueAction();
          }
          break;

        case 3:
          this.enterOuterAlt(_localctx, 3);
          {
            this.state = 174;
            this.addMessageAction();
          }
          break;

        case 4:
          this.enterOuterAlt(_localctx, 4);
          {
            this.state = 175;
            this.addApprovalDataAction();
          }
          break;

        case 5:
          this.enterOuterAlt(_localctx, 5);
          {
            this.state = 176;
            this.setStartDateAction();
          }
          break;

        case 6:
          this.enterOuterAlt(_localctx, 6);
          {
            this.state = 177;
            this.setEndDateAction();
          }
          break;

        case 7:
          this.enterOuterAlt(_localctx, 7);
          {
            this.state = 178;
            this.setEffectiveDateAction();
          }
          break;

        case 8:
          this.enterOuterAlt(_localctx, 8);
          {
            this.state = 179;
            this.adjustCostAction();
          }
          break;

        case 9:
          this.enterOuterAlt(_localctx, 9);
          {
            this.state = 180;
            this.adjustPriceAction();
          }
          break;

        case 10:
          this.enterOuterAlt(_localctx, 10);
          {
            this.state = 181;
            this.adjustListPriceAction();
          }
          break;

        case 11:
          this.enterOuterAlt(_localctx, 11);
          {
            this.state = 182;
            this.setMetricAction();
          }
          break;

        case 12:
          this.enterOuterAlt(_localctx, 12);
          {
            this.state = 183;
            this.setScore();
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
    this.enterRule(_localctx, 22, RulesParser.RULE_setPropertyAction);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 186;
        this.variableName();
        this.state = 187;
        this.match(RulesParser.DOT);
        this.state = 188;
        this.match(RulesParser.T__9);
        this.state = 189;
        this.match(RulesParser.LPAREN);
        this.state = 190;
        this.targetFieldName();
        this.state = 191;
        this.match(RulesParser.COMMA);
        this.state = 192;
        this.value();
        this.state = 193;
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
    this.enterRule(_localctx, 24, RulesParser.RULE_setFieldValueAction);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 195;
        this.variableName();
        this.state = 196;
        this.match(RulesParser.DOT);
        this.state = 197;
        this.match(RulesParser.T__10);
        this.state = 198;
        this.match(RulesParser.LPAREN);
        this.state = 199;
        this.targetFieldName();
        this.state = 200;
        this.match(RulesParser.COMMA);
        this.state = 201;
        this.value();
        this.state = 202;
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
    this.enterRule(_localctx, 26, RulesParser.RULE_setScore);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 204;
        this.variableName();
        this.state = 205;
        this.match(RulesParser.DOT);
        this.state = 206;
        this.match(RulesParser.T__11);
        this.state = 207;
        this.match(RulesParser.LPAREN);
        this.state = 208;
        this.value();
        this.state = 209;
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
    this.enterRule(_localctx, 28, RulesParser.RULE_addMessageAction);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 211;
        this.variableName();
        this.state = 212;
        this.match(RulesParser.DOT);
        this.state = 213;
        this.match(RulesParser.T__12);
        this.state = 214;
        this.match(RulesParser.LPAREN);
        this.state = 215;
        this.value();
        this.state = 216;
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
    this.enterRule(_localctx, 30, RulesParser.RULE_setStartDateAction);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 218;
        this.variableName();
        this.state = 219;
        this.match(RulesParser.DOT);
        this.state = 220;
        this.match(RulesParser.T__13);
        this.state = 221;
        this.match(RulesParser.LPAREN);
        this.state = 222;
        this.transformationVariable();
        this.state = 223;
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
    this.enterRule(_localctx, 32, RulesParser.RULE_setEndDateAction);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 225;
        this.variableName();
        this.state = 226;
        this.match(RulesParser.DOT);
        this.state = 227;
        this.match(RulesParser.T__14);
        this.state = 228;
        this.match(RulesParser.LPAREN);
        this.state = 229;
        this.transformationVariable();
        this.state = 230;
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
    this.enterRule(_localctx, 34, RulesParser.RULE_setEffectiveDateAction);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 232;
        this.variableName();
        this.state = 233;
        this.match(RulesParser.DOT);
        this.state = 234;
        this.match(RulesParser.T__15);
        this.state = 235;
        this.match(RulesParser.LPAREN);
        this.state = 236;
        this.transformationVariable();
        this.state = 237;
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
    this.enterRule(_localctx, 36, RulesParser.RULE_adjustCostAction);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 239;
        this.variableName();
        this.state = 240;
        this.match(RulesParser.DOT);
        this.state = 241;
        this.match(RulesParser.T__16);
        this.state = 242;
        this.match(RulesParser.LPAREN);
        this.state = 243;
        this.match(RulesParser.ACTION_TYPE);
        this.state = 244;
        this.match(RulesParser.COMMA);
        this.state = 245;
        this.value();
        this.state = 248;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === RulesParser.COMMA) {
          {
            this.state = 246;
            this.match(RulesParser.COMMA);
            this.state = 247;
            this.explanation();
          }
        }

        this.state = 250;
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
    this.enterRule(_localctx, 38, RulesParser.RULE_adjustPriceAction);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 252;
        this.variableName();
        this.state = 253;
        this.match(RulesParser.DOT);
        this.state = 254;
        this.match(RulesParser.T__17);
        this.state = 255;
        this.match(RulesParser.LPAREN);
        this.state = 256;
        this.match(RulesParser.ACTION_TYPE);
        this.state = 257;
        this.match(RulesParser.COMMA);
        this.state = 258;
        this.value();
        this.state = 261;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === RulesParser.COMMA) {
          {
            this.state = 259;
            this.match(RulesParser.COMMA);
            this.state = 260;
            this.explanation();
          }
        }

        this.state = 263;
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
    this.enterRule(_localctx, 40, RulesParser.RULE_adjustListPriceAction);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 265;
        this.variableName();
        this.state = 266;
        this.match(RulesParser.DOT);
        this.state = 267;
        this.match(RulesParser.T__18);
        this.state = 268;
        this.match(RulesParser.LPAREN);
        this.state = 269;
        this.match(RulesParser.ACTION_TYPE);
        this.state = 270;
        this.match(RulesParser.COMMA);
        this.state = 271;
        this.value();
        this.state = 274;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === RulesParser.COMMA) {
          {
            this.state = 272;
            this.match(RulesParser.COMMA);
            this.state = 273;
            this.explanation();
          }
        }

        this.state = 276;
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
    this.enterRule(_localctx, 42, RulesParser.RULE_setMetricAction);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 278;
        this.variableName();
        this.state = 279;
        this.match(RulesParser.DOT);
        this.state = 280;
        this.match(RulesParser.T__19);
        this.state = 281;
        this.match(RulesParser.LPAREN);
        this.state = 282;
        this.metricName();
        this.state = 283;
        this.match(RulesParser.COMMA);
        this.state = 284;
        this.transformationVariable();
        this.state = 287;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === RulesParser.COMMA) {
          {
            this.state = 285;
            this.match(RulesParser.COMMA);
            this.state = 286;
            this.totalMetricName();
          }
        }

        this.state = 289;
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
    this.enterRule(_localctx, 44, RulesParser.RULE_addApprovalDataAction);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 291;
        this.variableName();
        this.state = 292;
        this.match(RulesParser.DOT);
        this.state = 293;
        this.match(RulesParser.T__20);
        this.state = 294;
        this.match(RulesParser.LPAREN);
        this.state = 295;
        this.value();
        this.state = 298;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === RulesParser.COMMA) {
          {
            this.state = 296;
            this.match(RulesParser.COMMA);
            this.state = 297;
            this.value();
          }
        }

        this.state = 300;
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
    this.enterRule(_localctx, 46, RulesParser.RULE_metricName);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 302;
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
    this.enterRule(_localctx, 48, RulesParser.RULE_totalMetricName);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 304;
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
    this.enterRule(_localctx, 50, RulesParser.RULE_transformationVariable);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 306;
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
    this.enterRule(_localctx, 52, RulesParser.RULE_variableName);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 308;
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
    this.enterRule(_localctx, 54, RulesParser.RULE_targetFieldName);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 310;
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
    this.enterRule(_localctx, 56, RulesParser.RULE_explanation);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 312;
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
    this.enterRule(_localctx, 58, RulesParser.RULE_value);
    try {
      this.state = 316;
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
            this.state = 314;
            this.literalExpression();
          }
          break;
        case RulesParser.IDENTIFIER:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 315;
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
  public expressionRoot(): ExpressionRootContext {
    let _localctx: ExpressionRootContext = new ExpressionRootContext(this._ctx, this.state);
    this.enterRule(_localctx, 60, RulesParser.RULE_expressionRoot);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 318;
        this.expression(0);
        this.state = 319;
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
    this.enterRule(_localctx, 62, RulesParser.RULE_qualifiedIdentifier);
    try {
      let _alt: number;
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 321;
        this.match(RulesParser.IDENTIFIER);
        this.state = 326;
        this._errHandler.sync(this);
        _alt = this.interpreter.adaptivePredict(this._input, 18, this._ctx);
        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            {
              {
                this.state = 322;
                this.match(RulesParser.DOT);
                this.state = 323;
                this.match(RulesParser.IDENTIFIER);
              }
            }
          }
          this.state = 328;
          this._errHandler.sync(this);
          _alt = this.interpreter.adaptivePredict(this._input, 18, this._ctx);
        }
        this.state = 332;
        this._errHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this._input, 19, this._ctx)) {
          case 1:
            {
              this.state = 329;
              this.match(RulesParser.LSQBR);
              this.state = 330;
              this.match(RulesParser.STRINGLITERAL);
              this.state = 331;
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
    this.enterRule(_localctx, 64, RulesParser.RULE_expressionList);
    let _la: number;
    try {
      this.state = 343;
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
            this.state = 335;
            this.expression(0);
            this.state = 340;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while (_la === RulesParser.COMMA) {
              {
                {
                  this.state = 336;
                  this.match(RulesParser.COMMA);
                  this.state = 337;
                  this.expression(0);
                }
              }
              this.state = 342;
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
    this.enterRule(_localctx, 66, RulesParser.RULE_optionalExpression);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 345;
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
    let _startState: number = 68;
    this.enterRecursionRule(_localctx, 68, RulesParser.RULE_expression, _p);
    let _la: number;
    try {
      let _alt: number;
      this.enterOuterAlt(_localctx, 1);
      {
        {
          this.state = 348;
          this.primaryExpression();
        }
        this._ctx._stop = this._input.tryLT(-1);
        this.state = 385;
        this._errHandler.sync(this);
        _alt = this.interpreter.adaptivePredict(this._input, 23, this._ctx);
        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            if (this._parseListeners != null) {
              this.triggerExitRuleEvent();
            }
            {
              this.state = 383;
              this._errHandler.sync(this);
              switch (this.interpreter.adaptivePredict(this._input, 22, this._ctx)) {
                case 1:
                  {
                    _localctx = new ExpressionContext(_parentctx, _parentState);
                    this.pushNewRecursionContext(_localctx, _startState, RulesParser.RULE_expression);
                    this.state = 350;
                    if (!this.precpred(this._ctx, 9)) {
                      throw this.createFailedPredicateException('this.precpred(this._ctx, 9)');
                    }
                    this.state = 351;
                    this.match(RulesParser.POW);
                    this.state = 352;
                    this.expression(10);
                  }
                  break;

                case 2:
                  {
                    _localctx = new ExpressionContext(_parentctx, _parentState);
                    this.pushNewRecursionContext(_localctx, _startState, RulesParser.RULE_expression);
                    this.state = 353;
                    if (!this.precpred(this._ctx, 8)) {
                      throw this.createFailedPredicateException('this.precpred(this._ctx, 8)');
                    }
                    this.state = 354;
                    _la = this._input.LA(1);
                    if (
                      !(
                        ((_la - 102) & ~0x1f) === 0 &&
                        ((1 << (_la - 102)) &
                          ((1 << (RulesParser.TIMES - 102)) |
                            (1 << (RulesParser.DIVIDE - 102)) |
                            (1 << (RulesParser.DIV - 102)) |
                            (1 << (RulesParser.MOD - 102)))) !==
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
                    this.state = 355;
                    this.expression(9);
                  }
                  break;

                case 3:
                  {
                    _localctx = new ExpressionContext(_parentctx, _parentState);
                    this.pushNewRecursionContext(_localctx, _startState, RulesParser.RULE_expression);
                    this.state = 356;
                    if (!this.precpred(this._ctx, 7)) {
                      throw this.createFailedPredicateException('this.precpred(this._ctx, 7)');
                    }
                    this.state = 357;
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
                    this.state = 358;
                    this.expression(8);
                  }
                  break;

                case 4:
                  {
                    _localctx = new ExpressionContext(_parentctx, _parentState);
                    this.pushNewRecursionContext(_localctx, _startState, RulesParser.RULE_expression);
                    this.state = 359;
                    if (!this.precpred(this._ctx, 6)) {
                      throw this.createFailedPredicateException('this.precpred(this._ctx, 6)');
                    }
                    this.state = 360;
                    _la = this._input.LA(1);
                    if (
                      !(
                        ((_la - 94) & ~0x1f) === 0 &&
                        ((1 << (_la - 94)) &
                          ((1 << (RulesParser.LT - 94)) |
                            (1 << (RulesParser.GT - 94)) |
                            (1 << (RulesParser.LE - 94)) |
                            (1 << (RulesParser.GE - 94)))) !==
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
                    this.state = 361;
                    this.expression(7);
                  }
                  break;

                case 5:
                  {
                    _localctx = new ExpressionContext(_parentctx, _parentState);
                    this.pushNewRecursionContext(_localctx, _startState, RulesParser.RULE_expression);
                    this.state = 362;
                    if (!this.precpred(this._ctx, 5)) {
                      throw this.createFailedPredicateException('this.precpred(this._ctx, 5)');
                    }
                    this.state = 363;
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
                    this.state = 364;
                    this.expression(6);
                  }
                  break;

                case 6:
                  {
                    _localctx = new ExpressionContext(_parentctx, _parentState);
                    this.pushNewRecursionContext(_localctx, _startState, RulesParser.RULE_expression);
                    this.state = 365;
                    if (!this.precpred(this._ctx, 4)) {
                      throw this.createFailedPredicateException('this.precpred(this._ctx, 4)');
                    }
                    this.state = 366;
                    this.match(RulesParser.MATCH);
                    this.state = 367;
                    this.expression(5);
                  }
                  break;

                case 7:
                  {
                    _localctx = new ExpressionContext(_parentctx, _parentState);
                    this.pushNewRecursionContext(_localctx, _startState, RulesParser.RULE_expression);
                    this.state = 368;
                    if (!this.precpred(this._ctx, 3)) {
                      throw this.createFailedPredicateException('this.precpred(this._ctx, 3)');
                    }
                    this.state = 369;
                    this.match(RulesParser.IN);
                    this.state = 370;
                    this.expression(4);
                  }
                  break;

                case 8:
                  {
                    _localctx = new ExpressionContext(_parentctx, _parentState);
                    this.pushNewRecursionContext(_localctx, _startState, RulesParser.RULE_expression);
                    this.state = 371;
                    if (!this.precpred(this._ctx, 10)) {
                      throw this.createFailedPredicateException('this.precpred(this._ctx, 10)');
                    }
                    this.state = 372;
                    this.match(RulesParser.COND);
                    this.state = 373;
                    this.optionalExpression();
                    this.state = 374;
                    this.match(RulesParser.T__8);
                    this.state = 375;
                    this.optionalExpression();
                  }
                  break;

                case 9:
                  {
                    _localctx = new ExpressionContext(_parentctx, _parentState);
                    this.pushNewRecursionContext(_localctx, _startState, RulesParser.RULE_expression);
                    this.state = 377;
                    if (!this.precpred(this._ctx, 2)) {
                      throw this.createFailedPredicateException('this.precpred(this._ctx, 2)');
                    }
                    this.state = 378;
                    this.match(RulesParser.AND);
                    this.state = 379;
                    this.optionalExpression();
                  }
                  break;

                case 10:
                  {
                    _localctx = new ExpressionContext(_parentctx, _parentState);
                    this.pushNewRecursionContext(_localctx, _startState, RulesParser.RULE_expression);
                    this.state = 380;
                    if (!this.precpred(this._ctx, 1)) {
                      throw this.createFailedPredicateException('this.precpred(this._ctx, 1)');
                    }
                    this.state = 381;
                    this.match(RulesParser.OR);
                    this.state = 382;
                    this.optionalExpression();
                  }
                  break;
              }
            }
          }
          this.state = 387;
          this._errHandler.sync(this);
          _alt = this.interpreter.adaptivePredict(this._input, 23, this._ctx);
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
    this.enterRule(_localctx, 70, RulesParser.RULE_intConstant);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 389;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === RulesParser.PLUS || _la === RulesParser.MINUS) {
          {
            this.state = 388;
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

        this.state = 391;
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
    this.enterRule(_localctx, 72, RulesParser.RULE_doubleConstant);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 394;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === RulesParser.PLUS || _la === RulesParser.MINUS) {
          {
            this.state = 393;
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

        this.state = 396;
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
    this.enterRule(_localctx, 74, RulesParser.RULE_literalExpression);
    try {
      this.state = 403;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 26, this._ctx)) {
        case 1:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 398;
            this.intConstant();
          }
          break;

        case 2:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 399;
            this.doubleConstant();
          }
          break;

        case 3:
          this.enterOuterAlt(_localctx, 3);
          {
            this.state = 400;
            this.match(RulesParser.NULLLITERAL);
          }
          break;

        case 4:
          this.enterOuterAlt(_localctx, 4);
          {
            this.state = 401;
            this.match(RulesParser.BOOLLITERAL);
          }
          break;

        case 5:
          this.enterOuterAlt(_localctx, 5);
          {
            this.state = 402;
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
    this.enterRule(_localctx, 76, RulesParser.RULE_identifierExpression);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 405;
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
    this.enterRule(_localctx, 78, RulesParser.RULE_functionExpression);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 409;
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
              this.state = 407;
              this.functionName();
            }
            break;
          case RulesParser.IDENTIFIER:
            {
              this.state = 408;
              this.qualifiedIdentifier();
            }
            break;
          default:
            throw new NoViableAltException(this);
        }
        this.state = 411;
        this.match(RulesParser.LPAREN);
        this.state = 412;
        this.expressionList();
        this.state = 413;
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
    this.enterRule(_localctx, 80, RulesParser.RULE_tupleExpression);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 415;
        this.match(RulesParser.LFIGBR);
        this.state = 416;
        this.expressionList();
        this.state = 417;
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
    this.enterRule(_localctx, 82, RulesParser.RULE_lambdaCapture);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 419;
        this.match(RulesParser.IDENTIFIER);
        this.state = 422;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === RulesParser.SEQ) {
          {
            this.state = 420;
            this.match(RulesParser.SEQ);
            this.state = 421;
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
    this.enterRule(_localctx, 84, RulesParser.RULE_lambdaCaptureList);
    let _la: number;
    try {
      this.state = 433;
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
            this.state = 425;
            this.lambdaCapture();
            this.state = 430;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while (_la === RulesParser.COMMA) {
              {
                {
                  this.state = 426;
                  this.match(RulesParser.COMMA);
                  this.state = 427;
                  this.lambdaCapture();
                }
              }
              this.state = 432;
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
    this.enterRule(_localctx, 86, RulesParser.RULE_lambdaParam);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 435;
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
    this.enterRule(_localctx, 88, RulesParser.RULE_lambdaParamList);
    let _la: number;
    try {
      this.state = 446;
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
            this.state = 438;
            this.lambdaParam();
            this.state = 443;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while (_la === RulesParser.COMMA) {
              {
                {
                  this.state = 439;
                  this.match(RulesParser.COMMA);
                  this.state = 440;
                  this.lambdaParam();
                }
              }
              this.state = 445;
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
    this.enterRule(_localctx, 90, RulesParser.RULE_lambdaBody);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 448;
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
    this.enterRule(_localctx, 92, RulesParser.RULE_lambdaExpression);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 450;
        this.match(RulesParser.LSQBR);
        this.state = 451;
        this.lambdaCaptureList();
        this.state = 452;
        this.match(RulesParser.RSQBR);
        this.state = 453;
        this.match(RulesParser.LPAREN);
        this.state = 454;
        this.lambdaParamList();
        this.state = 455;
        this.match(RulesParser.RPAREN);
        this.state = 456;
        this.match(RulesParser.LFIGBR);
        this.state = 457;
        this.lambdaBody();
        this.state = 458;
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
    this.enterRule(_localctx, 94, RulesParser.RULE_primaryExpression);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 461;
        this._errHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this._input, 33, this._ctx)) {
          case 1:
            {
              this.state = 460;
              _la = this._input.LA(1);
              if (
                !(
                  ((_la - 91) & ~0x1f) === 0 &&
                  ((1 << (_la - 91)) &
                    ((1 << (RulesParser.NOT - 91)) |
                      (1 << (RulesParser.PLUS - 91)) |
                      (1 << (RulesParser.MINUS - 91)))) !==
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
        this.state = 472;
        this._errHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this._input, 34, this._ctx)) {
          case 1:
            {
              this.state = 463;
              this.match(RulesParser.LPAREN);
              this.state = 464;
              this.expression(0);
              this.state = 465;
              this.match(RulesParser.RPAREN);
            }
            break;

          case 2:
            {
              this.state = 467;
              this.identifierExpression();
            }
            break;

          case 3:
            {
              this.state = 468;
              this.literalExpression();
            }
            break;

          case 4:
            {
              this.state = 469;
              this.functionExpression();
            }
            break;

          case 5:
            {
              this.state = 470;
              this.tupleExpression();
            }
            break;

          case 6:
            {
              this.state = 471;
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
    this.enterRule(_localctx, 96, RulesParser.RULE_functionName);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 474;
        _la = this._input.LA(1);
        if (
          !(
            (((_la - 27) & ~0x1f) === 0 &&
              ((1 << (_la - 27)) &
                ((1 << (RulesParser.SIN - 27)) |
                  (1 << (RulesParser.COS - 27)) |
                  (1 << (RulesParser.TAN - 27)) |
                  (1 << (RulesParser.COT - 27)) |
                  (1 << (RulesParser.SQRT - 27)) |
                  (1 << (RulesParser.ABS - 27)) |
                  (1 << (RulesParser.CEIL - 27)) |
                  (1 << (RulesParser.FLOOR - 27)) |
                  (1 << (RulesParser.ROUND - 27)) |
                  (1 << (RulesParser.YEAR - 27)) |
                  (1 << (RulesParser.MONTH - 27)) |
                  (1 << (RulesParser.DAY - 27)) |
                  (1 << (RulesParser.DAYOFYEAR - 27)) |
                  (1 << (RulesParser.DAYOFMONTH - 27)) |
                  (1 << (RulesParser.DAYOFWEEK - 27)) |
                  (1 << (RulesParser.WORKDAYS - 27)) |
                  (1 << (RulesParser.LEAPYEAR - 27)) |
                  (1 << (RulesParser.LENGTHOFMONTH - 27)) |
                  (1 << (RulesParser.LENGTHOFYEAR - 27)) |
                  (1 << (RulesParser.PLUSWEEKS - 27)) |
                  (1 << (RulesParser.PLUSMONTHS - 27)) |
                  (1 << (RulesParser.PLUSYEARS - 27)) |
                  (1 << (RulesParser.MINUSWEEKS - 27)) |
                  (1 << (RulesParser.MINUSMONTHS - 27)) |
                  (1 << (RulesParser.MINUSYEARS - 27)) |
                  (1 << (RulesParser.STRLEN - 27)) |
                  (1 << (RulesParser.TRIM - 27)) |
                  (1 << (RulesParser.SUBSTRING - 27)) |
                  (1 << (RulesParser.FORMAT - 27)) |
                  (1 << (RulesParser.STRTOINT - 27)) |
                  (1 << (RulesParser.STRTOFLOAT - 27)) |
                  (1 << (RulesParser.STRTODATE - 27)))) !==
                0) ||
            (((_la - 59) & ~0x1f) === 0 &&
              ((1 << (_la - 59)) &
                ((1 << (RulesParser.STRCONCAT - 59)) |
                  (1 << (RulesParser.STRSPLIT - 59)) |
                  (1 << (RulesParser.STRCONTAIN - 59)) |
                  (1 << (RulesParser.REGEXPMATCH - 59)) |
                  (1 << (RulesParser.REGEXPREPLACE - 59)) |
                  (1 << (RulesParser.FINDRECORD - 59)) |
                  (1 << (RulesParser.FINDRECORDIF - 59)) |
                  (1 << (RulesParser.ACCUMULATE - 59)) |
                  (1 << (RulesParser.APPLY - 59)) |
                  (1 << (RulesParser.MAX - 59)) |
                  (1 << (RulesParser.MIN - 59)) |
                  (1 << (RulesParser.SEGMENT_DISTANCE - 59)) |
                  (1 << (RulesParser.TUPLEN - 59)) |
                  (1 << (RulesParser.GET - 59)) |
                  (1 << (RulesParser.TODAY - 59)))) !==
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
      case 34:
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
    '\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03q\u01DF\x04\x02' +
    '\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07' +
    '\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04' +
    '\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04' +
    '\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17\x04' +
    '\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t\x1B\x04\x1C\t\x1C\x04' +
    '\x1D\t\x1D\x04\x1E\t\x1E\x04\x1F\t\x1F\x04 \t \x04!\t!\x04"\t"\x04#' +
    "\t#\x04$\t$\x04%\t%\x04&\t&\x04'\t'\x04(\t(\x04)\t)\x04*\t*\x04+\t+" +
    '\x04,\t,\x04-\t-\x04.\t.\x04/\t/\x040\t0\x041\t1\x042\t2\x03\x02\x05\x02' +
    'f\n\x02\x03\x02\x07\x02i\n\x02\f\x02\x0E\x02l\v\x02\x03\x02\x03\x02\x03' +
    '\x03\x03\x03\x03\x03\x03\x03\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03' +
    '\x04\x06\x04z\n\x04\r\x04\x0E\x04{\x05\x04~\n\x04\x03\x04\x03\x04\x06' +
    '\x04\x82\n\x04\r\x04\x0E\x04\x83\x05\x04\x86\n\x04\x03\x04\x03\x04\x06' +
    '\x04\x8A\n\x04\r\x04\x0E\x04\x8B\x05\x04\x8E\n\x04\x03\x04\x03\x04\x03' +
    '\x05\x03\x05\x03\x06\x03\x06\x03\x06\x03\x06\x03\x07\x03\x07\x03\x07\x05' +
    '\x07\x9B\n\x07\x03\x07\x03\x07\x03\b\x03\b\x03\b\x03\b\x03\t\x03\t\x05' +
    '\t\xA5\n\t\x03\n\x03\n\x03\v\x07\v\xAA\n\v\f\v\x0E\v\xAD\v\v\x03\f\x03' +
    '\f\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x05\f\xBB' +
    '\n\f\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\x0E\x03' +
    '\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0F\x03' +
    '\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x10\x03\x10\x03\x10\x03' +
    '\x10\x03\x10\x03\x10\x03\x10\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03' +
    '\x11\x03\x11\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x03' +
    '\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x14\x03\x14\x03' +
    '\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x05\x14\xFB\n\x14' +
    '\x03\x14\x03\x14\x03\x15\x03\x15\x03\x15\x03\x15\x03\x15\x03\x15\x03\x15' +
    '\x03\x15\x03\x15\x05\x15\u0108\n\x15\x03\x15\x03\x15\x03\x16\x03\x16\x03' +
    '\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x05\x16\u0115\n\x16' +
    '\x03\x16\x03\x16\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17' +
    '\x03\x17\x03\x17\x05\x17\u0122\n\x17\x03\x17\x03\x17\x03\x18\x03\x18\x03' +
    '\x18\x03\x18\x03\x18\x03\x18\x03\x18\x05\x18\u012D\n\x18\x03\x18\x03\x18' +
    '\x03\x19\x03\x19\x03\x1A\x03\x1A\x03\x1B\x03\x1B\x03\x1C\x03\x1C\x03\x1D' +
    '\x03\x1D\x03\x1E\x03\x1E\x03\x1F\x03\x1F\x05\x1F\u013F\n\x1F\x03 \x03' +
    ' \x03 \x03!\x03!\x03!\x07!\u0147\n!\f!\x0E!\u014A\v!\x03!\x03!\x03!\x05' +
    '!\u014F\n!\x03"\x03"\x03"\x03"\x07"\u0155\n"\f"\x0E"\u0158\v"' +
    '\x05"\u015A\n"\x03#\x03#\x03$\x03$\x03$\x03$\x03$\x03$\x03$\x03$\x03' +
    '$\x03$\x03$\x03$\x03$\x03$\x03$\x03$\x03$\x03$\x03$\x03$\x03$\x03$\x03' +
    '$\x03$\x03$\x03$\x03$\x03$\x03$\x03$\x03$\x03$\x03$\x03$\x03$\x03$\x07' +
    '$\u0182\n$\f$\x0E$\u0185\v$\x03%\x05%\u0188\n%\x03%\x03%\x03&\x05&\u018D' +
    "\n&\x03&\x03&\x03'\x03'\x03'\x03'\x03'\x05'\u0196\n'\x03(\x03(" +
    '\x03)\x03)\x05)\u019C\n)\x03)\x03)\x03)\x03)\x03*\x03*\x03*\x03*\x03+' +
    '\x03+\x03+\x05+\u01A9\n+\x03,\x03,\x03,\x03,\x07,\u01AF\n,\f,\x0E,\u01B2' +
    '\v,\x05,\u01B4\n,\x03-\x03-\x03.\x03.\x03.\x03.\x07.\u01BC\n.\f.\x0E.' +
    '\u01BF\v.\x05.\u01C1\n.\x03/\x03/\x030\x030\x030\x030\x030\x030\x030\x03' +
    '0\x030\x030\x031\x051\u01D0\n1\x031\x031\x031\x031\x031\x031\x031\x03' +
    '1\x031\x051\u01DB\n1\x032\x032\x032\x03\xAB\x02\x03F3\x02\x02\x04\x02' +
    '\x06\x02\b\x02\n\x02\f\x02\x0E\x02\x10\x02\x12\x02\x14\x02\x16\x02\x18' +
    '\x02\x1A\x02\x1C\x02\x1E\x02 \x02"\x02$\x02&\x02(\x02*\x02,\x02.\x02' +
    '0\x022\x024\x026\x028\x02:\x02<\x02>\x02@\x02B\x02D\x02F\x02H\x02J\x02' +
    'L\x02N\x02P\x02R\x02T\x02V\x02X\x02Z\x02\\\x02^\x02`\x02b\x02\x02\b\x03' +
    '\x02hk\x03\x02fg\x03\x02`c\x03\x02^_\x04\x02]]fg\x03\x02\x1DK\x02\u01E9' +
    '\x02e\x03\x02\x02\x02\x04o\x03\x02\x02\x02\x06s\x03\x02\x02\x02\b\x91' +
    '\x03\x02\x02\x02\n\x93\x03\x02\x02\x02\f\x97\x03\x02\x02\x02\x0E\x9E\x03' +
    '\x02\x02\x02\x10\xA4\x03\x02\x02\x02\x12\xA6\x03\x02\x02\x02\x14\xAB\x03' +
    '\x02\x02\x02\x16\xBA\x03\x02\x02\x02\x18\xBC\x03\x02\x02\x02\x1A\xC5\x03' +
    '\x02\x02\x02\x1C\xCE\x03\x02\x02\x02\x1E\xD5\x03\x02\x02\x02 \xDC\x03' +
    '\x02\x02\x02"\xE3\x03\x02\x02\x02$\xEA\x03\x02\x02\x02&\xF1\x03\x02\x02' +
    '\x02(\xFE\x03\x02\x02\x02*\u010B\x03\x02\x02\x02,\u0118\x03\x02\x02\x02' +
    '.\u0125\x03\x02\x02\x020\u0130\x03\x02\x02\x022\u0132\x03\x02\x02\x02' +
    '4\u0134\x03\x02\x02\x026\u0136\x03\x02\x02\x028\u0138\x03\x02\x02\x02' +
    ':\u013A\x03\x02\x02\x02<\u013E\x03\x02\x02\x02>\u0140\x03\x02\x02\x02' +
    '@\u0143\x03\x02\x02\x02B\u0159\x03\x02\x02\x02D\u015B\x03\x02\x02\x02' +
    'F\u015D\x03\x02\x02\x02H\u0187\x03\x02\x02\x02J\u018C\x03\x02\x02\x02' +
    'L\u0195\x03\x02\x02\x02N\u0197\x03\x02\x02\x02P\u019B\x03\x02\x02\x02' +
    'R\u01A1\x03\x02\x02\x02T\u01A5\x03\x02\x02\x02V\u01B3\x03\x02\x02\x02' +
    'X\u01B5\x03\x02\x02\x02Z\u01C0\x03\x02\x02\x02\\\u01C2\x03\x02\x02\x02' +
    '^\u01C4\x03\x02\x02\x02`\u01CF\x03\x02\x02\x02b\u01DC\x03\x02\x02\x02' +
    'df\x05\x04\x03\x02ed\x03\x02\x02\x02ef\x03\x02\x02\x02fj\x03\x02\x02\x02' +
    'gi\x05\x06\x04\x02hg\x03\x02\x02\x02il\x03\x02\x02\x02jh\x03\x02\x02\x02' +
    'jk\x03\x02\x02\x02km\x03\x02\x02\x02lj\x03\x02\x02\x02mn\x07\x02\x02\x03' +
    'n\x03\x03\x02\x02\x02op\x07\x03\x02\x02pq\x07n\x02\x02qr\x07\x04\x02\x02' +
    'r\x05\x03\x02\x02\x02st\x07\x05\x02\x02tu\x07Y\x02\x02uv\x07\x06\x02\x02' +
    'v}\x05\b\x05\x02wy\x07\x07\x02\x02xz\x05\n\x06\x02yx\x03\x02\x02\x02z' +
    '{\x03\x02\x02\x02{y\x03\x02\x02\x02{|\x03\x02\x02\x02|~\x03\x02\x02\x02' +
    '}w\x03\x02\x02\x02}~\x03\x02\x02\x02~\x85\x03\x02\x02\x02\x7F\x81\x07' +
    '\b\x02\x02\x80\x82\x05\x0E\b\x02\x81\x80\x03\x02\x02\x02\x82\x83\x03\x02' +
    '\x02\x02\x83\x81\x03\x02\x02\x02\x83\x84\x03\x02\x02\x02\x84\x86\x03\x02' +
    '\x02\x02\x85\x7F\x03\x02\x02\x02\x85\x86\x03\x02\x02\x02\x86\x8D\x03\x02' +
    '\x02\x02\x87\x89\x07\t\x02\x02\x88\x8A\x05\x16\f\x02\x89\x88\x03\x02\x02' +
    '\x02\x8A\x8B\x03\x02\x02\x02\x8B\x89\x03\x02\x02\x02\x8B\x8C\x03\x02\x02' +
    '\x02\x8C\x8E\x03\x02\x02\x02\x8D\x87\x03\x02\x02\x02\x8D\x8E\x03\x02\x02' +
    '\x02\x8E\x8F\x03\x02\x02\x02\x8F\x90\x07\n\x02\x02\x90\x07\x03\x02\x02' +
    '\x02\x91\x92\x07X\x02\x02\x92\t\x03\x02\x02\x02\x93\x94\x056\x1C\x02\x94' +
    '\x95\x07\v\x02\x02\x95\x96\x05\f\x07\x02\x96\v\x03\x02\x02\x02\x97\x98' +
    '\x07\x1B\x02\x02\x98\x9A\x07O\x02\x02\x99\x9B\x05F$\x02\x9A\x99\x03\x02' +
    '\x02\x02\x9A\x9B\x03\x02\x02\x02\x9B\x9C\x03\x02\x02\x02\x9C\x9D\x07P' +
    '\x02\x02\x9D\r\x03\x02\x02\x02\x9E\x9F\x07n\x02\x02\x9F\xA0\x07\v\x02' +
    '\x02\xA0\xA1\x05\x10\t\x02\xA1\x0F\x03\x02\x02\x02\xA2\xA5\x05F$\x02\xA3' +
    '\xA5\x05\x12\n\x02\xA4\xA2\x03\x02\x02\x02\xA4\xA3\x03\x02\x02\x02\xA5' +
    '\x11\x03\x02\x02\x02\xA6\xA7\x07\x1C\x02\x02\xA7\x13\x03\x02\x02\x02\xA8' +
    '\xAA\v\x02\x02\x02\xA9\xA8\x03\x02\x02\x02\xAA\xAD\x03\x02\x02\x02\xAB' +
    '\xAC\x03\x02\x02\x02\xAB\xA9\x03\x02\x02\x02\xAC\x15\x03\x02\x02\x02\xAD' +
    '\xAB\x03\x02\x02\x02\xAE\xBB\x05\x18\r\x02\xAF\xBB\x05\x1A\x0E\x02\xB0' +
    '\xBB\x05\x1E\x10\x02\xB1\xBB\x05.\x18\x02\xB2\xBB\x05 \x11\x02\xB3\xBB' +
    '\x05"\x12\x02\xB4\xBB\x05$\x13\x02\xB5\xBB\x05&\x14\x02\xB6\xBB\x05(' +
    '\x15\x02\xB7\xBB\x05*\x16\x02\xB8\xBB\x05,\x17\x02\xB9\xBB\x05\x1C\x0F' +
    '\x02\xBA\xAE\x03\x02\x02\x02\xBA\xAF\x03\x02\x02\x02\xBA\xB0\x03\x02\x02' +
    '\x02\xBA\xB1\x03\x02\x02\x02\xBA\xB2\x03\x02\x02\x02\xBA\xB3\x03\x02\x02' +
    '\x02\xBA\xB4\x03\x02\x02\x02\xBA\xB5\x03\x02\x02\x02\xBA\xB6\x03\x02\x02' +
    '\x02\xBA\xB7\x03\x02\x02\x02\xBA\xB8\x03\x02\x02\x02\xBA\xB9\x03\x02\x02' +
    '\x02\xBB\x17\x03\x02\x02\x02\xBC\xBD\x056\x1C\x02\xBD\xBE\x07\x19\x02' +
    '\x02\xBE\xBF\x07\f\x02\x02\xBF\xC0\x07O\x02\x02\xC0\xC1\x058\x1D\x02\xC1' +
    '\xC2\x07\x18\x02\x02\xC2\xC3\x05<\x1F\x02\xC3\xC4\x07P\x02\x02\xC4\x19' +
    '\x03\x02\x02\x02\xC5\xC6\x056\x1C\x02\xC6\xC7\x07\x19\x02\x02\xC7\xC8' +
    '\x07\r\x02\x02\xC8\xC9\x07O\x02\x02\xC9\xCA\x058\x1D\x02\xCA\xCB\x07\x18' +
    '\x02\x02\xCB\xCC\x05<\x1F\x02\xCC\xCD\x07P\x02\x02\xCD\x1B\x03\x02\x02' +
    '\x02\xCE\xCF\x056\x1C\x02\xCF\xD0\x07\x19\x02\x02\xD0\xD1\x07\x0E\x02' +
    '\x02\xD1\xD2\x07O\x02\x02\xD2\xD3\x05<\x1F\x02\xD3\xD4\x07P\x02\x02\xD4' +
    '\x1D\x03\x02\x02\x02\xD5\xD6\x056\x1C\x02\xD6\xD7\x07\x19\x02\x02\xD7' +
    '\xD8\x07\x0F\x02\x02\xD8\xD9\x07O\x02\x02\xD9\xDA\x05<\x1F\x02\xDA\xDB' +
    '\x07P\x02\x02\xDB\x1F\x03\x02\x02\x02\xDC\xDD\x056\x1C\x02\xDD\xDE\x07' +
    '\x19\x02\x02\xDE\xDF\x07\x10\x02\x02\xDF\xE0\x07O\x02\x02\xE0\xE1\x05' +
    '4\x1B\x02\xE1\xE2\x07P\x02\x02\xE2!\x03\x02\x02\x02\xE3\xE4\x056\x1C\x02' +
    '\xE4\xE5\x07\x19\x02\x02\xE5\xE6\x07\x11\x02\x02\xE6\xE7\x07O\x02\x02' +
    '\xE7\xE8\x054\x1B\x02\xE8\xE9\x07P\x02\x02\xE9#\x03\x02\x02\x02\xEA\xEB' +
    '\x056\x1C\x02\xEB\xEC\x07\x19\x02\x02\xEC\xED\x07\x12\x02\x02\xED\xEE' +
    '\x07O\x02\x02\xEE\xEF\x054\x1B\x02\xEF\xF0\x07P\x02\x02\xF0%\x03\x02\x02' +
    '\x02\xF1\xF2\x056\x1C\x02\xF2\xF3\x07\x19\x02\x02\xF3\xF4\x07\x13\x02' +
    '\x02\xF4\xF5\x07O\x02\x02\xF5\xF6\x07\x1A\x02\x02\xF6\xF7\x07\x18\x02' +
    '\x02\xF7\xFA\x05<\x1F\x02\xF8\xF9\x07\x18\x02\x02\xF9\xFB\x05:\x1E\x02' +
    '\xFA\xF8\x03\x02\x02\x02\xFA\xFB\x03\x02\x02\x02\xFB\xFC\x03\x02\x02\x02' +
    "\xFC\xFD\x07P\x02\x02\xFD'\x03\x02\x02\x02\xFE\xFF\x056\x1C\x02\xFF\u0100" +
    '\x07\x19\x02\x02\u0100\u0101\x07\x14\x02\x02\u0101\u0102\x07O\x02\x02' +
    '\u0102\u0103\x07\x1A\x02\x02\u0103\u0104\x07\x18\x02\x02\u0104\u0107\x05' +
    '<\x1F\x02\u0105\u0106\x07\x18\x02\x02\u0106\u0108\x05:\x1E\x02\u0107\u0105' +
    '\x03\x02\x02\x02\u0107\u0108\x03\x02\x02\x02\u0108\u0109\x03\x02\x02\x02' +
    '\u0109\u010A\x07P\x02\x02\u010A)\x03\x02\x02\x02\u010B\u010C\x056\x1C' +
    '\x02\u010C\u010D\x07\x19\x02\x02\u010D\u010E\x07\x15\x02\x02\u010E\u010F' +
    '\x07O\x02\x02\u010F\u0110\x07\x1A\x02\x02\u0110\u0111\x07\x18\x02\x02' +
    '\u0111\u0114\x05<\x1F\x02\u0112\u0113\x07\x18\x02\x02\u0113\u0115\x05' +
    ':\x1E\x02\u0114\u0112\x03\x02\x02\x02\u0114\u0115\x03\x02\x02\x02\u0115' +
    '\u0116\x03\x02\x02\x02\u0116\u0117\x07P\x02\x02\u0117+\x03\x02\x02\x02' +
    '\u0118\u0119\x056\x1C\x02\u0119\u011A\x07\x19\x02\x02\u011A\u011B\x07' +
    '\x16\x02\x02\u011B\u011C\x07O\x02\x02\u011C\u011D\x050\x19\x02\u011D\u011E' +
    '\x07\x18\x02\x02\u011E\u0121\x054\x1B\x02\u011F\u0120\x07\x18\x02\x02' +
    '\u0120\u0122\x052\x1A\x02\u0121\u011F\x03\x02\x02\x02\u0121\u0122\x03' +
    '\x02\x02\x02\u0122\u0123\x03\x02\x02\x02\u0123\u0124\x07P\x02\x02\u0124' +
    '-\x03\x02\x02\x02\u0125\u0126\x056\x1C\x02\u0126\u0127\x07\x19\x02\x02' +
    '\u0127\u0128\x07\x17\x02\x02\u0128\u0129\x07O\x02\x02\u0129\u012C\x05' +
    '<\x1F\x02\u012A\u012B\x07\x18\x02\x02\u012B\u012D\x05<\x1F\x02\u012C\u012A' +
    '\x03\x02\x02\x02\u012C\u012D\x03\x02\x02\x02\u012D\u012E\x03\x02\x02\x02' +
    '\u012E\u012F\x07P\x02\x02\u012F/\x03\x02\x02\x02\u0130\u0131\x07n\x02' +
    '\x02\u01311\x03\x02\x02\x02\u0132\u0133\x07n\x02\x02\u01333\x03\x02\x02' +
    '\x02\u0134\u0135\x07n\x02\x02\u01355\x03\x02\x02\x02\u0136\u0137\x07n' +
    '\x02\x02\u01377\x03\x02\x02\x02\u0138\u0139\x07n\x02\x02\u01399\x03\x02' +
    '\x02\x02\u013A\u013B\x07Y\x02\x02\u013B;\x03\x02\x02\x02\u013C\u013F\x05' +
    "L'\x02\u013D\u013F\x054\x1B\x02\u013E\u013C\x03\x02\x02\x02\u013E\u013D" +
    '\x03\x02\x02\x02\u013F=\x03\x02\x02\x02\u0140\u0141\x05F$\x02\u0141\u0142' +
    '\x07\x02\x02\x03\u0142?\x03\x02\x02\x02\u0143\u0148\x07n\x02\x02\u0144' +
    '\u0145\x07\x19\x02\x02\u0145\u0147\x07n\x02\x02\u0146\u0144\x03\x02\x02' +
    '\x02\u0147\u014A\x03\x02\x02\x02\u0148\u0146\x03\x02\x02\x02\u0148\u0149' +
    '\x03\x02\x02\x02\u0149\u014E\x03\x02\x02\x02\u014A\u0148\x03\x02\x02\x02' +
    '\u014B\u014C\x07S\x02\x02\u014C\u014D\x07Y\x02\x02\u014D\u014F\x07T\x02' +
    '\x02\u014E\u014B\x03\x02\x02\x02\u014E\u014F\x03\x02\x02\x02\u014FA\x03' +
    '\x02\x02\x02\u0150\u015A\x03\x02\x02\x02\u0151\u0156\x05F$\x02\u0152\u0153' +
    '\x07\x18\x02\x02\u0153\u0155\x05F$\x02\u0154\u0152\x03\x02\x02\x02\u0155' +
    '\u0158\x03\x02\x02\x02\u0156\u0154\x03\x02\x02\x02\u0156\u0157\x03\x02' +
    '\x02\x02\u0157\u015A\x03\x02\x02\x02\u0158\u0156\x03\x02\x02\x02\u0159' +
    '\u0150\x03\x02\x02\x02\u0159\u0151\x03\x02\x02\x02\u015AC\x03\x02\x02' +
    '\x02\u015B\u015C\x05F$\x02\u015CE\x03\x02\x02\x02\u015D\u015E\b$\x01\x02' +
    '\u015E\u015F\x05`1\x02\u015F\u0183\x03\x02\x02\x02\u0160\u0161\f\v\x02' +
    '\x02\u0161\u0162\x07l\x02\x02\u0162\u0182\x05F$\f\u0163\u0164\f\n\x02' +
    '\x02\u0164\u0165\t\x02\x02\x02\u0165\u0182\x05F$\v\u0166\u0167\f\t\x02' +
    '\x02\u0167\u0168\t\x03\x02\x02\u0168\u0182\x05F$\n\u0169\u016A\f\b\x02' +
    '\x02\u016A\u016B\t\x04\x02\x02\u016B\u0182\x05F$\t\u016C\u016D\f\x07\x02' +
    '\x02\u016D\u016E\t\x05\x02\x02\u016E\u0182\x05F$\b\u016F\u0170\f\x06\x02' +
    '\x02\u0170\u0171\x07d\x02\x02\u0171\u0182\x05F$\x07\u0172\u0173\f\x05' +
    '\x02\x02\u0173\u0174\x07e\x02\x02\u0174\u0182\x05F$\x06\u0175\u0176\f' +
    '\f\x02\x02\u0176\u0177\x07m\x02\x02\u0177\u0178\x05D#\x02\u0178\u0179' +
    '\x07\v\x02\x02\u0179\u017A\x05D#\x02\u017A\u0182\x03\x02\x02\x02\u017B' +
    '\u017C\f\x04\x02\x02\u017C\u017D\x07[\x02\x02\u017D\u0182\x05D#\x02\u017E' +
    '\u017F\f\x03\x02\x02\u017F\u0180\x07\\\x02\x02\u0180\u0182\x05D#\x02\u0181' +
    '\u0160\x03\x02\x02\x02\u0181\u0163\x03\x02\x02\x02\u0181\u0166\x03\x02' +
    '\x02\x02\u0181\u0169\x03\x02\x02\x02\u0181\u016C\x03\x02\x02\x02\u0181' +
    '\u016F\x03\x02\x02\x02\u0181\u0172\x03\x02\x02\x02\u0181\u0175\x03\x02' +
    '\x02\x02\u0181\u017B\x03\x02\x02\x02\u0181\u017E\x03\x02\x02\x02\u0182' +
    '\u0185\x03\x02\x02\x02\u0183\u0181\x03\x02\x02\x02\u0183\u0184\x03\x02' +
    '\x02\x02\u0184G\x03\x02\x02\x02\u0185\u0183\x03\x02\x02\x02\u0186\u0188' +
    '\t\x03\x02\x02\u0187\u0186\x03\x02\x02\x02\u0187\u0188\x03\x02\x02\x02' +
    '\u0188\u0189\x03\x02\x02\x02\u0189\u018A\x07X\x02\x02\u018AI\x03\x02\x02' +
    '\x02\u018B\u018D\t\x03\x02\x02\u018C\u018B\x03\x02\x02\x02\u018C\u018D' +
    '\x03\x02\x02\x02\u018D\u018E\x03\x02\x02\x02\u018E\u018F\x07Z\x02\x02' +
    '\u018FK\x03\x02\x02\x02\u0190\u0196\x05H%\x02\u0191\u0196\x05J&\x02\u0192' +
    '\u0196\x07V\x02\x02\u0193\u0196\x07W\x02\x02\u0194\u0196\x07Y\x02\x02' +
    '\u0195\u0190\x03\x02\x02\x02\u0195\u0191\x03\x02\x02\x02\u0195\u0192\x03' +
    '\x02\x02\x02\u0195\u0193\x03\x02\x02\x02\u0195\u0194\x03\x02\x02\x02\u0196' +
    'M\x03\x02\x02\x02\u0197\u0198\x05@!\x02\u0198O\x03\x02\x02\x02\u0199\u019C' +
    '\x05b2\x02\u019A\u019C\x05@!\x02\u019B\u0199\x03\x02\x02\x02\u019B\u019A' +
    '\x03\x02\x02\x02\u019C\u019D\x03\x02\x02\x02\u019D\u019E\x07O\x02\x02' +
    '\u019E\u019F\x05B"\x02\u019F\u01A0\x07P\x02\x02\u01A0Q\x03\x02\x02\x02' +
    '\u01A1\u01A2\x07Q\x02\x02\u01A2\u01A3\x05B"\x02\u01A3\u01A4\x07R\x02' +
    '\x02\u01A4S\x03\x02\x02\x02\u01A5\u01A8\x07n\x02\x02\u01A6\u01A7\x07N' +
    '\x02\x02\u01A7\u01A9\x05F$\x02\u01A8\u01A6\x03\x02\x02\x02\u01A8\u01A9' +
    '\x03\x02\x02\x02\u01A9U\x03\x02\x02\x02\u01AA\u01B4\x03\x02\x02\x02\u01AB' +
    '\u01B0\x05T+\x02\u01AC\u01AD\x07\x18\x02\x02\u01AD\u01AF\x05T+\x02\u01AE' +
    '\u01AC\x03\x02\x02\x02\u01AF\u01B2\x03\x02\x02\x02\u01B0\u01AE\x03\x02' +
    '\x02\x02\u01B0\u01B1\x03\x02\x02\x02\u01B1\u01B4\x03\x02\x02\x02\u01B2' +
    '\u01B0\x03\x02\x02\x02\u01B3\u01AA\x03\x02\x02\x02\u01B3\u01AB\x03\x02' +
    '\x02\x02\u01B4W\x03\x02\x02\x02\u01B5\u01B6\x07n\x02\x02\u01B6Y\x03\x02' +
    '\x02\x02\u01B7\u01C1\x03\x02\x02\x02\u01B8\u01BD\x05X-\x02\u01B9\u01BA' +
    '\x07\x18\x02\x02\u01BA\u01BC\x05X-\x02\u01BB\u01B9\x03\x02\x02\x02\u01BC' +
    '\u01BF\x03\x02\x02\x02\u01BD\u01BB\x03\x02\x02\x02\u01BD\u01BE\x03\x02' +
    '\x02\x02\u01BE\u01C1\x03\x02\x02\x02\u01BF\u01BD\x03\x02\x02\x02\u01C0' +
    '\u01B7\x03\x02\x02\x02\u01C0\u01B8\x03\x02\x02\x02\u01C1[\x03\x02\x02' +
    '\x02\u01C2\u01C3\x05F$\x02\u01C3]\x03\x02\x02\x02\u01C4\u01C5\x07S\x02' +
    '\x02\u01C5\u01C6\x05V,\x02\u01C6\u01C7\x07T\x02\x02\u01C7\u01C8\x07O\x02' +
    '\x02\u01C8\u01C9\x05Z.\x02\u01C9\u01CA\x07P\x02\x02\u01CA\u01CB\x07Q\x02' +
    '\x02\u01CB\u01CC\x05\\/\x02\u01CC\u01CD\x07R\x02\x02\u01CD_\x03\x02\x02' +
    '\x02\u01CE\u01D0\t\x06\x02\x02\u01CF\u01CE\x03\x02\x02\x02\u01CF\u01D0' +
    '\x03\x02\x02\x02\u01D0\u01DA\x03\x02\x02\x02\u01D1\u01D2\x07O\x02\x02' +
    '\u01D2\u01D3\x05F$\x02\u01D3\u01D4\x07P\x02\x02\u01D4\u01DB\x03\x02\x02' +
    "\x02\u01D5\u01DB\x05N(\x02\u01D6\u01DB\x05L'\x02\u01D7\u01DB\x05P)\x02" +
    '\u01D8\u01DB\x05R*\x02\u01D9\u01DB\x05^0\x02\u01DA\u01D1\x03\x02\x02\x02' +
    '\u01DA\u01D5\x03\x02\x02\x02\u01DA\u01D6\x03\x02\x02\x02\u01DA\u01D7\x03' +
    '\x02\x02\x02\u01DA\u01D8\x03\x02\x02\x02\u01DA\u01D9\x03\x02\x02\x02\u01DB' +
    'a\x03\x02\x02\x02\u01DC\u01DD\t\x07\x02\x02\u01DDc\x03\x02\x02\x02%ej' +
    '{}\x83\x85\x8B\x8D\x9A\xA4\xAB\xBA\xFA\u0107\u0114\u0121\u012C\u013E\u0148' +
    '\u014E\u0156\u0159\u0181\u0183\u0187\u018C\u0195\u019B\u01A8\u01B0\u01B3' +
    '\u01BD\u01C0\u01CF\u01DA';
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
  public actionDeclaration(): ActionDeclarationContext[];
  public actionDeclaration(i: number): ActionDeclarationContext;
  public actionDeclaration(i?: number): ActionDeclarationContext | ActionDeclarationContext[] {
    if (i === undefined) {
      return this.getRuleContexts(ActionDeclarationContext);
    } else {
      return this.getRuleContext(i, ActionDeclarationContext);
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

export class ScriptDeclarationContext extends ParserRuleContext {
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return RulesParser.RULE_scriptDeclaration;
  }
  // @Override
  public enterRule(listener: RulesListener): void {
    if (listener.enterScriptDeclaration) {
      listener.enterScriptDeclaration(this);
    }
  }
  // @Override
  public exitRule(listener: RulesListener): void {
    if (listener.exitScriptDeclaration) {
      listener.exitScriptDeclaration(this);
    }
  }
}

export class ActionDeclarationContext extends ParserRuleContext {
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
