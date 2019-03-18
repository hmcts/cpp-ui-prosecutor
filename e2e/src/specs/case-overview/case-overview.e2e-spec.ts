import { createBasicTvlCase, createTvlCaseWithDoc } from '../../../../tools/factory';
import { TVL_USER } from '../../../../tools/utils';
import { navigate } from '../../util';
import { CaseOverviewPage } from '../../pages';

describe('prosecutor', () => {
  let page;
  let kase;

  beforeAll(async () => {
    kase = await createBasicTvlCase();
    page = new CaseOverviewPage(kase.id);
  });

  it('should be able to access the case details with single offence', async () => {
    await navigate(page.getUrl(), TVL_USER);

    await expect(page.pageHeaderBar.getText()).toContain(kase.urn);
    await expect(page.caseStatus.getText()).toContain('No plea received - ready for decision');
    await expect(page.caseProsecutor.getText()).toContain('TV Licensing');

    await page.goToTab('Defendant details');

    const defendantName = 'PROTRACTOR-' + kase.urn.replace('TVL', '') + ' John Adam Theodore';

    await expect(page.defendantName.getText()).toContain(defendantName);
    await expect(page.defendantDob.getText()).toContain('4 Feb 1980');
    await expect(page.defendantEmail.getText()).toContain('john@email.com');

    await expect(page.offenceHeadings.get(0).getText()).toContain('Offence');
    await expect(page.offenceTitles.get(0).getText()).toContain(
      'Obstruct person executing search warrant for TV receiver'
    );
  });
});

describe('prosecutor', () => {
  let page;
  let kase;

  beforeAll(async () => {
    kase = await createTvlCaseWithDoc();
    page = new CaseOverviewPage(kase.id);
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
