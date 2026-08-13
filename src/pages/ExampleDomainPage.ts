import { BasePage } from './BasePage';

const EXAMPLE_DOMAIN_URL = 'https://example.com';

export class ExampleDomainPage extends BasePage {
  async open(): Promise<void> {
    await this.goto(EXAMPLE_DOMAIN_URL);
  }
}
