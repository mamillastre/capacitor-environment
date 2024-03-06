#!/usr/bin/env node
'use strict';

const { program } = require('commander');

program
  .command('copy')
  .description('Copy the environment configuration files into the native app')
  .action(async () => {
    const { copyCommand } = await require('./tasks/copy');
    await copyCommand();

  });

program.parse(process.argv);