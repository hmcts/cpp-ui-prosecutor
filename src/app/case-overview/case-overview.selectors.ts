import { CaseOverviewState } from './case-overview.reducer';
import { State } from '../reducers';

export interface FeatureState extends State {
  caseOverview: CaseOverviewState;
}

export const getWithdrawOffenceStatus = (state: FeatureState) => state.caseOverview.withdrawOffencesSuccess;

export const getDatesToAvoidStatus = (state: FeatureState) => state.caseOverview.datesToAvoidSuccess;

export const getDatesToAvoidFailed = (state: FeatureState) => state.caseOverview.datesToAvoidFailed;
