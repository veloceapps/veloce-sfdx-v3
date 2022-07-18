import { readFileSync, existsSync, mkdirSync, writeFileSync, readdirSync, WriteFileOptions } from 'fs';
import { exec as nodeExec } from 'node:child_process';
import { UX } from '@salesforce/command';
import { SalesforceEntity } from '../types/salesforceEntity';

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

export const readFileSafeBuffer = (path: string, options?: {flag?: string}): Buffer|undefined => {
  try {
    return readFileSync(path, options);
  } catch (err) {
    console.log(`Failed to read file: ${path}`);
  }
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

export const writeFileSafe = (dir: string, filename: string, data: string|Buffer, options?: WriteFileOptions): void => {
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

// or any library that is using the messages framework can also be loaded this way.
const salesforceIdRegex = new RegExp('^[a-zA-Z0-9]{18}$');

export const keysToLowerCase = (rWithCase: SalesforceEntity): SalesforceEntity => {
  // convert keys to lowercase
  const keys = Object.keys(rWithCase);
  let n = keys.length;

  const r: SalesforceEntity = {};
  while (n--) {
    const key = keys[n];
    if (key) {
      r[key.toLowerCase()] = rWithCase[key];
    }
  }
  return r;
};

export const validSFID = (input: string): boolean => {
  // https://stackoverflow.com/a/29299786/1333724
  if (!salesforceIdRegex.test(input)) {
    return false;
  }
  const parts = [input.substr(0, 5), input.substr(5, 5), input.substr(10, 5)];
  const chars: number[] = [0, 0, 0];
  for (let j = 0; j < parts.length; j++) {
    const word = parts[j];
    for (let i = 0; i < word.length; i++) {
      const char = word.charCodeAt(i);
      if (char >= 65 && char <= 90) {
        chars[j] += 1 << i;
      }
    }
  }
  for (let i = 0; i < chars.length; i++) {
    const c = chars[i];
    if (c <= 25) {
      chars[i] = c + 65;
    } else {
      chars[i] = c - 25 + 48;
    }
  }

  return String.fromCharCode(chars[0], chars[1], chars[2]) === input.substr(15, 3);
};
