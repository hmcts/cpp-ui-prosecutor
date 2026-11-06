import { Component, inject } from '@angular/core';
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
import { debounceTime, distinctUntilChanged, filter, map, mapTo, mergeMap, startWith } from 'rxjs/operators';

import { HeaderNavItem, CppApplicationLayoutComponent } from '@cpp/application';

import { getHasApiActivity, getHasApiError } from '../selectors';
import { AppConfigService } from '../../config';
import { TranslateService } from '@ngx-translate/core';
import { getUserGroups } from '@cpp/users-groups';
import { State } from '../../reducers';
import { AppRouterContainer } from './app.router.container';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  template: `
    <cpp-application-layout
      [apiError]="apiError$ | async"
      [offline]="offline$ | async"
      [activity]="isBusy$ | async"
      [headerNavItems]="headerNavItems$ | async"
      [searchEnabled]="searchEnabled$ | async"
      [serviceLink]="'/'"
      serviceName="CJS Common Platform"
      searchPlaceholder="Search by reference"
      searchLabel="Search by case or application reference"
      (search)="handleSearch($event)"
      accessibilityLink="accessibility"
    >
      <router-container></router-container>
    </cpp-application-layout>
  `,
  imports: [CppApplicationLayoutComponent, AppRouterContainer, AsyncPipe]
})
export class AppContainer {
  private appConfigService = inject(AppConfigService);
  private translate = inject(TranslateService);

  headerNavItems$: Observable<HeaderNavItem[]>;
  offline$: Observable<boolean>;
  apiError$: Observable<boolean>;
  isBusy$: Observable<boolean>;
  searchEnabled$: Observable<boolean>;

  constructor() {
    const activatedRoute = inject(ActivatedRoute);
    const router = inject(Router);
    const store = inject<Store<State>>(Store);
    const titleService = inject(Title);

    // Translate
    this.translate.addLangs(['en']);
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang.match(/en|cy/) ? browserLang : 'en');

    this.isBusy$ = combineLatest([
      store.pipe(select(getHasApiActivity), debounceTime(1), startWith(false)),
      router.events.pipe(
        filter(event => event instanceof RouteConfigLoadStart || event instanceof RouteConfigLoadEnd),
        map(event => event instanceof RouteConfigLoadStart),
        startWith(false)
      )
    ]).pipe(map(([hasApiActivity, isBeingLazyLoaded]) => hasApiActivity || isBeingLazyLoaded));

    this.apiError$ = store.pipe(select(getHasApiError));

    this.searchEnabled$ = store.pipe(
      select(getUserGroups),
      map(userGroups =>
        (userGroups || []).some(group =>
          ['Court Administrators', 'Crown Court Admin', 'Court Clerks', 'Legal Advisers', 'Listing Officers'].includes(
            group.groupName
          )
        )
      )
    );

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

    this.headerNavItems$ = this.searchEnabled$.pipe(
      map(searchEnabled => {
        let navItems: HeaderNavItem[] = [];

        if (searchEnabled) {
          navItems = [
            {
              title: 'Detailed search',
              href: this.searchUrl
            }
          ];
        }
        navItems = [
          ...navItems,
          {
            title: 'Home',
            href: this.appConfigService.getAppUrl()
          },
          {
            title: 'Your account',
            href: this.appConfigService.getAccountUrl()
          },
          {
            title: 'Sign out',
            href: this.appConfigService.getLogoutUrl()
          }
        ];
        return navItems;
      })
    );
  }

  get searchUrl() {
    return `${this.appConfigService.cppHomeUrl}/search?referrer=${encodeURIComponent(document.baseURI)}`;
  }

  handleSearch(caseReference: string) {
    window.location.href = `${this.searchUrl}&caseReference=${caseReference}`;
  }
}
