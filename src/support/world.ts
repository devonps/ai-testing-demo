import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from '@playwright/test';
import { EnvironmentConfig, loadConfig } from '../utils/config';

export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  config: EnvironmentConfig;

  constructor(options: IWorldOptions) {
    super(options);
    this.config = loadConfig();
  }
}

setWorldConstructor(CustomWorld);
