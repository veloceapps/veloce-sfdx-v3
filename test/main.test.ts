import { getTestEnv } from './utils';

const env = getTestEnv();
const restrictedEnvs = ['studio-dev'];

beforeEach(() => {
  if (restrictedEnvs.includes(env)) {
    console.error(`'${env}' org is not allowed for running tests!`);
    process.exit(1);
  }
});
