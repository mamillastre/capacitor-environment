import { registerPlugin } from '@capacitor/core';

import type { EnvironmentPlugin } from './definitions';

const Environment = registerPlugin<EnvironmentPlugin>('Environment', {
  web: () => import('./web').then((m) => new m.EnvironmentWeb()),
});

export * from './definitions';
export { Environment };
