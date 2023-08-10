import { promisify } from 'node:util';
import { cwd } from 'process';
import { exec as plainExec } from 'node:child_process';
import * as fs from 'fs';
import { expect } from 'chai';
import { hashElement } from 'folder-hash';
import { getTestEnv } from '../../../utils';

/* eslint-disable @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-member-access */
const exec = promisify(plainExec);
const env = getTestEnv();
const testId = Date.now();
const dir = `/tmp/veloce-sfdx-v3-test-${testId}`;
const pushDir = `${dir}/push/source`;
const pullDir = `${dir}/pull`;
const curDir = cwd();
const octaModelName = `OCTA_${testId}`;
const octaModelFolder = `${pushDir}/model/${octaModelName}`;
const octaModelFile = `${octaModelFolder}/${octaModelName}.json`;
const octaModelPMLFile = `${octaModelFolder}/${octaModelName}.pml`;
let priceListId;
let priceListReferenceId;

const filesOptions = {
  include: ['**/*'],
  matchBasename: false,
  matchPath: true,
};

const configUiOptions = {
  folders: {
    include: ['config-ui'],
  },
  files: filesOptions,
};

const configUiAndPmlOptions = {
  folders: {
    include: ['config-ui', 'model'],
  },
  files: filesOptions,
};

const drlOptions = {
  folders: {
    include: ['drl'],
  },
  files: {
    include: ['**/Calculate_110_SimpleRules.drl', 'Calculate_110_SimpleRules.json'],
    matchBasename: false,
    matchPath: true,
  },
};

async function calculateFolderHash(directory: string, options: any): Promise<string> {
  const pushHashElement = await hashElement(directory, options);
  console.log(pushHashElement);
  const hash = pushHashElement.hash;
  console.log(hash);
  return hash;
}

