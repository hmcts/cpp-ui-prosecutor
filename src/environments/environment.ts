import { provideCppFakeSession } from '@cpp/core';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const environment = {
  production: false,
  providers: [
    provideCppFakeSession({ defaultUserId: '919d2dd0-5f6e-4f7b-89d5-31be30840770' }),
    provideStoreDevtools({ connectInZone: true })
  ]
};
