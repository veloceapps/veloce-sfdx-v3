import { readFileSync } from 'fs';

export class IdMapJson {
  private idmap: Record<string, string> = {};

  public constructor(path: string) {
    console.log(`IDMAP: Loading from ${path}`);

    try {
      const raw = readFileSync(path, 'utf-8');
      this.idmap = JSON.parse(raw);
    } catch (e) {
      console.error(`IDMAP: Failed to load JSON file from ${path}`);
    }
  }

  public get(id: string): string {
    return this.idmap[id];
  }
}
