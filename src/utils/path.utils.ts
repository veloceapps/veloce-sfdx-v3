import * as path from 'path';

export const getPath = (p: unknown): string | null => {
  if (p == null) {
    return null;
  }

  // trim last slash if present
  return String(p).replace(/\/$/, '');
};

export const getPathParts = (p: string): string[] => {
  return p.split(path.sep);
};
