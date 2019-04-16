import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';
import { ApiError, CompletedApiRequest, PendingApiRequest } from '../../actions/api';
import { apiReducer } from '../api.reducer';
import { HttpQueryOptions } from '@cpp/core';

describe('apiReducer', () => {
  describe('undefined action', () => {
    it('should initialize the default state', () => {
      const action = {} as any;
      const result = apiReducer(undefined, action);

      expect(result).toMatchSnapshot();
    });
  });

  describe('ROUTER_NAVIGATION', () => {
    it('should reset the state', () => {
      const navigationAction = { type: ROUTER_NAVIGATION } as RouterNavigationAction;
      const state = {
        requests: [{ url: '*' } as any],
        errors: [{ error: '*' }]
      };
      const result = apiReducer(state, navigationAction);

      expect(result).toMatchSnapshot();
    });
  });

  describe('API_REQUEST', () => {
    it('should add the incoming request to the pending requests', () => {
      const createAction = new PendingApiRequest({ url: '/' } as HttpQueryOptions);
      const result = apiReducer(undefined, createAction);

      expect(result).toMatchSnapshot();
    });
  });

  describe('API_RESPONSE', () => {
    it('should remove the completed request from the pending requests', () => {
      const requestOption = { url: '/' } as HttpQueryOptions;
      const state = { requests: [requestOption], errors: [] };
      const completedAction = new CompletedApiRequest(requestOption);

      const result = apiReducer(state, completedAction);
      expect(result).toMatchSnapshot();
    });
  });

  describe('API_ERROR', () => {
    it('should remove the completed request from the pending requests', () => {
      const error = { error: '*' };
      const errorAction = new ApiError(error);

      const result = apiReducer(undefined, errorAction);

      expect(result).toMatchSnapshot();
    });
  });
});
