import { StoreDevtoolsModule } from '@ngrx/store-devtools';

export const environment = {
  production: false,
  devTools: false,
  modules: [StoreDevtoolsModule.instrument()],
  providers: []
};
