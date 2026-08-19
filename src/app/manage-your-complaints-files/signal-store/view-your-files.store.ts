import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ManageYourComplaintsFilesService } from '../services/manage-your-complaints-files.service';
import { withErrorHandlerAdapter } from './with-error-handler-adapter.feature';
import { ComplaintsFileRecord } from '../models/manage-your-complaints-files';

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
    _searchComplaintsFiles: (searchTerm: string) => service.searchComplaintsFiles(searchTerm)
  })),
  withMethods(store => ({
    searchComplaintsFiles: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { searchErrorMessage: null })),
        switchMap(searchTerm =>
          store._searchComplaintsFiles(searchTerm).pipe(
            tapResponse({
              next: results => patchState(store, { complaintsFile: results[0] ?? null }),
              error: (error: HttpErrorResponse) => {
                patchState(store, { complaintsFile: null });
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

    resetState(): void {
      patchState(store, initialState);
    }
  }))
);
