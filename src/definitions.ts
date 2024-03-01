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