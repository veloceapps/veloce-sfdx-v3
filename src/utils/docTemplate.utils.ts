import { Connection, SfdxError } from '@salesforce/core';
import { Template } from '../types/template.types';
import { CreateResult } from '../types/common.types';

export async function fetchTemplates(conn: Connection, fetchAll: boolean, names: string[]): Promise<Template[]> {

  let query = 'Select Id,Name,VELOCPQ__FileId__c,VELOCPQ__Active__c,VELOCPQ__Description__c,VELOCPQ__FileName__c,VELOCPQ__Properties__c,VELOCPQ__Queries__c,VELOCPQ__Script__c,VELOCPQ__ReferenceId__c from VELOCPQ__Template__c';
  if (!fetchAll) {
    query += ` WHERE Name IN ('${names.join("','")}')`;
  }

  const result = await conn.autoFetchQuery<Template>(query, {autoFetch: true, maxFetch: 100000});
  return result?.records ?? [];
}

export async function createTemplate(conn: Connection, data: Template): Promise<CreateResult> {
  const result = await conn.request<CreateResult>({
    url: `/services/data/v${conn.getApiVersion()}/sobjects/VELOCPQ__Template__c`,
    body: JSON.stringify(data),
    method: 'POST',
  });

  if (result.success) {
    console.log(`New Template ${result.name} created with id ${result.id}`);
  } else {
    throw new SfdxError(`Failed to create Template: ${JSON.stringify(result)}`);
  }

  return result;
}

export async function updateTemplate(conn: Connection, id: string, data: Template): Promise<void> {
  console.log(`Patching existing Template with id ${id}`);

  return await conn.request({
    url: `/services/data/v${conn.getApiVersion()}/sobjects/VELOCPQ__Template__c/${id}`,
    body: JSON.stringify(data),
    method: 'PATCH',
  });
}
