# sn-client-cli

[![Gitter chat](https://img.shields.io/gitter/room/SenseNet/SN7ClientAPI.svg?style=flat)](https://gitter.im/SenseNet/SN7ClientAPI)
[![Build Status](https://travis-ci.org/SenseNet/sn-client-cli.svg?branch=master)](https://travis-ci.org/SenseNet/sn-client-cli)
[![codecov](https://codecov.io/gh/SenseNet/sn-client-cli/branch/master/graph/badge.svg)](https://codecov.io/gh/SenseNet/sn-client-cli) 
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/e3f64e9f929d4dbead466ba1283cf43b)](https://www.codacy.com/app/SenseNet/sn-client-cli?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=SenseNet/sn-client-cli&amp;utm_campaign=Badge_Grade)
[![Greenkeeper badge](https://badges.greenkeeper.io/SenseNet/sn-client-cli.svg)](https://greenkeeper.io/)


This package is a command line tool for the Sense/NET Platform's [Client Library](https://github.com/SenseNet/sn-client-js "sn-client-js").

## Note
This package is under development and not released yet.

## Installation
### Prerequisites
* [Node.JS](https://nodejs.org) ^6.1.0
* [NPM](https://www.npmjs.com) ^4.0.0
* [NYC](https://www.npmjs.com/package/nyc) for running tests

You can get the latest version with NPM

``
npm install sn-client-js https://github.com/SenseNet/sn-client-cli --save
``

## Usage

From th command line, you can run:

``
$ sn-client [command] --[options]
``

### Available commands
**init** -
Creates an initial 'sn.config.js' in your project root. You can use this for providing default configuration options to the CLI.

**fetch-types** - 
If you have customized your **Sense/Net ECM repository** with custom content types, you can use this command to get the generated TypeScript classes and refresh the built-in ones in **sn-client-js** package from a _specified_ repository.

**help** - Displays a help screen about the CLI, the available commands and options
