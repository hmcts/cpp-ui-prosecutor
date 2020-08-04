import { TVL_USER, LEGAL_ADVISER } from '../../../../tools/utils';
import { navigate } from '../../util';
import { CaseOverviewPage } from '../../pages';
import { CaseCompleter } from '../../util/mock-requests/case-completer';

describe('Case overview', () => {
  describe('Excise penalty and back duty', () => {
    it('should correctly display excise penalty and back duty when decision is financial penalty', async () => {
      const caseCompleter = new CaseCompleter(LEGAL_ADVISER);
      const kase = await caseCompleter.getFinancialPenaltyCase();
      const caseOverviewPage = new CaseOverviewPage('user', kase.id);

      await navigate(caseOverviewPage.getUrl(), TVL_USER);
      expect(await caseOverviewPage.pageHeaderBar.getText()).toContain(kase.urn);

      // Offence 1
      let offenceId = kase.defendant.offences[0].id;
      expect(await caseOverviewPage.excisePenalty(offenceId).getText()).toContain('£40');
      expect(await caseOverviewPage.backDuty(offenceId).getText()).toContain('£12');
      expect(await caseOverviewPage.compensation(offenceId).getText()).toContain('£15.30');

      // Offence 2
      offenceId = kase.defendant.offences[1].id;
      expect(await caseOverviewPage.excisePenalty(offenceId).getText()).toContain('£60');
      expect(await caseOverviewPage.backDuty(offenceId).getText()).toContain('£14');
      expect(await caseOverviewPage.compensation(offenceId).getText()).toContain('£15.30');

      // Financial impositions
      expect(await caseOverviewPage.totalCompensation.getText()).toContain('£30.60');
      expect(await caseOverviewPage.totalExcisePenalty.getText()).toContain('£100');
      expect(await caseOverviewPage.totalCosts.getText()).toContain('£20.10');
    });

    it('should correctly display excise penalty and back duty when decision is discharge', async () => {
      const caseCompleter = new CaseCompleter(LEGAL_ADVISER);
      const kase = await caseCompleter.getDischargeCase();
      const caseOverviewPage = new CaseOverviewPage('user', kase.id);

      await navigate(caseOverviewPage.getUrl(), TVL_USER);
      expect(await caseOverviewPage.pageHeaderBar.getText()).toContain(kase.urn);

      // Offence 1
      let offenceId = kase.defendant.offences[0].id;
      expect(await caseOverviewPage.dischargeType(offenceId).getText()).toContain('Discharged conditionally for 3 month');
      expect(await caseOverviewPage.backDuty(offenceId).getText()).toContain('£12');
      expect(await caseOverviewPage.compensation(offenceId).getText()).toContain('£15');

      // Offence 2
      offenceId = kase.defendant.offences[1].id;
      expect(await caseOverviewPage.dischargeType(offenceId).getText()).toContain('Discharged conditionally for 3 month');
      expect(await caseOverviewPage.backDuty(offenceId).getText()).toContain('£14');
      expect(await caseOverviewPage.compensation(offenceId).getText()).toContain('£15');

      // Financial impositions
      expect(await caseOverviewPage.totalCompensation.getText()).toContain('£30');
      expect(await caseOverviewPage.totalBackDuty.getText()).toContain('£26');
      expect(await caseOverviewPage.totalCosts.getText()).toContain('£20');
      expect(await caseOverviewPage.totalVictimSurcharge.getText()).toContain('£30');
    });
  });
});
