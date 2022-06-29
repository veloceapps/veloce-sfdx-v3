import { readFileSync, existsSync, mkdirSync, writeFileSync, readdirSync, WriteFileOptions } from 'fs';
import { exec as nodeExec } from 'node:child_process';
import { UX } from '@salesforce/command';

export const exec = (cmd: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    nodeExec(cmd, (error, result) => {
      if (error) {
        reject(error.message);
      } else {
        resolve(result);
      }
    });
  });
};

export const readFileSafe = (path: string, ux?: UX): string => {
  try {
    const raw = readFileSync(path);
    return raw.toString();
  } catch (err) {
    ux?.log(`Failed to read file: ${path}`);
    return '';
  }
};

export const parseJsonSafe = (str: string): any | undefined => {
  try {
    return JSON.parse(str);
  } catch (err) {
    return undefined;
  }
};

export const writeFileSafe = (dir: string, filename: string, data: string, options?: WriteFileOptions): void => {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  writeFileSync(`${dir}/${filename}`, data, options);
};

export const getDirectoryNames = (dir: string): string[] => {
  if (!existsSync(dir)) {
    return [];
  }

  const result = readdirSync(dir, { withFileTypes: true });
  return result.filter((dirent) => dirent.isDirectory()).map((dirent) => dirent.name);
};

export const getFileNames = (dir: string): string[] => {
  if (!existsSync(dir)) {
    return [];
  }

  const result = readdirSync(dir, { withFileTypes: true });
  return result.filter((dirent) => dirent.isFile()).map((dirent) => dirent.name);
};
