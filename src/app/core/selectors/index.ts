import { State } from '../../reducers';

export const getRouteParams = (state: State) =>
  (state.router && state.router.state && (state.router.state.params as { [key: string]: string })) || {};

export const getHasApiActivity = (state: State) => state.api.requests.length > 0;
export const getHasApiError = (state: State) => state.api.errors.length > 0;
