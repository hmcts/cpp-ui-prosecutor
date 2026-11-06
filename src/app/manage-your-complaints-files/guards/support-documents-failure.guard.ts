import { CanActivateFn, createUrlTreeFromSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { ViewYourFilesStore } from '../signal-store/view-your-files.store';
import { ComplaintsFileRoutes } from '../manage-your-complaints-files.routes';
import { ViewYourFilesRoutes } from '../containers/view-your-files/view-your-files.routes';

export const supportDocumentsFailureGuard: CanActivateFn = route => {
  const store = inject(ViewYourFilesStore);

  return store.hasUploadSupportingDocumentFailed()
    ? true
    : createUrlTreeFromSnapshot(route, [
        '/manage-your-complaints-files',
        ComplaintsFileRoutes.VIEW_YOUR_FILES,
        ViewYourFilesRoutes.SUPPORT_DOCUMENTS
      ]);
};
