<p align="center"><br><img src="https://user-images.githubusercontent.com/236501/85893648-1c92e880-b7a8-11ea-926d-95355b8175c7.png" width="128" height="128" /></p>
<h3 align="center">Environment</h3>
<p align="center"><strong><code>@capacitor-community/environment</code></strong></p>
<p align="center">
  Capacitor plugin to manage the environment configurations.
</p>

<p align="center">
  <img src="https://img.shields.io/maintenance/yes/2024?style=flat-square" />
  <a href="https://github.com/capacitor-community/environment/actions?query=workflow%3A%22CI%22"><img src="https://img.shields.io/github/workflow/status/capacitor-community/environment/CI?style=flat-square" /></a>
  <a href="https://www.npmjs.com/package/@capacitor-community/environment"><img src="https://img.shields.io/npm/l/@capacitor-community/environment?style=flat-square" /></a>
<br>
  <a href="https://www.npmjs.com/package/@capacitor-community/environment"><img src="https://img.shields.io/npm/dw/@capacitor-community/environment?style=flat-square" /></a>
  <a href="https://www.npmjs.com/package/@capacitor-community/environment"><img src="https://img.shields.io/npm/v/@capacitor-community/environment?style=flat-square" /></a>
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
<a href="#contributors-"><img src="https://img.shields.io/badge/all%20contributors-0-orange?style=flat-square" /></a>
<!-- ALL-CONTRIBUTORS-BADGE:END -->
</p>

## Description

This plugin takes advantage of the iOS schemes & Android product flavors to provide a JSON configuration to the running web application.<br>
This extra configuration improves your environment management if you followed the [Create Environment Specific Configuration guide](https://capacitorjs.com/docs/guides/environment-specific-configurations).

The advantages of using this plugin instead of managing the environment inside the web application:
* One web application build instead of one per environment
* Better development experience in the native IDEs by only switching the scheme/flavor
* On Android, build all the applications with one command (ex: gradlew bundleRelease) instead of one per environment

## Maintainers

| Maintainer | GitHub | Social |
| -----------| -------| -------|
| Maxime Amillastré | [mamillastre](https://github.com/mamillastre) |  |

## Installation

```bash
npm install @capacitor-community/environment
npx cap sync
```

## Configuration

This configuration guide conciders that you already followed the [Create Environment Specific Configuration guide](https://capacitorjs.com/docs/guides/environment-specific-configurations) and created the Android product flavors & the iOS schemes.

### Capacitor

Add your environment information in the Capacitor configuration of the plugin.

| Prop | Type | Description |
| ---- | ---- | ----------- |
| **`environments`** | <code>{<br>&nbsp;&nbsp;default: EnvironmentPluginsConfigData,<br>&nbsp;&nbsp;[environmentName: string]: EnvironmentPluginsConfigData<br>}</code> | The environment configuration declarations.<br>The `default` configuration is mandatory (`main` Android product flavor & `App` iOS scheme)<br>You can add as many other environments as you want by using the Android product flavor as a key name. |

#### EnvironmentPluginsConfigData

| Prop          | Type                          | Description                                                                                                |
| ------------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **`path`** | <code>string</code> | The path of the environment configuration JSON file you have generated. |

<br>

Example in `capacitor.config.ts`:

```ts
/// <reference types="@capacitor-community/environment" />

import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins: {
    Environment: {
      environments: {
        default: { path: 'path/to/my/environment.production.json' },
        otherEnvironmentName: { path: 'path/to/an/other/environment.json' }
      }
    }
  },
};

export default config;
```

Add the environment configuration files copy to you **package.json** scripts:

```json
"scripts": {
  "capacitor:copy:after": "npx capacitor-environment copy"
}
```

Run:
```bash
npx cap copy
```

### iOS

Open up the Capacitor application’s iOS project in Xcode by running `npx cap open ios`.<br>
Right-click the **App** group (under the App target) and select **New Group** from the context menu. Name this new group **environment**.

In the Finder, open the `ios/App/App/environment` folder.<br>
It contains all the copied configuration sorted into named folders.<br>
For each of the `environment.json` files in this folder:
* Drag & drop the file into the new created group **environment** in Xcode.
* In the add to the project options (automatically displayed by Xcode):
  * Uncheck the "Copy items if needed"
  * Check **ONLY** the target that corresponds to the environment file
  * Press "Finish"


### TypeScript

To allow TypeScript autocompletion, you must override the EnvironmentData interface in your app with your expected data.

Example:

`environment.d.ts`
```typescript
import '@capacitor-community/environment';

declare module '@capacitor-community/environment' {
  /** My app environment data */
  export interface EnvironmentData {
    /** The environment name */
    name: string;
    /** The environment endpoint URL */
    endpoint: string;
  }
}
```

## Note for the Web

An `environment.json` file must be available at the root your web application.<br>
You must manage this file depending on the environment on your own.

Example on an **Angular** app:<br>
You must add the asset copy on the wanted Angular configurations

```json
"assets": [
  {
    "glob": "environment.json",
    "input": "path/to/my/environment",
    "output": "/"
  }
]
```

## Usage

<docgen-index>

* [`init(...)`](#init)
* [`get(...)`](#get)
* [Interfaces](#interfaces)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### init(...)

```typescript
init(options: InitEnvironmentOptions) => Promise<void>
```

Initialize the Environment plugin.

The call to this method is optional.

Only available on web.

| Param         | Type                                                                      |
| ------------- | ------------------------------------------------------------------------- |
| **`options`** | <code><a href="#initenvironmentoptions">InitEnvironmentOptions</a></code> |

--------------------


### get(...)

```typescript
get(options?: GetEnvironmentOptions | undefined) => Promise<EnvironmentData>
```

Returns the environment configuration.

| Param         | Type                                                                    |
| ------------- | ----------------------------------------------------------------------- |
| **`options`** | <code><a href="#getenvironmentoptions">GetEnvironmentOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#environmentdata">EnvironmentData</a>&gt;</code>

--------------------


### Interfaces


#### InitEnvironmentOptions

| Prop          | Type                          | Description                                                                                                |
| ------------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **`version`** | <code>string \| number</code> | The version number of the app. Provide this parameter to avoid to set this parameter on each "get()" call. |


#### EnvironmentData

The environment data as a JSON object.

To enable the autocompletion, this interface must be extended.


#### GetEnvironmentOptions

| Prop          | Type                          | Description                                                                                                                                                                                                    |
| ------------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`version`** | <code>string \| number</code> | The version number of the app. Only used on web. Allow to force the environment.json refresh when the file is cached by the browser. You can also call the "init()" method to avoid to specify this parameter. |

</docgen-api>
