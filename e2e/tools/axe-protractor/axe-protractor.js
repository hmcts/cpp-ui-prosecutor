const path = require('path');
const fs = require('fs');
const AxeBuilder = require('axe-webdriverjs');
const reportTemplate = require('./axe-report-template');
const { buildMessage } = require('./build-message');
const OUTPUT_DIR = './build/axeReport/';
const axeFilename = 'axeReport.html';
const placeholder = '<!-- placeholder -->';
const checkedPages = [];

/**
 * Protractor plugin hook which always runs when Angular successfully bootstrapped.
 */
function onPageStable() {
  AxeBuilder(browser.driver)
    .configure(this.config || {})
    .analyze(results => handleResults(this, results));
}

function processFile(data) {
  console.log('Data:', data);
}

function fullPath() {
  return path.resolve(OUTPUT_DIR, axeFilename);
}

function createRecord(record) {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, '744');
    fs.writeFileSync(fullPath(), reportTemplate, { encoding: 'UTF-8' });
  }

  if (fs.existsSync(OUTPUT_DIR)) {
    const data = fs.readFileSync(fullPath(), 'utf8');
    let result = data.replace(/<!-- placeholder -->/g, record);
    fs.writeFileSync(fullPath(), result, { encoding: 'UTF-8' });
  }
}

function SaferHTML(templateData) {
  let escapedTest = templateData[0];

  for (let i = 1; i < arguments.length; i++) {
    const argument = String(arguments[i]);
    escapedTest += argument
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    escapedTest += templateData[i];
  }
  return escapedTest;
}

/**
 * Processes the axe-core results by reporting recognized violations
 * to Protractor and printing them out.
 * @param {!protractor.ProtractorPlugin} context
 * @param {!axe.AxeResults} results
 */
function handleResults(context, results) {
  if (checkedPages.indexOf(results.url) === -1) {
    let result = SaferHTML`
      <div class="page notice">
        <h1>Accessibility Report For "${results.url}"</h1>
        <p>Generated at: ${new Date()}</p>`;

    if (results.violations.length) {
      result += '<ul class="clean-list results-list">';
    } else {
      result += '<h2>There are no accessibility errors in this page';
    }

    checkedPages.push(results.url);
    results.violations.forEach(violation => {
      const specName = `${violation.help} (${results.url})`;
      const message = '\n' + buildMessage(violation);
      result += SaferHTML`
                <li>
                    Error Type: ${buildMessage(violation)}
                    <br/>
                    Description: ${violation.help}, <a href="${violation.helpUrl}" target="_blank">More info</a>
                    <br/>
                    Impact: ${violation.impact}
                </li>`;
      context.addFailure(message, { specName });
    });
    result += `</ul></div>${placeholder}`;
    createRecord(result);
  }
}

exports.name = 'protractor-axe';
exports.onPageStable = onPageStable;
exports.processFile = processFile;