describe('veloce:source:push|pull', () => {
  before(async () => {
    const priceListName = 'droolsPriceList';

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
      fs.mkdirSync(pushDir, { recursive: true });
      await exec(
        `rsync --exclude model/OCTA -a test-data/source/* ${pushDir} && mv ${pushDir}/config-ui/OCTA ${pushDir}/config-ui/${octaModelName}`,
      );
      fs.mkdirSync(pullDir);
    }

    let cmdResult = await exec(
      `sfdx data record get -o ${env} -s VELOCPQ__PriceList__c -w "Name=${priceListName}" --json || true`,
    );
    let record;
    const stdout = cmdResult.stdout;
    try {
      record = JSON.parse(stdout);
    } catch (err) {
      console.error(`Unable to parse to json: ${stdout}`);
      throw err;
    }
    if (record.status === 1) {
      cmdResult = await exec(
        `sfdx force data record create -o ${env} -s VELOCPQ__PriceList__c -v "Name=${priceListName}"`,
      );
      cmdResult = await exec(
        `sfdx force data record get -o ${env} -s VELOCPQ__PriceList__c -w "Name=${priceListName}" --json`,
      );
      record = JSON.parse(cmdResult.stdout);
    }
    priceListId = record.result.Id;
    priceListReferenceId = record.result.VELOCPQ__ReferenceId__c;
    let drlTemplate = `${pushDir}/drl/Calculate_110_SimpleRules.json`;
    let drl = require(drlTemplate);
    drl.priceListId = priceListId;
    drl.priceListReferenceId = priceListReferenceId;
    fs.writeFileSync(drlTemplate, JSON.stringify(drl));

    drlTemplate = `${pushDir}/drl/Calculate_110_Surcharge_Rules.json`;
    drl = require(drlTemplate);
    drl.priceListId = priceListId;
    drl.priceListReferenceId = priceListReferenceId;
    fs.writeFileSync(drlTemplate, JSON.stringify(drl));

    fs.writeFileSync(`${pushDir}/settings/test.json`, JSON.stringify({ testId: 'testid value' }));
    const octaModelTemplate = `${curDir}/test-data/source/model/OCTA/OCTA.json`;
    const octaModelPMLTemplate = 'test-data/source/model/OCTA/OCTA.pml';
    const octaModel = require(octaModelTemplate);
    octaModel.Name = octaModelName;
    octaModel.Id = `ttest${testId}`;

    fs.mkdirSync(`${pushDir}/model/${octaModelName}`);
    fs.writeFileSync(octaModelFile, JSON.stringify(octaModel));
    fs.copyFileSync(octaModelPMLTemplate, octaModelPMLFile);
  });

  it('should push and pull veloce sources from org', async () => {
    let cmdResult = await exec(`sfdx veloce:source:push -u ${env} -p ${pushDir}`);
    console.log(cmdResult.stdout);
    cmdResult = await exec(`sfdx veloce:source:pull -u ${env} -p ${pullDir}`);
    console.log(cmdResult.stdout);
    cmdResult = await exec(`diff --brief --recursive ${pushDir} ${pullDir} || true`);
    console.log(cmdResult.stdout);
    // eslint-disable-next-line no-unused-expressions
    expect(cmdResult.stdout).to.not.contain(
      `Only in ${pushDir}`,
      'All pushed files should be present in pull directory',
    );
  });

  it('should pull UI sources from org', async () => {
    const testPullDir = `${pullDir}/should_pull_ui/source`;
    const cmdResult = await exec(`sfdx veloce:source:pull -u ${env} -m config-ui:${octaModelName} -p ${testPullDir}`);
    console.log(cmdResult.stdout);
    const pushHash = await calculateFolderHash(pushDir, configUiOptions); // eslint-disable-line no-unused-expressions
    const pullHash = await calculateFolderHash(testPullDir, configUiOptions); // eslint-disable-line no-unused-expressions
    // eslint-disable-next-line no-unused-expressions
    expect(
      pushHash === pullHash,
      `pulled config-ui files are different from push for Octa model;\n Check difference with: 'diff --brief --recursive ${pushDir}/config-ui ${testPullDir}/config-ui'`,
    ).to.be.true;
  });

  it('should pull UI+PML sources from org', async () => {
    const testPullDir = `${pullDir}/should_pull_ui_pml/source`;
    const cmdResult = await exec(
      `sfdx veloce:source:pull -u ${env} -m model:${octaModelName},config-ui:${octaModelName} -p ${testPullDir}`,
    );
    console.log(cmdResult.stdout);
    const pushHash = await calculateFolderHash(pushDir, configUiAndPmlOptions); // eslint-disable-line no-unused-expressions
    const pullHash = await calculateFolderHash(testPullDir, configUiAndPmlOptions); // eslint-disable-line no-unused-expressions
    // eslint-disable-next-line no-unused-expressions
    expect(
      pushHash === pullHash,
      `pulled config-ui and model files are different from push for Octa model;\n Check difference with: 'for member in config-ui model; do diff --brief --recursive ${pushDir}/$member ${testPullDir}/$member; done'`,
    ).to.be.true;
  });

  it('should pull Configuration Settings sources from org', async () => {
    const testPullDir = `${pullDir}/should_pull_config-settings/source`;
    const settingsFile = 'settings/mocha_test.json';
    const cmdResult = await exec(`sfdx veloce:source:pull -u ${env} -m config-settings -p ${testPullDir}`);
    console.log(cmdResult.stdout);
    const pullObj = require(`${testPullDir}/${settingsFile}`);
    const pushObj = require(`${pushDir}/${settingsFile}`);
    // eslint-disable-next-line no-unused-expressions
    expect(pushObj, 'pulled config-settings file should have same content as pushed;').to.be.deep.equal(pullObj);
  });

  it('should pull drools sources from org', async () => {
    const testPullDir = `${pullDir}/should_pull_drools/source`;
    const cmdResult = await exec(`sfdx veloce:source:pull -u ${env} -m drl -p ${testPullDir}`);
    console.log(cmdResult.stdout);
    const pushHash = await calculateFolderHash(pushDir, drlOptions); // eslint-disable-line no-unused-expressions
    const pullHash = await calculateFolderHash(testPullDir, drlOptions); // eslint-disable-line no-unused-expressions
    // eslint-disable-next-line no-unused-expressions
    expect(
      pushHash === pullHash,
      `pulled drl files are different from pushed;\n Check difference with: 'diff --brief --recursive ${pushDir}/drl ${testPullDir}/drl'`,
    ).to.be.true;
  });
});
