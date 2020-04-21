import { createBasicTvlCase, createTvlCaseWithDoc } from '../../../../tools/factory';
import { TVL_USER } from '../../../../tools/utils';
import { isStable, navigate } from '../../util';
import { CaseOverviewPage, WithdrawOffencePage } from '../../pages';
import { browser } from 'protractor';
import { Case } from '../../../../src/app/contexts/sjp';

describe('TVL', () => {
  describe('Withdraw offence', () => {
    let caseOverviewPage: CaseOverviewPage;
    let multiOffenceCaseOverviewPage: CaseOverviewPage;
    let kase: Case;
    let multiOffenceCase: Case;
    let withdrawOffencePage: WithdrawOffencePage;
    let multiOffenceWithdrawOffencePage: WithdrawOffencePage;

    beforeAll(async () => {
      kase = await createBasicTvlCase();
      caseOverviewPage = new CaseOverviewPage('tvl', kase.id);
      withdrawOffencePage = new WithdrawOffencePage('tvl', kase.id);
      multiOffenceCase = await createTvlCaseWithDoc();
      multiOffenceCaseOverviewPage = new CaseOverviewPage('tvl', multiOffenceCase.id);
      multiOffenceWithdrawOffencePage = new WithdrawOffencePage('tvl', multiOffenceCase.id);
    });

    it('should be able to request withdrawal for a single offence case', async () => {
      await navigate(withdrawOffencePage.getUrl(), TVL_USER);
      expect(await withdrawOffencePage.withdrawOffenceHeading.getText()).toContain('Manage offence withdrawals');
      await withdrawOffencePage.withdrawOffenceRadioButtonYes.click();
      await isStable();
      await withdrawOffencePage.withdrawOffenceRadioButtonReasonInsufficient.click();
      await browser.waitForAngular();
      await withdrawOffencePage.withdrawOffenceSubmitButton.click();
      await browser.waitForAngular();
      await isStable();
      expect(await caseOverviewPage.alertRequestSent.getText()).toContain('Your request has been sent');
    });

    it('should be able to request withdrawal for all offences on multiple offence case', async () => {
      await navigate(multiOffenceWithdrawOffencePage.getUrl(), TVL_USER);
      await multiOffenceWithdrawOffencePage.withdrawOffenceRadioButtonYes.click();
      await isStable();
      await multiOffenceWithdrawOffencePage.withdrawOffenceRadioButtonReasonInsufficient.click();
      await browser.waitForAngular();
      await multiOffenceWithdrawOffencePage.withdrawOffenceSubmitButton.click();
      await browser.waitForAngular();
      await isStable();
      expect(await multiOffenceCaseOverviewPage.alertRequestSent.getText()).toContain('Your request has been sent');
    });
  });
});
