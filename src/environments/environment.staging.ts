import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { DevToolsModule } from '../app/devtools/index';

export const environment = {
  production: true,
  devTools: true,
  modules: [StoreDevtoolsModule.instrument(), DevToolsModule]
};
