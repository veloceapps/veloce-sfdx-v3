import { readFileSync, writeFileSync } from 'fs';
import { getContext } from '../utils/context';
import { IdMap } from '../types/idmap';

export class IdMapJson {
  private idmap: IdMap = {};
  private reverseIdmap: IdMap = {};

  public constructor(path: string) {
    const ctx = getContext();
    ctx.ux.log(`IDMAP: Loading from ${path}`);

    try {
      const raw = readFileSync(path, 'utf-8');
      this.idmap = JSON.parse(raw);
      for (const [key, value] of Object.entries(this.idmap)) {
        this.reverseIdmap[value] = key;
      }
    } catch (e) {
      ctx.ux.error(`IDMAP: Failed to load JSON file from ${path}`);
    }
  }

  public saveToPath(path: string): void {
    const ctx = getContext();
    ctx.ux.log(`IDMAP: Storing to ${path}`);

    try {
      writeFileSync(path, JSON.stringify(this.idmap, null, 2), { encoding: 'utf-8' });
    } catch (e) {
      ctx.ux.error(`IDMAP: Failed to store id-map JSON to file ${path}`);
    }
  }

  public put(oldId: string, newId: string): void {
    this.idmap[oldId] = newId;
    this.reverseIdmap[newId] = oldId;
  }

  public get(id: string): string {
    return this.idmap[id];
  }

  public reverseGet(id: string): string {
    return this.reverseIdmap[id];
  }
}
