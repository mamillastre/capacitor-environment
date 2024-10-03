#!/usr/bin/env node
/* eslint-env node */
'use strict';

const { rmSync, copyFileSync, existsSync, mkdirSync } = require('fs');
const { resolve, dirname } = require('path');

const c = require('../colors');
const { getCapacitorParams, getAndroidPath, getIosPath } = require('../utils');

exports.copyCommand = async function () {
  const { platform, appRootDir, config } = getCapacitorParams();

  if (!platform || !appRootDir || !config) {
    console.error(
      c.failure(
        '\rError: this command must be executed in the Capacitor copy context. Add this script to your package.json => "capacitor:copy:after": "npx capacitor-environment copy"',
      ),
    );
    process.exit(1);
  }

  // Copy the environment in the navite platform
  copy(platform, appRootDir, config);

  // Remove the unused environment in the web assets
  rmWebEnvFile(platform, appRootDir, config);
};

/**
 * Launch the copy of all environment configuration files into the wanted platform
 */
function copy(platform, appRootDir, config) {
  if (platform === 'android' || platform === 'ios') {
    const envConf = config?.plugins?.Environment?.environments;

    if (!envConf?.default?.path) {
      console.warn(
        c.warning(
          '\rWarning: the "default" environment is not provided for the Environment plugin in the Capacitor config file',
        ),
      );
    }

    Object.keys(envConf ?? {}).forEach((envKey) => {
      if (envConf[envKey]?.path) {
        copyNativeEnvFile(
          appRootDir,
          envConf[envKey].path,
          platform === 'android'
            ? `${getAndroidPath(config)}/app/src/${envKey === 'default' ? 'main' : envKey}/assets/environment.json`
            : `${getIosPath(config)}/App/App/environment/${envKey}/environment.json`,
        );
      }
    });
  }
}

/**
 * Copy an environment configuration file
 */
function copyNativeEnvFile(appRootDir, originFile, destFile) {
  if (originFile && destFile) {
    console.info(
      `\r${c.success('✔')} Copying environment configuration from ${c.strong(originFile)} to ${c.strong(destFile)}`,
    );

    const originPath = resolve(appRootDir, originFile);
    const destPath = resolve(appRootDir, destFile);

    // Check the origin file
    if (!existsSync(originPath)) {
      console.error(c.failure(`\rError: The Capacitor environment file "${originFile}" does not exist."`));
      process.exit(9);
    }

    // Create the folder if not exists
    const destFolder = dirname(destPath);
    if (!existsSync(destFolder)) {
      mkdirSync(destFolder, { recursive: true });
    }

    copyFileSync(originPath, destPath);
  }
}

/**
 * Remove the environment file in the native web assets (unused in native platforms)
 */
function rmWebEnvFile(platform, appRootDir, config) {
  if (platform === 'android' || platform === 'ios') {
    const assetsPath =
      platform === 'android'
        ? `${getAndroidPath(config)}/app/src/main/assets/public`
        : `${getIosPath(config)}/App/App/public`;
    const fileFullPath = resolve(appRootDir, assetsPath, 'environment.json');

    if (existsSync(fileFullPath)) {
      console.info(`\r${c.success('✔')} Removing unused ${c.strong('environment.json')} from ${c.strong(assetsPath)}`);
      rmSync(fileFullPath);
    }
  }
}
