// Generated from libs/grammar/rule/Rules.g4 by ANTLR 4.9.0-SNAPSHOT

/*
  Veloce configuration and pricing engine

  @2017-2021 Veloce Inc. All rights reserved
*/

/*
  Veloce configuration and pricing engine

  @2017-2021 Veloce Inc. All rights reserved
*/
/* eslint-disable */
import { ATN } from 'antlr4ts/atn/ATN';
import { ATNDeserializer } from 'antlr4ts/atn/ATNDeserializer';
import { FailedPredicateException } from 'antlr4ts/FailedPredicateException';
import { NoViableAltException } from 'antlr4ts/NoViableAltException';
import { Parser } from 'antlr4ts/Parser';
import { ParserRuleContext } from 'antlr4ts/ParserRuleContext';
import { ParserATNSimulator } from 'antlr4ts/atn/ParserATNSimulator';
import { RecognitionException } from 'antlr4ts/RecognitionException';
import { RuleContext } from 'antlr4ts/RuleContext';
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
  public static readonly COMMA = 20;
  public static readonly DOT = 21;
  public static readonly ACTION_TYPE = 22;
  public static readonly OBJECT_TYPE = 23;
  public static readonly SCRIPT_TEXT = 24;
  public static readonly SIN = 25;
  public static readonly COS = 26;
  public static readonly TAN = 27;
  public static readonly COT = 28;
  public static readonly SQRT = 29;
  public static readonly ABS = 30;
  public static readonly CEIL = 31;
  public static readonly FLOOR = 32;
  public static readonly ROUND = 33;
  public static readonly YEAR = 34;
  public static readonly MONTH = 35;
  public static readonly DAYOFYEAR = 36;
  public static readonly DAYOFMONTH = 37;
  public static readonly DAYOFWEEK = 38;
  public static readonly WORKDAYS = 39;
  public static readonly STRLEN = 40;
  public static readonly TRIM = 41;
  public static readonly SUBSTRING = 42;
  public static readonly FORMAT = 43;
  public static readonly STRTOINT = 44;
  public static readonly STRTOFLOAT = 45;
  public static readonly STRTODATE = 46;
  public static readonly STRCONCAT = 47;
  public static readonly STRSPLIT = 48;
  public static readonly STRCONTAIN = 49;
  public static readonly REGEXPMATCH = 50;
  public static readonly REGEXPREPLACE = 51;
  public static readonly FINDRECORD = 52;
  public static readonly FINDRECORDIF = 53;
  public static readonly ACCUMULATE = 54;
  public static readonly APPLY = 55;
  public static readonly MAX = 56;
  public static readonly MIN = 57;
  public static readonly SEGMENT_DISTANCE = 58;
  public static readonly TUPLEN = 59;
  public static readonly GET = 60;
  public static readonly TODAY = 61;
  public static readonly INCLUDE = 62;
  public static readonly EXCLUDE = 63;
  public static readonly SEQ = 64;
  public static readonly LPAREN = 65;
  public static readonly RPAREN = 66;
  public static readonly LFIGBR = 67;
  public static readonly RFIGBR = 68;
  public static readonly LSQBR = 69;
  public static readonly RSQBR = 70;
  public static readonly RANGE = 71;
  public static readonly NULLLITERAL = 72;
  public static readonly BOOLLITERAL = 73;
  public static readonly INTLITERAL = 74;
  public static readonly STRINGLITERAL = 75;
  public static readonly DOUBLELITERAL = 76;
  public static readonly AND = 77;
  public static readonly OR = 78;
  public static readonly NOT = 79;
  public static readonly EQ = 80;
  public static readonly NE = 81;
  public static readonly LT = 82;
  public static readonly GT = 83;
  public static readonly LE = 84;
  public static readonly GE = 85;
  public static readonly MATCH = 86;
  public static readonly PLUS = 87;
  public static readonly MINUS = 88;
  public static readonly TIMES = 89;
  public static readonly DIVIDE = 90;
  public static readonly DIV = 91;
  public static readonly MOD = 92;
  public static readonly POW = 93;
  public static readonly COND = 94;
  public static readonly IDENTIFIER = 95;
  public static readonly WHITE_SPACE = 96;
  public static readonly COMMENT = 97;
  public static readonly LINE_COMMENT = 98;
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
  public static readonly RULE_setFieldAction = 12;
  public static readonly RULE_addMessageAction = 13;
  public static readonly RULE_setStartDateAction = 14;
  public static readonly RULE_setEndDateAction = 15;
  public static readonly RULE_setEffectiveDateAction = 16;
  public static readonly RULE_adjustCostAction = 17;
  public static readonly RULE_adjustPriceAction = 18;
  public static readonly RULE_adjustListPriceAction = 19;
  public static readonly RULE_setMetricAction = 20;
  public static readonly RULE_metricName = 21;
  public static readonly RULE_totalMetricName = 22;
  public static readonly RULE_transformationVariable = 23;
  public static readonly RULE_variableName = 24;
  public static readonly RULE_targetFieldName = 25;
  public static readonly RULE_explanation = 26;
  public static readonly RULE_value = 27;
  public static readonly RULE_expressionRoot = 28;
  public static readonly RULE_qualifiedIdentifier = 29;
  public static readonly RULE_expressionList = 30;
  public static readonly RULE_optionalExpression = 31;
  public static readonly RULE_expression = 32;
  public static readonly RULE_intConstant = 33;
  public static readonly RULE_doubleConstant = 34;
  public static readonly RULE_literalExpression = 35;
  public static readonly RULE_identifierExpression = 36;
  public static readonly RULE_functionExpression = 37;
  public static readonly RULE_tupleExpression = 38;
  public static readonly RULE_lambdaCapture = 39;
  public static readonly RULE_lambdaCaptureList = 40;
  public static readonly RULE_lambdaParam = 41;
  public static readonly RULE_lambdaParamList = 42;
  public static readonly RULE_lambdaBody = 43;
  public static readonly RULE_lambdaExpression = 44;
  public static readonly RULE_primaryExpression = 45;
  public static readonly RULE_functionName = 46;
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
    'setFieldAction',
    'addMessageAction',
    'setStartDateAction',
    'setEndDateAction',
    'setEffectiveDateAction',
    'adjustCostAction',
    'adjustPriceAction',
    'adjustListPriceAction',
    'setMetricAction',
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
    "'setField'",
    "'addMessage'",
    "'setStartDate'",
    "'setEndDate'",
    "'setEffectiveDate'",
    "'adjustCost'",
    "'adjustPrice'",
    "'adjustListPrice'",
    "'setMetric'",
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
    "'dayofyear'",
    "'dayofmonth'",
    "'dayofweek'",
    "'workdays'",
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
    'DAYOFYEAR',
    'DAYOFMONTH',
    'DAYOFWEEK',
    'WORKDAYS',
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
  public static readonly _serializedATN: string =
    '\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03d\u01BB\x04\x02' +
    '\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07' +
    '\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04' +
    '\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04' +
    '\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17\x04' +
    '\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t\x1B\x04\x1C\t\x1C\x04' +
    '\x1D\t\x1D\x04\x1E\t\x1E\x04\x1F\t\x1F\x04 \t \x04!\t!\x04"\t"\x04#' +
    "\t#\x04$\t$\x04%\t%\x04&\t&\x04'\t'\x04(\t(\x04)\t)\x04*\t*\x04+\t+" +
    '\x04,\t,\x04-\t-\x04.\t.\x04/\t/\x040\t0\x03\x02\x05\x02b\n\x02\x03\x02' +
    '\x07\x02e\n\x02\f\x02\x0E\x02h\v\x02\x03\x02\x03\x02\x03\x03\x03\x03\x03' +
    '\x03\x03\x03\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x06\x04v' +
    '\n\x04\r\x04\x0E\x04w\x03\x04\x03\x04\x06\x04|\n\x04\r\x04\x0E\x04}\x05' +
    '\x04\x80\n\x04\x03\x04\x03\x04\x06\x04\x84\n\x04\r\x04\x0E\x04\x85\x03' +
    '\x04\x03\x04\x03\x05\x03\x05\x03\x06\x03\x06\x03\x06\x03\x06\x03\x07\x03' +
    '\x07\x03\x07\x05\x07\x93\n\x07\x03\x07\x03\x07\x03\b\x03\b\x03\b\x03\b' +
    '\x03\t\x03\t\x05\t\x9D\n\t\x03\n\x03\n\x03\v\x07\v\xA2\n\v\f\v\x0E\v\xA5' +
    '\v\v\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x05\f' +
    '\xB1\n\f\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\x0E' +
    '\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0F' +
    '\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x10\x03\x10\x03\x10' +
    '\x03\x10\x03\x10\x03\x10\x03\x10\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11' +
    '\x03\x11\x03\x11\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12' +
    '\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13' +
    '\x05\x13\xEA\n\x13\x03\x13\x03\x13\x03\x14\x03\x14\x03\x14\x03\x14\x03' +
    '\x14\x03\x14\x03\x14\x03\x14\x03\x14\x05\x14\xF7\n\x14\x03\x14\x03\x14' +
    '\x03\x15\x03\x15\x03\x15\x03\x15\x03\x15\x03\x15\x03\x15\x03\x15\x03\x15' +
    '\x05\x15\u0104\n\x15\x03\x15\x03\x15\x03\x16\x03\x16\x03\x16\x03\x16\x03' +
    '\x16\x03\x16\x03\x16\x03\x16\x03\x16\x05\x16\u0111\n\x16\x03\x16\x03\x16' +
    '\x03\x17\x03\x17\x03\x18\x03\x18\x03\x19\x03\x19\x03\x1A\x03\x1A\x03\x1B' +
    '\x03\x1B\x03\x1C\x03\x1C\x03\x1D\x03\x1D\x05\x1D\u0123\n\x1D\x03\x1E\x03' +
    '\x1E\x03\x1E\x03\x1F\x03\x1F\x03\x1F\x07\x1F\u012B\n\x1F\f\x1F\x0E\x1F' +
    '\u012E\v\x1F\x03 \x03 \x03 \x03 \x07 \u0134\n \f \x0E \u0137\v \x05 \u0139' +
    '\n \x03!\x03!\x03"\x03"\x03"\x03"\x03"\x03"\x03"\x03"\x03"\x03' +
    '"\x03"\x03"\x03"\x03"\x03"\x03"\x03"\x03"\x03"\x03"\x03"\x03' +
    '"\x03"\x03"\x03"\x03"\x03"\x03"\x03"\x03"\x03"\x03"\x03"\x07' +
    '"\u015E\n"\f"\x0E"\u0161\v"\x03#\x05#\u0164\n#\x03#\x03#\x03$\x05' +
    '$\u0169\n$\x03$\x03$\x03%\x03%\x03%\x03%\x03%\x05%\u0172\n%\x03&\x03&' +
    "\x03'\x03'\x05'\u0178\n'\x03'\x03'\x03'\x03'\x03(\x03(\x03(\x03" +
    '(\x03)\x03)\x03)\x05)\u0185\n)\x03*\x03*\x03*\x03*\x07*\u018B\n*\f*\x0E' +
    '*\u018E\v*\x05*\u0190\n*\x03+\x03+\x03,\x03,\x03,\x03,\x07,\u0198\n,\f' +
    ',\x0E,\u019B\v,\x05,\u019D\n,\x03-\x03-\x03.\x03.\x03.\x03.\x03.\x03.' +
    '\x03.\x03.\x03.\x03.\x03/\x05/\u01AC\n/\x03/\x03/\x03/\x03/\x03/\x03/' +
    '\x03/\x03/\x03/\x05/\u01B7\n/\x030\x030\x030\x03\xA3\x02\x03B1\x02\x02' +
    '\x04\x02\x06\x02\b\x02\n\x02\f\x02\x0E\x02\x10\x02\x12\x02\x14\x02\x16' +
    '\x02\x18\x02\x1A\x02\x1C\x02\x1E\x02 \x02"\x02$\x02&\x02(\x02*\x02,\x02' +
    '.\x020\x022\x024\x026\x028\x02:\x02<\x02>\x02@\x02B\x02D\x02F\x02H\x02' +
    'J\x02L\x02N\x02P\x02R\x02T\x02V\x02X\x02Z\x02\\\x02^\x02\x02\b\x03\x02' +
    '[^\x03\x02YZ\x03\x02TW\x03\x02RS\x04\x02QQYZ\x03\x02\x1B?\x02\u01C0\x02' +
    'a\x03\x02\x02\x02\x04k\x03\x02\x02\x02\x06o\x03\x02\x02\x02\b\x89\x03' +
    '\x02\x02\x02\n\x8B\x03\x02\x02\x02\f\x8F\x03\x02\x02\x02\x0E\x96\x03\x02' +
    '\x02\x02\x10\x9C\x03\x02\x02\x02\x12\x9E\x03\x02\x02\x02\x14\xA3\x03\x02' +
    '\x02\x02\x16\xB0\x03\x02\x02\x02\x18\xB2\x03\x02\x02\x02\x1A\xBB\x03\x02' +
    '\x02\x02\x1C\xC4\x03\x02\x02\x02\x1E\xCB\x03\x02\x02\x02 \xD2\x03\x02' +
    '\x02\x02"\xD9\x03\x02\x02\x02$\xE0\x03\x02\x02\x02&\xED\x03\x02\x02\x02' +
    '(\xFA\x03\x02\x02\x02*\u0107\x03\x02\x02\x02,\u0114\x03\x02\x02\x02.\u0116' +
    '\x03\x02\x02\x020\u0118\x03\x02\x02\x022\u011A\x03\x02\x02\x024\u011C' +
    '\x03\x02\x02\x026\u011E\x03\x02\x02\x028\u0122\x03\x02\x02\x02:\u0124' +
    '\x03\x02\x02\x02<\u0127\x03\x02\x02\x02>\u0138\x03\x02\x02\x02@\u013A' +
    '\x03\x02\x02\x02B\u013C\x03\x02\x02\x02D\u0163\x03\x02\x02\x02F\u0168' +
    '\x03\x02\x02\x02H\u0171\x03\x02\x02\x02J\u0173\x03\x02\x02\x02L\u0177' +
    '\x03\x02\x02\x02N\u017D\x03\x02\x02\x02P\u0181\x03\x02\x02\x02R\u018F' +
    '\x03\x02\x02\x02T\u0191\x03\x02\x02\x02V\u019C\x03\x02\x02\x02X\u019E' +
    '\x03\x02\x02\x02Z\u01A0\x03\x02\x02\x02\\\u01AB\x03\x02\x02\x02^\u01B8' +
    '\x03\x02\x02\x02`b\x05\x04\x03\x02a`\x03\x02\x02\x02ab\x03\x02\x02\x02' +
    'bf\x03\x02\x02\x02ce\x05\x06\x04\x02dc\x03\x02\x02\x02eh\x03\x02\x02\x02' +
    'fd\x03\x02\x02\x02fg\x03\x02\x02\x02gi\x03\x02\x02\x02hf\x03\x02\x02\x02' +
    'ij\x07\x02\x02\x03j\x03\x03\x02\x02\x02kl\x07\x03\x02\x02lm\x07a\x02\x02' +
    'mn\x07\x04\x02\x02n\x05\x03\x02\x02\x02op\x07\x05\x02\x02pq\x07M\x02\x02' +
    'qr\x07\x06\x02\x02rs\x05\b\x05\x02su\x07\x07\x02\x02tv\x05\n\x06\x02u' +
    't\x03\x02\x02\x02vw\x03\x02\x02\x02wu\x03\x02\x02\x02wx\x03\x02\x02\x02' +
    'x\x7F\x03\x02\x02\x02y{\x07\b\x02\x02z|\x05\x0E\b\x02{z\x03\x02\x02\x02' +
    '|}\x03\x02\x02\x02}{\x03\x02\x02\x02}~\x03\x02\x02\x02~\x80\x03\x02\x02' +
    '\x02\x7Fy\x03\x02\x02\x02\x7F\x80\x03\x02\x02\x02\x80\x81\x03\x02\x02' +
    '\x02\x81\x83\x07\t\x02\x02\x82\x84\x05\x16\f\x02\x83\x82\x03\x02\x02\x02' +
    '\x84\x85\x03\x02\x02\x02\x85\x83\x03\x02\x02\x02\x85\x86\x03\x02\x02\x02' +
    '\x86\x87\x03\x02\x02\x02\x87\x88\x07\n\x02\x02\x88\x07\x03\x02\x02\x02' +
    '\x89\x8A\x07L\x02\x02\x8A\t\x03\x02\x02\x02\x8B\x8C\x052\x1A\x02\x8C\x8D' +
    '\x07\v\x02\x02\x8D\x8E\x05\f\x07\x02\x8E\v\x03\x02\x02\x02\x8F\x90\x07' +
    '\x19\x02\x02\x90\x92\x07C\x02\x02\x91\x93\x05B"\x02\x92\x91\x03\x02\x02' +
    '\x02\x92\x93\x03\x02\x02\x02\x93\x94\x03\x02\x02\x02\x94\x95\x07D\x02' +
    '\x02\x95\r\x03\x02\x02\x02\x96\x97\x07a\x02\x02\x97\x98\x07\v\x02\x02' +
    '\x98\x99\x05\x10\t\x02\x99\x0F\x03\x02\x02\x02\x9A\x9D\x05B"\x02\x9B' +
    '\x9D\x05\x12\n\x02\x9C\x9A\x03\x02\x02\x02\x9C\x9B\x03\x02\x02\x02\x9D' +
    '\x11\x03\x02\x02\x02\x9E\x9F\x07\x1A\x02\x02\x9F\x13\x03\x02\x02\x02\xA0' +
    '\xA2\v\x02\x02\x02\xA1\xA0\x03\x02\x02\x02\xA2\xA5\x03\x02\x02\x02\xA3' +
    '\xA4\x03\x02\x02\x02\xA3\xA1\x03\x02\x02\x02\xA4\x15\x03\x02\x02\x02\xA5' +
    '\xA3\x03\x02\x02\x02\xA6\xB1\x05\x18\r\x02\xA7\xB1\x05\x1A\x0E\x02\xA8' +
    '\xB1\x05\x1C\x0F\x02\xA9\xB1\x05\x1E\x10\x02\xAA\xB1\x05 \x11\x02\xAB' +
    '\xB1\x05"\x12\x02\xAC\xB1\x05$\x13\x02\xAD\xB1\x05&\x14\x02\xAE\xB1\x05' +
    '(\x15\x02\xAF\xB1\x05*\x16\x02\xB0\xA6\x03\x02\x02\x02\xB0\xA7\x03\x02' +
    '\x02\x02\xB0\xA8\x03\x02\x02\x02\xB0\xA9\x03\x02\x02\x02\xB0\xAA\x03\x02' +
    '\x02\x02\xB0\xAB\x03\x02\x02\x02\xB0\xAC\x03\x02\x02\x02\xB0\xAD\x03\x02' +
    '\x02\x02\xB0\xAE\x03\x02\x02\x02\xB0\xAF\x03\x02\x02\x02\xB1\x17\x03\x02' +
    '\x02\x02\xB2\xB3\x052\x1A\x02\xB3\xB4\x07\x17\x02\x02\xB4\xB5\x07\f\x02' +
    '\x02\xB5\xB6\x07C\x02\x02\xB6\xB7\x054\x1B\x02\xB7\xB8\x07\x16\x02\x02' +
    '\xB8\xB9\x058\x1D\x02\xB9\xBA\x07D\x02\x02\xBA\x19\x03\x02\x02\x02\xBB' +
    '\xBC\x052\x1A\x02\xBC\xBD\x07\x17\x02\x02\xBD\xBE\x07\r\x02\x02\xBE\xBF' +
    '\x07C\x02\x02\xBF\xC0\x054\x1B\x02\xC0\xC1\x07\x16\x02\x02\xC1\xC2\x05' +
    '8\x1D\x02\xC2\xC3\x07D\x02\x02\xC3\x1B\x03\x02\x02\x02\xC4\xC5\x052\x1A' +
    '\x02\xC5\xC6\x07\x17\x02\x02\xC6\xC7\x07\x0E\x02\x02\xC7\xC8\x07C\x02' +
    '\x02\xC8\xC9\x058\x1D\x02\xC9\xCA\x07D\x02\x02\xCA\x1D\x03\x02\x02\x02' +
    '\xCB\xCC\x052\x1A\x02\xCC\xCD\x07\x17\x02\x02\xCD\xCE\x07\x0F\x02\x02' +
    '\xCE\xCF\x07C\x02\x02\xCF\xD0\x050\x19\x02\xD0\xD1\x07D\x02\x02\xD1\x1F' +
    '\x03\x02\x02\x02\xD2\xD3\x052\x1A\x02\xD3\xD4\x07\x17\x02\x02\xD4\xD5' +
    '\x07\x10\x02\x02\xD5\xD6\x07C\x02\x02\xD6\xD7\x050\x19\x02\xD7\xD8\x07' +
    'D\x02\x02\xD8!\x03\x02\x02\x02\xD9\xDA\x052\x1A\x02\xDA\xDB\x07\x17\x02' +
    '\x02\xDB\xDC\x07\x11\x02\x02\xDC\xDD\x07C\x02\x02\xDD\xDE\x050\x19\x02' +
    '\xDE\xDF\x07D\x02\x02\xDF#\x03\x02\x02\x02\xE0\xE1\x052\x1A\x02\xE1\xE2' +
    '\x07\x17\x02\x02\xE2\xE3\x07\x12\x02\x02\xE3\xE4\x07C\x02\x02\xE4\xE5' +
    '\x07\x18\x02\x02\xE5\xE6\x07\x16\x02\x02\xE6\xE9\x058\x1D\x02\xE7\xE8' +
    '\x07\x16\x02\x02\xE8\xEA\x056\x1C\x02\xE9\xE7\x03\x02\x02\x02\xE9\xEA' +
    '\x03\x02\x02\x02\xEA\xEB\x03\x02\x02\x02\xEB\xEC\x07D\x02\x02\xEC%\x03' +
    '\x02\x02\x02\xED\xEE\x052\x1A\x02\xEE\xEF\x07\x17\x02\x02\xEF\xF0\x07' +
    '\x13\x02\x02\xF0\xF1\x07C\x02\x02\xF1\xF2\x07\x18\x02\x02\xF2\xF3\x07' +
    '\x16\x02\x02\xF3\xF6\x058\x1D\x02\xF4\xF5\x07\x16\x02\x02\xF5\xF7\x05' +
    '6\x1C\x02\xF6\xF4\x03\x02\x02\x02\xF6\xF7\x03\x02\x02\x02\xF7\xF8\x03' +
    "\x02\x02\x02\xF8\xF9\x07D\x02\x02\xF9'\x03\x02\x02\x02\xFA\xFB\x052\x1A" +
    '\x02\xFB\xFC\x07\x17\x02\x02\xFC\xFD\x07\x14\x02\x02\xFD\xFE\x07C\x02' +
    '\x02\xFE\xFF\x07\x18\x02\x02\xFF\u0100\x07\x16\x02\x02\u0100\u0103\x05' +
    '8\x1D\x02\u0101\u0102\x07\x16\x02\x02\u0102\u0104\x056\x1C\x02\u0103\u0101' +
    '\x03\x02\x02\x02\u0103\u0104\x03\x02\x02\x02\u0104\u0105\x03\x02\x02\x02' +
    '\u0105\u0106\x07D\x02\x02\u0106)\x03\x02\x02\x02\u0107\u0108\x052\x1A' +
    '\x02\u0108\u0109\x07\x17\x02\x02\u0109\u010A\x07\x15\x02\x02\u010A\u010B' +
    '\x07C\x02\x02\u010B\u010C\x05,\x17\x02\u010C\u010D\x07\x16\x02\x02\u010D' +
    '\u0110\x050\x19\x02\u010E\u010F\x07\x16\x02\x02\u010F\u0111\x05.\x18\x02' +
    '\u0110\u010E\x03\x02\x02\x02\u0110\u0111\x03\x02\x02\x02\u0111\u0112\x03' +
    '\x02\x02\x02\u0112\u0113\x07D\x02\x02\u0113+\x03\x02\x02\x02\u0114\u0115' +
    '\x07a\x02\x02\u0115-\x03\x02\x02\x02\u0116\u0117\x07a\x02\x02\u0117/\x03' +
    '\x02\x02\x02\u0118\u0119\x07a\x02\x02\u01191\x03\x02\x02\x02\u011A\u011B' +
    '\x07a\x02\x02\u011B3\x03\x02\x02\x02\u011C\u011D\x07a\x02\x02\u011D5\x03' +
    '\x02\x02\x02\u011E\u011F\x07M\x02\x02\u011F7\x03\x02\x02\x02\u0120\u0123' +
    '\x05H%\x02\u0121\u0123\x050\x19\x02\u0122\u0120\x03\x02\x02\x02\u0122' +
    '\u0121\x03\x02\x02\x02\u01239\x03\x02\x02\x02\u0124\u0125\x05B"\x02\u0125' +
    '\u0126\x07\x02\x02\x03\u0126;\x03\x02\x02\x02\u0127\u012C\x07a\x02\x02' +
    '\u0128\u0129\x07\x17\x02\x02\u0129\u012B\x07a\x02\x02\u012A\u0128\x03' +
    '\x02\x02\x02\u012B\u012E\x03\x02\x02\x02\u012C\u012A\x03\x02\x02\x02\u012C' +
    '\u012D\x03\x02\x02\x02\u012D=\x03\x02\x02\x02\u012E\u012C\x03\x02\x02' +
    '\x02\u012F\u0139\x03\x02\x02\x02\u0130\u0135\x05B"\x02\u0131\u0132\x07' +
    '\x16\x02\x02\u0132\u0134\x05B"\x02\u0133\u0131\x03\x02\x02\x02\u0134' +
    '\u0137\x03\x02\x02\x02\u0135\u0133\x03\x02\x02\x02\u0135\u0136\x03\x02' +
    '\x02\x02\u0136\u0139\x03\x02\x02\x02\u0137\u0135\x03\x02\x02\x02\u0138' +
    '\u012F\x03\x02\x02\x02\u0138\u0130\x03\x02\x02\x02\u0139?\x03\x02\x02' +
    '\x02\u013A\u013B\x05B"\x02\u013BA\x03\x02\x02\x02\u013C\u013D\b"\x01' +
    '\x02\u013D\u013E\x05\\/\x02\u013E\u015F\x03\x02\x02\x02\u013F\u0140\f' +
    '\n\x02\x02\u0140\u0141\x07_\x02\x02\u0141\u015E\x05B"\v\u0142\u0143\f' +
    '\t\x02\x02\u0143\u0144\t\x02\x02\x02\u0144\u015E\x05B"\n\u0145\u0146' +
    '\f\b\x02\x02\u0146\u0147\t\x03\x02\x02\u0147\u015E\x05B"\t\u0148\u0149' +
    '\f\x07\x02\x02\u0149\u014A\t\x04\x02\x02\u014A\u015E\x05B"\b\u014B\u014C' +
    '\f\x06\x02\x02\u014C\u014D\t\x05\x02\x02\u014D\u015E\x05B"\x07\u014E' +
    '\u014F\f\x05\x02\x02\u014F\u0150\x07X\x02\x02\u0150\u015E\x05B"\x06\u0151' +
    '\u0152\f\x04\x02\x02\u0152\u0153\x07O\x02\x02\u0153\u015E\x05B"\x05\u0154' +
    '\u0155\f\x03\x02\x02\u0155\u0156\x07P\x02\x02\u0156\u015E\x05B"\x04\u0157' +
    '\u0158\f\v\x02\x02\u0158\u0159\x07`\x02\x02\u0159\u015A\x05@!\x02\u015A' +
    '\u015B\x07\v\x02\x02\u015B\u015C\x05@!\x02\u015C\u015E\x03\x02\x02\x02' +
    '\u015D\u013F\x03\x02\x02\x02\u015D\u0142\x03\x02\x02\x02\u015D\u0145\x03' +
    '\x02\x02\x02\u015D\u0148\x03\x02\x02\x02\u015D\u014B\x03\x02\x02\x02\u015D' +
    '\u014E\x03\x02\x02\x02\u015D\u0151\x03\x02\x02\x02\u015D\u0154\x03\x02' +
    '\x02\x02\u015D\u0157\x03\x02\x02\x02\u015E\u0161\x03\x02\x02\x02\u015F' +
    '\u015D\x03\x02\x02\x02\u015F\u0160\x03\x02\x02\x02\u0160C\x03\x02\x02' +
    '\x02\u0161\u015F\x03\x02\x02\x02\u0162\u0164\t\x03\x02\x02\u0163\u0162' +
    '\x03\x02\x02\x02\u0163\u0164\x03\x02\x02\x02\u0164\u0165\x03\x02\x02\x02' +
    '\u0165\u0166\x07L\x02\x02\u0166E\x03\x02\x02\x02\u0167\u0169\t\x03\x02' +
    '\x02\u0168\u0167\x03\x02\x02\x02\u0168\u0169\x03\x02\x02\x02\u0169\u016A' +
    '\x03\x02\x02\x02\u016A\u016B\x07N\x02\x02\u016BG\x03\x02\x02\x02\u016C' +
    '\u0172\x05D#\x02\u016D\u0172\x05F$\x02\u016E\u0172\x07J\x02\x02\u016F' +
    '\u0172\x07K\x02\x02\u0170\u0172\x07M\x02\x02\u0171\u016C\x03\x02\x02\x02' +
    '\u0171\u016D\x03\x02\x02\x02\u0171\u016E\x03\x02\x02\x02\u0171\u016F\x03' +
    '\x02\x02\x02\u0171\u0170\x03\x02\x02\x02\u0172I\x03\x02\x02\x02\u0173' +
    '\u0174\x05<\x1F\x02\u0174K\x03\x02\x02\x02\u0175\u0178\x05^0\x02\u0176' +
    '\u0178\x05<\x1F\x02\u0177\u0175\x03\x02\x02\x02\u0177\u0176\x03\x02\x02' +
    '\x02\u0178\u0179\x03\x02\x02\x02\u0179\u017A\x07C\x02\x02\u017A\u017B' +
    '\x05> \x02\u017B\u017C\x07D\x02\x02\u017CM\x03\x02\x02\x02\u017D\u017E' +
    '\x07E\x02\x02\u017E\u017F\x05> \x02\u017F\u0180\x07F\x02\x02\u0180O\x03' +
    '\x02\x02\x02\u0181\u0184\x07a\x02\x02\u0182\u0183\x07B\x02\x02\u0183\u0185' +
    '\x05B"\x02\u0184\u0182\x03\x02\x02\x02\u0184\u0185\x03\x02\x02\x02\u0185' +
    'Q\x03\x02\x02\x02\u0186\u0190\x03\x02\x02\x02\u0187\u018C\x05P)\x02\u0188' +
    '\u0189\x07\x16\x02\x02\u0189\u018B\x05P)\x02\u018A\u0188\x03\x02\x02\x02' +
    '\u018B\u018E\x03\x02\x02\x02\u018C\u018A\x03\x02\x02\x02\u018C\u018D\x03' +
    '\x02\x02\x02\u018D\u0190\x03\x02\x02\x02\u018E\u018C\x03\x02\x02\x02\u018F' +
    '\u0186\x03\x02\x02\x02\u018F\u0187\x03\x02\x02\x02\u0190S\x03\x02\x02' +
    '\x02\u0191\u0192\x07a\x02\x02\u0192U\x03\x02\x02\x02\u0193\u019D\x03\x02' +
    '\x02\x02\u0194\u0199\x05T+\x02\u0195\u0196\x07\x16\x02\x02\u0196\u0198' +
    '\x05T+\x02\u0197\u0195\x03\x02\x02\x02\u0198\u019B\x03\x02\x02\x02\u0199' +
    '\u0197\x03\x02\x02\x02\u0199\u019A\x03\x02\x02\x02\u019A\u019D\x03\x02' +
    '\x02\x02\u019B\u0199\x03\x02\x02\x02\u019C\u0193\x03\x02\x02\x02\u019C' +
    '\u0194\x03\x02\x02\x02\u019DW\x03\x02\x02\x02\u019E\u019F\x05B"\x02\u019F' +
    'Y\x03\x02\x02\x02\u01A0\u01A1\x07G\x02\x02\u01A1\u01A2\x05R*\x02\u01A2' +
    '\u01A3\x07H\x02\x02\u01A3\u01A4\x07C\x02\x02\u01A4\u01A5\x05V,\x02\u01A5' +
    '\u01A6\x07D\x02\x02\u01A6\u01A7\x07E\x02\x02\u01A7\u01A8\x05X-\x02\u01A8' +
    '\u01A9\x07F\x02\x02\u01A9[\x03\x02\x02\x02\u01AA\u01AC\t\x06\x02\x02\u01AB' +
    '\u01AA\x03\x02\x02\x02\u01AB\u01AC\x03\x02\x02\x02\u01AC\u01B6\x03\x02' +
    '\x02\x02\u01AD\u01AE\x07C\x02\x02\u01AE\u01AF\x05B"\x02\u01AF\u01B0\x07' +
    'D\x02\x02\u01B0\u01B7\x03\x02\x02\x02\u01B1\u01B7\x05J&\x02\u01B2\u01B7' +
    "\x05H%\x02\u01B3\u01B7\x05L'\x02\u01B4\u01B7\x05N(\x02\u01B5\u01B7\x05" +
    'Z.\x02\u01B6\u01AD\x03\x02\x02\x02\u01B6\u01B1\x03\x02\x02\x02\u01B6\u01B2' +
    '\x03\x02\x02\x02\u01B6\u01B3\x03\x02\x02\x02\u01B6\u01B4\x03\x02\x02\x02' +
    '\u01B6\u01B5\x03\x02\x02\x02\u01B7]\x03\x02\x02\x02\u01B8\u01B9\t\x07' +
    '\x02\x02\u01B9_\x03\x02\x02\x02!afw}\x7F\x85\x92\x9C\xA3\xB0\xE9\xF6\u0103' +
    '\u0110\u0122\u012C\u0135\u0138\u015D\u015F\u0163\u0168\u0171\u0177\u0184' +
    '\u018C\u018F\u0199\u019C\u01AB\u01B6';
  public static __ATN: ATN;

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
    const _localctx: CompilationUnitContext = new CompilationUnitContext(this._ctx, this.state);
    this.enterRule(_localctx, 0, RulesParser.RULE_compilationUnit);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 95;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === RulesParser.T__0) {
          {
            this.state = 94;
            this.header();
          }
        }

        this.state = 100;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === RulesParser.T__2) {
          {
            {
              this.state = 97;
              this.ruleDeclaration();
            }
          }
          this.state = 102;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
        this.state = 103;
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
    const _localctx: HeaderContext = new HeaderContext(this._ctx, this.state);
    this.enterRule(_localctx, 2, RulesParser.RULE_header);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 105;
        this.match(RulesParser.T__0);
        this.state = 106;
        this.match(RulesParser.IDENTIFIER);
        this.state = 107;
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
    const _localctx: RuleDeclarationContext = new RuleDeclarationContext(this._ctx, this.state);
    this.enterRule(_localctx, 4, RulesParser.RULE_ruleDeclaration);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 109;
        this.match(RulesParser.T__2);
        this.state = 110;
        this.match(RulesParser.STRINGLITERAL);
        this.state = 111;
        this.match(RulesParser.T__3);
        this.state = 112;
        this.sequence();
        this.state = 113;
        this.match(RulesParser.T__4);
        this.state = 115;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
          {
            {
              this.state = 114;
              this.filterDeclaration();
            }
          }
          this.state = 117;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        } while (_la === RulesParser.IDENTIFIER);
        this.state = 125;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === RulesParser.T__5) {
          {
            this.state = 119;
            this.match(RulesParser.T__5);
            this.state = 121;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            do {
              {
                {
                  this.state = 120;
                  this.transformationDeclaration();
                }
              }
              this.state = 123;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
            } while (_la === RulesParser.IDENTIFIER);
          }
        }

        this.state = 127;
        this.match(RulesParser.T__6);
        this.state = 129;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
          {
            {
              this.state = 128;
              this.actionDeclaration();
            }
          }
          this.state = 131;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        } while (_la === RulesParser.IDENTIFIER);
        this.state = 133;
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
    const _localctx: SequenceContext = new SequenceContext(this._ctx, this.state);
    this.enterRule(_localctx, 6, RulesParser.RULE_sequence);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 135;
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
    const _localctx: FilterDeclarationContext = new FilterDeclarationContext(this._ctx, this.state);
    this.enterRule(_localctx, 8, RulesParser.RULE_filterDeclaration);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 137;
        this.variableName();
        this.state = 138;
        this.match(RulesParser.T__8);
        this.state = 139;
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
    const _localctx: FilterExpressionContext = new FilterExpressionContext(this._ctx, this.state);
    this.enterRule(_localctx, 10, RulesParser.RULE_filterExpression);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 141;
        this.match(RulesParser.OBJECT_TYPE);
        this.state = 142;
        this.match(RulesParser.LPAREN);
        this.state = 144;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (
          ((_la & ~0x1f) === 0 &&
            ((1 << _la) &
              ((1 << RulesParser.SIN) |
                (1 << RulesParser.COS) |
                (1 << RulesParser.TAN) |
                (1 << RulesParser.COT) |
                (1 << RulesParser.SQRT) |
                (1 << RulesParser.ABS) |
                (1 << RulesParser.CEIL))) !==
              0) ||
          (((_la - 32) & ~0x1f) === 0 &&
            ((1 << (_la - 32)) &
              ((1 << (RulesParser.FLOOR - 32)) |
                (1 << (RulesParser.ROUND - 32)) |
                (1 << (RulesParser.YEAR - 32)) |
                (1 << (RulesParser.MONTH - 32)) |
                (1 << (RulesParser.DAYOFYEAR - 32)) |
                (1 << (RulesParser.DAYOFMONTH - 32)) |
                (1 << (RulesParser.DAYOFWEEK - 32)) |
                (1 << (RulesParser.WORKDAYS - 32)) |
                (1 << (RulesParser.STRLEN - 32)) |
                (1 << (RulesParser.TRIM - 32)) |
                (1 << (RulesParser.SUBSTRING - 32)) |
                (1 << (RulesParser.FORMAT - 32)) |
                (1 << (RulesParser.STRTOINT - 32)) |
                (1 << (RulesParser.STRTOFLOAT - 32)) |
                (1 << (RulesParser.STRTODATE - 32)) |
                (1 << (RulesParser.STRCONCAT - 32)) |
                (1 << (RulesParser.STRSPLIT - 32)) |
                (1 << (RulesParser.STRCONTAIN - 32)) |
                (1 << (RulesParser.REGEXPMATCH - 32)) |
                (1 << (RulesParser.REGEXPREPLACE - 32)) |
                (1 << (RulesParser.FINDRECORD - 32)) |
                (1 << (RulesParser.FINDRECORDIF - 32)) |
                (1 << (RulesParser.ACCUMULATE - 32)) |
                (1 << (RulesParser.APPLY - 32)) |
                (1 << (RulesParser.MAX - 32)) |
                (1 << (RulesParser.MIN - 32)) |
                (1 << (RulesParser.SEGMENT_DISTANCE - 32)) |
                (1 << (RulesParser.TUPLEN - 32)) |
                (1 << (RulesParser.GET - 32)) |
                (1 << (RulesParser.TODAY - 32)))) !==
              0) ||
          (((_la - 65) & ~0x1f) === 0 &&
            ((1 << (_la - 65)) &
              ((1 << (RulesParser.LPAREN - 65)) |
                (1 << (RulesParser.LFIGBR - 65)) |
                (1 << (RulesParser.LSQBR - 65)) |
                (1 << (RulesParser.NULLLITERAL - 65)) |
                (1 << (RulesParser.BOOLLITERAL - 65)) |
                (1 << (RulesParser.INTLITERAL - 65)) |
                (1 << (RulesParser.STRINGLITERAL - 65)) |
                (1 << (RulesParser.DOUBLELITERAL - 65)) |
                (1 << (RulesParser.NOT - 65)) |
                (1 << (RulesParser.PLUS - 65)) |
                (1 << (RulesParser.MINUS - 65)) |
                (1 << (RulesParser.IDENTIFIER - 65)))) !==
              0)
        ) {
          {
            this.state = 143;
            this.expression(0);
          }
        }

        this.state = 146;
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
    const _localctx: TransformationDeclarationContext = new TransformationDeclarationContext(this._ctx, this.state);
    this.enterRule(_localctx, 12, RulesParser.RULE_transformationDeclaration);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 148;
        this.match(RulesParser.IDENTIFIER);
        this.state = 149;
        this.match(RulesParser.T__8);
        this.state = 150;
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
    const _localctx: TransformationStatementContext = new TransformationStatementContext(this._ctx, this.state);
    this.enterRule(_localctx, 14, RulesParser.RULE_transformationStatement);
    try {
      this.state = 154;
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
        case RulesParser.DAYOFYEAR:
        case RulesParser.DAYOFMONTH:
        case RulesParser.DAYOFWEEK:
        case RulesParser.WORKDAYS:
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
            this.state = 152;
            this.expression(0);
          }
          break;
        case RulesParser.SCRIPT_TEXT:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 153;
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
    const _localctx: ScriptContext = new ScriptContext(this._ctx, this.state);
    this.enterRule(_localctx, 16, RulesParser.RULE_script);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 156;
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
    const _localctx: ScriptDeclarationContext = new ScriptDeclarationContext(this._ctx, this.state);
    this.enterRule(_localctx, 18, RulesParser.RULE_scriptDeclaration);
    try {
      let _alt: number;
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 161;
        this._errHandler.sync(this);
        _alt = this.interpreter.adaptivePredict(this._input, 8, this._ctx);
        while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1 + 1) {
            {
              {
                this.state = 158;
                this.matchWildcard();
              }
            }
          }
          this.state = 163;
          this._errHandler.sync(this);
          _alt = this.interpreter.adaptivePredict(this._input, 8, this._ctx);
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
    const _localctx: ActionDeclarationContext = new ActionDeclarationContext(this._ctx, this.state);
    this.enterRule(_localctx, 20, RulesParser.RULE_actionDeclaration);
    try {
      this.state = 174;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 9, this._ctx)) {
        case 1:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 164;
            this.setPropertyAction();
          }
          break;

        case 2:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 165;
            this.setFieldAction();
          }
          break;

        case 3:
          this.enterOuterAlt(_localctx, 3);
          {
            this.state = 166;
            this.addMessageAction();
          }
          break;

        case 4:
          this.enterOuterAlt(_localctx, 4);
          {
            this.state = 167;
            this.setStartDateAction();
          }
          break;

        case 5:
          this.enterOuterAlt(_localctx, 5);
          {
            this.state = 168;
            this.setEndDateAction();
          }
          break;

        case 6:
          this.enterOuterAlt(_localctx, 6);
          {
            this.state = 169;
            this.setEffectiveDateAction();
          }
          break;

        case 7:
          this.enterOuterAlt(_localctx, 7);
          {
            this.state = 170;
            this.adjustCostAction();
          }
          break;

        case 8:
          this.enterOuterAlt(_localctx, 8);
          {
            this.state = 171;
            this.adjustPriceAction();
          }
          break;

        case 9:
          this.enterOuterAlt(_localctx, 9);
          {
            this.state = 172;
            this.adjustListPriceAction();
          }
          break;

        case 10:
          this.enterOuterAlt(_localctx, 10);
          {
            this.state = 173;
            this.setMetricAction();
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
    const _localctx: SetPropertyActionContext = new SetPropertyActionContext(this._ctx, this.state);
    this.enterRule(_localctx, 22, RulesParser.RULE_setPropertyAction);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 176;
        this.variableName();
        this.state = 177;
        this.match(RulesParser.DOT);
        this.state = 178;
        this.match(RulesParser.T__9);
        this.state = 179;
        this.match(RulesParser.LPAREN);
        this.state = 180;
        this.targetFieldName();
        this.state = 181;
        this.match(RulesParser.COMMA);
        this.state = 182;
        this.value();
        this.state = 183;
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
  public setFieldAction(): SetFieldActionContext {
    const _localctx: SetFieldActionContext = new SetFieldActionContext(this._ctx, this.state);
    this.enterRule(_localctx, 24, RulesParser.RULE_setFieldAction);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 185;
        this.variableName();
        this.state = 186;
        this.match(RulesParser.DOT);
        this.state = 187;
        this.match(RulesParser.T__10);
        this.state = 188;
        this.match(RulesParser.LPAREN);
        this.state = 189;
        this.targetFieldName();
        this.state = 190;
        this.match(RulesParser.COMMA);
        this.state = 191;
        this.value();
        this.state = 192;
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
    const _localctx: AddMessageActionContext = new AddMessageActionContext(this._ctx, this.state);
    this.enterRule(_localctx, 26, RulesParser.RULE_addMessageAction);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 194;
        this.variableName();
        this.state = 195;
        this.match(RulesParser.DOT);
        this.state = 196;
        this.match(RulesParser.T__11);
        this.state = 197;
        this.match(RulesParser.LPAREN);
        this.state = 198;
        this.value();
        this.state = 199;
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
    const _localctx: SetStartDateActionContext = new SetStartDateActionContext(this._ctx, this.state);
    this.enterRule(_localctx, 28, RulesParser.RULE_setStartDateAction);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 201;
        this.variableName();
        this.state = 202;
        this.match(RulesParser.DOT);
        this.state = 203;
        this.match(RulesParser.T__12);
        this.state = 204;
        this.match(RulesParser.LPAREN);
        this.state = 205;
        this.transformationVariable();
        this.state = 206;
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
    const _localctx: SetEndDateActionContext = new SetEndDateActionContext(this._ctx, this.state);
    this.enterRule(_localctx, 30, RulesParser.RULE_setEndDateAction);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 208;
        this.variableName();
        this.state = 209;
        this.match(RulesParser.DOT);
        this.state = 210;
        this.match(RulesParser.T__13);
        this.state = 211;
        this.match(RulesParser.LPAREN);
        this.state = 212;
        this.transformationVariable();
        this.state = 213;
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
    const _localctx: SetEffectiveDateActionContext = new SetEffectiveDateActionContext(this._ctx, this.state);
    this.enterRule(_localctx, 32, RulesParser.RULE_setEffectiveDateAction);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 215;
        this.variableName();
        this.state = 216;
        this.match(RulesParser.DOT);
        this.state = 217;
        this.match(RulesParser.T__14);
        this.state = 218;
        this.match(RulesParser.LPAREN);
        this.state = 219;
        this.transformationVariable();
        this.state = 220;
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
    const _localctx: AdjustCostActionContext = new AdjustCostActionContext(this._ctx, this.state);
    this.enterRule(_localctx, 34, RulesParser.RULE_adjustCostAction);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 222;
        this.variableName();
        this.state = 223;
        this.match(RulesParser.DOT);
        this.state = 224;
        this.match(RulesParser.T__15);
        this.state = 225;
        this.match(RulesParser.LPAREN);
        this.state = 226;
        this.match(RulesParser.ACTION_TYPE);
        this.state = 227;
        this.match(RulesParser.COMMA);
        this.state = 228;
        this.value();
        this.state = 231;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === RulesParser.COMMA) {
          {
            this.state = 229;
            this.match(RulesParser.COMMA);
            this.state = 230;
            this.explanation();
          }
        }

        this.state = 233;
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
    const _localctx: AdjustPriceActionContext = new AdjustPriceActionContext(this._ctx, this.state);
    this.enterRule(_localctx, 36, RulesParser.RULE_adjustPriceAction);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 235;
        this.variableName();
        this.state = 236;
        this.match(RulesParser.DOT);
        this.state = 237;
        this.match(RulesParser.T__16);
        this.state = 238;
        this.match(RulesParser.LPAREN);
        this.state = 239;
        this.match(RulesParser.ACTION_TYPE);
        this.state = 240;
        this.match(RulesParser.COMMA);
        this.state = 241;
        this.value();
        this.state = 244;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === RulesParser.COMMA) {
          {
            this.state = 242;
            this.match(RulesParser.COMMA);
            this.state = 243;
            this.explanation();
          }
        }

        this.state = 246;
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
    const _localctx: AdjustListPriceActionContext = new AdjustListPriceActionContext(this._ctx, this.state);
    this.enterRule(_localctx, 38, RulesParser.RULE_adjustListPriceAction);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 248;
        this.variableName();
        this.state = 249;
        this.match(RulesParser.DOT);
        this.state = 250;
        this.match(RulesParser.T__17);
        this.state = 251;
        this.match(RulesParser.LPAREN);
        this.state = 252;
        this.match(RulesParser.ACTION_TYPE);
        this.state = 253;
        this.match(RulesParser.COMMA);
        this.state = 254;
        this.value();
        this.state = 257;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === RulesParser.COMMA) {
          {
            this.state = 255;
            this.match(RulesParser.COMMA);
            this.state = 256;
            this.explanation();
          }
        }

        this.state = 259;
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
    const _localctx: SetMetricActionContext = new SetMetricActionContext(this._ctx, this.state);
    this.enterRule(_localctx, 40, RulesParser.RULE_setMetricAction);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 261;
        this.variableName();
        this.state = 262;
        this.match(RulesParser.DOT);
        this.state = 263;
        this.match(RulesParser.T__18);
        this.state = 264;
        this.match(RulesParser.LPAREN);
        this.state = 265;
        this.metricName();
        this.state = 266;
        this.match(RulesParser.COMMA);
        this.state = 267;
        this.transformationVariable();
        this.state = 270;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === RulesParser.COMMA) {
          {
            this.state = 268;
            this.match(RulesParser.COMMA);
            this.state = 269;
            this.totalMetricName();
          }
        }

        this.state = 272;
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
    const _localctx: MetricNameContext = new MetricNameContext(this._ctx, this.state);
    this.enterRule(_localctx, 42, RulesParser.RULE_metricName);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 274;
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
    const _localctx: TotalMetricNameContext = new TotalMetricNameContext(this._ctx, this.state);
    this.enterRule(_localctx, 44, RulesParser.RULE_totalMetricName);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 276;
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
    const _localctx: TransformationVariableContext = new TransformationVariableContext(this._ctx, this.state);
    this.enterRule(_localctx, 46, RulesParser.RULE_transformationVariable);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 278;
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
    const _localctx: VariableNameContext = new VariableNameContext(this._ctx, this.state);
    this.enterRule(_localctx, 48, RulesParser.RULE_variableName);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 280;
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
    const _localctx: TargetFieldNameContext = new TargetFieldNameContext(this._ctx, this.state);
    this.enterRule(_localctx, 50, RulesParser.RULE_targetFieldName);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 282;
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
    const _localctx: ExplanationContext = new ExplanationContext(this._ctx, this.state);
    this.enterRule(_localctx, 52, RulesParser.RULE_explanation);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 284;
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
    const _localctx: ValueContext = new ValueContext(this._ctx, this.state);
    this.enterRule(_localctx, 54, RulesParser.RULE_value);
    try {
      this.state = 288;
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
            this.state = 286;
            this.literalExpression();
          }
          break;
        case RulesParser.IDENTIFIER:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 287;
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
    const _localctx: ExpressionRootContext = new ExpressionRootContext(this._ctx, this.state);
    this.enterRule(_localctx, 56, RulesParser.RULE_expressionRoot);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 290;
        this.expression(0);
        this.state = 291;
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
    const _localctx: QualifiedIdentifierContext = new QualifiedIdentifierContext(this._ctx, this.state);
    this.enterRule(_localctx, 58, RulesParser.RULE_qualifiedIdentifier);
    try {
      let _alt: number;
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 293;
        this.match(RulesParser.IDENTIFIER);
        this.state = 298;
        this._errHandler.sync(this);
        _alt = this.interpreter.adaptivePredict(this._input, 15, this._ctx);
        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            {
              {
                this.state = 294;
                this.match(RulesParser.DOT);
                this.state = 295;
                this.match(RulesParser.IDENTIFIER);
              }
            }
          }
          this.state = 300;
          this._errHandler.sync(this);
          _alt = this.interpreter.adaptivePredict(this._input, 15, this._ctx);
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
    const _localctx: ExpressionListContext = new ExpressionListContext(this._ctx, this.state);
    this.enterRule(_localctx, 60, RulesParser.RULE_expressionList);
    let _la: number;
    try {
      this.state = 310;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case RulesParser.RPAREN:
        case RulesParser.RFIGBR:
          this.enterOuterAlt(_localctx, 1);
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
        case RulesParser.DAYOFYEAR:
        case RulesParser.DAYOFMONTH:
        case RulesParser.DAYOFWEEK:
        case RulesParser.WORKDAYS:
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
            this.state = 302;
            this.expression(0);
            this.state = 307;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while (_la === RulesParser.COMMA) {
              {
                {
                  this.state = 303;
                  this.match(RulesParser.COMMA);
                  this.state = 304;
                  this.expression(0);
                }
              }
              this.state = 309;
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
    const _localctx: OptionalExpressionContext = new OptionalExpressionContext(this._ctx, this.state);
    this.enterRule(_localctx, 62, RulesParser.RULE_optionalExpression);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 312;
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

    const _parentctx: ParserRuleContext = this._ctx;
    const _parentState: number = this.state;
    const _startState = 64;
    let _localctx: ExpressionContext = new ExpressionContext(this._ctx, _parentState);
    this.enterRecursionRule(_localctx, 64, RulesParser.RULE_expression, _p);
    let _la: number;
    try {
      let _alt: number;
      this.enterOuterAlt(_localctx, 1);
      {
        {
          this.state = 315;
          this.primaryExpression();
        }
        this._ctx._stop = this._input.tryLT(-1);
        this.state = 349;
        this._errHandler.sync(this);
        _alt = this.interpreter.adaptivePredict(this._input, 19, this._ctx);
        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            if (this._parseListeners != null) {
              this.triggerExitRuleEvent();
            }
            {
              this.state = 347;
              this._errHandler.sync(this);
              switch (this.interpreter.adaptivePredict(this._input, 18, this._ctx)) {
                case 1:
                  {
                    _localctx = new ExpressionContext(_parentctx, _parentState);
                    this.pushNewRecursionContext(_localctx, _startState, RulesParser.RULE_expression);
                    this.state = 317;
                    if (!this.precpred(this._ctx, 8)) {
                      throw this.createFailedPredicateException('this.precpred(this._ctx, 8)');
                    }
                    this.state = 318;
                    this.match(RulesParser.POW);
                    this.state = 319;
                    this.expression(9);
                  }
                  break;

                case 2:
                  {
                    _localctx = new ExpressionContext(_parentctx, _parentState);
                    this.pushNewRecursionContext(_localctx, _startState, RulesParser.RULE_expression);
                    this.state = 320;
                    if (!this.precpred(this._ctx, 7)) {
                      throw this.createFailedPredicateException('this.precpred(this._ctx, 7)');
                    }
                    this.state = 321;
                    _la = this._input.LA(1);
                    if (
                      !(
                        ((_la - 89) & ~0x1f) === 0 &&
                        ((1 << (_la - 89)) &
                          ((1 << (RulesParser.TIMES - 89)) |
                            (1 << (RulesParser.DIVIDE - 89)) |
                            (1 << (RulesParser.DIV - 89)) |
                            (1 << (RulesParser.MOD - 89)))) !==
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
                    this.state = 322;
                    this.expression(8);
                  }
                  break;

                case 3:
                  {
                    _localctx = new ExpressionContext(_parentctx, _parentState);
                    this.pushNewRecursionContext(_localctx, _startState, RulesParser.RULE_expression);
                    this.state = 323;
                    if (!this.precpred(this._ctx, 6)) {
                      throw this.createFailedPredicateException('this.precpred(this._ctx, 6)');
                    }
                    this.state = 324;
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
                    this.state = 325;
                    this.expression(7);
                  }
                  break;

                case 4:
                  {
                    _localctx = new ExpressionContext(_parentctx, _parentState);
                    this.pushNewRecursionContext(_localctx, _startState, RulesParser.RULE_expression);
                    this.state = 326;
                    if (!this.precpred(this._ctx, 5)) {
                      throw this.createFailedPredicateException('this.precpred(this._ctx, 5)');
                    }
                    this.state = 327;
                    _la = this._input.LA(1);
                    if (
                      !(
                        ((_la - 82) & ~0x1f) === 0 &&
                        ((1 << (_la - 82)) &
                          ((1 << (RulesParser.LT - 82)) |
                            (1 << (RulesParser.GT - 82)) |
                            (1 << (RulesParser.LE - 82)) |
                            (1 << (RulesParser.GE - 82)))) !==
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
                    this.state = 328;
                    this.expression(6);
                  }
                  break;

                case 5:
                  {
                    _localctx = new ExpressionContext(_parentctx, _parentState);
                    this.pushNewRecursionContext(_localctx, _startState, RulesParser.RULE_expression);
                    this.state = 329;
                    if (!this.precpred(this._ctx, 4)) {
                      throw this.createFailedPredicateException('this.precpred(this._ctx, 4)');
                    }
                    this.state = 330;
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
                    this.state = 331;
                    this.expression(5);
                  }
                  break;

                case 6:
                  {
                    _localctx = new ExpressionContext(_parentctx, _parentState);
                    this.pushNewRecursionContext(_localctx, _startState, RulesParser.RULE_expression);
                    this.state = 332;
                    if (!this.precpred(this._ctx, 3)) {
                      throw this.createFailedPredicateException('this.precpred(this._ctx, 3)');
                    }
                    this.state = 333;
                    this.match(RulesParser.MATCH);
                    this.state = 334;
                    this.expression(4);
                  }
                  break;

                case 7:
                  {
                    _localctx = new ExpressionContext(_parentctx, _parentState);
                    this.pushNewRecursionContext(_localctx, _startState, RulesParser.RULE_expression);
                    this.state = 335;
                    if (!this.precpred(this._ctx, 2)) {
                      throw this.createFailedPredicateException('this.precpred(this._ctx, 2)');
                    }
                    this.state = 336;
                    this.match(RulesParser.AND);
                    this.state = 337;
                    this.expression(3);
                  }
                  break;

                case 8:
                  {
                    _localctx = new ExpressionContext(_parentctx, _parentState);
                    this.pushNewRecursionContext(_localctx, _startState, RulesParser.RULE_expression);
                    this.state = 338;
                    if (!this.precpred(this._ctx, 1)) {
                      throw this.createFailedPredicateException('this.precpred(this._ctx, 1)');
                    }
                    this.state = 339;
                    this.match(RulesParser.OR);
                    this.state = 340;
                    this.expression(2);
                  }
                  break;

                case 9:
                  {
                    _localctx = new ExpressionContext(_parentctx, _parentState);
                    this.pushNewRecursionContext(_localctx, _startState, RulesParser.RULE_expression);
                    this.state = 341;
                    if (!this.precpred(this._ctx, 9)) {
                      throw this.createFailedPredicateException('this.precpred(this._ctx, 9)');
                    }
                    this.state = 342;
                    this.match(RulesParser.COND);
                    this.state = 343;
                    this.optionalExpression();
                    this.state = 344;
                    this.match(RulesParser.T__8);
                    this.state = 345;
                    this.optionalExpression();
                  }
                  break;
              }
            }
          }
          this.state = 351;
          this._errHandler.sync(this);
          _alt = this.interpreter.adaptivePredict(this._input, 19, this._ctx);
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
    const _localctx: IntConstantContext = new IntConstantContext(this._ctx, this.state);
    this.enterRule(_localctx, 66, RulesParser.RULE_intConstant);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 353;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === RulesParser.PLUS || _la === RulesParser.MINUS) {
          {
            this.state = 352;
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

        this.state = 355;
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
    const _localctx: DoubleConstantContext = new DoubleConstantContext(this._ctx, this.state);
    this.enterRule(_localctx, 68, RulesParser.RULE_doubleConstant);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 358;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === RulesParser.PLUS || _la === RulesParser.MINUS) {
          {
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
          }
        }

        this.state = 360;
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
    const _localctx: LiteralExpressionContext = new LiteralExpressionContext(this._ctx, this.state);
    this.enterRule(_localctx, 70, RulesParser.RULE_literalExpression);
    try {
      this.state = 367;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 22, this._ctx)) {
        case 1:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 362;
            this.intConstant();
          }
          break;

        case 2:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 363;
            this.doubleConstant();
          }
          break;

        case 3:
          this.enterOuterAlt(_localctx, 3);
          {
            this.state = 364;
            this.match(RulesParser.NULLLITERAL);
          }
          break;

        case 4:
          this.enterOuterAlt(_localctx, 4);
          {
            this.state = 365;
            this.match(RulesParser.BOOLLITERAL);
          }
          break;

        case 5:
          this.enterOuterAlt(_localctx, 5);
          {
            this.state = 366;
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
    const _localctx: IdentifierExpressionContext = new IdentifierExpressionContext(this._ctx, this.state);
    this.enterRule(_localctx, 72, RulesParser.RULE_identifierExpression);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 369;
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
    const _localctx: FunctionExpressionContext = new FunctionExpressionContext(this._ctx, this.state);
    this.enterRule(_localctx, 74, RulesParser.RULE_functionExpression);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 373;
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
          case RulesParser.DAYOFYEAR:
          case RulesParser.DAYOFMONTH:
          case RulesParser.DAYOFWEEK:
          case RulesParser.WORKDAYS:
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
              this.state = 371;
              this.functionName();
            }
            break;
          case RulesParser.IDENTIFIER:
            {
              this.state = 372;
              this.qualifiedIdentifier();
            }
            break;
          default:
            throw new NoViableAltException(this);
        }
        this.state = 375;
        this.match(RulesParser.LPAREN);
        this.state = 376;
        this.expressionList();
        this.state = 377;
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
    const _localctx: TupleExpressionContext = new TupleExpressionContext(this._ctx, this.state);
    this.enterRule(_localctx, 76, RulesParser.RULE_tupleExpression);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 379;
        this.match(RulesParser.LFIGBR);
        this.state = 380;
        this.expressionList();
        this.state = 381;
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
    const _localctx: LambdaCaptureContext = new LambdaCaptureContext(this._ctx, this.state);
    this.enterRule(_localctx, 78, RulesParser.RULE_lambdaCapture);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 383;
        this.match(RulesParser.IDENTIFIER);
        this.state = 386;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === RulesParser.SEQ) {
          {
            this.state = 384;
            this.match(RulesParser.SEQ);
            this.state = 385;
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
    const _localctx: LambdaCaptureListContext = new LambdaCaptureListContext(this._ctx, this.state);
    this.enterRule(_localctx, 80, RulesParser.RULE_lambdaCaptureList);
    let _la: number;
    try {
      this.state = 397;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case RulesParser.RSQBR:
          this.enterOuterAlt(_localctx, 1);
          break;
        case RulesParser.IDENTIFIER:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 389;
            this.lambdaCapture();
            this.state = 394;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while (_la === RulesParser.COMMA) {
              {
                {
                  this.state = 390;
                  this.match(RulesParser.COMMA);
                  this.state = 391;
                  this.lambdaCapture();
                }
              }
              this.state = 396;
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
    const _localctx: LambdaParamContext = new LambdaParamContext(this._ctx, this.state);
    this.enterRule(_localctx, 82, RulesParser.RULE_lambdaParam);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 399;
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
    const _localctx: LambdaParamListContext = new LambdaParamListContext(this._ctx, this.state);
    this.enterRule(_localctx, 84, RulesParser.RULE_lambdaParamList);
    let _la: number;
    try {
      this.state = 410;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case RulesParser.RPAREN:
          this.enterOuterAlt(_localctx, 1);
          break;
        case RulesParser.IDENTIFIER:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 402;
            this.lambdaParam();
            this.state = 407;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while (_la === RulesParser.COMMA) {
              {
                {
                  this.state = 403;
                  this.match(RulesParser.COMMA);
                  this.state = 404;
                  this.lambdaParam();
                }
              }
              this.state = 409;
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
    const _localctx: LambdaBodyContext = new LambdaBodyContext(this._ctx, this.state);
    this.enterRule(_localctx, 86, RulesParser.RULE_lambdaBody);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 412;
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
    const _localctx: LambdaExpressionContext = new LambdaExpressionContext(this._ctx, this.state);
    this.enterRule(_localctx, 88, RulesParser.RULE_lambdaExpression);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 414;
        this.match(RulesParser.LSQBR);
        this.state = 415;
        this.lambdaCaptureList();
        this.state = 416;
        this.match(RulesParser.RSQBR);
        this.state = 417;
        this.match(RulesParser.LPAREN);
        this.state = 418;
        this.lambdaParamList();
        this.state = 419;
        this.match(RulesParser.RPAREN);
        this.state = 420;
        this.match(RulesParser.LFIGBR);
        this.state = 421;
        this.lambdaBody();
        this.state = 422;
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
    const _localctx: PrimaryExpressionContext = new PrimaryExpressionContext(this._ctx, this.state);
    this.enterRule(_localctx, 90, RulesParser.RULE_primaryExpression);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 425;
        this._errHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this._input, 29, this._ctx)) {
          case 1:
            {
              this.state = 424;
              _la = this._input.LA(1);
              if (
                !(
                  ((_la - 79) & ~0x1f) === 0 &&
                  ((1 << (_la - 79)) &
                    ((1 << (RulesParser.NOT - 79)) |
                      (1 << (RulesParser.PLUS - 79)) |
                      (1 << (RulesParser.MINUS - 79)))) !==
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
        this.state = 436;
        this._errHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this._input, 30, this._ctx)) {
          case 1:
            {
              this.state = 427;
              this.match(RulesParser.LPAREN);
              this.state = 428;
              this.expression(0);
              this.state = 429;
              this.match(RulesParser.RPAREN);
            }
            break;

          case 2:
            {
              this.state = 431;
              this.identifierExpression();
            }
            break;

          case 3:
            {
              this.state = 432;
              this.literalExpression();
            }
            break;

          case 4:
            {
              this.state = 433;
              this.functionExpression();
            }
            break;

          case 5:
            {
              this.state = 434;
              this.tupleExpression();
            }
            break;

          case 6:
            {
              this.state = 435;
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
    const _localctx: FunctionNameContext = new FunctionNameContext(this._ctx, this.state);
    this.enterRule(_localctx, 92, RulesParser.RULE_functionName);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 438;
        _la = this._input.LA(1);
        if (
          !(
            ((_la & ~0x1f) === 0 &&
              ((1 << _la) &
                ((1 << RulesParser.SIN) |
                  (1 << RulesParser.COS) |
                  (1 << RulesParser.TAN) |
                  (1 << RulesParser.COT) |
                  (1 << RulesParser.SQRT) |
                  (1 << RulesParser.ABS) |
                  (1 << RulesParser.CEIL))) !==
                0) ||
            (((_la - 32) & ~0x1f) === 0 &&
              ((1 << (_la - 32)) &
                ((1 << (RulesParser.FLOOR - 32)) |
                  (1 << (RulesParser.ROUND - 32)) |
                  (1 << (RulesParser.YEAR - 32)) |
                  (1 << (RulesParser.MONTH - 32)) |
                  (1 << (RulesParser.DAYOFYEAR - 32)) |
                  (1 << (RulesParser.DAYOFMONTH - 32)) |
                  (1 << (RulesParser.DAYOFWEEK - 32)) |
                  (1 << (RulesParser.WORKDAYS - 32)) |
                  (1 << (RulesParser.STRLEN - 32)) |
                  (1 << (RulesParser.TRIM - 32)) |
                  (1 << (RulesParser.SUBSTRING - 32)) |
                  (1 << (RulesParser.FORMAT - 32)) |
                  (1 << (RulesParser.STRTOINT - 32)) |
                  (1 << (RulesParser.STRTOFLOAT - 32)) |
                  (1 << (RulesParser.STRTODATE - 32)) |
                  (1 << (RulesParser.STRCONCAT - 32)) |
                  (1 << (RulesParser.STRSPLIT - 32)) |
                  (1 << (RulesParser.STRCONTAIN - 32)) |
                  (1 << (RulesParser.REGEXPMATCH - 32)) |
                  (1 << (RulesParser.REGEXPREPLACE - 32)) |
                  (1 << (RulesParser.FINDRECORD - 32)) |
                  (1 << (RulesParser.FINDRECORDIF - 32)) |
                  (1 << (RulesParser.ACCUMULATE - 32)) |
                  (1 << (RulesParser.APPLY - 32)) |
                  (1 << (RulesParser.MAX - 32)) |
                  (1 << (RulesParser.MIN - 32)) |
                  (1 << (RulesParser.SEGMENT_DISTANCE - 32)) |
                  (1 << (RulesParser.TUPLEN - 32)) |
                  (1 << (RulesParser.GET - 32)) |
                  (1 << (RulesParser.TODAY - 32)))) !==
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
      case 32:
        return this.expression_sempred(_localctx as ExpressionContext, predIndex);
    }
    return true;
  }

  private expression_sempred(_localctx: ExpressionContext, predIndex: number): boolean {
    switch (predIndex) {
      case 0:
        return this.precpred(this._ctx, 8);

      case 1:
        return this.precpred(this._ctx, 7);

      case 2:
        return this.precpred(this._ctx, 6);

      case 3:
        return this.precpred(this._ctx, 5);

      case 4:
        return this.precpred(this._ctx, 4);

      case 5:
        return this.precpred(this._ctx, 3);

      case 6:
        return this.precpred(this._ctx, 2);

      case 7:
        return this.precpred(this._ctx, 1);

      case 8:
        return this.precpred(this._ctx, 9);
    }
    return true;
  }

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

  public actionDeclaration(): ActionDeclarationContext[];
  public actionDeclaration(i: number): ActionDeclarationContext;
  public actionDeclaration(i?: number): ActionDeclarationContext | ActionDeclarationContext[] {
    if (i === undefined) {
      return this.getRuleContexts(ActionDeclarationContext);
    } else {
      return this.getRuleContext(i, ActionDeclarationContext);
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

  public setFieldAction(): SetFieldActionContext | undefined {
    return this.tryGetRuleContext(0, SetFieldActionContext);
  }

  public addMessageAction(): AddMessageActionContext | undefined {
    return this.tryGetRuleContext(0, AddMessageActionContext);
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

export class SetFieldActionContext extends ParserRuleContext {
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
    return RulesParser.RULE_setFieldAction;
  }

  // @Override
  public enterRule(listener: RulesListener): void {
    if (listener.enterSetFieldAction) {
      listener.enterSetFieldAction(this);
    }
  }

  // @Override
  public exitRule(listener: RulesListener): void {
    if (listener.exitSetFieldAction) {
      listener.exitSetFieldAction(this);
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

  public DAYOFYEAR(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.DAYOFYEAR, 0);
  }

  public DAYOFMONTH(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.DAYOFMONTH, 0);
  }

  public DAYOFWEEK(): TerminalNode | undefined {
    return this.tryGetToken(RulesParser.DAYOFWEEK, 0);
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
