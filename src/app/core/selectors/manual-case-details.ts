import { State } from '../reducers';
import { createSelector } from '@ngrx/store';

export const getManualCase = (state: State) => state.manualCaseDetails;
export const getManualCaseDetails = (state: State) => state.manualCaseDetails.caseDetails;
export const getManualCaseDefendants = (state: State) => state.manualCaseDetails.defendants;

export const getManualCaseType = createSelector(getManualCaseDetails, caseDetail => caseDetail.initiationCode);
