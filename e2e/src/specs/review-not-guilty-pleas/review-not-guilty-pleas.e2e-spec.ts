import { navigate } from '../../util';
import { TVL_USER } from '../../../../tools/utils';
import { ReviewNotGuiltyPleaCasesPage } from '../../pages/review-not-guilty-pleas/review-not-guilty-plea-cases.page';
import { createTvlPleadNotGuiltyCase } from '../../../../tools/factory';
import { DashboardPage } from '../../pages';
import { getPleadedNotGuiltyCases } from '../../../../tools/contexts/sjp';

describe('review not guilty pleas', () => {
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

  it('should go to review not guilty page when clicked on the review not guilty pleas link on the prosecutor dashboard page', async () => {
    const expectedCasesPendingDatesToAvoid = pendingDatesToAvoidCasesBeforeTest + 1;
    await navigate(dashboardPage.getUrl(), TVL_USER);

    // assert on the link text to match the count
    await expect(dashboardPage.reviewNotGuiltyPleasLink.getText()).toContain(
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
    await expect(reviewNotGuiltyPleaCasesPage.subHeading.getText()).toContain(
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
    await expect(casePendingDatesToAvoid.name).toContain(
      pleadedNotGuiltyCase.defendant.personalDetails.firstName +
        ' ' +
        pleadedNotGuiltyCase.defendant.personalDetails.lastName.toUpperCase()
    );
    await expect(casePendingDatesToAvoid.address).toContain('SW99 1AA');
    await expect(casePendingDatesToAvoid.referenceNumber).toContain(pleadedNotGuiltyCase.urn);
    await expect(casePendingDatesToAvoid.dateOfBirth).toContain('04 Feb 1980');

    const isClickable = reviewNotGuiltyPleaCasesPage.isPleaLinkClickable(pleadedNotGuiltyCase.caseId);
    await expect(isClickable).toBeTruthy();
  });
});
