import { InjectionToken } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { routerReducer as router, RouterReducerState } from '@ngrx/router-store';
import { reducers as coreReducers, State as CoreState } from './core/reducers';
import { RouterStoreState } from './core/utils/router-state';
import { usersGroups, UsersGroupsState } from '@cpp/users-groups';

export interface State extends CoreState, UsersGroupsState {
  router: RouterReducerState<RouterStoreState>;
}

export const reducerToken = new InjectionToken<ActionReducerMap<State>>('App Reducers');

export const reducers: ActionReducerMap<State> = {
  ...coreReducers,
  usersGroups,
  router
};

export function getReducers(): ActionReducerMap<State> {
  return reducers;
}

export const metaReducers: MetaReducer<State>[] = [];

export function getMetaReducers(): MetaReducer<State>[] {
  return metaReducers;
}
