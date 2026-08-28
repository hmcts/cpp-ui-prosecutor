import { ApplicationConfig, inject, provideAppInitializer } from '@angular/core';
import { provideRouter, withComponentInputBinding, withRouterConfig } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { appRoutes } from './app/app-routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStore, Store } from '@ngrx/store';
import { getReducers, metaReducers, reducerToken } from './app/reducers';
import { provideRouterStore, RouterState } from '@ngrx/router-store';
import { CustomRouterStateSerializer } from './app/core/utils/router-state';
import { provideEffects } from '@ngrx/effects';
import {
  CppHttp,
  CppHttpBackend,
  GENERATE_UNIQUE_KEY,
  NotificationDispatcher,
  provideCppCoreHttpServices,
  withCppHttpOverrides
} from '@cpp/core';
import { provideCPPApplicationEnvironment } from '@cpp/application';
import { provideUsersGroupsStore, provideUserGroupsEnvironmentContext } from '@cpp/users-groups';
import { provideReferenceDataStore, provideReferenceDataEnvironmentContext } from '@cpp/reference-data';
import uuid from 'uuid/v4';
import { provideProtractorTestingSupport, Title } from '@angular/platform-browser';
import { CustomHttp, loadHttpFactory } from './app/core';
import { environment } from './environments/environment';
import { AppConfigService } from './app/config';
import { DefendantDetailsUpdatesEffects } from './app/defendant-details-updates/defendant-details-updates.effects';
import { ExportCaseDecisionsEffects } from './app/export-case-decisions/export-case-decisions.effects';
import { CaseOverviewEffects } from './app/case-overview/case-overview.effects';
import { ManualCaseDetailsEffects } from './app/core/effects/manual-case-details.effects';

export const bootstrapAppConfig: ApplicationConfig = {
  providers: [
    {
      provide: GENERATE_UNIQUE_KEY,
      useValue: uuid
    },
    provideRouter(
      appRoutes,
      withRouterConfig({
        onSameUrlNavigation: 'reload'
      }),
      withComponentInputBinding()
    ),
    provideHttpClient(),
    provideProtractorTestingSupport(),
    provideStore(reducerToken, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: false, // The entire application mutate state outside reducer
        strictActionImmutability: false // This needs to be revisited and require more time to fix
      }
    }),
    provideRouterStore({
      routerState: RouterState.Minimal,
      serializer: CustomRouterStateSerializer
    }),
    provideTranslateService({
      lang: 'en',
      fallbackLang: 'en',
      loader: provideTranslateHttpLoader({
        prefix: 'assets/i18n/',
        suffix: '.json'
      })
    }),
    provideRouter(appRoutes),
    provideAppInitializer(async () => await inject(AppConfigService).load()),
    provideCPPApplicationEnvironment({ production: environment.production }),
    provideUsersGroupsStore(),
    provideUserGroupsEnvironmentContext(),
    provideReferenceDataStore(),
    provideReferenceDataEnvironmentContext(),
    provideCppCoreHttpServices(withCppHttpOverrides(AppConfigService, CustomHttp)),
    provideEffects([
      DefendantDetailsUpdatesEffects,
      ExportCaseDecisionsEffects,
      CaseOverviewEffects,
      ManualCaseDetailsEffects
    ]),
    provideHttpClient(),
    provideProtractorTestingSupport(),
    provideStore(reducerToken, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: false, // The entire application mutate state outside reducer
        strictActionImmutability: false // This needs to be revisited and require more time to fix
      }
    }),
    Title,
    {
      provide: reducerToken,
      useFactory: getReducers
    },
    {
      provide: CppHttp,
      useFactory: loadHttpFactory,
      deps: [GENERATE_UNIQUE_KEY, CppHttpBackend, NotificationDispatcher, Store]
    },
    ...environment.providers
  ]
};
