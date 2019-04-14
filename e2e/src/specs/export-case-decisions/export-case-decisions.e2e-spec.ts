import { isStable, navigate } from '../../util';
import { TVL_USER } from '../../../../tools/utils';
import { ExportCaseDecisionsPage } from '../../pages/export-case-decisions/export-case-decisions.page';
import { exportCaseDecisions } from '../../../../tools/contexts/caseExport';
import * as moment from 'moment';
import { browser, protractor } from 'protractor';

async function submitForm(exportCaseResultsByDatePage: ExportCaseDecisionsPage, fromDate: string, toDate: string) {
  const [fromYear, fromMonth, fromDay] = fromDate.split('-');
  const [toYear, toMonth, toDay] = toDate.split('-');

  await exportCaseResultsByDatePage.fromDay.sendKeys(fromDay);
  await exportCaseResultsByDatePage.fromMonth.sendKeys(fromMonth);
  await exportCaseResultsByDatePage.fromYear.sendKeys(fromYear);
  await exportCaseResultsByDatePage.toDay.sendKeys(toDay);
  await exportCaseResultsByDatePage.toMonth.sendKeys(toMonth);
  await exportCaseResultsByDatePage.toYear.sendKeys(toYear);

  await browser.waitForAngular();
  await exportCaseResultsByDatePage.searchButton.click();
  await browser.waitForAngular();

  await isStable();
}

describe('export case results by date', () => {
  const exportCaseResultsByDatePage = new ExportCaseDecisionsPage('tvl');

  it('should find case results when the dates are valid', async () => {
    await navigate(exportCaseResultsByDatePage.getUrl(), TVL_USER);

    const fromDate = moment()
      .subtract(10, 'days')
      .format('YYYY-MM-DD')
      .toString();
    const toDate = moment()
      .subtract(2, 'days')
      .format('YYYY-MM-DD')
      .toString();

    const exportedCaseDecisions = await exportCaseDecisions(fromDate, toDate);

    await submitForm(exportCaseResultsByDatePage, fromDate, toDate);

    await expect(exportCaseResultsByDatePage.getCaseResultsElement().getText()).toBe(
      exportedCaseDecisions.casesResultedCount + ' case results found from ' + fromDate + ' to ' + toDate
    );
  });

  it('should show error message when the date does not exist', async () => {
    await navigate(exportCaseResultsByDatePage.getUrl(), TVL_USER);

    const fromDate = '2019-3-32';
    const toDate = moment()
      .subtract(2, 'days')
      .format('YYYY-MM-DD')
      .toString();

    await submitForm(exportCaseResultsByDatePage, fromDate, toDate);

    await expect(exportCaseResultsByDatePage.getCaseResultsErrorMessageElement().getText()).toBe(
      `Date doesn't exist – enter again`
    );
  });

  it('should show error message when is not within 31 days of the start date', async () => {
    await navigate(exportCaseResultsByDatePage.getUrl(), TVL_USER);

    const fromDate = moment()
      .subtract(33, 'days')
      .format('YYYY-MM-DD')
      .toString();
    const toDate = moment()
      .subtract(1, 'days')
      .format('YYYY-MM-DD')
      .toString();

    await submitForm(exportCaseResultsByDatePage, fromDate, toDate);

    await expect(exportCaseResultsByDatePage.getCaseResultsErrorMessageElement().getText()).toBe(
      `This date must be within 31 days of your start date.`
    );
  });

  it('should download case results link clickable', async () => {
    await navigate(exportCaseResultsByDatePage.getUrl(), TVL_USER);

    const fromDate = moment()
      .subtract(10, 'days')
      .format('YYYY-MM-DD')
      .toString();
    const toDate = moment()
      .subtract(2, 'days')
      .format('YYYY-MM-DD')
      .toString();

    await submitForm(exportCaseResultsByDatePage, fromDate, toDate);

    await expect(
      protractor.ExpectedConditions.elementToBeClickable(
        exportCaseResultsByDatePage.getDownloadResultsLink(fromDate, toDate)
      )
    );
  });
});
