import { ManualCaseNavigationService } from '../manual-case-nav.service';
import { TestBed } from '@angular/core/testing';
import { ManualCasePath } from '../manual-case.interface';

describe('Manual Case NavigationParam Service', () => {
  let caseNavService: ManualCaseNavigationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManualCaseNavigationService]
    });

    caseNavService = TestBed.inject(ManualCaseNavigationService);
  });

  afterEach(() => {
    caseNavService = undefined;
  });

  describe('#getSummaryNavigationPath', () => {
    it('should return edit prosecutor path', () => {
      const navigationPath = caseNavService.getSummaryNavigationPath(ManualCasePath.EditProsecutor);
      expect(navigationPath).toEqual(['manual-case', 'edit-prosecutor']);
    });

    it('should return edit defendant path', () => {
      const navigationPath = caseNavService.getSummaryNavigationPath(ManualCasePath.EditDefendant);
      expect(navigationPath).toEqual(['manual-case', 'edit-defendant']);
    });

    it('should return edit offence path', () => {
      const navigationPath = caseNavService.getSummaryNavigationPath(ManualCasePath.EditOffence);
      expect(navigationPath).toEqual(['manual-case', 'edit-offence']);
    });

    it('should return edit case type path', () => {
      const navigationPath = caseNavService.getSummaryNavigationPath(ManualCasePath.EditCaseType);
      expect(navigationPath).toEqual(['manual-case', 'edit-type']);
    });
  });

  describe('#getNavigationPath', () => {
    it('should return the new prosecutor path', () => {
      const navigationPath = caseNavService.getNavgationPath(ManualCasePath.NewCaseType);
      expect(navigationPath).toEqual(['manual-case', 'prosecutor']);
    });

    it('should return the new defendant path', () => {
      const navigationPath = caseNavService.getNavgationPath(ManualCasePath.NewHearing);
      expect(navigationPath).toEqual(['manual-case', 'defendant']);
    });

    it('should return the new offence path', () => {
      const navigationPath = caseNavService.getNavgationPath(ManualCasePath.NewDefendant);
      expect(navigationPath).toEqual(['manual-case', 'offence']);
    });

    it('should return the either way offence page', () => {
      const navigationPath = caseNavService.getNavgationPath(ManualCasePath.NewOffence, 'CO', true);
      expect(navigationPath).toEqual(['manual-case', 'either-way-offence']);
    });

    it('should return the summary page', () => {
      const navigationPath = caseNavService.getNavgationPath(ManualCasePath.EitherWayOffence);
      expect(navigationPath).toEqual(['manual-case', 'summary']);
    });

    it('should return the success page', () => {
      const navigationPath = caseNavService.getNavgationPath(ManualCasePath.CaseSummary);
      expect(navigationPath).toEqual(['manual-case', 'case-created']);
    });

    it('should go to the summary page after editing', () => {
      let navigationPath = caseNavService.getNavgationPath(ManualCasePath.EditCaseType);
      expect(navigationPath).toEqual(['manual-case', 'summary']);
      navigationPath = caseNavService.getNavgationPath(ManualCasePath.EditProsecutor);
      expect(navigationPath).toEqual(['manual-case', 'summary']);
      navigationPath = caseNavService.getNavgationPath(ManualCasePath.EditDefendant);
      expect(navigationPath).toEqual(['manual-case', 'summary']);
      navigationPath = caseNavService.getNavgationPath(ManualCasePath.EditHearing);
      expect(navigationPath).toEqual(['manual-case', 'summary']);
      navigationPath = caseNavService.getNavgationPath(ManualCasePath.EditEitherWayOffence);
      expect(navigationPath).toEqual(['manual-case', 'summary']);
      navigationPath = caseNavService.getNavgationPath(ManualCasePath.EditOffence);
      expect(navigationPath).toEqual(['manual-case', 'summary']);
    });

    it('should go to the edit either way offence page after editing offence', () => {
      const navigationPath = caseNavService.getNavgationPath(ManualCasePath.EditOffence, 'T', true);
      expect(navigationPath).toEqual(['manual-case', 'edit-either-way-offence']);
    });
  });

  describe('#getManualCasePageView', () => {
    it('should return the case type page', () => {
      const currentView = caseNavService.getManualCasePageView(ManualCasePath.NewCaseType);
      expect(currentView.isCaseTypePage).toBe(true);
    });

    it('should return the prosecutor page', () => {
      const currentView = caseNavService.getManualCasePageView(ManualCasePath.NewProsecutor);
      expect(currentView.isProsecutorPage).toBe(true);
    });

    it('should return the new hearing page', () => {
      const currentView = caseNavService.getManualCasePageView(ManualCasePath.NewHearing);
      expect(currentView.isHearingPage).toBe(true);
    });

    it('should return the defendant page', () => {
      const currentView = caseNavService.getManualCasePageView(ManualCasePath.NewDefendant);
      expect(currentView.isDefendantPage).toBe(true);
    });

    it('should return the offence page', () => {
      const currentView = caseNavService.getManualCasePageView(ManualCasePath.NewOffence);
      expect(currentView.isOffencePage).toBe(true);
    });

    it('should return the case summary page', () => {
      const currentView = caseNavService.getManualCasePageView(ManualCasePath.CaseSummary);
      expect(currentView.isCaseSummary).toBe(true);
    });

    it('should return the case created page', () => {
      const currentView = caseNavService.getManualCasePageView(ManualCasePath.CaseCreated);
      expect(currentView.isCaseCreated).toBe(true);
    });
  });
});
