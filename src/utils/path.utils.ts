export const getPath = (path: unknown): string | null => {
  if (path == null) {
    return null;
  }

  // trim last slash if present
  return String(path).replace(/\/$/, '');
};

export const getPathParts = (path: string): string[] => {
  return path.split('/');
};
