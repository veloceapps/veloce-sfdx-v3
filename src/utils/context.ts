import type { SfdxCommand, UX } from '@salesforce/command';
import { IdMapJson } from '../common/idmap.json';

interface PublicSfdxCommand extends Omit<SfdxCommand, 'ux'> {
  ux: UX;
}

export class Context {
  public idmap?: IdMapJson;

  public constructor(public cmd: SfdxCommand) {}

  public initIdmap(path?: string | null): void {
    if (!path) {
      return;
    }

    this.idmap = new IdMapJson(path);
  }

  public storeIdmap(path?: string | null): void {
    if (!path || !this.idmap) {
      return;
    }

    this.idmap.saveToPath(path);
  }

  public get ux(): UX {
    const pCmd = this.cmd as any as PublicSfdxCommand;

    return pCmd.ux;
  }
}

let ctx: Context | undefined;

export function initContext(cmd: SfdxCommand): Context {
  ctx = new Context(cmd);

  return ctx;
}

export function getContext(): Context {
  if (!ctx) {
    throw new Error('Context not initialized');
  }

  return ctx;
}
