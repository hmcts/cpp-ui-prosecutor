// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts
const { argv } = require('yargs');
const { protractorHelper } = require('@cpp/ui.test-utils');
const config = require('@cpp/ui.config').protractorCIConfig;
exports.config = {
  ...config,
  specs: ['./src/specs/**/*.e2e-spec.ts'],
  baseUrl: 'http://localhost:4600',
  capabilities: {
    ...config.capabilities,
    ...protractorHelper.firefoxCapability({
      headless: !argv.visible,
      proxy: config.capabilities.proxy
    })
  }
};