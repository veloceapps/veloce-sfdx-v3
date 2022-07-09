import { Connection } from '@salesforce/core';
import { Member } from '../types/member.types';
import {
  getDirectoryNames,
  getFileNames,
  parseJsonSafe,
  readFileSafe,
  readFileSafeBuffer
} from '../utils/common.utils';
import { createTemplate, fetchTemplates, updateTemplate } from '../utils/docTemplate.utils';
import { Template } from '../types/template.types';
import { createOrUpdateContentDocument, } from '../utils/contentDocument.utils';
import { ContentVersion } from '../types/contentDocument.types';

export interface PushDocTemplatesParams {
  rootPath: string;
  conn: Connection;
  member?: Member;
}

const scriptFileName = 'script.js';

export async function pushDocTemplates(params: PushDocTemplatesParams): Promise<string[]> {
  const {rootPath, conn, member} = params;
  if (!member) {
    return [];
  }

  const ids: string[] = [];
  const dir = `${rootPath}/doc-template`;
  const docNames = getDirectoryNames(dir).reduce((acc, name) => {
    if (member.all || member.names.includes(name)) {
      acc.push(name);
    }
    return acc;
  }, []);
  const templates: Template[] = await fetchTemplates(conn, false, docNames);

  for (const docName of docNames) {
    const docNamePath = `${rootPath}/doc-template/${docName}`;

    const fileName = getFileNames(docNamePath).filter((name) => name !== scriptFileName)[0];
    const filePath = `${docNamePath}/${fileName}`;
    const file = readFileSafeBuffer(filePath, {flag: 'r'});

    const scriptPath = `${docNamePath}/${scriptFileName}`;
    const script = readFileSafe(scriptPath);

    const propertiesPath = `${docNamePath}/properties`;
    const properties: { [key: string]: any }[] = getFileNames(propertiesPath).map((name) => parseJsonSafe(readFileSafe(`${propertiesPath}/${name}`)));

    const queriesPath = `${docNamePath}/queries`;
    const queries: { [key: string]: any }[] = getFileNames(queriesPath).map((name) => parseJsonSafe(readFileSafe(`${queriesPath}/${name}`)));

    const docJsonPath = `${docNamePath}/${docName}.json`;
    const docJson: Template = parseJsonSafe(readFileSafe(docJsonPath));

    const template = templates.find((t) => t.Name === docName);

    const bodyContentVersion: ContentVersion = {
      Title: fileName,
      PathOnClient: fileName,
      SharingOption: 'A',
      SharingPrivacy: 'N'
    }

    const fileId: string = await createOrUpdateContentDocument(conn, bodyContentVersion, file, template?.VELOCPQ__FileId__c);

    const bodyTemplate: Template = {
      VELOCPQ__Script__c: script, // todo encoding?
      VELOCPQ__Properties__c: properties.length ? JSON.stringify(properties, null, 2) : undefined,
      VELOCPQ__Queries__c: queries.length ? JSON.stringify(queries, null, 2) : undefined,
      VELOCPQ__FileName__c: fileName,
      Name: docName,
      VELOCPQ__FileId__c: fileId,
      VELOCPQ__Active__c: docJson?.VELOCPQ__Active__c ?? false,
      VELOCPQ__Description__c: docJson?.VELOCPQ__Description__c,
    };

    if (template) {
      await updateTemplate(conn, template.Id!, bodyTemplate);
      ids.push(template.Id!);
    } else {
      const res = await createTemplate(conn, bodyTemplate);
      ids.push(res.id);
    }
  }

  return ids;
}
