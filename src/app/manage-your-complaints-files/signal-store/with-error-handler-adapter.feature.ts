import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { signalStoreFeature, withMethods } from '@ngrx/signals';
import { Store } from '@ngrx/store';
import { ApiError, State } from '../../core';

export function withErrorHandlerAdapter() {
  return signalStoreFeature(
    withMethods((_, globalStore = inject<Store<State>>(Store)) => ({
      handleError: (error: HttpErrorResponse): void => {
        globalStore.dispatch(new ApiError(error));
      }
    }))
  );
}
