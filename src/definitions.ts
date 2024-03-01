export interface EnvironmentPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
