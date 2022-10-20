import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { CppHttp, CppHttpBackend, GENERATE_UNIQUE_KEY, HttpModule, NotificationDispatcher } from '@cpp/core';

import { routes } from './routes';
import { getReducers, metaReducers, reducerToken } from './reducers';
import { loadHttpFactory } from './core/services/http';
// temporary, pending ui.core fix
import * as uuid from 'uuid/v4';

import { AppConfigModule } from './config';
import { AppContainer } from './core/containers/app.container';
import { CustomRouterStateSerializer } from './core/utils/router-state';
import { CoreModule } from './core/core.module';
import { environment } from '../environments/environment';
import { SearchModule } from './search/search.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ApplicationModule } from '@cpp/application';
import { UsersGroupsModule } from '@cpp/users-groups';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, 'assets/i18n/', '.json');
}

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    CoreModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot(reducerToken, { metaReducers }),
    StoreRouterConnectingModule.forRoot({
      routerState: RouterState.Minimal,
      serializer: CustomRouterStateSerializer
    }),
    EffectsModule.forRoot([]),
    AppConfigModule,
    SearchModule,
    ApplicationModule.forRoot(environment),
    UsersGroupsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ...environment.modules
  ],
  providers: [
    Title,
    {
      provide: reducerToken,
      useFactory: getReducers
    },
    {
      provide: GENERATE_UNIQUE_KEY,
      useValue: uuid
    },
    {
      provide: CppHttp,
      useFactory: loadHttpFactory,
      deps: [GENERATE_UNIQUE_KEY, CppHttpBackend, NotificationDispatcher, Store]
    },
    ...environment.providers
  ],
  bootstrap: [AppContainer]
})
export class AppModule {}
