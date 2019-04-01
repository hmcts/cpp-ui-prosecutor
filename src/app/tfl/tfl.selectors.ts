import { State } from '../reducers';
import { TflState } from './tfl.reducer';
import { createSelector } from '@ngrx/store';

export interface FeatureState extends State {
  tfl: TflState;
}

export const getCasesWithSjpNotice = (state: FeatureState) => state.tfl.sjpNoticeCaseResult;

export const getCasesWithSjpNoticeCount = createSelector(
  getCasesWithSjpNotice,
  casesWithSjpNotice => (casesWithSjpNotice ? casesWithSjpNotice.count || 0 : 0)
);
