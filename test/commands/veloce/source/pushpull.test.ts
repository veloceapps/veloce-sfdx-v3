import {promisify} from 'node:util';
import {cwd} from 'process';
import {exec as plainExec} from 'node:child_process';
import {hashElement} from 'folder-hash';
import {expect} from 'chai';

const exec = promisify(plainExec);
const env = 'test-sfdx-plugin';
const testId = Date.now();
const dir = `/tmp/veloce-sfdx-v3-test-${testId}`;
const pushDir = `${dir}/push/source`;
const pullDir = `${dir}/pull`;
const curDir = cwd();
const octaModelName = `OCTA_${testId}`;
const octaModelFolder = `${pushDir}/model/${octaModelName}`;
const octaModelFile = `${octaModelFolder}/${octaModelName}.json`;
const octaModelPMLFile = `${octaModelFolder}/${octaModelName}.pml`;

const filesOptions = {
  include: ['**/*'],
  matchBasename: false,
  matchPath: true,
};

const allOptions = {
  folders: {
    include: ['**/*'],
  },
  files: filesOptions,
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
  files: filesOptions,
};

const ruleOptions = {
  folders: {
    include: ['rule'],
  },
  files: {
    include: ['**/METRIC_Default Metrics*'],
    matchBasename: false,
    matchPath: true,
  }
};

const settingsOptions = {
  folders: {
    include: ['settings'],
  },
  files: {
    include: ['**/natalija_mocha_test.json'],
    matchBasename: false,
    matchPath: true,
  },
};

async function calculateFolderHash(dir: string, options: any) {
  var pushHashElement = await hashElement(dir, options);
  console.log(pushHashElement);
  var hash = pushHashElement.hash;
  console.log(hash);
  return hash;
}

describe('veloce:source:push|pull', () => {
  before(async () => {
    const fs = require('fs');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
      fs.mkdirSync(pushDir, {recursive: true});
      await exec(`cp -ar test-data/source/* ${pushDir}`);
      fs.mkdirSync(pullDir);
    }
    fs.writeFileSync(`${pushDir}/settings/test.json`, JSON.stringify({testId: 'testid value'}));
    const octaModelTemplate = `${curDir}/test-data/source/model/OCTA/OCTA.json`;
    const octaModelPMLTemplate = 'test-data/source/model/OCTA/OCTA.pml';
    const octaModel = require(octaModelTemplate);
    octaModel.Name = octaModelName;
    octaModel.VELOCPQ__ReferenceId__c = `ttest${testId}`;

    fs.mkdirSync(`${pushDir}/model/${octaModelName}`);
    fs.writeFileSync(octaModelFile, JSON.stringify(octaModel));
    fs.copyFileSync(octaModelPMLTemplate, octaModelPMLFile);
  });

  it('should push and pull veloce sources from org', async () => {
    let cmdResult = await exec(`sfdx veloce:source:push -u ${env} -p ${pushDir}`);
    console.log(cmdResult.stdout);
    cmdResult = await exec(`sfdx veloce:source:pull -u ${env} -p ${pullDir}`);
    console.log(cmdResult.stdout);
    var pushHash = await calculateFolderHash(pushDir, allOptions);
    var pullHash = await calculateFolderHash(pullDir, allOptions);
    expect(pushHash === pullHash,
      `pulled files are different from push;\n Check difference with: 'diff --brief --recursive ${pushDir} ${pullDir}'`,
    ).to.be.true;
  });

  it('should pull UI sources from org', async () => {
    const testPullDir = `${pullDir}/should_pull_ui/source`;
    const cmdResult = await exec(`sfdx veloce:source:pull -u ${env} -m config-ui:OCTA -p ${testPullDir}`);
    console.log(cmdResult.stdout);
    const pushHash = await calculateFolderHash(pushDir, configUiOptions);
    const pullHash = await calculateFolderHash(pullDir, configUiOptions);
    expect(
      pushHash === pullHash,
      `pulled config-ui files are different from push for Octa model;\n Check difference with: 'diff --brief --recursive ${pushDir}/config-ui ${testPullDir}/config-ui'`,
    ).to.be.true;
  });

  it('should pull UI+PML sources from org', async () => {
    const testPullDir = `${pullDir}/should_pull_ui_pml/source`;
    const cmdResult = await exec(`sfdx veloce:source:pull -u ${env} -m model:OCTA,config-ui:OCTA -p ${testPullDir}`);
    console.log(cmdResult.stdout);
    const pushHash = await calculateFolderHash(pushDir, configUiAndPmlOptions);
    const pullHash = await calculateFolderHash(pullDir, configUiAndPmlOptions);
    expect(
      pushHash === pullHash,
      `pulled config-ui and model files are different from push for Octa model;\n Check difference with: 'for member in config-ui model; do diff --brief --recursive ${pushDir}/$member ${testPullDir}/$member; done'`,
    ).to.be.true;
  });

  it('should pull Configuration Settings sources from org', async () => {
    const testPullDir = `${pullDir}/should_pull_config-settings/source`;
    const cmdResult = await exec(`sfdx veloce:source:pull -u ${env} -m config-settings -p ${testPullDir}`);
    console.log(cmdResult.stdout);
    const pushHash = await calculateFolderHash(pushDir, settingsOptions);
    const pullHash = await calculateFolderHash(pullDir, settingsOptions);
    expect(
      pushHash === pullHash,
      `pulled config-settings files are different from pushed;\n Check difference with: 'diff --brief --recursive ${pushDir}/settings ${testPullDir}/settings'`,
    ).to.be.true;
  });

  it('should pull drools sources from org', async () => {
    const testPullDir = `${pullDir}/should_pull_drools/source`;
    const cmdResult = await exec(`sfdx veloce:source:pull -u ${env} -m drl -p ${testPullDir}`);
    console.log(cmdResult.stdout);
    const pushHash = await calculateFolderHash(pushDir, drlOptions);
    const pullHash = await calculateFolderHash(pullDir, drlOptions);
    expect(
      pushHash === pullHash,
      `pulled drl files are different from pushed;\n Check difference with: 'diff --brief --recursive ${pushDir}/drl ${testPullDir}/drl'`,
    ).to.be.true;
  });

  it('should pull rules sources from org', async () => {
    const testPullDir = `${pullDir}/should_pull_rules/source`;
    const cmdResult = await exec(`sfdx veloce:source:pull -u ${env} -m rule -p ${testPullDir}`);
    console.log(cmdResult.stdout);
    const pushHash = await calculateFolderHash(pushDir, ruleOptions);
    const pullHash = await calculateFolderHash(pullDir, ruleOptions);
    expect(
      pushHash === pullHash,
      `pulled rules files are different from pushed;\n Check difference with: 'diff --brief --recursive ${pushDir}/rule ${testPullDir}/rule'`,
    ).to.be.true;
  });
});
