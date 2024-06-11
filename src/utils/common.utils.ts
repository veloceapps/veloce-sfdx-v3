import { readFileSync, existsSync, mkdirSync, writeFileSync, readdirSync, WriteFileOptions } from 'fs';
import { exec as nodeExec } from 'node:child_process';
import { ExecuteOptions } from 'jsforce/query';
import { Connection } from '@salesforce/core';
import { UX } from '@salesforce/command';
import { InstalledSubscriberPackage } from '../types/common.types';
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

export const readFileSafeBuffer = (path: string, options?: { flag?: string }): Buffer | undefined => {
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

export const writeFileSafe = (
  dir: string,
  filename: string,
  data: string | Buffer,
  options?: WriteFileOptions,
): void => {
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

export const getInstalledPackageReleaseVersion = async (conn: Connection): Promise<string | undefined> => {
  const result = await conn.tooling.autoFetchQuery<InstalledSubscriberPackage>(
    `SELECT Id,SubscriberPackage.Name,SubscriberPackage.NamespacePrefix,SubscriberPackageVersion.Name,
       SubscriberPackageVersion.MajorVersion,SubscriberPackageVersion.MinorVersion,SubscriberPackageVersion.PatchVersion
FROM InstalledSubscriberPackage`,
  );
  return result?.records
    ?.filter((rr) => rr.SubscriberPackage.NamespacePrefix === 'VELOCPQ')
    .map(({ SubscriberPackageVersion }) => SubscriberPackageVersion)
    .sort((l, r) => {
      if (r.MajorVersion !== l.MajorVersion) {
        return r.MajorVersion - l.MajorVersion;
      }
      if (r.MinorVersion !== l.MinorVersion) {
        return r.MinorVersion - l.MinorVersion;
      }
      if (r.PatchVersion !== l.PatchVersion) {
        return r.PatchVersion - l.PatchVersion;
      }
      return r.Name.localeCompare(l.Name);
    })?.[0]?.Name;
};

/* i.e. 2023.R6.1.0 or 2023.R6-SNAPSHOT or 2024.R7.2-SNAPSHOT */
export const versionPattern = /(?<year>[0-9]+)\.R(?<major>[0-9]+)(\.(?<minor>[0-9]+))?(\.(?<patch>[0-9]+)|-SNAPSHOT)/g;
/*
 * isInstalledVersionBetween checks installed Veloce Advanced CPQ version for compatibility
 */
export const isInstalledVersionBetween = async (
  conn: Connection,
  fromVersion: string,
  toVersion?: string,
): Promise<boolean> => {
  const installedVersion = await getInstalledPackageReleaseVersion(conn);
  if (installedVersion) {
    const fromParts = versionPattern.exec(fromVersion);
    const toParts = versionPattern.exec(toVersion ?? '');
    const installedParts = versionPattern.exec(installedVersion);
    if (installedParts) {
      if (!installedParts.groups?.['patch']) {
        // SNAPSHOT
        // compare strings ('year' + 'major')
        if (
          Number(concatParts(installedParts, ['year', 'major'])) < Number(concatParts(fromParts, ['year', 'major'])) ||
          (toParts &&
            Number(concatParts(installedParts, ['year', 'major'])) > Number(concatParts(toParts, ['year', 'major'])))
        ) {
          return false;
        }
        return true;
      } else {
        // Release
        // compare strings ('year' + 'major' + 'minor' + 'patch')
        if (
          Number(concatParts(installedParts, ['year', 'major', 'minor', 'patch'])) <
            Number(concatParts(fromParts, ['year', 'major', 'minor', 'patch'])) ||
          (toParts &&
            Number(concatParts(installedParts, ['year', 'major', 'minor', 'patch'])) >
              Number(concatParts(toParts, ['year', 'major', 'minor', 'patch'])))
        ) {
          return false;
        }
        return true;
      }
    }
  }
  return false;
};

const concatParts = (arr: RegExpExecArray | null, parts: string[]): string => {
  let result = '';
  for (const part of parts) {
    result += arr?.groups?.[part] ?? '';
  }
  return result;
};

export const isFieldExists = async (conn: Connection, objectName: string, fieldName: string): Promise<boolean> => {
  const sql = `
SELECT Id
FROM FieldDefinition
WHERE EntityDefinition.QualifiedApiName = '${objectName}' AND QualifiedApiName = '${fieldName}'`;
  return (await conn.query<{ Id: string }>(sql))?.records?.[0] !== undefined;
};

export const queryAllRecords = async <T>(conn: Connection, soql: string, options?: ExecuteOptions): Promise<T[]> => {
  const records: T[] = [];
  let qr = await conn.query<T>(soql, options);
  records.push(...qr.records);
  while (!qr.done && qr.nextRecordsUrl) {
    qr = await conn.queryMore<T>(qr.nextRecordsUrl, options);
    records.push(...qr.records);
  }
  return records;
};
