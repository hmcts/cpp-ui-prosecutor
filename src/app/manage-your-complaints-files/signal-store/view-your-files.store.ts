import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withProps, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { HttpErrorResponse } from '@angular/common/http';
import FileSaver from 'file-saver';
import { ManageYourComplaintsFilesService } from '../services/manage-your-complaints-files.service';
import { withErrorHandlerAdapter } from './with-error-handler-adapter.feature';
import { ComplaintsFileRecord, UploadSupportingDocumentRequest } from '../interface/manage-your-complaints-files';
import { parseApiErrorMessage } from '../util/manage-your-complaints-files';

interface ViewYourFilesState {
  complaintsFile: ComplaintsFileRecord | null;
  searchErrorMessage: string | null;
  hasDownloadErrorReportError: boolean;
  documentTypeId: string | null;
  hasUploadSupportingDocumentFailed: boolean;
}

const initialState: ViewYourFilesState = {
  complaintsFile: null,
  searchErrorMessage: null,
  hasDownloadErrorReportError: false,
  documentTypeId: null,
  hasUploadSupportingDocumentFailed: false
};

export const ViewYourFilesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withErrorHandlerAdapter(),
  withProps((_, service = inject(ManageYourComplaintsFilesService)) => ({
    _searchComplaintsFiles: (searchTerm: string) => service.searchComplaintsFiles(searchTerm),
    _uploadSupportingDocument: (file: File, documentTypeId: string) =>
      service.uploadSupportingDocument(file, documentTypeId),
    _fetchErrorReport: (submissionId: string) => service.fetchErrorReport(submissionId)
  })),
  withComputed(({ complaintsFile }) => ({
    referenceNumber: computed(() => complaintsFile()?.id ?? null)
  })),
  withMethods(store => ({
    searchComplaintsFiles: rxMethod<string>(
      pipe(
        tap(() =>
          patchState(store, {
            searchErrorMessage: null,
            hasDownloadErrorReportError: false,
            hasUploadSupportingDocumentFailed: false
          })
        ),
        switchMap(searchTerm =>
          store._searchComplaintsFiles(searchTerm).pipe(
            tapResponse({
              next: result => patchState(store, { complaintsFile: result }),
              error: (error: HttpErrorResponse) => {
                patchState(store, { complaintsFile: null });
                if (error.status === 400) {
                  patchState(store, { searchErrorMessage: parseApiErrorMessage(error) });
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
        tap(() => patchState(store, { hasUploadSupportingDocumentFailed: false })),
        switchMap(({ file, onUploadSuccess, onUploadError }) =>
          store._uploadSupportingDocument(file, store.documentTypeId() ?? '').pipe(
            tapResponse({
              next: onUploadSuccess,
              error: (error: HttpErrorResponse) => {
                patchState(store, { hasUploadSupportingDocumentFailed: true });
                onUploadError(error);
              }
            })
          )
        )
      )
    ),

    setDocumentTypeId(documentTypeId: string): void {
      patchState(store, { documentTypeId });
    },

    downloadErrorReport: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { hasDownloadErrorReportError: false })),
        switchMap(submissionId =>
          store._fetchErrorReport(submissionId).pipe(
            tapResponse({
              next: blob => FileSaver.saveAs(blob, store.complaintsFile()?.fileName?.replace('.csv', '_error.csv')),
              error: (error: HttpErrorResponse) => {
                patchState(store, { hasDownloadErrorReportError: true });
                store.handleError(error);
              }
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
