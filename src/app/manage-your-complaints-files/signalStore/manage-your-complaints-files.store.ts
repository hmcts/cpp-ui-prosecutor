import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withProps, withState } from '@ngrx/signals';
import { ManageYourComplaintsFilesService } from '../services/manage-your-complaints-files.service';
import { Router } from '@angular/router';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import FileSaver from 'file-saver';
import { Store } from '@ngrx/store';
import { ApiError, State } from '../../core';
import { HttpErrorResponse } from '@angular/common/module.d-CnjH8Dlt';

interface ManageYourComplaintsFilesState {
  referenceNumber: string;
  showDownloadErrorMessage: boolean;
}

const initialState: ManageYourComplaintsFilesState = {
  referenceNumber: '',
  showDownloadErrorMessage: false
};

export const ManageYourComplaintsFilesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withProps((_, service = inject(ManageYourComplaintsFilesService), globalStore = inject<Store<State>>(Store)) => ({
    _parentStore: globalStore,
    _downloadCsvTemplate: () => service.fetchCsvTemplate()
  })),
  withComputed(({ referenceNumber, showDownloadErrorMessage }) => ({
    getReferenceNumber: computed(() => referenceNumber()),
    getShowDownloadErrorMessage: computed(() => showDownloadErrorMessage())
  })),
  withMethods((store, router = inject(Router)) => ({
    downloadCsvTemplate: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { showDownloadErrorMessage: false })),
        switchMap(() =>
          store._downloadCsvTemplate().pipe(
            tapResponse({
              next: blob => FileSaver.saveAs(blob, 'complaints-files-template.csv'),
              error: (error: HttpErrorResponse) => {
                patchState(store, { showDownloadErrorMessage: true });
                store._parentStore.dispatch(new ApiError(error));
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
