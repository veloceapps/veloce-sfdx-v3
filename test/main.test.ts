const env = process.env.ENV ?? '';
const restrictedEnvs = ['studio-dev'];

beforeEach(() => {
  if (restrictedEnvs.includes(env)) {
    console.error(`'${env}' org is not allowed for running tests!`);
    process.exit(1);
  }
});
