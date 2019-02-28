import { createBasicTvlCase } from '../../../tools/factory';
import { TVL_USER } from '../../../tools/utils';
import { navigate } from '../util';
import { DashboardPage, SearchResultPage } from '../pages';

describe('allows prosecutor', () => {
  let urn: string;
  const page = new DashboardPage();
  const searchResultPage = new SearchResultPage();

  beforeAll(async () => {
    const kase = await createBasicTvlCase();
    urn = kase.urn;
  });

  it('to search for cases', async () => {
    await navigate(page.getUrl(), TVL_USER);
    await expect(page.subHeading.getText()).toContain('Prosecutor');

    await page.searchForUrn(urn);

    // todo need to pluralise the search result text
    await expect(searchResultPage.searchResult.getText()).toContain('1 results available');
    await expect(searchResultPage.caseUrn.getText()).toContain(urn);
  });
});
