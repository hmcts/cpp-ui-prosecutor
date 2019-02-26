import { apiReducer, ApiState } from './api.reducer';

export interface State {
  readonly api: ApiState;
}

export const reducers = {
  api: apiReducer
};
