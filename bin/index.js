#!/usr/bin/env node
/* eslint-env node */
'use strict';

const { program } = require('commander');

program
  .command('copy')
  .description('Copy the environment configuration files into the native app')
  .action(() => {
    const { copyCommand } = require('./tasks/copy');
    copyCommand();
  });

program.parse(process.argv);
