import { WebPlugin } from '@capacitor/core';

import type { EnvironmentPlugin } from './definitions';

export class EnvironmentWeb extends WebPlugin implements EnvironmentPlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
}
