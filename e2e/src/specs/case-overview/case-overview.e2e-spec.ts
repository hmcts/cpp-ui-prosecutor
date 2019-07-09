import { createBasicTvlCase, createTvlCaseWithDoc } from '../../../../tools/factory';
import { TVL_USER } from '../../../../tools/utils';
import { navigate } from '../../util';
import { CaseOverviewPage } from '../../pages';
import { by, element } from 'protractor';
import { DatesToAvoidPage } from '../../pages/case-overview/dates-to-avoid.page';

describe('prosecutor', () => {
  let caseOverviewPage: CaseOverviewPage;
  let kase;
  let datesToAvoidPage;

  beforeAll(async () => {
    kase = await createBasicTvlCase();
    caseOverviewPage = new CaseOverviewPage('tvl', kase.id);
    datesToAvoidPage = new DatesToAvoidPage('tvl', kase.id);
  });

  it('should be able to access the case details with single offence', async () => {
    await navigate(caseOverviewPage.getUrl(), TVL_USER);

    await expect(caseOverviewPage.pageHeaderBar.getText()).toContain(kase.urn);
    await expect(caseOverviewPage.caseStatus.getText()).toContain('No plea received - ready for decision');
    await expect(caseOverviewPage.caseProsecutor.getText()).toContain('TV Licensing');

    await caseOverviewPage.goToTab('Defendant details');

    const defendantName = 'John Adam Theodore PROTRACTOR-' + kase.urn.replace('TVL', '');

    await expect(caseOverviewPage.defendantName.getText()).toContain(defendantName);
    await expect(caseOverviewPage.defendantDob.getText()).toContain('4 Feb 1980');
    await expect(caseOverviewPage.defendantEmail.getText()).toContain('john@email.com');

    await expect(caseOverviewPage.offenceHeadings.get(0).getText()).toContain('Offence');
    await expect(caseOverviewPage.offenceTitles.get(0).getText()).toContain(
      'Obstruct person executing search warrant for TV receiver'
    );
  });

  it('should be able submit dates to avoid', async () => {
    await navigate(caseOverviewPage.getUrl(), TVL_USER);
    await element(by.linkText('Add dates to avoid')).click();

    await datesToAvoidPage.datesToAvoidInputTextArea.sendKeys('hello from protractor test');
    await datesToAvoidPage.datesToAvoidSubmit.click();
    await datesToAvoidPage.datesToAvoidContinue.click();

    await navigate(caseOverviewPage.getUrl(), TVL_USER);
    await element(by.linkText('Change dates to avoid')).click();
    await expect(datesToAvoidPage.datesToAvoidInputTextArea.getAttribute('value')).toContain(
      'hello from protractor test'
    );
  });

  it('should be able to fold and unfold offence text', async () => {
    await navigate(caseOverviewPage.getUrl(), TVL_USER);

    // default behavior is folded
    await expect(caseOverviewPage.isFirstOffenceTextFolded()).toBe(true);

    // unfold text
    await caseOverviewPage.toggleFirstOffenceFoldableTextState();
    await expect(caseOverviewPage.isFirstOffenceTextUnfolded()).toBe(true);

    // fold text again
    await caseOverviewPage.toggleFirstOffenceFoldableTextState();
    await expect(caseOverviewPage.isFirstOffenceTextFolded()).toBe(true);
  });
});

describe('prosecutor', () => {
  let page;
  let kase;

  beforeAll(async () => {
    kase = await createTvlCaseWithDoc();
    page = new CaseOverviewPage('tvl', kase.id);
  });

  it('should be able to access the case details with multiple offences', async () => {
    await navigate(page.getUrl(), TVL_USER);

    await expect(page.pageHeaderBar.getText()).toContain(kase.urn);
    await expect(page.caseStatus.getText()).toContain('No plea received - ready for decision');
    await expect(page.caseProsecutor.getText()).toContain('TV Licensing');

    await page.goToTab('Documents');
    await expect(page.downloadDocumentLink.getText()).toContain('SJP notice');

    await expect(page.offenceHeadings.get(0).getText()).toContain('Offence 1');
    await expect(page.offenceHeadings.get(1).getText()).toContain('Offence 2');

    await expect(page.offenceTitles.get(0).getText()).toContain(
      'Obstruct person executing search warrant for TV receiver'
    );
    await expect(page.offenceTitles.get(1).getText()).toContain(
      'TV set with intent another use install without a licence'
    );
  });
});
