import { createBasicTvlCase } from '../../../tools/factory';
import { TVL_USER } from '../../../tools/utils';
import { navigate } from '../util';
import { DashboardPage, SearchResultPage } from '../pages';

describe('Prosecutor', () => {
  describe('Search', () => {
    let urn: string;
    const page = new DashboardPage();
    const searchResultPage = new SearchResultPage('tvl');

    beforeAll(async () => {
      const kase = await createBasicTvlCase();
      urn = kase.urn;
    });

    it('should be able to search for a case', async () => {
      await navigate(page.getUrl(), TVL_USER);
      expect(await page.subHeading.getText()).toContain('Prosecutor');

      await page.searchForUrn(urn);

      expect(await searchResultPage.searchResult.getText()).toContain('1 result available');
      expect(await searchResultPage.caseUrn.getText()).toContain(urn);
    });
  });
});
