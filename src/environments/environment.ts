// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { provideCppFakeSession } from '@cpp/core';
import { mockUsers, User } from '../app/devtools/session/users.constant';
import { provideStoreDevtools } from '@ngrx/store-devtools';

const getDefaultUserId = (): string => {
  const defaultUser: User = mockUsers.find(user => user.default);
  return defaultUser.id || '';
};

export const environment = {
  production: false,
  devTools: true,
  providers: [
    provideCppFakeSession({ defaultUserId: getDefaultUserId() }),
    provideStoreDevtools({ connectInZone: true })
  ]
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
