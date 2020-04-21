import { TVL_USER } from '../../../../tools/utils';
import { navigate } from '../../util';
import { CaseOverviewPage } from '../../pages';
import { PoliceCaseDataBuilder } from '../../../../tools/helpers/police-case-data-builder';
import { createPoliceCase } from '../../../../tools/factory/police-build-case';
import { Case } from '../../../../src/app/contexts/sjp';

describe('Police', () => {
  describe('Case overview', () => {
    let caseOverviewPage: CaseOverviewPage;
    let kase: Case;

    beforeAll(async () => {
      kase = await createPoliceCase(PoliceCaseDataBuilder.createCaseDataForMultipleOffences(2));
      caseOverviewPage = new CaseOverviewPage('user', kase.id);
    });

    it('should be able to view case details for a single offence case', async () => {
      await navigate(caseOverviewPage.getUrl(), TVL_USER);
      expect(await caseOverviewPage.pageHeaderBar.getText()).toContain(kase.urn);

      expect(await caseOverviewPage.pageHeaderBar.getText()).toContain(kase.urn);
      expect(await caseOverviewPage.caseStatus.getText()).toContain('No plea received - ready for decision');
      expect(await caseOverviewPage.caseProsecutor.getText()).toContain('Warwickshire Police');

      expect(await caseOverviewPage.offenceHeadings.get(0).getText()).toContain('Offence 1');
      expect(await caseOverviewPage.offenceHeadings.get(1).getText()).toContain('Offence 2');

      expect(await caseOverviewPage.offenceTitles.get(0).getText()).toContain(
        'Drive motor vehicle fail comply with red / green arrow / lane closure traffic light signals - manual detection'
      );
      expect(await caseOverviewPage.offenceTitles.get(1).getText()).toContain(
        'Drive motor vehicle fail comply with red / green arrow / lane closure traffic light signals - manual detection'
      );
    });
  });
});
