# veloce

Extension to sfdx which allows veloce specific data pull and push

[![Version](https://img.shields.io/npm/v/veloce-sfdx-v3.svg)](https://npmjs.org/package/veloce-sfdx-v3)
[![Tests](https://github.com/veloceapps/veloce-sfdx-v3/actions/workflows/unit-tests.yml/badge.svg)](https://github.com/veloceapps/veloce-sfdx-v3/actions/workflows/unit-tests.yml)
[![Greenkeeper](https://badges.greenkeeper.io/veloceapps/veloce-sfdx-v3.svg)](https://greenkeeper.io/)
[![Known Vulnerabilities](https://snyk.io/test/github/veloceapps/veloce-sfdx-v3/badge.svg)](https://snyk.io/test/github/veloceapps/veloce-sfdx-v3)
[![Downloads/week](https://img.shields.io/npm/dw/veloce-sfdx-v3.svg)](https://npmjs.org/package/veloce-sfdx-v3)
[![License](https://img.shields.io/npm/l/veloce-sfdx-v3.svg)](https://github.com/veloceapps/veloce-sfdx-v3/blob/master/package.json)

<!-- toc -->

- [veloce](#veloce)
  <!-- tocstop -->
                                                              <!-- install -->
                                                              <!-- usage -->

```sh-session
$ npm install -g veloce-sfdx-v3
$ sfdx COMMAND
running command...
$ sfdx (-v|--version|version)
veloce-sfdx-v3/0.0.19 darwin-x64 node-v16.15.1
$ sfdx --help [COMMAND]
USAGE
  $ sfdx COMMAND
...
```

<!-- usagestop -->
<!-- commands -->

- [`sfdx veloce:data:pull [-m <string>] [-w <string>] [-s <string>] [-p <string>] [-o <string>] [-R <string>] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-velocedatapull--m-string--w-string--s-string--p-string--o-string--r-string--v-string--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
- [`sfdx veloce:data:push [-m <string>] [-p <string>] [-P] [-s <string>] [-e <string>] [-R <string>] [-P] [-U] [-d] [-D] [-o <string>] [-b <string>] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-velocedatapush--m-string--p-string--p--s-string--e-string--r-string--p--u--d--d--o-string--b-string--v-string--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
- [`sfdx veloce:debug:list [-P] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-velocedebuglist--p--v-string--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
- [`sfdx veloce:debug:logs [-P] [-l debug|info|warn|error|DEBUG|INFO|WARN|ERROR] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-velocedebuglogs--p--l-debuginfowarnerrordebuginfowarnerror--v-string--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
- [`sfdx veloce:debug:push -m <string> [-p <string>] [-P] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-velocedebugpush--m-string--p-string--p--v-string--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
- [`sfdx veloce:debug:start [-P] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-velocedebugstart--p--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
- [`sfdx veloce:debug:stop [-P] [--dev-token <string>] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-velocedebugstop--p---dev-token-string--v-string--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
- [`sfdx veloce:debug:watch [-p <string>] [-P] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-velocedebugwatch--p-string--p--v-string--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
- [`sfdx veloce:fixref [-d] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-velocefixref--d--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
- [`sfdx veloce:login -p <string> -a <string> -u <string> -r <string> [-s <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-velocelogin--p-string--a-string--u-string--r-string--s-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
- [`sfdx veloce:source:pack -m <string> [-p <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-velocesourcepack--m-string--p-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
- [`sfdx veloce:source:pull [-m <string>] [-p <string>] [-P] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-velocesourcepull--m-string--p-string--p--v-string--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
- [`sfdx veloce:source:push [-m <string>] [-p <string>] [-P] [-d] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-velocesourcepush--m-string--p-string--p--d--v-string--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)

## `sfdx veloce:data:pull [-m <string>] [-w <string>] [-s <string>] [-p <string>] [-o <string>] [-R <string>] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Retrieves data from Salesforce org and stores it in provided folder as CSVs

```
USAGE
  $ sfdx veloce:data:pull [-m <string>] [-w <string>] [-s <string>] [-p <string>] [-o <string>] [-R <string>] [-v
  <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -R, --idreplacefields=idreplacefields                                             Coma separated list of fields in
                                                                                    which SF IDs are replaces by mapped
                                                                                    Ids by using text search and replace

  -m, --members=members                                                             Pull only specific type of data or
                                                                                    even name of object

  -o, --ignorefields=ignorefields                                                   Coma separated list of fields to
                                                                                    ignore during dump. To append to the
                                                                                    default list of ignored fields add +
                                                                                    in the front.

  -p, --sourcepath=sourcepath                                                       Path to file where to read data

  -s, --sobjecttype=sobjecttype                                                     The sObject type of the records you
                                                                                    want to dump.

  -u, --targetusername=targetusername                                               username or alias for the target
                                                                                    org; overrides default target org

  -v, --targetdevhubusername=targetdevhubusername                                   username or alias for the dev hub
                                                                                    org; overrides default dev hub org

  -w, --where=where                                                                 where condition to filter sObjects
                                                                                    by

  --apiversion=apiversion                                                           override the api version used for
                                                                                    api requests made by this command

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLES
  sfdx veloce:data:pull --targetusername myOrg@example.com --targetdevhubusername devhub@org.com --sourcepath
  ./source/templates
  sfdx veloce:data:pull --targetusername myOrg@example.com --targetdevhubusername devhub@org.com --sourcepath
  ./source/templates --members price-list:OctaPriceListName
```

_See code: [src/commands/veloce/data/pull.ts](https://github.com/veloceapps/veloce-sfdx-v3/blob/v0.0.19/src/commands/veloce/data/pull.ts)_

## `sfdx veloce:data:push [-m <string>] [-p <string>] [-P] [-s <string>] [-e <string>] [-R <string>] [-P] [-U] [-d] [-D] [-o <string>] [-b <string>] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Uploads Data from CSVs to Salesforce org

```
USAGE
  $ sfdx veloce:data:push [-m <string>] [-p <string>] [-P] [-s <string>] [-e <string>] [-R <string>] [-P] [-U] [-d] [-D]
   [-o <string>] [-b <string>] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -D, --diff                                                                        Force diff mode ON, it will show
                                                                                    differences for each record which is
                                                                                    upserted/inserted. Default: ON if <
                                                                                    128 records and off otherwise.

  -P, --noproject                                                                   Bypass check of sfdx-project.json to
                                                                                    exist

  -P, --printids                                                                    Print External ID before attempting
                                                                                    to update

  -R, --idreplacefields=idreplacefields                                             Coma separated list of fields in
                                                                                    which SF IDs are replaces by mapped
                                                                                    Ids by using text search and replace

  -U, --upsert                                                                      Should use APEX upsert (could insert
                                                                                    extra records) or update-only APEX
                                                                                    (one by one), which is default

  -b, --batch=batch                                                                 Size of batch, to avoid getting
                                                                                    'script is too large'

  -d, --dry                                                                         Dont change data, just run in dry
                                                                                    mode

  -e, --externalid=externalid                                                       The column name of the external ID.

  -m, --members=members                                                             Pushes only specific type of data or
                                                                                    even name of object

  -o, --ignorefields=ignorefields                                                   Coma separated list of fields to
                                                                                    ignore during load

  -p, --sourcepath=sourcepath                                                       Path where to get data

  -s, --sobjecttype=sobjecttype                                                     The sObject type of the records you
                                                                                    want to upsert.

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
  sfdx veloce:data:pull --targetusername myOrg@example.com --targetdevhubusername devhub@org.com --members model:Octa
  --sourcepath ./source/templates
```

_See code: [src/commands/veloce/data/push.ts](https://github.com/veloceapps/veloce-sfdx-v3/blob/v0.0.19/src/commands/veloce/data/push.ts)_

## `sfdx veloce:debug:list [-P] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Lists debug sessions

```
USAGE
  $ sfdx veloce:debug:list [-P] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -P, --noproject                                                                   Bypass check of sfdx-project.json to
                                                                                    exist

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
  sfdx veloce:debug:list --targetusername myOrg@example.com --targetdevhubusername devhub@org.com
```

_See code: [src/commands/veloce/debug/list.ts](https://github.com/veloceapps/veloce-sfdx-v3/blob/v0.0.19/src/commands/veloce/debug/list.ts)_

## `sfdx veloce:debug:logs [-P] [-l debug|info|warn|error|DEBUG|INFO|WARN|ERROR] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Streams logs out of debug session to console

```
USAGE
  $ sfdx veloce:debug:logs [-P] [-l debug|info|warn|error|DEBUG|INFO|WARN|ERROR] [-v <string>] [-u <string>]
  [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -P, --noproject                                                                   Bypass check of sfdx-project.json to
                                                                                    exist

  -l, --debugsessionloglevel=(debug|info|warn|error|DEBUG|INFO|WARN|ERROR)          [default: debug] Logging level for
                                                                                    debug session

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
  sfdx veloce:debug:logs --targetusername myOrg@example.com --targetdevhubusername devhub@org.com --debugsessionloglevel
   warn
```

_See code: [src/commands/veloce/debug/logs.ts](https://github.com/veloceapps/veloce-sfdx-v3/blob/v0.0.19/src/commands/veloce/debug/logs.ts)_

## `sfdx veloce:debug:push -m <string> [-p <string>] [-P] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Pushes changes to debug session manually

```
USAGE
  $ sfdx veloce:debug:push -m <string> [-p <string>] [-P] [-v <string>] [-u <string>] [--apiversion <string>] [--json]
  [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -P, --noproject                                                                   Bypass check of sfdx-project.json to
                                                                                    exist

  -m, --members=members                                                             (required) Type of meta data to
                                                                                    deploy

  -p, --sourcepath=sourcepath                                                       Path to meta data

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
  sfdx veloce:debug:push --targetusername myOrg@example.com --targetdevhubusername devhub@org.com
  sfdx veloce:debug:push --targetusername myOrg@example.com --targetdevhubusername devhub@org.com -m
  model:name_of_my_model -p ./source/my-alternative-model-folder
```

_See code: [src/commands/veloce/debug/push.ts](https://github.com/veloceapps/veloce-sfdx-v3/blob/v0.0.19/src/commands/veloce/debug/push.ts)_

## `sfdx veloce:debug:start [-P] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Starts new ISOLATED debug session

```
USAGE
  $ sfdx veloce:debug:start [-P] [-u <string>] [--apiversion <string>] [--json] [--loglevel
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -P, --noproject                                                                   Bypass check of sfdx-project.json to
                                                                                    exist

  -u, --targetusername=targetusername                                               username or alias for the target
                                                                                    org; overrides default target org

  --apiversion=apiversion                                                           override the api version used for
                                                                                    api requests made by this command

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLE
  sfdx veloce:debug:start --targetusername myOrg@example.com --targetdevhubusername devhub@org.com
```

_See code: [src/commands/veloce/debug/start.ts](https://github.com/veloceapps/veloce-sfdx-v3/blob/v0.0.19/src/commands/veloce/debug/start.ts)_

## `sfdx veloce:debug:stop [-P] [--dev-token <string>] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Stops debug session

```
USAGE
  $ sfdx veloce:debug:stop [-P] [--dev-token <string>] [-v <string>] [-u <string>] [--apiversion <string>] [--json]
  [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -P, --noproject                                                                   Bypass check of sfdx-project.json to
                                                                                    exist

  -u, --targetusername=targetusername                                               username or alias for the target
                                                                                    org; overrides default target org

  -v, --targetdevhubusername=targetdevhubusername                                   username or alias for the dev hub
                                                                                    org; overrides default dev hub org

  --apiversion=apiversion                                                           override the api version used for
                                                                                    api requests made by this command

  --dev-token=dev-token                                                             Dev Session token

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLE
  sfdx veloce:debug:stop --targetusername myOrg@example.com --targetdevhubusername devhub@org.com
```

_See code: [src/commands/veloce/debug/stop.ts](https://github.com/veloceapps/veloce-sfdx-v3/blob/v0.0.19/src/commands/veloce/debug/stop.ts)_

## `sfdx veloce:debug:watch [-p <string>] [-P] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Watches filesystem for changes and automatically propagates them to backend

```
USAGE
  $ sfdx veloce:debug:watch [-p <string>] [-P] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -P, --noproject                                                                   Bypass check of sfdx-project.json to
                                                                                    exist

  -p, --sourcepath=sourcepath                                                       Path where to watch data

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
  sfdx veloce:debug:watch --targetusername myOrg@example.com --targetdevhubusername devhub@org.com --sourcepath
  source/models
```

_See code: [src/commands/veloce/debug/watch.ts](https://github.com/veloceapps/veloce-sfdx-v3/blob/v0.0.19/src/commands/veloce/debug/watch.ts)_

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

_See code: [src/commands/veloce/fixref.ts](https://github.com/veloceapps/veloce-sfdx-v3/blob/v0.0.19/src/commands/veloce/fixref.ts)_

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

_See code: [src/commands/veloce/login.ts](https://github.com/veloceapps/veloce-sfdx-v3/blob/v0.0.19/src/commands/veloce/login.ts)_

## `sfdx veloce:source:pack -m <string> [-p <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Uploads Sources to Salesforce org from git folder structure

```
USAGE
  $ sfdx veloce:source:pack -m <string> [-p <string>] [--json] [--loglevel
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -m, --members=members                                                             (required) Push only specific type
                                                                                    of data or even name of object

  -p, --sourcepath=sourcepath                                                       Path where to get sources

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLE
  sfdx veloce:source:push --targetusername myOrg@example.com --targetdevhubusername devhub@org.com --members model:OCTA
  --sourcepath ./source/models
```

_See code: [src/commands/veloce/source/pack.ts](https://github.com/veloceapps/veloce-sfdx-v3/blob/v0.0.19/src/commands/veloce/source/pack.ts)_

## `sfdx veloce:source:pull [-m <string>] [-p <string>] [-P] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Retrieves Sources from Salesforce org and stores it in git folder structure

```
USAGE
  $ sfdx veloce:source:pull [-m <string>] [-p <string>] [-P] [-v <string>] [-u <string>] [--apiversion <string>]
  [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -P, --noproject                                                                   Bypass check of sfdx-project.json to
                                                                                    exist

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
  sfdx veloce:source:pull --targetusername myOrg@example.com --targetdevhubusername devhub@org.com --members model:OCTA
  --sourcepath ./source/pmls
```

_See code: [src/commands/veloce/source/pull.ts](https://github.com/veloceapps/veloce-sfdx-v3/blob/v0.0.19/src/commands/veloce/source/pull.ts)_

## `sfdx veloce:source:push [-m <string>] [-p <string>] [-P] [-d] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Uploads Sources to Salesforce org from git folder structure

```
USAGE
  $ sfdx veloce:source:push [-m <string>] [-p <string>] [-P] [-d] [-v <string>] [-u <string>] [--apiversion <string>]
  [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -P, --noproject                                                                   Bypass check of sfdx-project.json to
                                                                                    exist

  -d, --skipdelete                                                                  Only for upload, skip db clean up

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
  sfdx veloce:source:push --targetusername myOrg@example.com --targetdevhubusername devhub@org.com --members model:OCTA
  --sourcepath ./source/models
```

_See code: [src/commands/veloce/source/push.ts](https://github.com/veloceapps/veloce-sfdx-v3/blob/v0.0.19/src/commands/veloce/source/push.ts)_

<!-- commandsstop -->
