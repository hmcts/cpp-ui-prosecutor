import { StoreDevtoolsModule } from '@ngrx/store-devtools';

export const environment = {
  production: false,
  modules: [StoreDevtoolsModule.instrument()],
  providers: []
};
