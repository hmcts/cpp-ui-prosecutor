import { navigate } from '../util';
import { TVL_USER } from '../../../tools/utils';
import { DefendantDetailsUpdatesPage } from '../pages/defendant-details-updates/defendant-details-updates.page';
import { createTvlDefendantDetailsUpdatesCase } from '../../../tools/factory/tvl-case-defendant-details-updates';
import { getDefendantDetailsUpdates } from '../../../tools/contexts/sjp';
import { info } from '@cpp/ui.priming';
import moment = require('moment');

describe('Prosecutor', () => {
  describe('Update defendant details', () => {
    const defendantDetailsUpdatesPage = new DefendantDetailsUpdatesPage('tvl');
    const maximumUpdatesDisplayed = 50;

    let caseWithDefendantDetailsUpdates;
    let beforeDefendantDetailsUpdatesCount: number;

    beforeAll(async () => {
      const defendantDetailsUpdatesBefore = await getDefendantDetailsUpdates(TVL_USER, 0);
      beforeDefendantDetailsUpdatesCount = defendantDetailsUpdatesBefore.total;
      caseWithDefendantDetailsUpdates = await createTvlDefendantDetailsUpdatesCase();

      await navigate(defendantDetailsUpdatesPage.getUrl(), TVL_USER);
    });

    it('should show number of cases with updated details', async () => {
      expect(await defendantDetailsUpdatesPage.updatesCount()).toContain(
        String(beforeDefendantDetailsUpdatesCount + 1)
      );
    });

    it('should be able to view details of updates', async () => {
      if (beforeDefendantDetailsUpdatesCount <= maximumUpdatesDisplayed) {
        const defendantDetailsUpdatesRow = defendantDetailsUpdatesPage.getDefendantDetailsUpdatesTableRow(
          beforeDefendantDetailsUpdatesCount + 1
        );
        const defendantPersonalDetails = caseWithDefendantDetailsUpdates.defendant.personalDetails;

        expect(await defendantDetailsUpdatesRow.urn).toBe(caseWithDefendantDetailsUpdates.urn);
        expect(await defendantDetailsUpdatesRow.defendantName).toBe(
          defendantPersonalDetails.firstName + ' ' + defendantPersonalDetails.lastName.toUpperCase()
        );
        expect(await defendantDetailsUpdatesRow.dateOfBirth).toBe(
          moment(defendantPersonalDetails.dateOfBirth).format('DD MMM YYYY')
        );
        expect(await defendantDetailsUpdatesRow.dateOfBirthUpdated).toBeTruthy();
        expect(await defendantDetailsUpdatesRow.addressUpdated).toBeFalsy();
        expect(await defendantDetailsUpdatesRow.nameUpdated).toBeFalsy();
      } else {
        info('Too many updates - Skipping test');
      }
    });

    it('should reduce update count once viewed', async () => {
      await defendantDetailsUpdatesPage.clickRemoveFirstUpdate();
      expect(await defendantDetailsUpdatesPage.updatesCount()).toContain(String(beforeDefendantDetailsUpdatesCount));
    });
  });
});
