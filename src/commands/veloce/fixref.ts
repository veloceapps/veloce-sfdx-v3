import {EOL} from 'node:os';
import {flags, SfdxCommand} from '@salesforce/command'
import {Messages} from '@salesforce/core'
import {AnyJson} from '@salesforce/ts-types'
import 'ts-replace-all'
import {ExecuteService} from '@salesforce/apex-node'

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname)

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('veloce-sfdx-v3', 'fixref')

interface SfResponseDiagnostic {
  lineNumber: number;
  columnNumber: number;
  compileProblem: string;
  exceptionMessage: string;
  exceptionStackTrace: string;
}

interface SfResponse {
  success: boolean;
  compiled: boolean;
  logs: string;
  diagnostic: SfResponseDiagnostic[];
}


export default class Fixref extends SfdxCommand {

  public static description = messages.getMessage('commandDescription')
  public static examples = messages.getMessage('examples').split(EOL);

  protected static flagsConfig = {
    dry: flags.boolean({
      char: 'd',
      default: false,
      description: messages.getMessage('dryFlagDescription'),
      required: false
    })
  }
  // Comment this out if your command does not require an org username
  protected static requiresUsername = true

  // Comment this out if your command does not support a hub org username
  protected static supportsDevhubUsername = false

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = false

  public async run(): Promise<AnyJson> {
    if(!this.org) {
      return Promise.reject('Org is not defined');
    }

    const script = `
            Map<String, Object> result = new Map<String, Object>();
            List<Map<String, String>> veloceObjectsWithoutRefDebug = new List<Map<String, String>>();
            Set<String> veloceObjectsWithoutRefColumn = new Set<String>();
            String refIDColumn = 'VELOCPQ__ReferenceId__c';

            for ( Schema.SObjectType o : Schema.getGlobalDescribe().values() ) {
                Schema.DescribeSObjectResult objResult = o.getDescribe();
                if (objResult.getName().contains('VELOCPQ_')) {
                    if (objResult.queryable) {
                        Set<String> objectFields = objResult.fields.getMap().keySet();
                        if(objectFields.contains(refIDColumn.toLowerCase())) {
                            String query = String.format('SELECT {0} FROM {1} WHERE {2}=null', new String[]{refIDColumn, objResult.getName(), refIDColumn});
                            List<SObject> veloceObjectsWithoutRef = Database.query(query);
                            for ( SObject vo : veloceObjectsWithoutRef) {
                                Map<String, String> objectInfo = new Map<String, String>();
                                objectInfo.put(vo.getSObjectType().getDescribe().getName(), vo.Id);
                                veloceObjectsWithoutRefDebug.add(objectInfo);
                                ${!this.flags.dry ? "vo.put('VELOCPQ__ReferenceId__c', vo.Id);" : '//'}
                                ${!this.flags.dry ? 'update vo;' : '//'}
                            }
                        } else {
                            veloceObjectsWithoutRefColumn.add(objResult.getName());
                        }
                    }
                }
            }
            result.put('objectsWithEmptyRefId', veloceObjectsWithoutRefDebug);
            result.put('objectsWithoutRefColumn', veloceObjectsWithoutRefColumn);

            String resultJSON = JSON.serialize(result);
            System.debug(resultJSON);
        `
    const conn = this.org.getConnection()

    const exec = new ExecuteService(conn)
    const execAnonOptions = Object.assign({}, {apexCode: script})
    const result = (await exec.executeAnonymous(execAnonOptions)) as SfResponse

    if (!result.success) {
      this.ux.log('Failed to execute apex code')
      const out = this.formatDefault(result)
      this.ux.log(out)
      this.ux.log(script)
      process.exit(1)
    }

    let debugInfoObj: { objectsWithEmptyRefId: string[] } | null = null
    for (const line of result.logs.split('\n')) {
      if (line.includes('{"objectsWithoutRefColumn":[')) {
        const debugInfoArr = line.split('|')
        const debugInfo = debugInfoArr[debugInfoArr.length - 1]
        debugInfoObj = JSON.parse(debugInfo)
        break
      }
    }
    if (this.flags.dry) {
      if (debugInfoObj !== null) {
        if (debugInfoObj['objectsWithEmptyRefId'].length < 1) {
          this.ux.log('This org has no empty ref ids, all is ok')
          process.exit(0)
        }
        this.ux.log("the following items haven't ref ids and can be fixed:")
        debugInfoObj['objectsWithEmptyRefId'].forEach(ob => {
          this.ux.log(ob)
        })
        this.ux.log('please use without --dry flag to fix empty ref ids in listed object')
        process.exit(0)
      }
      this.ux.log("Can't provide dry run info about which objects should be fixed, because there is no info in apex debug response, but you can still use wihtout --dry to replace empty ref ids")
      process.exit(1)
    }
    this.ux.log('External ids fixed, please use this command with --dry flag to verify')

    // Return an object to be displayed with --json
    return {orgId: this.org.getOrgId()}
  }

  private formatDefault(response: SfResponse): string {
    let outputText = ''
    if (response.success) {
      outputText += 'SUCCESS\n'
      outputText += `\n${response.logs}`
    } else {
      const diagnostic = response.diagnostic[0]
      if (!response.compiled) {
        outputText += `Error: Line: ${diagnostic.lineNumber}, Column: ${diagnostic.columnNumber}\n`
        outputText += `Error: ${diagnostic.compileProblem}\n`
      } else {
        outputText += 'COMPILE SUCCESS\n'
        outputText += `Error: ${diagnostic.exceptionMessage}\n`
        outputText += `Error: ${diagnostic.exceptionStackTrace}\n`
        outputText += `\n${response.logs}`
      }
    }
    return outputText
  }
}
