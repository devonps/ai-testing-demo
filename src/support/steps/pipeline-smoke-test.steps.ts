import { Given, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../world';
import { ExampleDomainPage } from '../../pages/ExampleDomainPage';

Given('I open the example domain page', async function (this: CustomWorld) {
  const examplePage = new ExampleDomainPage(this.page);
  await examplePage.open();
});

Then('the page title should be {string}', async function (this: CustomWorld, expected: string) {
  await expect(this.page).toHaveTitle(expected);
});
