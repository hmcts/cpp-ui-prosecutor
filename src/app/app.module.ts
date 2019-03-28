import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { META_REDUCERS, Store, StoreModule } from '@ngrx/store';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { CppHttp, CppHttpBackend, GENERATE_UNIQUE_KEY, HttpModule, Notifications } from '@cpp/core';

import { routes } from './routes';
import { getMetaReducers, getReducers, reducerToken } from './reducers';
import { loadHttpFactory } from './core/services/http';
// temporary, pending ui.core fix
import * as uuid from 'uuid/v4';

import { AppConfigModule } from './config';
import { AppContainer } from './core/containers/app.container';
import { CustomRouterStateSerializer } from './core/utils/router-state';
import { CoreModule } from './core/core.module';
import { environment } from '../environments/environment';
import { DashboardModule } from './dashboard/dashboard.module';
import { SearchModule } from './search/search.module';
import { ErrorPagesModule } from './shared/error-pages/error-pages.module';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    CoreModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot(reducerToken),
    StoreRouterConnectingModule,
    EffectsModule.forRoot([]),
    AppConfigModule,
    SearchModule,
    ErrorPagesModule,
    ...environment.modules
  ],
  providers: [
    Title,
    {
      provide: reducerToken,
      useFactory: getReducers
    },
    {
      provide: META_REDUCERS,
      useFactory: getMetaReducers
    },
    {
      provide: GENERATE_UNIQUE_KEY,
      useValue: uuid
    },
    {
      provide: CppHttp,
      useFactory: loadHttpFactory,
      deps: [GENERATE_UNIQUE_KEY, CppHttpBackend, Notifications, Store]
    },
    {
      provide: RouterStateSerializer,
      useClass: CustomRouterStateSerializer
    },
    ...environment.providers
  ],
  bootstrap: [AppContainer]
})
export class AppModule {}
