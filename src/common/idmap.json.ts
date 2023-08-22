import { readFileSync } from 'fs';
import { getContext } from '../utils/context';

export class IdMapJson {
  private idmap: Record<string, string> = {};

  public constructor(path: string) {
    const ctx = getContext();
    ctx.ux.log(`IDMAP: Loading from ${path}`);

    try {
      const raw = readFileSync(path, 'utf-8');
      this.idmap = JSON.parse(raw);
    } catch (e) {
      ctx.ux.error(`IDMAP: Failed to load JSON file from ${path}`);
    }
  }

  public get(id: string): string {
    return this.idmap[id];
  }
}
