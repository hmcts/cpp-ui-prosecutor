import { CasesMissingSjpNoticePage } from '../../pages/tfl/cases-missing-sjp-notice.page';
import { navigate } from '../../util';
import { TFL_USER } from '../../../../tools/utils';
import { TflDashboardPage } from '../../pages/tfl/dashboard.page';
import { browser } from 'protractor';

describe('tfl prosecutor', () => {
  const page = new CasesMissingSjpNoticePage();
  const tflDashboard = new TflDashboardPage();

  it('should have link to navigate to cases missing sjp notice', async () => {
    await navigate(tflDashboard.getUrl(), TFL_USER);
    await tflDashboard.casesMissingSjpNoticeLink.click();
    await expect(browser.getCurrentUrl()).toContain(page.getUrl());
  });

  it('should show number of cases missing notice', async () => {
    await navigate(page.getUrl(), TFL_USER);
    await expect(page.casesNumberParagraph.getText()).toMatch(/No cases|1 case|\d* cases/g);
  });

  it('should show cases missing notice table', async () => {
    await navigate(page.getUrl(), TFL_USER);
    const casesParagraph = await page.casesNumberParagraph.getText();
    if (casesParagraph !== 'No cases') {
      await expect(page.casesTable.isPresent()).toBe(true);
    } else {
      await expect(page.casesTable.isPresent()).toBe(false);
    }
  });
});
