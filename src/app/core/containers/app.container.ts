import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, PRIMARY_OUTLET, RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { select, Store } from '@ngrx/store';

import { combineLatest, fromEvent, merge, Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, mapTo, mergeMap, startWith } from 'rxjs/operators';

import { HeaderNavItem } from '@cpp/pdk/patterns/cpp.component';
import { State } from '../reducers';

import { getHasApiActivity, getHasApiError } from '../selectors';
import { AppConfigService } from '../../config';
import { environment } from '../../../environments/environment';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  template: `
    <pdk-provider>
      <app-layout
        [headerNavItems]="headerNavItems"
        [activity]="isBusy$ | async"
        [offline]="offline$ | async"
        [apiError]="apiError$ | async"
        [searchEnabled]="searchEnabled"
        (search)="handleSearch($event)"
      >
        <router-container></router-container>
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
  searchEnabled = false;

  constructor(
    private appConfigService: AppConfigService,
    activatedRoute: ActivatedRoute,
    router: Router,
    store: Store<State>,
    titleService: Title,
    private translate: TranslateService
  ) {
    // Translate
    this.translate.addLangs(['en']);
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang.match(/en|cy/) ? browserLang : 'en');

    this.isBusy$ = combineLatest(
      store.pipe(
        select(getHasApiActivity),
        startWith(false)
      ),
      router.events.pipe(
        filter(event => event instanceof RouteConfigLoadStart || event instanceof RouteConfigLoadEnd),
        map(event => event instanceof RouteConfigLoadStart),
        startWith(false)
      )
    ).pipe(map(([hasApiActivity, isBeingLazyLoaded]) => hasApiActivity || isBeingLazyLoaded));

    this.apiError$ = store.pipe(select(getHasApiError));
    this.searchEnabled = this.appConfigService.searchEnabled;

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

    if (this.devTools) {
      this.headerNavItems.push({
        title: 'Dev tools',
        href: '/prosecutor/dev-tools'
      });
    }

    if (this.searchEnabled) {
      this.headerNavItems.unshift({
        title: 'Detailed search',
        href: this.searchUrl
      });
    }
  }

  get searchUrl() {
    return `${this.appConfigService.cppHomeUrl}/search?referrer=${encodeURIComponent(document.baseURI)}`;
  }

  handleSearch(caseReference: string) {
    window.location.href = `${this.searchUrl}&caseReference=${caseReference}`;
  }
}
