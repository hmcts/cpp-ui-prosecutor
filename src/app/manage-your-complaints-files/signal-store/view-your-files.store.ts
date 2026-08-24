import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withProps, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ManageYourComplaintsFilesService } from '../services/manage-your-complaints-files.service';
import { withErrorHandlerAdapter } from './with-error-handler-adapter.feature';
import {
  ComplaintsFileRecord,
  ComplaintsFileStatus,
  UploadSupportingDocumentRequest
} from '../models/manage-your-complaints-files';

interface ViewYourFilesState {
  complaintsFile: ComplaintsFileRecord | null;
  searchErrorMessage: string | null;
}

const initialState: ViewYourFilesState = {
  complaintsFile: null,
  searchErrorMessage: null
};

export const ViewYourFilesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withErrorHandlerAdapter(),
  withProps((_, service = inject(ManageYourComplaintsFilesService)) => ({
    _searchComplaintsFiles: (searchTerm: string) => service.searchComplaintsFiles(searchTerm),
    _uploadSupportingDocument: (submissionId: string, file: File) =>
      service.uploadSupportingDocument(submissionId, file)
  })),
  withComputed(({ complaintsFile }) => ({
    referenceNumber: computed(() => complaintsFile()?.id ?? null)
  })),
  withMethods(store => ({
    searchComplaintsFiles: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { searchErrorMessage: null })),
        switchMap(searchTerm =>
          store._searchComplaintsFiles(searchTerm).pipe(
            tapResponse({
              next: result => patchState(store, { complaintsFile: result }),
              error: (error: HttpErrorResponse) => {
                //patchState(store, { complaintsFile: null });
                // TODO: remove - dummy data for testing the error state UI
                patchState(store, {
                  complaintsFile: {
                    id: 'c9a0fe7b-c05c-405a-97c0-012f9cbd9b6b',
                    status: ComplaintsFileStatus.FAILED,
                    warnings: [],
                    errors: [],
                    type: 'PROSECUTION',
                    receivedAt: '2026-08-21T08:58:13.859Z',
                    filename: 'raghavendra-chaturvedula-file.csv',
                    username: 'Test User',
                    caseErrors: [],
                    defendantErrors: []
                  }
                });
                if (error.status === 400) {
                  const parsedError = JSON.parse(error.error);
                  patchState(store, { searchErrorMessage: parsedError.error });
                } else {
                  store.handleError(error);
                }
              }
            })
          )
        )
      )
    ),

    uploadSupportingDocument: rxMethod<UploadSupportingDocumentRequest>(
      pipe(
        switchMap(({ file, onUploadSuccess, onUploadError }) =>
          store._uploadSupportingDocument(store.referenceNumber() ?? '', file).pipe(
            tapResponse({
              next: onUploadSuccess,
              error: (error: HttpErrorResponse) => onUploadError(error)
            })
          )
        )
      )
    ),

    resetState(): void {
      patchState(store, initialState);
    }
  }))
);
