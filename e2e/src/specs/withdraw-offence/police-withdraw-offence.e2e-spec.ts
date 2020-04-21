import { TVL_USER } from '../../../../tools/utils';
import { isStable, navigate } from '../../util';
import { CaseOverviewPage, WithdrawOffencePage } from '../../pages';
import { browser } from 'protractor';
import { Case } from '../../../../src/app/contexts/sjp';
import { createPoliceCase } from '../../../../tools/factory/police-build-case';
import { PoliceCaseDataBuilder } from '../../../../tools/helpers/police-case-data-builder';

describe('Police', () => {
  describe('Withdraw offence', () => {
    let caseOverviewPage: CaseOverviewPage;
    let kase: Case;
    let withdrawOffencePage: WithdrawOffencePage;

    beforeAll(async () => {
      kase = await createPoliceCase(PoliceCaseDataBuilder.createCaseDataForMultipleOffences(2));
      caseOverviewPage = new CaseOverviewPage('tvl', kase.id);
      withdrawOffencePage = new WithdrawOffencePage('tvl', kase.id);
    });

    it('should be able to request withdrawal for all offences on multiple offence case', async () => {
      await navigate(withdrawOffencePage.getUrl(), TVL_USER);
      await withdrawOffencePage.withdrawOffenceRadioButtonYes.click();
      await isStable();
      await withdrawOffencePage.withdrawOffenceRadioButtonReasonInsufficient.click();
      await browser.waitForAngular();
      await withdrawOffencePage.withdrawOffenceSubmitButton.click();
      await browser.waitForAngular();
      await isStable();
      expect(await caseOverviewPage.alertRequestSent.getText()).toContain('Your request has been sent');
    });
  });
});
