import * as fs from 'fs';
import * as path from 'path';
import 'dotenv/config';

export interface EnvironmentConfig {
  baseUrl: string;
}

const DEFAULT_ENV = 'dev';

export function loadConfig(): EnvironmentConfig {
  const env = process.env.TEST_ENV ?? DEFAULT_ENV;
  const configPath = path.resolve(__dirname, '..', '..', 'config', `${env}.json`);

  if (!fs.existsSync(configPath)) {
    throw new Error(`No config file found for TEST_ENV="${env}" at ${configPath}`);
  }

  return JSON.parse(fs.readFileSync(configPath, 'utf-8')) as EnvironmentConfig;
}
