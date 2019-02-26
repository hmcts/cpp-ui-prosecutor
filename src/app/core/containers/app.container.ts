import { Component } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  PRIMARY_OUTLET,
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router
} from '@angular/router';
import { Title } from '@angular/platform-browser';
import { select, Store } from '@ngrx/store';

import { combineLatest, fromEvent, merge, Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, mapTo, mergeMap, startWith } from 'rxjs/operators';

import { HeaderNavItem } from '@cpp/pdk/patterns/cpp.component';
import { State } from '../reducers';

import { getHasApiActivity, getHasApiError } from '../selectors';
import { AppConfigService } from '../../config';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-root',
  template: `
    <pdk-provider>
      <app-layout
        [headerNavItems]="headerNavItems"
        [activity]="isBusy$ | async"
        [offline]="offline$ | async"
        [apiError]="apiError$ | async"
      >
        <router-outlet></router-outlet>
      </app-layout>
    </pdk-provider>
  `
})
export class AppContainer {
  headerNavItems: HeaderNavItem[];
  devTools = environment.devTools;
  offline$: Observable<boolean>;
  apiError$: Observable<boolean>;
  isBusy$: Observable<boolean>;

  constructor(
    appConfigService: AppConfigService,
    activatedRoute: ActivatedRoute,
    router: Router,
    store: Store<State>,
    titleService: Title
  ) {
    this.isBusy$ = combineLatest(
      store.pipe(select(getHasApiActivity)),
      router.events.pipe(
        filter(event => event instanceof RouteConfigLoadStart || event instanceof RouteConfigLoadEnd),
        map(event => event instanceof RouteConfigLoadStart)
      )
    ).pipe(map(([hasApiActivity, isBeingLazyLoaded]) => hasApiActivity || isBeingLazyLoaded));

    this.apiError$ = store.pipe(select(getHasApiError));

    this.offline$ = merge(
      fromEvent(window, 'online').pipe(mapTo(true)),
      fromEvent(window, 'offline').pipe(mapTo(false))
    ).pipe(
      startWith(navigator.onLine),
      distinctUntilChanged(),
      map(online => !online)
    );

    router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => activatedRoute),
        map(activeRoute => {
          while (activeRoute.firstChild) {
            activeRoute = activeRoute.firstChild;
          }
          return activeRoute;
        }),
        filter(activeRoute => activeRoute.outlet === PRIMARY_OUTLET),
        mergeMap(activeRoute => activeRoute.data)
      )
      .subscribe(data => titleService.setTitle(data.title || 'Criminal Justice Service Online'));

    this.headerNavItems = [
      {
        title: 'Your account',
        href: appConfigService.getAccountUrl()
      },
      {
        title: 'Sign out',
        href: appConfigService.getLogoutUrl()
      }
    ];

    if (this.devTools) {
      this.headerNavItems.push({
        title: 'Dev tools',
        href: '/prosecutor/dev-tools'
      });
    }
  }
}
