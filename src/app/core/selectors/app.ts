import { getRouterSelectors } from '@ngrx/router-store';
import { State } from '../../reducers';

export const getRouter = (state: State) => state.router;
const { selectRouteParams, selectQueryParams } = getRouterSelectors(getRouter);
export const getRouteParam = selectRouteParams;
export const getQueryParams = selectQueryParams;
