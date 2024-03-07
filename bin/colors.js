#!/usr/bin/env node
/* eslint-env node */
'use strict';

const kleur = require('kleur');

module.exports = {
  strong: kleur.bold,
  weak: kleur.dim,
  input: kleur.cyan,
  success: kleur.green,
  failure: kleur.red,
  ancillary: kleur.cyan
}