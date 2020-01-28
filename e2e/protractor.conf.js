const { SpecReporter } = require('jasmine-spec-reporter');
const { defaults } = require('@cpp/ui.priming');
const path = require('path');
const fs = require('fs');

exports.config = {
  allScriptsTimeout: 40000,
  getPageTimeout: 10000,
  baseUrl: 'http://localhost:4750/prosecutor/',
  params: {
    apiUrl: 'http://localhost:8181/api'
  },
  capabilities: {
    browserName: 'firefox',
    'moz:firefoxOptions': process.argv.includes('--headless') ? { args: ['--headless'] } : {}
  },
  directConnect: true,
  SELENIUM_PROMISE_MANAGER: false,
  specs: ['./src/specs/**/*.e2e-spec.ts'],
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  plugins: [
    {
      package: 'protractor-screenshoter-plugin',
      screenshotPath: 'build/e2e/screenshots',
      screenshotOnExpect: 'failure+success',
      screenshotOnSpec: 'failure+success',
      withLogs: false,
      writeReportFreq: 'asap',
      clearFoldersBeforeTest: true
    }
  ],

  beforeLaunch() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.json')
    });
  },

  onPrepare() {
    jasmine.getEnv().addReporter(
      new SpecReporter({
        suite: {
          displayNumber: false
        },
        spec: {
          displaySuccessful: true,
          displayFailed: true,
          displayErrorMessages: true,
          displayPending: true,
          displayDuration: true,
          displayStacktrace: true
        },
        summary: {
          displaySuccessful: true,
          displayFailed: true,
          displayErrorMessages: true,
          displayPending: true,
          displayDuration: true
        }
      })
    );

    defaults({
      baseUrl: browser.params.apiUrl
    });

    return browser.getProcessedConfig();
  },

  onComplete() {
    // Create a dummy axeReport - Jenkins always looks for a report
    // and fails if it is not present
    const outputDirectory = './build/axeReport/';
    const axeFilename = 'axeReport.html';
    if(!fs.existsSync(outputDirectory, axeFilename)) {
      fs.mkdirSync(outputDirectory);
      fs.writeFileSync(path.resolve(outputDirectory, axeFilename), 'Dummy axe report', { encoding: 'UTF-8' });
    }
  }
};
