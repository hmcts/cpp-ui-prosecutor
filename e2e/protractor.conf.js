// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { defaults } = require('@cpp/ui.priming');
const protractorConfig = require('@cpp/ui.config').protractorFirefoxConfig;
const protractorHelper = require('@cpp/ui.test-utils').protractorHelper;
const yargs = require('yargs');
const path = require('path');
const { visible } = yargs.argv;

exports.config = {
  params: {
    ...protractorConfig.params,
    apiUrl: 'http://localhost:8181/'
  },
  specs: ['./src/specs/**/*.e2e-spec.ts'],
  SELENIUM_PROMISE_MANAGER: false,
  capabilities: protractorHelper.firefoxCapability({ headless: !visible }),
  async onPrepare() {
    defaults({
      baseUrl: browser.params.apiUrl,
      proxy: false
    });
    await protractorConfig.onPrepare();
  },
  plugins: [
    {
      path: path.resolve(__dirname, 'tools/axe-protractor/axe-protractor.js')
    },
    {
      package: 'protractor-screenshoter-plugin',
      screenshotPath: 'build/e2e/screenshots',
      screenshotOnExpect: 'failure',
      screenshotOnSpec: 'failure',
      withLogs: false,
      writeReportFreq: 'end',
      clearFoldersBeforeTest: true
    }
  ]
};
