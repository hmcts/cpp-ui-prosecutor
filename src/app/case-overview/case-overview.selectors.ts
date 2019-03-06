import { State } from '../core/reducers';
import { CaseOverviewState } from './case-overview.reducer';

export interface FeatureState extends State {
  kase: CaseOverviewState;
}

export const getCase = (state: FeatureState) => state.kase;
