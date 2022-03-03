import { InjectionToken } from '@angular/core';
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { routerReducer as router, RouterReducerState } from '@ngrx/router-store';
import { storeLogger } from 'ngrx-store-logger';
import { environment } from '../environments/environment';
import { reducers as coreReducers, State as CoreState } from './core/reducers';
import { RouterStoreState } from './core/utils/router-state';
import { usersGroups, UsersGroupsState } from '@cpp/users-groups';

export interface State extends CoreState, UsersGroupsState {
  router: RouterReducerState<RouterStoreState>;
}

export const reducerToken = new InjectionToken<ActionReducerMap<State>>('App Reducers');

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return storeLogger({ collapsed: true })(reducer);
}

export const reducers: ActionReducerMap<State> = {
  ...coreReducers,
  usersGroups,
  router
};

export function getReducers(): ActionReducerMap<State> {
  return reducers;
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [logger] : [];

export function getMetaReducers(): MetaReducer<State>[] {
  return metaReducers;
}
