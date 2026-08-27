import { CanActivateFn, createUrlTreeFromSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ReferenceDataService } from '../../contexts/reference-data/reference-data.service';
import { ViewYourFilesStore } from '../signal-store/view-your-files.store';
import { findDocumentTypeId } from '../manage-your-complaints-files.util';

export const documentTypeAccessGuard: CanActivateFn = route => {
  const store = inject(ViewYourFilesStore);
  const referenceDataService = inject(ReferenceDataService);

  if (store.documentTypeId()) {
    return true;
  }

  return referenceDataService.getDocumentTypeAccess().pipe(
    map(findDocumentTypeId),
    tap(documentTypeId => store.setDocumentTypeId(documentTypeId)),
    map(() => true),
    catchError((error: HttpErrorResponse) => {
      store.handleError(error);
      return of(createUrlTreeFromSnapshot(route, ['..']));
    })
  );
};
