import { createBasicTvlCase } from '../../../../tools/factory';
import { TVL_USER } from '../../../../tools/utils';
import { navigate } from '../../util';
import { DashboardPage, SearchResultPage } from '../../pages';

describe('prosecutor', () => {
  let urn: string;
  const page = new DashboardPage();
  const searchResultPage = new SearchResultPage('tvl');

  beforeAll(async () => {
    const kase = await createBasicTvlCase();
    urn = kase.urn;
  });

  it('should be able to search a case', async () => {
    await navigate(page.getUrl(), TVL_USER);
    await expect(page.subHeading.getText()).toContain('Prosecutor');

    await page.searchForUrn(urn);

    await expect(searchResultPage.searchResult.getText()).toContain('1 result available');
    await expect(searchResultPage.caseUrn.getText()).toContain(urn);
  });
});
