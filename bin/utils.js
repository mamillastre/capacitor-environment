
const { resolve } = require('path');

exports.getCapacitorParams = function () {

  const platform = process.env.CAPACITOR_PLATFORM_NAME;
  const appRootDir = process.env.CAPACITOR_ROOT_DIR;
  let config;
  try {
    config = JSON.parse(process.env.CAPACITOR_CONFIG);
  } catch (e) { }

  return {
    platform,
    appRootDir,
    config
  }
}

exports.getAndroidPath = function (config) {
  return config?.android?.path ?? 'android';
}

exports.getIosPath = function (config) {
  return config?.ios?.path ?? 'ios';
}