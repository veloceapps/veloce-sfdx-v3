veloce
======

Extension to sfdx which allows veloce specific data pull and push

[![Version](https://img.shields.io/npm/v/veloce.svg)](https://npmjs.org/package/veloce)
[![CircleCI](https://circleci.com/gh/veloceapps/veloce-sfdx-v3/tree/master.svg?style=shield)](https://circleci.com/gh/veloceapps/veloce-sfdx-v3/tree/master)
[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/veloceapps/veloce-sfdx-v3?branch=master&svg=true)](https://ci.appveyor.com/project/heroku/veloce-sfdx-v3/branch/master)
[![Greenkeeper](https://badges.greenkeeper.io/veloceapps/veloce-sfdx-v3.svg)](https://greenkeeper.io/)
[![Known Vulnerabilities](https://snyk.io/test/github/veloceapps/veloce-sfdx-v3/badge.svg)](https://snyk.io/test/github/veloceapps/veloce-sfdx-v3)
[![Downloads/week](https://img.shields.io/npm/dw/veloce.svg)](https://npmjs.org/package/veloce)
[![License](https://img.shields.io/npm/l/veloce.svg)](https://github.com/veloceapps/veloce-sfdx-v3/blob/master/package.json)

<!-- toc -->
* [Debugging your plugin](#debugging-your-plugin)
<!-- tocstop -->
<!-- install -->
<!-- usage -->
```sh-session
$ npm install -g veloce
$ sfdx COMMAND
running command...
$ sfdx (-v|--version|version)
veloce/0.0.1 darwin-x64 node-v16.15.1
$ sfdx --help [COMMAND]
USAGE
  $ sfdx COMMAND
...
```
<!-- usagestop -->
<!-- commands -->
* [`sfdx hello:org [-n <string>] [-f] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-helloorg--n-string--f--v-string--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)

## `sfdx hello:org [-n <string>] [-f] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

print a greeting and your org IDs

```
USAGE
  $ sfdx hello:org [-n <string>] [-f] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -f, --force                                                                       example boolean flag
  -n, --name=name                                                                   name to print

  -u, --targetusername=targetusername                                               username or alias for the target
                                                                                    org; overrides default target org

  -v, --targetdevhubusername=targetdevhubusername                                   username or alias for the dev hub
                                                                                    org; overrides default dev hub org

  --apiversion=apiversion                                                           override the api version used for
                                                                                    api requests made by this command

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLES
  sfdx hello:org --targetusername myOrg@example.com --targetdevhubusername devhub@org.com
  sfdx hello:org --name myname --targetusername myOrg@example.com
```

_See code: [src/commands/hello/org.ts](https://github.com/veloceapps/veloce-sfdx-v3/blob/v0.0.1/src/commands/hello/org.ts)_
<!-- commandsstop -->
<!-- debugging-your-plugin -->
# Debugging your plugin
We recommend using the Visual Studio Code (VS Code) IDE for your plugin development. Included in the `.vscode` directory of this plugin is a `launch.json` config file, which allows you to attach a debugger to the node process when running your commands.

To debug the `hello:org` command: 
1. Start the inspector
  
If you linked your plugin to the sfdx cli, call your command with the `dev-suspend` switch: 
```sh-session
$ sfdx hello:org -u myOrg@example.com --dev-suspend
```
  
Alternatively, to call your command using the `bin/run` script, set the `NODE_OPTIONS` environment variable to `--inspect-brk` when starting the debugger:
```sh-session
$ NODE_OPTIONS=--inspect-brk bin/run hello:org -u myOrg@example.com
```

2. Set some breakpoints in your command code
3. Click on the Debug icon in the Activity Bar on the side of VS Code to open up the Debug view.
4. In the upper left hand corner of VS Code, verify that the "Attach to Remote" launch configuration has been chosen.
5. Hit the green play button to the left of the "Attach to Remote" launch configuration window. The debugger should now be suspended on the first line of the program. 
6. Hit the green play button at the top middle of VS Code (this play button will be to the right of the play button that you clicked in step #5).
<br><img src=".images/vscodeScreenshot.png" width="480" height="278"><br>
Congrats, you are debugging!
