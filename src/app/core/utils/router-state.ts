import { Params, RouterStateSnapshot } from '@angular/router';
import { BaseRouterStoreState, RouterStateSerializer } from '@ngrx/router-store';

export interface RouterStoreState extends BaseRouterStoreState {
  params: Params;
  queryParams: Params;
}

export class CustomRouterStateSerializer implements RouterStateSerializer<RouterStoreState> {
  serialize(routerState: RouterStateSnapshot): RouterStoreState {
    const { url } = routerState;
    const queryParams = routerState.root.queryParams;

    let params = {};
    let route = routerState.root;

    while (route) {
      params = { ...params, ...route.params };
      route = route.firstChild;
    }
    return { url, queryParams, params };
  }
}
