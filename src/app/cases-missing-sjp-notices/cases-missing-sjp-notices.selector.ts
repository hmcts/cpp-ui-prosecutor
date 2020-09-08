import { State } from '../reducers';
import { CasesMissingSjpNoticesState } from './cases-missing-sjp-notices.reducer';

export interface FeatureState extends State {
  casesMissingNotices: CasesMissingSjpNoticesState;
}

export const getCasesMissingSjpNotices = (state: FeatureState) => state.casesMissingNotices || [];
