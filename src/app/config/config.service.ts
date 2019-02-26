import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CapabilitiesService, CppHttpConfig } from '@cpp/core';
import { AppConfig } from './interfaces';
import { switchMap, tap } from 'rxjs/operators';

// AppConfigService can be used as the provider for all configuration
// dependencies required by submodules, so long as it implements their
// interfaces

@Injectable()
export class AppConfigService implements CppHttpConfig {
  baseUrl: string;
  logoutUrl: string;
  accountUrl: string;

  constructor(private http: HttpClient, private capabilities: CapabilitiesService) {}

  load() {
    return new Promise((resolve, reject) => {
      this.http
        .get('./app.override.config.json')
        .pipe(
          tap((config: AppConfig) => {
            this.baseUrl = config.apiRoot;
            this.accountUrl = config.idamProfilePage;
            this.logoutUrl = config.idamLogoutPage;
          }),
          switchMap(() => this.capabilities.loadCapabilites())
        )
        .subscribe(resolve, reject);
    });
  }

  getLogoutUrl(): string {
    return this.logoutUrl;
  }

  getAccountUrl(): string {
    return this.accountUrl;
  }

  getBaseUrl(): string {
    return this.baseUrl;
  }
}
