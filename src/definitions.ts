/// <reference types="@capacitor/cli" />

declare module '@capacitor/cli' {
  export interface PluginsConfig {
    /**
     * Capacitor configuration of the environment plugin
     */
    Environment?: {
      /**
       * The environments declarations
       */
      environments: {
        /**
         * The default environment configuration. Usually the production configuration.
         * Correspond to the **main** flavor on Android an the **App** target on iOS. 
         *
         * @since 1.0.0
         */
        default: EnvironmentPluginsConfigData,
        /**
         * The other environment configuration.
         * Must be named like the used Android product flavor names.
         *
         * @since 1.0.0
         */
        [environmentName: string]: EnvironmentPluginsConfigData
      };
    };
  }
}

/**
 * The environement declaration data in the Capacitor configuration
 */
export interface EnvironmentPluginsConfigData {
  /**
   * The relative path of the environment configuration file from the root of the project
   *
   * @since 1.0.0
   * @example "enrironments/environment.production.json"
   */
  path: string;
}

export interface EnvironmentPlugin {

  /**
   * Initialize the Environment plugin.
   * 
   * The call to this method is optional.
   * 
   * Only available on web.
   * @usage
   * ```typescript
   * Environment.init({version: '1.0.0'});
   * ```
   */
  init(options: InitEnvironmentOptions): Promise<void>;

  /**
   * Returns the environment configuration.
   * @usage
   * ```typescript
   * const env = await Environment.get();
   * console.log(env);
   * ```
   */
  get(options?: GetEnvironmentOptions): Promise<EnvironmentData>;
}

export interface InitEnvironmentOptions {
  /**
   * The version number of the app.
   * 
   * Provide this parameter to avoid to set this parameter on each "get()" call.
   */
  version: string | number
}

export interface GetEnvironmentOptions {
  /**
   * The version number of the app.
   * 
   * Only used on web.
   * 
   * Allow to force the environment.json refresh when the file is cached by the browser.
   * 
   * You can also call the "init()" method to avoid to specify this parameter.
   */
  version?: string | number
}

/** 
 * The environment data as a JSON object.
 * 
 * To enable the autocompletion, this interface must be extended.
 */
export interface EnvironmentData {
  [x: string]: JSONValue;
};

type JSONValue =
  | string
  | number
  | boolean
  | JSONObject
  | JSONValue[];

interface JSONObject {
  [x: string]: JSONValue;
}