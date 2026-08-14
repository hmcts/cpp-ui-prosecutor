import { CaseOverviewState } from './case-overview.reducer';
import { State } from '../reducers';
import { createSelector } from '@ngrx/store';
import { getCaseDecisions, getOffences } from '../core/selectors';

export interface FeatureState extends State {
  caseOverview: CaseOverviewState;
}

export const getWithdrawOffenceStatus = (state: FeatureState) => state.caseOverview.withdrawOffencesSuccess;

export const getWithdrawOffenceFailed = (state: FeatureState) => state.caseOverview.withdrawOffencesFailed;

export const getDatesToAvoidStatus = (state: FeatureState) => state.caseOverview.datesToAvoidSuccess;

export const getDatesToAvoidFailed = (state: FeatureState) => state.caseOverview.datesToAvoidFailed;

export const getCaseDecisionsWithOffenceDecisions = createSelector(
  getCaseDecisions,
  getOffences,
  (caseDecisions, offences) => {
    caseDecisions.sort((a, b) => (new Date(a.savedAt) > new Date(b.savedAt) ? -1 : 1));
    caseDecisions.forEach(caseDecision => {
      caseDecision.offenceDecisions.forEach(offenceDecision => {
        offences
          .filter(offence => offence.id === offenceDecision.offenceId)
          .map(offence => {
            Object.assign(offenceDecision, {
              offenceTitle: offence.title,
              offenceSequenceNumber: offence.offenceSequenceNumber
            });
          });
      });
      caseDecision.offenceDecisions.sort((a, b) => (a.offenceSequenceNumber < b.offenceSequenceNumber ? -1 : 1));
    });

    return caseDecisions ? caseDecisions : [];
  }
);

export const getOnlinePlea = (state: FeatureState) => state.caseOverview.onlinePlea;

export const getCaseNotes = createSelector(
  (state: State) => state.caseNotes,
  caseNotes => {
    caseNotes.notes.sort((a, b) => (new Date(a.addedAt) > new Date(b.addedAt) ? -1 : 1));
    return caseNotes;
  }
);
