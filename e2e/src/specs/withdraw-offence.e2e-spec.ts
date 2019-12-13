import { createBasicTvlCase } from '../../../tools/factory';
import { TVL_USER } from '../../../tools/utils';
import { isStable, navigate } from '../util';
import { CaseOverviewPage, WithdrawOffencePage } from '../pages';
import { browser } from 'protractor';

describe('Prosecutor', () => {
  describe('Withdraw offence', () => {
    let caseOverviewPage;
    let kase;
    let withdrawOffencePage;

    beforeAll(async () => {
      kase = await createBasicTvlCase();
      caseOverviewPage = new CaseOverviewPage('tvl', kase.id);
      withdrawOffencePage = new WithdrawOffencePage('tvl', kase.id);
    });

    it('should be able to request withdrawal for all offences');

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

    it('should be able to request withdrawal for a multi-offence case');
  });
});
