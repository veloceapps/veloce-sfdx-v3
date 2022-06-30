import DebugSessionInfo from '../types/DebugSessionInfo';

export const getDebugClientHeaders = (debugSession: DebugSessionInfo): { [key: string]: string } => {
  const authToken = Buffer.from(
    JSON.stringify({
      veloceNamespace: '',
      instanceUrl: debugSession.instanceUrl,
      organizationId: debugSession.orgId,
      oAuthHeaderValue: debugSession.accessToken,
    }),
  ).toString('base64');
  const authorization = authToken;
  return {
    'dev-token': debugSession.token,
    Authorization: authorization,
    'Content-Type': 'application/json',
  };
};
