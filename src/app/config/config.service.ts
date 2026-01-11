import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CppHttpConfig } from '@cpp/core';
import { AppConfig } from './interfaces';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

// AppConfigService can be used as the provider for all configuration
// dependencies required by submodules, so long as it implements their
// interfaces

@Injectable({ providedIn: 'root' })
export class AppConfigService implements CppHttpConfig {
  private http = inject(HttpClient);

  accountUrl: string;
  baseUrl: string;
  cppHomeUrl: string;
  logoutUrl: string;
  appUrl: string;


  constructor() {}

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
        catchError(() => of(null))
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
