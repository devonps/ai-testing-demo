module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: ['src/support/**/*.ts', 'src/pages/**/*.ts'],
    format: ['progress', 'json:test-results/cucumber-report.json'],
    paths: ['features/**/*.feature'],
  },
};
