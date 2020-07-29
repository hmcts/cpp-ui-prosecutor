import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CppHttp, CppHttpConfig } from '@cpp/core';
import { AppConfig, UserGroup } from './interfaces';
import { of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

// AppConfigService can be used as the provider for all configuration
// dependencies required by submodules, so long as it implements their
// interfaces

@Injectable()
export class AppConfigService implements CppHttpConfig {
  accountUrl: string;
  baseUrl: string;
  cppHomeUrl: string;
  logoutUrl: string;
  appUrl: string;
  searchEnabled = false;

  constructor(private http: HttpClient, private injector: Injector) {}

  load() {
    return this.http
      .get('./app.override.config.json')
      .pipe(
        tap((config: AppConfig) => {
          this.baseUrl = config.apiRoot;
          this.accountUrl = config.idamProfilePage;
          this.cppHomeUrl = config.cppHomeUrl;
          this.logoutUrl = config.idamLogoutPage;
          this.appUrl = config.appUrl;
        }),
        switchMap(() =>
          this.injector
            .get(CppHttp)
            .query<{ groups: UserGroup[] }>({
              url: '/usersgroups-query-api/query/api/rest/usersgroups/users/logged-in-user/groups',
              requestType: 'application/vnd.usersgroups.get-logged-in-user-groups+json',
            })
            .pipe(
              tap(
                (result) => {
                  this.searchEnabled = result.groups.some((userGroup) =>
                    [
                      'Court Administrators',
                      'Crown Court Admin',
                      'Court Clerks',
                      'Legal Advisers',
                      'Listing Officers',
                    ].includes(userGroup.groupName)
                  );
                },
                () => console.warn('Failed to determine eligibility for unified search.')
              ),
              catchError(() => of(null))
            )
        )
      )
      .toPromise();
  }

  getLogoutUrl(): string {
    return this.logoutUrl;
  }

  getAppUrl(): string {
    return this.appUrl;
  }

  getAccountUrl(): string {
    return this.accountUrl;
  }

  getBaseUrl(): string {
    return this.baseUrl;
  }
}
