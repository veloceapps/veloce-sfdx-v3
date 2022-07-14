import { promisify } from 'node:util';
import { cwd } from 'process';
import { exec as plainExec } from 'node:child_process';
import { hashElement } from 'folder-hash';
import { expect } from 'chai';

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

const configUiOptions = {
  folders: {
    include: ['config-ui/*'],
  },
  files: filesOptions,
};

const configUiAndPmlOptions = {
  folders: {
    include: ['config-ui/*', 'model/*'],
  },
  files: filesOptions,
};

const drlOptions = {
  folders: {
    include: ['drl/*'],
  },
  files: filesOptions,
};

const ruleOptions = {
  folders: {
    include: ['rule/*'],
  },
  files: filesOptions,
};

const settingsOptions = {
  folders: {
    include: ['settings/*'],
  },
  files: filesOptions,
};

describe('veloce:source:push|pull', () => {
  before(async () => {
    const fs = require('fs');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
      fs.mkdirSync(pushDir, { recursive: true });
      await exec(`cp -ar test-data/source/* ${pushDir}`);
      fs.mkdirSync(pullDir);
    }
    fs.writeFileSync(`${pushDir}/settings/test.json`, JSON.stringify({ testId: 'testid value' }));
    const octaModelTemplate = `${curDir}/test-data/source/model/OCTA/OCTA.json`;
    const octaModelPMLTemplate = 'test-data/source/model/OCTA/OCTA.pml';
    const octaModel = require(octaModelTemplate);
    octaModel.Name = octaModelName;
    octaModel.VELOCPQ__ReferenceId__c = `ttest${testId}`;

    fs.mkdirSync(`${pushDir}/model/${octaModelName}`);
    fs.writeFileSync(octaModelFile, JSON.stringify(octaModel));
    fs.copyFileSync(octaModelPMLTemplate, octaModelPMLFile);
  });

  //   it('should push and pull veloce sources from org', async () => {
  //     var cmdResult = await exec(`sfdx veloce:source:push -u ${env} -p ${pushDir}`);
  //     console.log(cmdResult.stdout);
  //     cmdResult = await exec(`sfdx veloce:source:pull -u ${env} -p ${pullDir}`);
  //     console.log(cmdResult.stdout);
  //     expect(
  //       hashElement(`${pushDir}/model`, options).toString(),
  //       hashElement(`${pullDir}/model`, options).toString()
  //     ).to.be.true;
  //     expect(
  //       hashElement(`${pushDir}/drl`, options).toString(),
  //       hashElement(`${pullDir}/drl`, options).toString()
  //     ).to.be.true;
  //      expect(
  //        hashElement(`${pushDir}/config-ui`, options).toString(),
  //        hashElement(`${pullDir}/config-ui`, options).toString()
  //      ).to.be.true;
  //      expect(
  //        hashElement(`${pushDir}/rule`, options).toString(),
  //        hashElement(`${pullDir}/rule`, options).toString()
  //      ).to.be.true;
  //      expect(
  //        hashElement(`${pushDir}/settings`, options).toString(),
  //        hashElement(`${pullDir}/settings`, options).toString()
  //      ).to.be.true;
  //   });

  it('should pull UI sources from org', async () => {
    const testPullDir = `${pullDir}/should_pull_ui/source`;
    const cmdResult = await exec(`sfdx veloce:source:pull -u ${env} -m config-ui:OCTA -p ${testPullDir}`);
    console.log(cmdResult.stdout);
    const pushHashElement = await hashElement(`${pushDir}`, configUiOptions);
    const pullHashElement = await hashElement(`${testPullDir}`, configUiOptions);
    console.log(pullHashElement);
    console.log(pushHashElement);
    const pushHash = pushHashElement.hash;
    const pullHash = pullHashElement.hash;
    console.log(pushHash);
    console.log(pullHash);
    expect(
      pushHash === pullHash,
      `pulled config-ui files are different from push for Octa model;\n Check difference with: 'diff --brief --recursive ${pushDir}/config-ui ${testPullDir}/config-ui'`,
    ).to.be.true;
  });

  it('should pull UI+PML sources from org', async () => {
    const testPullDir = `${pullDir}/should_pull_ui_pml/source`;
    const cmdResult = await exec(`sfdx veloce:source:pull -u ${env} -m model:OCTA,config-ui:OCTA -p ${testPullDir}`);
    console.log(cmdResult.stdout);
    const pushHashElement = await hashElement(`${pushDir}`, configUiAndPmlOptions);
    const pullHashElement = await hashElement(`${testPullDir}`, configUiAndPmlOptions);
    console.log(pullHashElement);
    console.log(pushHashElement);
    const pushHash = pushHashElement.hash;
    const pullHash = pullHashElement.hash;
    console.log(pushHash);
    console.log(pullHash);
    expect(
      pushHash === pullHash,
      `pulled config-ui and model files are different from push for Octa model;\n Check difference with: 'for member in confg-ui model; do diff --brief --recursive ${pushDir} ${testPullDir}/source/$member ${testPullDir}/source/$member; done'`,
    ).to.be.true;
  });

  it('should pull Configuration Settings sources from org', async () => {
    const testPullDir = `${pullDir}/should_pull_config-settings/source`;
    const cmdResult = await exec(`sfdx veloce:source:pull -u ${env} -m config-settings -p ${testPullDir}`);
    console.log(cmdResult.stdout);
    const pushHashElement = await hashElement(pushDir, settingsOptions);
    const pullHashElement = await hashElement(testPullDir, settingsOptions);
    console.log(pullHashElement);
    console.log(pushHashElement);
    const pushHash = pushHashElement.hash;
    const pullHash = pullHashElement.hash;
    console.log(pushHash);
    console.log(pullHash);
    expect(
      pushHash === pullHash,
      `pulled config-settings files are different from pushed;\n Check difference with: 'diff --brief --recursive ${pushDir}/config-ui ${testPullDir}/config-ui'`,
    ).to.be.true;
  });

  it('should pull drools sources from org', async () => {
    const testPullDir = `${pullDir}/should_pull_drools/source`;
    const cmdResult = await exec(`sfdx veloce:source:pull -u ${env} -m drl -p ${testPullDir}`);
    console.log(cmdResult.stdout);
    const pushHashElement = await hashElement(pushDir, drlOptions);
    const pullHashElement = await hashElement(testPullDir, drlOptions);
    console.log(pullHashElement);
    console.log(pushHashElement);
    const pushHash = pushHashElement.hash;
    const pullHash = pullHashElement.hash;
    console.log(pushHash);
    console.log(pullHash);
    expect(
      pushHash === pullHash,
      `pulled drl files are different from pushed;\n Check difference with: 'diff --brief --recursive ${pushDir}/drl ${testPullDir}/drl'`,
    ).to.be.true;
  });

  it('should pull rules sources from org', async () => {
    const testPullDir = `${pullDir}/should_pull_rules/source`;
    const cmdResult = await exec(`sfdx veloce:source:pull -u ${env} -m rules -p ${testPullDir}`);
    console.log(cmdResult.stdout);
    const pushHashElement = await hashElement(pushDir, ruleOptions);
    const pullHashElement = await hashElement(testPullDir, ruleOptions);
    console.log(pullHashElement);
    console.log(pushHashElement);
    const pushHash = pushHashElement.hash;
    const pullHash = pullHashElement.hash;
    console.log(pushHash);
    console.log(pullHash);
    expect(
      pushHash === pullHash,
      `pulled drl files are different from pushed;\n Check difference with: 'diff --brief --recursive ${pushDir}/drl ${testPullDir}/drl'`,
    ).to.be.true;
  });
});
