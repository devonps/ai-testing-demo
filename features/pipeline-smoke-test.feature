Feature: Pipeline smoke test
  As a maintainer of demo-test-automation
  I want a test that runs against a stable public page
  So that I can prove the framework works end-to-end before testing KanFlow

  Scenario: Load a stable public page and verify its title
    Given I open the example domain page
    Then the page title should be "Example Domain"
