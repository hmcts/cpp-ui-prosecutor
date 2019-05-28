import { createBasicTvlCase } from '../../../../../tools/factory';
import { TVL_USER } from '../../../../../tools/utils';
import { isStable, navigate } from '../../../util';
import { CaseOverviewPage, WithdrawOffencePage } from '../../../pages';
import { browser } from 'protractor';

describe('withdraw offence page', () => {
  let caseOverviewPage;
  let kase;
  let withdrawOffencePage;

  beforeAll(async () => {
    kase = await createBasicTvlCase();
    caseOverviewPage = new CaseOverviewPage('tvl', kase.id);
    withdrawOffencePage = new WithdrawOffencePage('tvl', kase.id);
  });

  it('should be able to successfully withdraw an offence', async () => {
    await navigate(withdrawOffencePage.getUrl(), TVL_USER);
    await expect(withdrawOffencePage.withdrawOffenceHeading.getText()).toContain('Manage offence withdrawals');
    await expect(withdrawOffencePage.withdrawOffenceRadioButtonYes.click());
    await isStable();
    await expect(withdrawOffencePage.withdrawOffenceRadioButtonReasonInsufficient.click());
    await browser.waitForAngular();
    await expect(withdrawOffencePage.withdrawOffenceSubmitButton.click());
    await browser.waitForAngular();
    await isStable();
    await expect(caseOverviewPage.alertRequestSent.getText()).toContain(`Your request has been sent`);
  });
});
