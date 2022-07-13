import { promisify } from 'node:util';
import { cwd } from 'process';
import { exec as plainExec } from 'node:child_process';
import { hashElement } from 'folder-hash';
import { expect } from 'chai';


const exec = promisify(plainExec);
const env = 'test-sfdx-plugin'
const testId = Date.now();
const dir = `/tmp/veloce-sfdx-v3-test-${testId}`;
const pushDir = `${dir}/push`;
const pullDir = `${dir}/pull`;
const curDir = cwd();
const octaModelName = `OCTA_${testId}`;
const octaModelFolder = `${pushDir}/model/${octaModelName}`;
const octaModelFile = `${octaModelFolder}/${octaModelName}.json`;
const octaModelPMLFile = `${octaModelFolder}/${octaModelName}.pml`;

const options = {
  files: {
    include: ['**/*.drl', '**/*.json', '**/*.pml'],
    exclude: ['**/model/*.json'],
    matchBasename: false,
    matchPath: true,
  },
};

describe('veloce:source:push|pull', () => {
  before(async () => {
    const fs = require('fs');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
      fs.mkdirSync(pushDir);
      await exec(`cp -ar test-data/source/* ${pushDir}`);
      fs.mkdirSync(pullDir);
    }
    fs.writeFileSync(`${pushDir}/settings/test.json`, JSON.stringify({ testId: 'testid value' }));
    const octaModelTemplate = `${curDir}/test-data/source/model/OCTA/OCTA.json`;
    const octaModelPMLTemplate = `test-data/source/model/OCTA/OCTA.pml`;
    const octaModel = require(octaModelTemplate);
    octaModel.Name = octaModelName;
    octaModel.VELOCPQ__ReferenceId__c = `ttest${testId}`;

    fs.mkdirSync(`${pushDir}/model/${octaModelName}`);
    fs.writeFileSync(octaModelFile, JSON.stringify(octaModel));
    fs.copyFileSync(octaModelPMLTemplate, octaModelPMLFile);
  });

  it('should push and pull veloce sources from org', async () => {
    var cmdResult = await exec(`sfdx veloce:source:push -u ${env} -p ${pushDir}`);
    console.log(cmdResult.stdout);
    cmdResult = await exec(`sfdx veloce:source:pull -u ${env} -p ${pullDir}`);
    console.log(cmdResult.stdout);
    expect(
      hashElement(`${pushDir}/model`, options).toString(),
      hashElement(`${pullDir}/model`, options).toString()
    ).to.be.true;
    expect(
      hashElement(`${pushDir}/drl`, options).toString(),
      hashElement(`${pullDir}/drl`, options).toString()
    ).to.be.true;
     expect(
       hashElement(`${pushDir}/config-ui`, options).toString(),
       hashElement(`${pullDir}/config-ui`, options).toString()
     ).to.be.true;
     expect(
       hashElement(`${pushDir}/rule`, options).toString(),
       hashElement(`${pullDir}/rule`, options).toString()
     ).to.be.true;
     expect(
       hashElement(`${pushDir}/settings`, options).toString(),
       hashElement(`${pullDir}/settings`, options).toString()
     ).to.be.true;
  });
});
