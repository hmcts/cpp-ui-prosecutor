import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';
import { ApiAction, ApiActionTypes } from '../actions/api';

export interface ApiState {
  requests: any[];
  errors: any[];
}

export const initialState = {
  requests: [],
  errors: []
};

export const apiReducer = (state: ApiState = initialState, action: ApiAction | RouterNavigationAction): ApiState => {
  switch (action.type) {
    case ROUTER_NAVIGATION:
      return initialState;

    case ApiActionTypes.API_REQUEST:
      return {
        ...initialState,
        requests: [...state.requests, action.request]
      };

    case ApiActionTypes.API_RESPONSE:
      return {
        ...initialState,
        requests: state.requests.filter(req => req !== action.request)
      };

    case ApiActionTypes.API_ERROR:
      return {
        ...state,
        errors: [...state.errors, action.response]
      };

    default:
      return state;
  }
};
