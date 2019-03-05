import { State } from '../core/reducers';
import { CaseOverviewState } from './case-overview.reducer';

export interface FeatureState extends State {
  caseOverview: CaseOverviewState;
}

export const getCaseId = (state: FeatureState) => state.caseOverview.caseId;
export const getCase = (state: FeatureState) => state.caseOverview.case;
