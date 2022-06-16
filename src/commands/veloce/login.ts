import { readFileSync } from 'node:fs'
import { flags, SfdxCommand } from '@salesforce/command';
import { Aliases, AuthInfo, ConfigGroup, Messages, SfdxError } from '@salesforce/core';
import { AnyJson, getString } from '@salesforce/ts-types';
import { Connection } from 'jsforce';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('veloce-sfdx-v3', 'login');

export default class Login extends SfdxCommand {
  public static description = messages.getMessage('commandDescription');

  public static examples = [
    `$ sfdx veloce:login -u username -p ./PASSWORDFILE -a alias01
  `,
  ];

  public static args = [];

  protected static flagsConfig = {
    passwordfile: flags.string({
      char: 'p',
      description: messages.getMessage('passwordfileFlagDescription'),
      required: true,
    }),
    securitytoken: flags.string({
      required: false,
      char: 's',
      description: messages.getMessage('securityTokenFlagDescription'),
    }),
    alias: flags.string({
      char: 'a',
      description: messages.getMessage('aliasFlagDescription'),
      required: true,
    }),
    user: flags.string({
      char: 'u',
      description: messages.getMessage('userFlagDescription'),
      required: true,
    }),
    instanceurl: flags.string({
      char: 'r',
      description: messages.getMessage('instanceurlFlagDescription'),
      required: true,
    }),
  };

  // Comment this out if your command does not require an org username
  protected static requiresUsername = false;

  // Comment this out if your command does not support a hub org username
  protected static supportsDevhubUsername = false;

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = false;

  public async run(): Promise<AnyJson> {
    const url = (this.flags.instanceurl as string).trim().replace(/\/$/, ""); // remove trailing spaces and slash
    const securitytoken = ((this.flags.securitytoken as string) || '' ).trim();
    const user = (this.flags.user as string).trim();
    const alias = (this.flags.alias as string).trim();

    const passwordfile = this.flags.passwordfile;
    const password = readFileSync(passwordfile, 'utf8').trim().concat(securitytoken).trim();

    const conn = new Connection({
      loginUrl: url,
    });

    this.ux.log(`Logging with ${user} into ${url}`);
    await conn.login(user, password, (err: Error) => {
      if (err) {
        throw new SfdxError(`Unable to connect to the target org: ${err.toString()}`);
      }
    });

    const accessTokenOptions = {
      accessToken: conn.accessToken,
      instanceUrl: conn.instanceUrl,
      loginUrl: url,
      orgId: getString(conn, 'userInfo.organizationId'),
    };

    const auth = await AuthInfo.create({
      username: user,
      accessTokenOptions,
    });
    await auth.save();

    if (alias) {
      const aliases = await Aliases.create(ConfigGroup.getOptions('orgs', 'alias.json'));
      aliases.set(alias, user);
      await aliases.write();
    }

    this.ux.log(`Authorized to ${user}`);

    // Return an object to be displayed with --json
    return { username: user, accessTokenOptions };
  }
}
