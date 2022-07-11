import { ANTLRErrorStrategy, Token } from 'antlr4ts';
import { RulesParser } from '../../rules/RulesParser';

export const getEmptyErrorHandler = (parser: RulesParser): ANTLRErrorStrategy => ({
  reportError: (): void => undefined,
  inErrorRecoveryMode: (): boolean => false,
  recover: (): void => undefined,
  recoverInline: (): Token => parser.currentToken,
  reportMatch: (): void => undefined,
  reset: (): void => undefined,
  sync: (): void => undefined,
});
