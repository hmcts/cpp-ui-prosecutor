import { State } from '../core/reducers';
import { CaseOverviewState } from './case-overview.reducer';
import { createSelector } from '@ngrx/store';

export interface FeatureState extends State {
  kase: CaseOverviewState;
}

export const getCase = (state: FeatureState) => state.kase.caseOverview;
export const getDefendant = (state: FeatureState) => state.kase && state.kase.caseOverview.defendant;

export const getOffences = createSelector(
  getDefendant,
  defendant => defendant.offences || []
);

export const getWithdrawOffenceStatus = (state: FeatureState) => state.kase.withdrawOffencesSuccess;
