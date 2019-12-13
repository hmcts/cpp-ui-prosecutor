import { navigate } from '../util';
import { TVL_USER } from '../../../tools/utils';
import { ReviewNotGuiltyPleaCasesPage } from '../pages/review-not-guilty-pleas/review-not-guilty-plea-cases.page';
import { createTvlPleadNotGuiltyCase } from '../../../tools/factory';
import { DashboardPage } from '../pages';
import { getPleadedNotGuiltyCases } from '../../../tools/contexts/sjp';

describe('Prosecutor', () => {
  describe('Review not guilty pleas', () => {
    let pendingDatesToAvoidCasesBeforeTest;
    const reviewNotGuiltyPleaCasesPage = new ReviewNotGuiltyPleaCasesPage('tvl');
    const dashboardPage = new DashboardPage();
    let pleadedNotGuiltyCase;

    beforeAll(async () => {
      // get the count before the test run
      const pleadedNotGuiltyCasesBefore = await getPleadedNotGuiltyCases();
      pendingDatesToAvoidCasesBeforeTest = pleadedNotGuiltyCasesBefore.count;

      pleadedNotGuiltyCase = await createTvlPleadNotGuiltyCase();
    });

    it('should be able to view cases with not guilty pleas', async () => {
      const expectedCasesPendingDatesToAvoid = pendingDatesToAvoidCasesBeforeTest + 1;
      await navigate(dashboardPage.getUrl(), TVL_USER);

      // assert on the link text to match the count
      expect(await dashboardPage.reviewNotGuiltyPleasLink.getText()).toContain(
        'Review not guilty pleas (' +
          expectedCasesPendingDatesToAvoid +
          (expectedCasesPendingDatesToAvoid > 1 ? ' cases' : ' case') +
          ')'
      );

      // click on the link
      const reviewNotGuiltyPleasElementFinder = reviewNotGuiltyPleaCasesPage.getLinkElementWithTheMatchingText(
        'Review not guilty pleas'
      );
      await reviewNotGuiltyPleasElementFinder.click();

      // assert the heading on the page
      expect(await reviewNotGuiltyPleaCasesPage.subHeading.getText()).toContain(
        'Review not guilty pleas (' +
          expectedCasesPendingDatesToAvoid +
          (expectedCasesPendingDatesToAvoid > 1 ? ' cases' : ' case') +
          ')'
      );

      // get the LAST case on the pending cases table
      const casePendingDatesToAvoid = reviewNotGuiltyPleaCasesPage.getNthCasePendingDatesToAvoid(
        expectedCasesPendingDatesToAvoid
      );

      // expect the data rendered is same as the case which we just created
      expect(await casePendingDatesToAvoid.name).toContain(
        pleadedNotGuiltyCase.defendant.personalDetails.firstName +
          ' ' +
          pleadedNotGuiltyCase.defendant.personalDetails.lastName.toUpperCase()
      );
      expect(await casePendingDatesToAvoid.address).toContain('SW99 1AA');
      expect(await casePendingDatesToAvoid.referenceNumber).toContain(pleadedNotGuiltyCase.urn);
      expect(await casePendingDatesToAvoid.dateOfBirth).toContain('04 Feb 1980');

      const isClickable = reviewNotGuiltyPleaCasesPage.isPleaLinkClickable(pleadedNotGuiltyCase.caseId);
      expect(await isClickable).toBeTruthy();
    });
  });
});
