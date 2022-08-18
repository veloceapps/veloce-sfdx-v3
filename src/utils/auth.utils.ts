import DebugSessionInfo from '../types/DebugSessionInfo';

export const getDebugClientHeaders = (debugSession: DebugSessionInfo): { [key: string]: string } => {
  const authToken = Buffer.from(
    JSON.stringify({
      veloceNamespace: 'VELOCPQ',
      instanceUrl: debugSession.instanceUrl,
      organizationId: debugSession.orgId,
      oAuthHeaderValue: `Bearer ${debugSession.accessToken}`,
    }),
  ).toString('base64');
  const authorization = authToken;
  return {
    'Veloce-Dev-Token': debugSession.token,
    Authorization: authorization,
    'Content-Type': 'application/json',
  };
};
