# sn-client-cli

[![Build Status](https://travis-ci.org/SenseNet/sn-client-cli.svg?branch=master)](https://travis-ci.org/SenseNet/sn-client-cli)

This package is a command line tool for the Sense/NET Platform's [Client Library](https://github.com/SenseNet/sn-client-js "sn-client-js").

## Note
This package is under development and not released yet.

## Installation
### Prerequisites
* Node.JS ^6.1.0
* NPM ^4.0.0

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
