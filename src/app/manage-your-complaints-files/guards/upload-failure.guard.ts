import { CanActivateFn, createUrlTreeFromSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { ManageYourComplaintsFilesStore } from '../signal-store/manage-your-complaints-files.store';

export const uploadFailureGuard: CanActivateFn = route => {
  const store = inject(ManageYourComplaintsFilesStore);

  return store.getUploadCsvFailed() ? true : createUrlTreeFromSnapshot(route, ['../..']);
};
