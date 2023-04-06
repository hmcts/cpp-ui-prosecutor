import { State } from '../../reducers';
import { createSelector } from '@ngrx/store';
import { getSelectors } from '@ngrx/router-store';

export const getRouter = (state: State) => state.router;
const { selectRouteParams, selectQueryParams } = getSelectors(getRouter);
export const getRouteParam = selectRouteParams;
export const getQueryParams = selectQueryParams;

