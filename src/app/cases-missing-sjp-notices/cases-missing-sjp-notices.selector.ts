import { State } from '../reducers';

export type FeatureState = State;

export const getCasesMissingSjpNotices = (state: FeatureState) => state.casesMissingNotices || [];
