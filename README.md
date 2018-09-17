dtq
===



[![Version](https://img.shields.io/npm/v/dtq.svg)](https://npmjs.org/package/dtq)
[![CircleCI](https://circleci.com/gh/dieffrei/dtq/tree/master.svg?style=shield)](https://circleci.com/gh/dieffrei/dtq/tree/master)
[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/dieffrei/dtq?branch=master&svg=true)](https://ci.appveyor.com/project/heroku/dtq/branch/master)
[![Codecov](https://codecov.io/gh/dieffrei/dtq/branch/master/graph/badge.svg)](https://codecov.io/gh/dieffrei/dtq)
[![Greenkeeper](https://badges.greenkeeper.io/dieffrei/dtq.svg)](https://greenkeeper.io/)
[![Known Vulnerabilities](https://snyk.io/test/github/dieffrei/dtq/badge.svg)](https://snyk.io/test/github/dieffrei/dtq)
[![Downloads/week](https://img.shields.io/npm/dw/dtq.svg)](https://npmjs.org/package/dtq)
[![License](https://img.shields.io/npm/l/dtq.svg)](https://github.com/dieffrei/dtq/blob/master/package.json)

<!-- toc -->
* [Debugging your plugin](#debugging-your-plugin)
<!-- tocstop -->
<!-- install -->
<!-- usage -->
```sh-session
$ npm install -g dtq
$ dtq COMMAND
running command...
$ dtq (-v|--version|version)
dtq/0.0.0 darwin-x64 node-v8.9.4
$ dtq --help [COMMAND]
USAGE
  $ dtq COMMAND
...
```
<!-- usagestop -->
<!-- commands -->
* [`dtq dtq:event:listen [EVENTNAME]`](#dtq-dtqeventlisten-eventname)

## `dtq dtq:event:listen [EVENTNAME]`

Prints a greeting and your org id(s)!

```
USAGE
  $ dtq dtq:event:listen [EVENTNAME]

OPTIONS
  -u, --targetusername=targetusername              username or alias for the target org; overrides default target org
  -v, --targetdevhubusername=targetdevhubusername  username or alias for the dev hub org; overrides default dev hub org
  -w, --wait=wait                                  Wait for events for...
  --apiversion=apiversion                          override the api version used for api requests made by this command
  --json                                           format output as json
  --loglevel=(trace|debug|info|warn|error|fatal)   logging level for this command invocation

EXAMPLE
  $ sfdx dtq:event:listen --targetusername myOrg@example.com --targetdevhubusername devhub@org.com
```

_See code: [src/commands/dtq/event/listen.ts](https://github.com/dieffrei/dtq/blob/v0.0.0/src/commands/dtq/event/listen.ts)_
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
