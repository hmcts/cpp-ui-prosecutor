import { enableProdMode } from '@angular/core';

import { environment } from './environments/environment';

import { bootstrapApplication } from '@angular/platform-browser';

import { bootstrapAppConfig } from './bootstrap-app.config';

import { AppContainer } from './app/core/containers/app.container';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppContainer, bootstrapAppConfig);
