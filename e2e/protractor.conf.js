// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts
const protractorConfig = require('@cpp/ui.config').protractorFirefoxConfig;
const protractorHelper = require('@cpp/ui.test-utils').protractorHelper;
const { defaults } = require('@cpp/ui.priming');
const { SpecReporter } = require('jasmine-spec-reporter');
const { argv } = require('yargs');

exports.config = { 
  ...protractorConfig,
  baseUrl: 'http://localhost:4750/prosecutor',
  params: {
    apiUrl: 'http://localhost:8181/api',
  },
  specs: ['./src/specs/**/*.e2e-spec.ts'],
  capabilities: protractorHelper.firefoxCapability({ headless: !argv.visible }),
  geckoDriver: null,
  disableChecks: true,
  async onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.e2e.json')
    });
    const { browser } = require('protractor');
    defaults({ baseUrl: browser.params.apiUrl });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  }
};
