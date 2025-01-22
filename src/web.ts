import { WebPlugin } from '@capacitor/core';

import type { EnvironmentData, EnvironmentPlugin, GetEnvironmentOptions, SetVersionOptions } from './definitions';

export class EnvironmentWeb extends WebPlugin implements EnvironmentPlugin {
  /** The environment request promise. To only request it once */
  private static envPromise: Promise<EnvironmentData> | undefined;

  /** The application version number saved during the plugin init */
  private static version?: string | number;

  async get(options?: GetEnvironmentOptions): Promise<EnvironmentData> {
    if (!EnvironmentWeb.envPromise) {
      EnvironmentWeb.envPromise = fetch(
        'environment.json' +
          ((options?.version ?? EnvironmentWeb.version) ? `?v=${options?.version ?? EnvironmentWeb.version}` : ''),
      ).then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        EnvironmentWeb.envPromise = undefined;
        throw new Error('Unable to load the environment.json file');
      });
    }

    return EnvironmentWeb.envPromise;
  }

  async setVersion(options: SetVersionOptions): Promise<void> {
    if (options?.version) {
      EnvironmentWeb.version = options.version;
    }
  }
}
