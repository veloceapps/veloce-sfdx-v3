import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { RulesLexer } from '../../rules/RulesLexer';
import { RulesParser } from '../../rules/RulesParser';

export const createRulesParser = (input: string): RulesParser => {
  const chars = CharStreams.fromString(input);
  const lexer = new RulesLexer(chars);
  const tokens = new CommonTokenStream(lexer);
  const parser = new RulesParser(tokens);
  parser.buildParseTree = true;

  return parser;
};
