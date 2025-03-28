/// <reference types="@capacitor/cli" />

declare module '@capacitor/cli' {
  export interface PluginsConfig {
    /**
     * Capacitor configuration of the environment plugin
     */
    Environment?: {
      /**
       * The environment configuration declarations.
       * List all project available environments.
       *
       * @since 1.0.0
       */
      environments: EnvironmentConfigDeclarations;
    };
  }
}

/**
 * The declaration of all the environments in the Capacitor configuration
 */
export interface EnvironmentConfigDeclarations {
  /**
   * The mandatory default environment configuration. Usually the production configuration.
   * Correspond to the **main** flavor on Android an the **App** target on iOS.
   *
   * @since 1.0.0
   */
  default: EnvironmentConfigInfo;
  /**
   * The other environment configuration.
   * You can add as many other environments as you want.
   * Must be named like the used Android product flavor names.
   *
   * @since 1.0.0
   */
  [environmentName: string]: EnvironmentConfigInfo;
}

/**
 * One environement declaration data in the Capacitor configuration
 */
export interface EnvironmentConfigInfo {
  /**
   * The relative path of your JSON environment configuration file from the root of the project.
   *
   * @since 1.0.0
   * @example "enrironments/environment.production.json"
   */
  path: string;
}

export interface EnvironmentPlugin {
  /**
   * Returns the environment configuration.
   *
   * @usage
   * ```typescript
   * const env = await Environment.get();
   * console.log(env);
   * ```
   * @since 1.0.0
   */
  get(options?: GetEnvironmentOptions): Promise<EnvironmentData>;

  /**
   * Set the app version.
   *
   * Only available on web.
   *
   * Allow to force the environment.json refresh when the file is cached by the browser.
   *
   * @usage
   * ```typescript
   * Environment.init({version: '1.0.0'});
   * ```
   * @since 1.0.0
   */
  setVersion(options: SetVersionOptions): Promise<void>;
}

export interface GetEnvironmentOptions {
  /**
   * The version number of the app.
   *
   * Only used on web.
   *
   * Allow to force the environment.json refresh when the file is cached by the browser.
   *
   * You can also call the "setVersion()" method to avoid to specify this parameter on each call.
   *
   * @since 1.0.0
   */
  version?: string | number;
}

export interface SetVersionOptions {
  /**
   * The version number of the app.
   *
   * Provide this parameter to avoid to set this parameter on each "get()" call.
   *
   * @since 1.0.0
   */
  version: string | number;
}

/**
 * The environment data as a JSON object.
 *
 * To enable the autocompletion, this interface must be extended.
 */
export interface EnvironmentData {
  [x: string]: JSONValue;
}

type JSONValue = string | number | boolean | JSONObject | JSONValue[];

interface JSONObject {
  [x: string]: JSONValue;
}
