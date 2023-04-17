/*
 *
 *  Veloce configuration and pricing engine
 *
 *  @2017-2023 Veloce Inc. All rights reserved
 *
 */
grammar Rules;

import Expression;

@header {
/*
 *
 *  Veloce configuration and pricing engine
 *
 *  @2017-2023 Veloce Inc. All rights reserved
 *
 */
}

compilationUnit
	:   header?
	    (ruleDeclaration)*
	    EOF
	;

header
    : 'unit' IDENTIFIER ';'
    ;

ruleDeclaration
    :
    'rule' STRINGLITERAL
    'sequence' sequence
    ('condition' (filterDeclaration)+)?
    ('transformation' (transformationDeclaration)+)?
    ('action' (actionDeclaration)+)?
    'end'
    ;
sequence
    : INTLITERAL
    ;
filterDeclaration
    : variableName ':' filterExpression
    ;
filterExpression
    : OBJECT_TYPE LPAREN expression? RPAREN
    ;
transformationDeclaration
    : IDENTIFIER ':' transformationStatement
    ;
transformationStatement
    : expression
    | script
    ;
script
    : SCRIPT_TEXT
    ;
scriptDeclaration
    : (.)*?
    ;
actionDeclaration
    :
    setPropertyAction |
    setFieldValueAction |
    addMessageAction |
    addApprovalDataAction |
    setStartDateAction |
    setEndDateAction |
    setEffectiveDateAction |
    adjustCostAction |
    adjustPriceAction |
    adjustListPriceAction |
    setMetricAction |
    setScore
    ;

setPropertyAction
    : variableName DOT 'setProperty' LPAREN targetFieldName COMMA value RPAREN
    ;

setFieldValueAction
    : variableName DOT 'setFieldValue' LPAREN targetFieldName COMMA value RPAREN
    ;

setScore
    : variableName DOT 'setScore' LPAREN value RPAREN
    ;

addMessageAction
    : variableName DOT 'addMessage' LPAREN value RPAREN
    ;

setStartDateAction
    : variableName DOT 'setStartDate' LPAREN transformationVariable RPAREN
    ;

setEndDateAction
    : variableName DOT 'setEndDate' LPAREN transformationVariable RPAREN
    ;

setEffectiveDateAction
    : variableName DOT 'setEffectiveDate' LPAREN transformationVariable RPAREN
    ;

adjustCostAction
    : variableName DOT 'adjustCost'
    LPAREN ACTION_TYPE COMMA value (COMMA explanation)? (COMMA allowOverride)? RPAREN
    ;

adjustPriceAction
    : variableName DOT 'adjustPrice'
    LPAREN ACTION_TYPE COMMA value (COMMA explanation)? (COMMA allowOverride)? RPAREN
    ;

adjustListPriceAction
    : variableName DOT 'adjustListPrice'
    LPAREN ACTION_TYPE COMMA value (COMMA explanation)? (COMMA allowOverride)? RPAREN
    ;

setMetricAction
    : variableName DOT 'setMetric'
    LPAREN metricName COMMA transformationVariable (COMMA totalMetricName)? RPAREN
    ;

addApprovalDataAction
    : variableName DOT 'addApprovalData' LPAREN value (COMMA value)? RPAREN
    ;


metricName:
    IDENTIFIER
    ;
totalMetricName:
    IDENTIFIER
    ;
transformationVariable:
    IDENTIFIER
    ;
variableName:
    IDENTIFIER
    ;
targetFieldName:
    IDENTIFIER
    ;
explanation:
    STRINGLITERAL
    ;
value:
    literalExpression | transformationVariable
    ;

allowOverride:
    BOOLLITERAL
    ;

COMMA:
    ','
    ;

DOT:
    '.'
    ;

ACTION_TYPE:
    'DISCOUNT_AMOUNT' |
    'DISCOUNT_UNIT_AMOUNT' |
    'DISCOUNT_PERCENT' |
    'MARGIN' |
    'MARKUP_AMOUNT' |
    'MARKUP_UNIT_AMOUNT' |
    'MARKUP_PERCENT' |
    'OVERRIDE_AMOUNT' |
    'OVERRIDE_UNIT_AMOUNT' |
    'OVERRIDE_PERCENT'
    ;

OBJECT_TYPE: ('Header' | 'ChargeItem' | 'PriceItem');

SCRIPT_TEXT:
    '```' (.)*? '```'
    ;
