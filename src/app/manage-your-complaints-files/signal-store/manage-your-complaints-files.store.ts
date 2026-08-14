import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { ManageYourComplaintsFilesService } from '../services/manage-your-complaints-files.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import FileSaver from 'file-saver';
import { HttpErrorResponse } from '@angular/common/http';
import { withErrorHandlerAdapter } from './with-error-handler-adapter.feature';
import { UploadCsvFileRequest } from '../models/manage-your-complaints-files';

interface ManageYourComplaintsFilesState {
  referenceNumber: string;
  hasDownloadCsvError: boolean;
  uploadCsvValidationMessage: string | null;
  hasUploadCsvFailed: boolean;
}

const initialState: ManageYourComplaintsFilesState = {
  referenceNumber: '',
  hasDownloadCsvError: false,
  uploadCsvValidationMessage: null,
  hasUploadCsvFailed: false
};

export const ManageYourComplaintsFilesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withErrorHandlerAdapter(),
  withProps((_, service = inject(ManageYourComplaintsFilesService)) => ({
    _downloadCsvTemplate: () => service.fetchCsvTemplate(),
    _uploadCsvFile: (file: File) => service.postCsvFile(file)
  })),
  withMethods(store => ({
    downloadCsvTemplate: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { hasDownloadCsvError: false })),
        switchMap(() =>
          store._downloadCsvTemplate().pipe(
            tapResponse({
              next: blob => FileSaver.saveAs(blob, 'complaints-files-template.csv'),
              error: (error: HttpErrorResponse) => {
                patchState(store, { hasDownloadCsvError: true });
                store.handleError(error);
              }
            })
          )
        )
      )
    ),

    validateUploadCsvFile: rxMethod<UploadCsvFileRequest>(
      pipe(
        tap(() => patchState(store, { uploadCsvValidationMessage: null, hasUploadCsvFailed: false })),
        switchMap(({ file, onUploadSuccess, onUploadError }) =>
          store._uploadCsvFile(file).pipe(
            tapResponse({
              next: ({ submissionId }) => {
                patchState(store, { referenceNumber: submissionId });
                onUploadSuccess(submissionId);
              },
              error: (error: HttpErrorResponse) => onUploadError(error)
            })
          )
        )
      )
    ),

    setUploadErrorMessage: (message: string | null) => {
      patchState(store, { uploadCsvValidationMessage: message });
    },

    setUploadCsvFailed(hasFailed: boolean) {
      patchState(store, { hasUploadCsvFailed: hasFailed });
    },

    resetState(): void {
      patchState(store, initialState);
    }
  }))
);
