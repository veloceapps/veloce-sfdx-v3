import AuthTokenParams from '../types/AuthTokenParams';

export const getAuthToken = (params: AuthTokenParams): string => {
  return Buffer.from(JSON.stringify(params)).toString('base64');
};
