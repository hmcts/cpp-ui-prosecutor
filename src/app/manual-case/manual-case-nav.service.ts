import { ManualCasePath } from './manual-case.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ManualCaseNavigationService {
  prevRouteParams;

  private workFlow = [
    { path: ManualCasePath.NewCaseType, valid: false },
    { path: ManualCasePath.NewCaseDetail, valid: false },
    { path: ManualCasePath.NewProsecutor, valid: false },
    { path: ManualCasePath.NewHearing, valid: false },
    { path: ManualCasePath.NewDefendant, valid: false },
    { path: ManualCasePath.NewOffence, valid: false }
  ];

  updatePrevRouteParams(prevRouteParams) {
    this.prevRouteParams = prevRouteParams;
  }

  validateStep(path: ManualCasePath): void {
    const position = this.workFlow.findIndex(pathObj => pathObj.path === path);
    if (position >= 0) {
      this.workFlow[position].valid = true;
    }
  }

  getInvalidStep(path: ManualCasePath): string {
    let found = false;
    let valid = true;
    let redirectToStep = '';

    for (let i = 0; i < this.workFlow.length && !found && valid; i++) {
      const item = this.workFlow[i];

      if (item.path === path) {
        found = true;
        redirectToStep = '';
      } else {
        valid = item.valid;
        redirectToStep = item.path;
      }
    }
    return redirectToStep;
  }

  // tslint:disable-next-line: cognitive-complexity
  getManualCasePageView(path: string) {
    const currentView = {
      isCaseTypePage: false,
      isProsecutorPage: false,
      isCaseDetailPage: false,
      isHearingPage: false,
      isDefendantPage: false,
      isOffencePage: false,
      isEitherWayOffencePage: false,
      isCaseSummary: false,
      isCaseCreated: false,
      isDuplicatedProsecutor: false
    };

    if (path === ManualCasePath.NewCaseType || path === ManualCasePath.EditCaseType) {
      currentView.isCaseTypePage = true;
    }

    if (path === ManualCasePath.NewCaseDetail || path === ManualCasePath.EditCaseDetail) {
      currentView.isCaseDetailPage = true;
    }

    if (path === ManualCasePath.NewProsecutor || path === ManualCasePath.EditProsecutor) {
      currentView.isProsecutorPage = true;
    }

    if (path === ManualCasePath.NewHearing || path === ManualCasePath.EditHearing) {
      currentView.isHearingPage = true;
    }

    if (path === ManualCasePath.NewDefendant || path === ManualCasePath.EditDefendant) {
      currentView.isDefendantPage = true;
    }

    if (path === ManualCasePath.NewOffence || path === ManualCasePath.EditOffence) {
      currentView.isOffencePage = true;
    }

    if (path === ManualCasePath.EitherWayOffence || path === ManualCasePath.EditEitherWayOffence) {
      currentView.isEitherWayOffencePage = true;
    }

    if (path === ManualCasePath.CaseSummary) {
      currentView.isCaseSummary = true;
    }

    if (path === ManualCasePath.CaseCreated) {
      currentView.isCaseCreated = true;
    }

    if (path === ManualCasePath.DuplicatedProsecutor) {
      currentView.isDuplicatedProsecutor = true;
    }

    return currentView;
  }

  // tslint:disable-next-line: cognitive-complexity
  getNavgationPath(path: string, initiationCode: string = '', isEitherWayOffence = false) {
    switch (path) {
      case ManualCasePath.EditCaseType:
      case ManualCasePath.EditCaseDetail:
      case ManualCasePath.EditProsecutor:
      case ManualCasePath.EditHearing:
      case ManualCasePath.EditDefendant:
      case ManualCasePath.EditEitherWayOffence:
        return ['manual-case', 'summary'];

      case ManualCasePath.NewCaseDetail:
        this.validateStep(ManualCasePath.NewCaseDetail);
        return ['manual-case', 'prosecutor'];

      case ManualCasePath.NewProsecutor:
        this.validateStep(ManualCasePath.NewProsecutor);
        return ['manual-case', 'hearing'];

      case ManualCasePath.NewHearing:
        this.validateStep(ManualCasePath.NewHearing);
        return ['manual-case', 'defendant'];

      case ManualCasePath.EitherWayOffence:
        this.validateStep(ManualCasePath.NewOffence);
        return ['manual-case', 'summary'];

      case ManualCasePath.CaseSummary:
        return ['manual-case', 'case-created'];

      default:
        break;
    }

    if (path === ManualCasePath.EditOffence) {
      this.validateStep(ManualCasePath.NewOffence);

      if ((initiationCode === 'CO' || initiationCode === 'T') && isEitherWayOffence) {
        return ['manual-case', 'edit-either-way-offence'];
      } else {
        return ['manual-case', 'summary'];
      }
    }

    if (path === ManualCasePath.NewOffence) {
      this.validateStep(ManualCasePath.NewOffence);

      if ((initiationCode === 'CO' || initiationCode === 'T') && isEitherWayOffence) {
        return ['manual-case', 'either-way-offence'];
      } else {
        return ['manual-case', 'summary'];
      }
    }

    if (path === ManualCasePath.NewCaseType) {
      this.validateStep(ManualCasePath.NewCaseType);

      if (initiationCode === 'T' || initiationCode === 'CO') {
        return ['manual-case', 'case-detail'];
      } else {
        return ['manual-case', 'prosecutor'];
      }
    }

    if (path === ManualCasePath.NewDefendant) {
      this.validateStep(ManualCasePath.NewDefendant);
      if (this.prevRouteParams === ManualCasePath.CaseSummary) {
        return ['manual-case', 'summary'];
      } else {
        return ['manual-case', 'offence'];
      }
    }
  }

  getSummaryNavigationPath(path: string) {
    if (path === ManualCasePath.EditCaseType) {
      return ['manual-case', 'edit-type'];
    }

    if (path === ManualCasePath.EditCaseDetail) {
      return ['manual-case', 'edit-case-detail'];
    }

    if (path === ManualCasePath.EditProsecutor) {
      return ['manual-case', 'edit-prosecutor'];
    }

    if (path === ManualCasePath.NewDefendant) {
      return ['manual-case', 'defendant'];
    }

    if (path === ManualCasePath.NewOffence) {
      return ['manual-case', 'offence'];
    }

    if (path === ManualCasePath.EditDefendant) {
      return ['manual-case', 'edit-defendant'];
    }

    if (path === ManualCasePath.EditHearing) {
      return ['manual-case', 'edit-hearing'];
    }

    if (path === ManualCasePath.EditOffence) {
      return ['manual-case', 'edit-offence'];
    }
  }
}
