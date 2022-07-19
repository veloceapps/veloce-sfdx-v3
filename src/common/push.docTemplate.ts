import { Connection } from '@salesforce/core';
import { ContentVersion } from '../types/contentDocument.types';
import { Member } from '../types/member.types';
import { Template } from '../types/template.types';
import {
  getDirectoryNames,
  getFileNames,
  parseJsonSafe,
  readFileSafe,
  readFileSafeBuffer
} from '../utils/common.utils';
import { createOrUpdateContentDocument } from '../utils/contentDocument.utils';
import { createTemplate, fetchTemplates, updateTemplate } from '../utils/docTemplate.utils';

export interface PushDocTemplatesParams {
  rootPath: string;
  conn: Connection;
  member?: Member;
}

const scriptFileName = 'script.js';

export async function pushDocTemplates(params: PushDocTemplatesParams): Promise<string[]> {
  const { rootPath, conn, member } = params;
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
  }, [] as string[]);
  const templates: Template[] = await fetchTemplates(conn, false, docNames);

  for (const docName of docNames) {
    const docPath = `${rootPath}/doc-template/${docName}`;
    const metaFileName = `${docName}.json`;
    const technicalFiles = [scriptFileName, metaFileName];

    const [fileName] = getFileNames(docPath).filter((name) => !technicalFiles.includes(name));
    const filePath = `${docPath}/${fileName}`;
    const file = readFileSafeBuffer(filePath, { flag: 'r' });

    const scriptPath = `${docPath}/${scriptFileName}`;
    const script = readFileSafe(scriptPath);

    const propertiesPath = `${docPath}/properties`;
    const properties = getFileNames(propertiesPath).map(
      (name) => parseJsonSafe(readFileSafe(`${propertiesPath}/${name}`)) as { [key: string]: any },
    );

    const queriesPath = `${docPath}/queries`;
    const queries = getFileNames(queriesPath).map(
      (name) => parseJsonSafe(readFileSafe(`${queriesPath}/${name}`)) as { [key: string]: any },
    );

    const docJsonPath = `${docPath}/${metaFileName}`;
    const docJson: Template = parseJsonSafe(readFileSafe(docJsonPath));

    const template = templates.find((t) => t.Name === docName);

    const bodyContentVersion: ContentVersion = {
      Title: fileName,
      PathOnClient: fileName,
      SharingOption: 'A',
      SharingPrivacy: 'N',
    };

    const fileId: string = await createOrUpdateContentDocument(
      conn,
      bodyContentVersion,
      file,
      template?.VELOCPQ__FileId__c,
    );

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
      await updateTemplate(conn, template.Id as string, bodyTemplate);
      ids.push(template.Id as string);
    } else {
      const res = await createTemplate(conn, bodyTemplate);
      ids.push(res.id);
    }
  }

  return ids;
}
