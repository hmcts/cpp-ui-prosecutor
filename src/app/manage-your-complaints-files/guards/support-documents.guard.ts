import { CanActivateFn, createUrlTreeFromSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { ViewYourFilesStore } from '../signal-store/view-your-files.store';

export const supportDocumentsGuard: CanActivateFn = route => {
  const store = inject(ViewYourFilesStore);

  return store.referenceNumber()
    ? true
    : createUrlTreeFromSnapshot(route, ['/manage-your-complaints-files/view-your-files']);
};
