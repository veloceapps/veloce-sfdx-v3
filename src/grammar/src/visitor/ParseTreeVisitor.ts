import { ParserRuleContext, RecognitionException } from 'antlr4ts';
import { ErrorNode } from 'antlr4ts/tree/ErrorNode';
import { TerminalNode } from 'antlr4ts/tree/TerminalNode';

export class ParseTreeVisitor {
  public errors: ErrorNode[] = [];
  public exception?: RecognitionException;

  public visit(ctx: ParserRuleContext): void {
    if (ctx.exception) {
      this.handleException(ctx.exception);
    }

    ctx.accept(this);
  }

  public visitChildren(ctx: ParserRuleContext): void {
    for (const child of ctx.children ?? []) {
      if (child instanceof ErrorNode) {
        this.visitErrorNode(child);
      } else if (child instanceof TerminalNode) {
        this.visitTerminal(child);
      } else {
        this.visit(child as ParserRuleContext);
      }
    }
  }

  public handleException(exception: RecognitionException): void {
    this.exception = exception;
  }

  // eslint-disable-next-line
  public visitTerminal(node: TerminalNode): void {}

  public visitErrorNode(node: ErrorNode): void {
    this.errors.push(node);
  }
}
