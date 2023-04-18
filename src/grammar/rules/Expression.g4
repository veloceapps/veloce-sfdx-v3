/*
 *
 *  Veloce configuration and pricing engine
 *
 *  @2017-2023 Veloce Inc. All rights reserved
 *
 */
grammar Expression;

import Lexer;

expressionRoot
	:   expression EOF
	;

qualifiedIdentifier
    : IDENTIFIER ('.' IDENTIFIER)*('[' STRINGLITERAL ']')?
    ;

expressionList
	: /* no parameters */
	| expression (',' expression)*
	;

optionalExpression
	: expression
	;

expression
	: primaryExpression
	| expression COND optionalExpression ':' optionalExpression
	| expression POW expression
	| expression (TIMES|DIVIDE|DIV|MOD) expression
	| expression (PLUS|MINUS) expression
	| expression (LE|GE|LT|GT) expression
	| expression (EQ|NE) expression
	| expression MATCH expression
	| expression IN expression
	| expression AND optionalExpression
	| expression OR optionalExpression
	;

intConstant
    : (PLUS|MINUS)? INTLITERAL
    ;

doubleConstant
    : (PLUS|MINUS)? DOUBLELITERAL
    ;

literalExpression
    : intConstant
    | doubleConstant
    | NULLLITERAL
    | BOOLLITERAL
    | STRINGLITERAL
    ;

identifierExpression
    : qualifiedIdentifier
    ;

functionExpression
	: (functionName | qualifiedIdentifier) LPAREN expressionList RPAREN
    ;

tupleExpression
    : LFIGBR expressionList RFIGBR
    ;

lambdaCapture
    : IDENTIFIER (SEQ expression)?
    ;

lambdaCaptureList
	: /* no captures */
	| lambdaCapture (',' lambdaCapture)*
	;

lambdaParam
	: IDENTIFIER
	;

lambdaParamList
	: /* no parameters */
	| lambdaParam (',' lambdaParam)*
	;

lambdaBody
	: expression
	;

lambdaExpression
    : LSQBR lambdaCaptureList RSQBR LPAREN lambdaParamList RPAREN LFIGBR lambdaBody RFIGBR
    ;

primaryExpression
	: (PLUS|MINUS|NOT)? (LPAREN expression RPAREN | identifierExpression | literalExpression | functionExpression | tupleExpression | lambdaExpression)
    ;

functionName
    : TODAY
    | SIN
    | COS
    | TAN
    | COT
    | SQRT
    | ABS
    | CEIL
    | FLOOR
    | ROUND
    | YEAR
    | MONTH
    | DAY
    | DAYOFYEAR
    | DAYOFMONTH
    | DAYOFWEEK
    | LEAPYEAR
    | LENGTHOFMONTH
    | LENGTHOFYEAR
    | PLUSWEEKS
    | PLUSMONTHS
    | PLUSYEARS
    | MINUSWEEKS
    | MINUSMONTHS
    | MINUSYEARS
    | MIN
    | MAX
    | SEGMENT_DISTANCE
    | WORKDAYS
    | SUBSTRING
    | FORMAT
    | STRTOINT
    | STRTOFLOAT
    | STRTODATE
    | STRCONCAT
    | STRSPLIT
    | STRCONTAIN
    | STRLEN
    | TRIM
    | REGEXPMATCH
    | REGEXPREPLACE
    | FINDRECORD
    | FINDRECORDIF
    | ACCUMULATE
    | TUPLEN
    | GET
    | APPLY
    ;

SIN
    : 'sin'
    ;

COS
    : 'cos'
    ;

TAN
    : 'tan'
    ;

COT
    : 'cot'
    ;

SQRT
    : 'sqrt'
    ;

ABS
    : 'abs'
    ;

CEIL
    : 'ceil'
    ;

FLOOR
    : 'floor'
    ;

ROUND
    : 'round'
    ;

YEAR
    : 'year'
    ;

MONTH
    : 'month'
    ;

DAY
    : 'epochday'
    ;

DAYOFYEAR
    : 'dayofyear'
    ;

DAYOFMONTH
    : 'dayofmonth'
    ;

DAYOFWEEK
    : 'dayofweek'
    ;

WORKDAYS
    : 'workdays'
    ;

LEAPYEAR
    : 'leapyear'
    ;

LENGTHOFMONTH
    : 'lengthofmonth'
    ;

LENGTHOFYEAR
    : 'lengthofyear'
    ;

PLUSWEEKS
    : 'plusweeks'
    ;

PLUSMONTHS
    : 'plusmonths'
    ;

PLUSYEARS
    : 'plusyears'
    ;

MINUSWEEKS
    : 'minusweeks'
    ;

MINUSMONTHS
    : 'minusmonths'
    ;

MINUSYEARS
    : 'minusyears'
    ;

STRLEN
    : 'strlen'
    ;

TRIM
    : 'trim'
    ;

SUBSTRING
    : 'substr'
    ;

FORMAT
    : 'strformat'
    ;

STRTOINT
    : 'strtoint'
    ;

STRTOFLOAT
    : 'strtofloat'
    ;

STRTODATE
    : 'strtodate'
    ;

STRCONCAT
    : 'strconcat'
    ;

STRSPLIT
    : 'strsplit'
    ;

STRCONTAIN
    : 'strcontain'
    ;

REGEXPMATCH
    : 'regexpmatch'
    ;

REGEXPREPLACE
    : 'regexpreplace'
    ;

FINDRECORD
    : 'findrecord'
    ;

FINDRECORDIF
    : 'findrecordif'
    ;

ACCUMULATE
    : 'accumulate'
    ;

APPLY
    : 'apply'
    ;

MAX
    : 'max'
    ;

MIN
    : 'min'
    ;

SEGMENT_DISTANCE
    : 'segment_distance'
    ;

TUPLEN
    : 'tuplen'
    ;

GET
    : 'get'
    ;

TODAY: 'today'
    ;

INCLUDE
    : 'include'
    ;

EXCLUDE
    : 'exclude'
    ;

SEQ
    : '='
    ;

LPAREN
    : '('
    ;

RPAREN
    : ')'
    ;

LFIGBR
    : '{'
    ;

RFIGBR
    : '}'
    ;

LSQBR
    : '['
    ;

RSQBR
    : ']'
    ;

