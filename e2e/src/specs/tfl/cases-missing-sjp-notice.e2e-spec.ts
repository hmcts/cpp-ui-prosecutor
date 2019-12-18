import { CasesMissingSjpNoticePage } from '../../pages/tfl/cases-missing-sjp-notice.page';
import { navigate } from '../../util';
import { TFL_USER } from '../../../../tools/utils';
import { TflDashboardPage } from '../../pages/tfl/dashboard.page';

describe('TFL Prosecutor', () => {
  describe('Cases missing SJP Notice', () => {
    const missingNoticesPage = new CasesMissingSjpNoticePage();
    const tflDashboard = new TflDashboardPage();

    beforeAll(async () => {
      // TODO: create case without notice
    });

    xit('should be able to view number of cases missing SJP notices', async () => {
      await navigate(tflDashboard.getUrl(), TFL_USER);
      const numberOfMissingCases = await tflDashboard.casesMissingSjpNoticeLink.getText();
      expect(Number(numberOfMissingCases)).toBeGreaterThan(0);
    });

    xit('should be able to view details for cases missing SJP notices', async () => {
      await navigate(missingNoticesPage.getUrl(), TFL_USER);
      expect(await missingNoticesPage.casesNumberParagraph.getText()).toMatch(/No cases|1 case|\d* cases/g);
      expect(await missingNoticesPage.casesTable.isPresent()).toBe(true);
    });
  });
});
