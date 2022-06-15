veloce
======

Extension to sfdx which allows veloce specific data pull and push

[![Version](https://img.shields.io/npm/v/veloce.svg)](https://npmjs.org/package/veloce)
[![Tests](https://github.com/veloceapps/veloce-sfdx-v3/actions/workflows/unit-tests.yml/badge.svg)](https://github.com/veloceapps/veloce-sfdx-v3/actions/workflows/unit-tests.yml)
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
* [`sfdx veloce:source:pull [-n <string>] [-f] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-velocesourcepull--n-string--f--v-string--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)

## `sfdx veloce:source:pull [-n <string>] [-f] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

print a greeting and your org IDs

```
USAGE
  $ sfdx veloce:source:pull [-n <string>] [-f] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel 
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

_See code: [src/commands/veloce/source/pull.ts](https://github.com/veloceapps/veloce-sfdx-v3/blob/v0.0.1/src/commands/veloce/source/pull.ts)_
<!-- commandsstop -->
