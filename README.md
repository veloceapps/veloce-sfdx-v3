veloce
======

Extension to sfdx which allows veloce specific data pull and push

[![Version](https://img.shields.io/npm/v/veloce-sfdx-v3.svg)](https://npmjs.org/package/veloce-sfdx-v3)
[![Tests](https://github.com/veloceapps/veloce-sfdx-v3/actions/workflows/unit-tests.yml/badge.svg)](https://github.com/veloceapps/veloce-sfdx-v3/actions/workflows/unit-tests.yml)
[![Greenkeeper](https://badges.greenkeeper.io/veloceapps/veloce-sfdx-v3.svg)](https://greenkeeper.io/)
[![Known Vulnerabilities](https://snyk.io/test/github/veloceapps/veloce-sfdx-v3/badge.svg)](https://snyk.io/test/github/veloceapps/veloce-sfdx-v3)
[![Downloads/week](https://img.shields.io/npm/dw/veloce-sfdx-v3.svg)](https://npmjs.org/package/veloce-sfdx-v3)
[![License](https://img.shields.io/npm/l/veloce-sfdx-v3.svg)](https://github.com/veloceapps/veloce-sfdx-v3/blob/master/package.json)

<!-- toc -->

<!-- tocstop -->
<!-- install -->
<!-- usage -->
```sh-session
$ npm install -g veloce-sfdx-v3
$ sfdx COMMAND
running command...
$ sfdx (-v|--version|version)
veloce-sfdx-v3/0.0.4 darwin-x64 node-v16.15.1
$ sfdx --help [COMMAND]
USAGE
  $ sfdx COMMAND
...
```
<!-- usagestop -->
<!-- commands -->
* [`sfdx veloce:data:pull [-p <string>] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-velocedatapull--p-string--v-string--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx veloce:data:push [-p <string>] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-velocedatapush--p-string--v-string--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx veloce:debug [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-velocedebug--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx veloce:fixref [-d] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-velocefixref--d--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx veloce:login -p <string> -a <string> -u <string> -r <string> [-s <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-velocelogin--p-string--a-string--u-string--r-string--s-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx veloce:source:pull [-m <string>] [-p <string>] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-velocesourcepull--m-string--p-string--v-string--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx veloce:source:push [-m <string>] [-p <string>] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-velocesourcepush--m-string--p-string--v-string--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)

## `sfdx veloce:data:pull [-p <string>] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Retrieves data from Salesforce org and stores it in provided folder as CSVs

```
USAGE
  $ sfdx veloce:data:pull [-p <string>] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -p, --sourcepath=sourcepath                                                       Path where to store data

  -u, --targetusername=targetusername                                               username or alias for the target
                                                                                    org; overrides default target org

  -v, --targetdevhubusername=targetdevhubusername                                   username or alias for the dev hub
                                                                                    org; overrides default dev hub org

  --apiversion=apiversion                                                           override the api version used for
                                                                                    api requests made by this command

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLE
  sfdx velcoe:data:pull --targetusername myOrg@example.com --targetdevhubusername devhub@org.com --sourcepath 
  ./source/templates
```

_See code: [src/commands/veloce/data/pull.ts](https://github.com/veloceapps/veloce-sfdx-v3/blob/v0.0.4/src/commands/veloce/data/pull.ts)_

## `sfdx veloce:data:push [-p <string>] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Uploads Data from CSVs to Salesforce org

```
USAGE
  $ sfdx veloce:data:push [-p <string>] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -p, --sourcepath=sourcepath                                                       Path where to get data

  -u, --targetusername=targetusername                                               username or alias for the target
                                                                                    org; overrides default target org

  -v, --targetdevhubusername=targetdevhubusername                                   username or alias for the dev hub
                                                                                    org; overrides default dev hub org

  --apiversion=apiversion                                                           override the api version used for
                                                                                    api requests made by this command

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLE
  sfdx velcoe:data:pull --targetusername myOrg@example.com --targetdevhubusername devhub@org.com --members model:Octa 
  --sourcepath ./source/templates
```

_See code: [src/commands/veloce/data/push.ts](https://github.com/veloceapps/veloce-sfdx-v3/blob/v0.0.4/src/commands/veloce/data/push.ts)_

## `sfdx veloce:debug [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Starts new ISOLATED debug session and streams backend logs

```
USAGE
  $ sfdx veloce:debug [-u <string>] [--apiversion <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -u, --targetusername=targetusername                                               username or alias for the target
                                                                                    org; overrides default target org

  --apiversion=apiversion                                                           override the api version used for
                                                                                    api requests made by this command

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLES
  sfdx velcoe:debug --targetusername myOrg@example.com --targetdevhubusername devhub@org.com start
  sfdx velcoe:debug --targetusername myOrg@example.com --targetdevhubusername devhub@org.com stop
  sfdx velcoe:debug --targetusername myOrg@example.com --targetdevhubusername devhub@org.com list
  sfdx velcoe:debug --targetusername myOrg@example.com --targetdevhubusername devhub@org.com push
  sfdx velcoe:debug --targetusername myOrg@example.com --targetdevhubusername devhub@org.com watch
  sfdx velcoe:debug --targetusername myOrg@example.com --targetdevhubusername devhub@org.com logs
```

_See code: [src/commands/veloce/debug.ts](https://github.com/veloceapps/veloce-sfdx-v3/blob/v0.0.4/src/commands/veloce/debug.ts)_

## `sfdx veloce:fixref [-d] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Fix sobjects external id if empty

```
USAGE
  $ sfdx veloce:fixref [-d] [-u <string>] [--apiversion <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -d, --dry                                                                         Performs dry run and won't change
                                                                                    org data

  -u, --targetusername=targetusername                                               username or alias for the target
                                                                                    org; overrides default target org

  --apiversion=apiversion                                                           override the api version used for
                                                                                    api requests made by this command

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLES
  sfdx veloce:fixref --targetusername myOrg@example.com --targetdevhubusername devhub@org.com --dry
  sfdx veloce:fixref --targetusername myOrg@example.com --targetdevhubusername devhub@org.com
```

_See code: [src/commands/veloce/fixref.ts](https://github.com/veloceapps/veloce-sfdx-v3/blob/v0.0.4/src/commands/veloce/fixref.ts)_

## `sfdx veloce:login -p <string> -a <string> -u <string> -r <string> [-s <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Login using username and password

```
USAGE
  $ sfdx veloce:login -p <string> -a <string> -u <string> -r <string> [-s <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -a, --alias=alias                                                                 (required) target alias to create

  -p, --passwordfile=passwordfile                                                   (required) Relative/Full path to
                                                                                    file containing password

  -r, --instanceurl=instanceurl                                                     (required) salesforce environment
                                                                                    Instance URL

  -s, --securitytoken=securitytoken                                                 security token

  -u, --user=user                                                                   (required) Username to login with

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLE
  $ sfdx veloce:login -u username -p ./PASSWORDFILE -a alias01
```

_See code: [src/commands/veloce/login.ts](https://github.com/veloceapps/veloce-sfdx-v3/blob/v0.0.4/src/commands/veloce/login.ts)_

## `sfdx veloce:source:pull [-m <string>] [-p <string>] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Retrieves Sources from Salesforce org and stores it in git folder structure

```
USAGE
  $ sfdx veloce:source:pull [-m <string>] [-p <string>] [-v <string>] [-u <string>] [--apiversion <string>] [--json] 
  [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -m, --members=members                                                             Pull only specific type of data or
                                                                                    even name of object

  -p, --sourcepath=sourcepath                                                       Path where to store sources

  -u, --targetusername=targetusername                                               username or alias for the target
                                                                                    org; overrides default target org

  -v, --targetdevhubusername=targetdevhubusername                                   username or alias for the dev hub
                                                                                    org; overrides default dev hub org

  --apiversion=apiversion                                                           override the api version used for
                                                                                    api requests made by this command

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLE
  sfdx velcoe:source:pull --targetusername myOrg@example.com --targetdevhubusername devhub@org.com --members model:Octa 
  --sourcepath ./source/pmls
```

_See code: [src/commands/veloce/source/pull.ts](https://github.com/veloceapps/veloce-sfdx-v3/blob/v0.0.4/src/commands/veloce/source/pull.ts)_

## `sfdx veloce:source:push [-m <string>] [-p <string>] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Uploads Sources to Salesforce org from git folder structure

```
USAGE
  $ sfdx veloce:source:push [-m <string>] [-p <string>] [-v <string>] [-u <string>] [--apiversion <string>] [--json] 
  [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -m, --members=members                                                             Push only specific type of data or
                                                                                    even name of object

  -p, --sourcepath=sourcepath                                                       Path where to get sources

  -u, --targetusername=targetusername                                               username or alias for the target
                                                                                    org; overrides default target org

  -v, --targetdevhubusername=targetdevhubusername                                   username or alias for the dev hub
                                                                                    org; overrides default dev hub org

  --apiversion=apiversion                                                           override the api version used for
                                                                                    api requests made by this command

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLE
  sfdx velcoe:source:push --targetusername myOrg@example.com --targetdevhubusername devhub@org.com --members model:Octa 
  --sourcepath ./source/pmls
```

_See code: [src/commands/veloce/source/push.ts](https://github.com/veloceapps/veloce-sfdx-v3/blob/v0.0.4/src/commands/veloce/source/push.ts)_
<!-- commandsstop -->
