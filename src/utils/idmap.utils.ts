import { IdMap } from '../types/idmap';
import { getContext } from './context';

export const getIdFromIdmap = (id: string, idmap?: IdMap): string => {
  const ctx = getContext();
  const idmapJson = ctx.idmap;

  if (idmapJson) {
    // if provided, use old json-idmap
    return idmapJson.reverseGet(id) ?? id;
  } else if (idmap) {
    // otherwise, use SF-based idmap
    return Object.entries(idmap).find(([, v]) => v === id)?.[1] ?? id;
  }
  return id;
};

export const putIdToIdmap = (oldId: string, newId: string, idmap?: IdMap): void => {
  const ctx = getContext();
  const idmapJson = ctx.idmap;

  if (idmapJson) {
    // if provided, use old json-idmap
    console.log(`IDMAP(JSON): ${oldId} => ${newId}`);
    idmapJson.put(oldId, newId);
  } else if (idmap) {
    // otherwise, use SF-based idmap
    console.log(`IDMAP(NEW): ${oldId} => ${newId}`);
    idmap[oldId] = newId;
  }
};
