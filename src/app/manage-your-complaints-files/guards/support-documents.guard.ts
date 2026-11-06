import { CanActivateFn, createUrlTreeFromSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { ViewYourFilesStore } from '../signal-store/view-your-files.store';
import { ComplaintsFileRoutes } from '../manage-your-complaints-files.routes';

export const supportDocumentsGuard: CanActivateFn = route => {
  const store = inject(ViewYourFilesStore);

  return store.referenceNumber()
    ? true
    : createUrlTreeFromSnapshot(route, ['/manage-your-complaints-files', ComplaintsFileRoutes.VIEW_YOUR_FILES]);
};
