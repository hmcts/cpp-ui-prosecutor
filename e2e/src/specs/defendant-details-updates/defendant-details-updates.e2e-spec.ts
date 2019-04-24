import { navigate } from '../../util';
import { TVL_USER } from '../../../../tools/utils';
import { DashboardPage } from '../../pages';
import { DefendantDetailsUpdatesPage } from '../../pages/defendant-details-updates/defendant-details-updates.page';
import { createTvlDefendantDetailsUpdatesCase } from '../../../../tools/factory/tvl-case-defendant-details-updates';
import { getDefendantDetailsUpdates } from '../../../../tools/contexts/sjp';
import { info } from '@cpp/ui.priming';
import moment = require('moment');

describe('defendant details updates', () => {
  const defendantDetailsUpdatesPage = new DefendantDetailsUpdatesPage('tvl');
  const dashboardPage = new DashboardPage();
  const defendantDetailsUpdatesPageTitle = 'Defendant details updates';
  const dashboardPageTitle = 'Prosecutor';
  const maximumUpdatesDisplayed = 50;

  let caseWithDefendantDetailsUpdates;
  let beforeDefendantDetailsUpdatesCount: number;

  beforeAll(async () => {
    const defendantDetailsUpdatesBefore = await getDefendantDetailsUpdates(TVL_USER, 0);
    beforeDefendantDetailsUpdatesCount = defendantDetailsUpdatesBefore.total;
    caseWithDefendantDetailsUpdates = await createTvlDefendantDetailsUpdatesCase();
  });

  describe('page navigation', () => {
    it('should navigate to the defendant details updates page', async () => {
      await navigate(dashboardPage.getUrl(), TVL_USER);
      await dashboardPage.clickDefendantDetailsUpdatesLink();
      await expect(defendantDetailsUpdatesPage.pageTitle()).toContain(defendantDetailsUpdatesPageTitle);
    });

    it('should navigate home using the breadcrumb', async () => {
      await navigate(defendantDetailsUpdatesPage.getUrl(), TVL_USER);
      await defendantDetailsUpdatesPage.navigateToDashboardPageUsingBreadcrumb();
      await expect(defendantDetailsUpdatesPage.pageTitle()).toContain(dashboardPageTitle);
    });

    it('should navigate home using the back button', async () => {
      await navigate(defendantDetailsUpdatesPage.getUrl(), TVL_USER);
      await defendantDetailsUpdatesPage.navigateToDashboardUsingBackButton();
      await expect(defendantDetailsUpdatesPage.pageTitle()).toContain(dashboardPageTitle);
    });
  });

  describe('page content', () => {
    beforeAll(async () => {
      await navigate(defendantDetailsUpdatesPage.getUrl(), TVL_USER);
    });

    it('should display number of cases with updates', async () => {
      await expect(defendantDetailsUpdatesPage.updatesCount()).toContain(beforeDefendantDetailsUpdatesCount + 1);
    });

    it('should display updates details', async () => {
      if (beforeDefendantDetailsUpdatesCount <= maximumUpdatesDisplayed) {
        const defendantDetailsUpdatesRow = defendantDetailsUpdatesPage.getDefendantDetailsUpdatesTableRow(
          beforeDefendantDetailsUpdatesCount + 1
        );
        const defendantPersonalDetails = caseWithDefendantDetailsUpdates.defendant.personalDetails;

        await expect(defendantDetailsUpdatesRow.urn).toBe(caseWithDefendantDetailsUpdates.urn);
        await expect(defendantDetailsUpdatesRow.defendantName).toBe(
          defendantPersonalDetails.firstName + ' ' + defendantPersonalDetails.lastName.toUpperCase()
        );
        await expect(defendantDetailsUpdatesRow.dateOfBirth).toBe(
          moment(defendantPersonalDetails.dateOfBirth).format('DD MMM YYYY')
        );
        await expect(defendantDetailsUpdatesRow.dateOfBirthUpdated).toBeTruthy();
        await expect(defendantDetailsUpdatesRow.addressUpdated).toBeFalsy();
        await expect(defendantDetailsUpdatesRow.nameUpdated).toBeFalsy();
      } else {
        info('Too many updates - Skipping test');
      }
    });
  });

  describe('page interaction', () => {
    beforeAll(async () => {
      await navigate(defendantDetailsUpdatesPage.getUrl(), TVL_USER);
    });

    it('should remove updates', async () => {
      await defendantDetailsUpdatesPage.clickRemoveFirstUpdate();
      await expect(defendantDetailsUpdatesPage.updatesCount()).toContain(beforeDefendantDetailsUpdatesCount);
    });
  });
});
