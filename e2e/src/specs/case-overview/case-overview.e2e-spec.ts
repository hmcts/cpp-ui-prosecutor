import { createBasicTvlCase } from '../../../../tools/factory';
import { PROSECUTOR_USER } from '../../../../tools/utils';
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
    await navigate(page.getUrl(), PROSECUTOR_USER);

    await expect(page.pageHeaderBar.getText()).toContain(kase.urn);
    await expect(page.caseStatus.getText()).toContain('No plea received - ready for decision');
    await expect(page.caseProsecutor.getText()).toContain('TV Licensing');

    await page.goToTab('DefendantDetails details');

    const defendantName = 'PROTRACTOR-' + kase.urn.replace('TVL', '') + ' John Adam Theodore';

    await expect(page.defendantName.getText()).toContain(defendantName);
    await expect(page.defendantDob.getText()).toContain('4 Feb 1980');
    await expect(page.defendantEmail.getText()).toContain('john@email.com');

    await expect(page.offenceHeadings.getText()).toContain('Offence');
  });
});
