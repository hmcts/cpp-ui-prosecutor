import { createBasicTvlCase, createTvlCaseWithDoc } from '../../../../tools/factory';
import { TVL_USER } from '../../../../tools/utils';
import { navigate } from '../../util';
import { CaseOverviewPage } from '../../pages';
import { by, element } from 'protractor';
import { DatesToAvoidPage } from '../../pages/case-overview/dates-to-avoid.page';

describe('TVL', () => {
  describe('Case overview', () => {
    let caseOverviewPage: CaseOverviewPage;
    let kase;
    let datesToAvoidPage;
    let multiOffenceOverviewPage;
    let multiOffenceCase;

    beforeAll(async () => {
      kase = await createBasicTvlCase();
      caseOverviewPage = new CaseOverviewPage('tvl', kase.id);
      datesToAvoidPage = new DatesToAvoidPage('tvl', kase.id);

      multiOffenceCase = await createTvlCaseWithDoc();
      multiOffenceOverviewPage = new CaseOverviewPage('tvl', multiOffenceCase.id);
    });

    it('should be able to view case details for a single offence case', async () => {
      await navigate(caseOverviewPage.getUrl(), TVL_USER);

      expect(await caseOverviewPage.pageHeaderBar.getText()).toContain(kase.urn);
      expect(await caseOverviewPage.caseStatus.getText()).toContain('No plea received - ready for decision');
      expect(await caseOverviewPage.caseProsecutor.getText()).toContain('TV Licensing');

      await caseOverviewPage.goToTab('Defendant details');

      const defendantName = 'John Adam Theodore PROTRACTOR-' + kase.urn.replace('TVL', '');

      expect(await caseOverviewPage.defendantName.getText()).toContain(defendantName);
      expect(await caseOverviewPage.defendantDob.getText()).toContain('4 Feb 1980');
      expect(await caseOverviewPage.defendantEmail.getText()).toContain('john@email.com');

      expect(await caseOverviewPage.offenceHeadings.get(0).getText()).toContain('Offence');
    });

    it('should be able submit court dates to avoid', async () => {
      await navigate(caseOverviewPage.getUrl(), TVL_USER);
      await element(by.linkText('Add dates to avoid')).click();

      await datesToAvoidPage.datesToAvoidInputTextArea.sendKeys('hello from protractor test');
      await datesToAvoidPage.datesToAvoidSubmit.click();
      await datesToAvoidPage.datesToAvoidContinue.click();

      await navigate(caseOverviewPage.getUrl(), TVL_USER);
      await element(by.linkText('Change dates to avoid')).click();
      expect(await datesToAvoidPage.datesToAvoidInputTextArea.getAttribute('value')).toContain(
        'hello from protractor test'
      );
    });

    it('should be able to fold and unfold offence text', async () => {
      await navigate(caseOverviewPage.getUrl(), TVL_USER);

      // default behavior is folded
      expect(await caseOverviewPage.isFirstOffenceTextFolded()).toBe(true);

      // unfold text
      await caseOverviewPage.toggleFirstOffenceFoldableTextState();
      expect(await caseOverviewPage.isFirstOffenceTextUnfolded()).toBe(true);

      // fold text again
      await caseOverviewPage.toggleFirstOffenceFoldableTextState();
      expect(await caseOverviewPage.isFirstOffenceTextFolded()).toBe(true);
    });

    it('should be able to view case details for a multi-offence case', async () => {
      await navigate(multiOffenceOverviewPage.getUrl(), TVL_USER);

      expect(await multiOffenceOverviewPage.pageHeaderBar.getText()).toContain(multiOffenceCase.urn);
      expect(await multiOffenceOverviewPage.caseStatus.getText()).toContain('No plea received - ready for decision');
      expect(await multiOffenceOverviewPage.caseProsecutor.getText()).toContain('TV Licensing');

      await multiOffenceOverviewPage.goToTab('Documents');
      expect(await multiOffenceOverviewPage.downloadDocumentLink.getText()).toContain('SJP notice');

      expect(await multiOffenceOverviewPage.offenceHeadings.get(0).getText()).toContain('Offence 1');
      expect(await multiOffenceOverviewPage.offenceHeadings.get(1).getText()).toContain('Offence 2');
    });
  });
});
