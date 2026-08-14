import { State } from '../reducers';
import { CaseCountResult } from '../contexts/mi-report';

export interface FeatureState extends State {
  resultedCaseCount: CaseCountResult;
}

export const getResultedCaseCount = (state: FeatureState) => state.resultedCaseCount;
