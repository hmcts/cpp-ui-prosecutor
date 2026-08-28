import { TestBed } from '@angular/core/testing';
import { signalStore } from '@ngrx/signals';
import { Store } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { withErrorHandlerAdapter } from '../with-error-handler-adapter.feature';
import { ApiError } from '../../../core';

describe('withErrorHandlerAdapter', () => {
  it('dispatches an ApiError to the global store when handleError is called', () => {
    const dispatch = jest.fn();
    const TestStore = signalStore({ providedIn: 'root' }, withErrorHandlerAdapter());

    TestBed.configureTestingModule({
      providers: [TestStore, { provide: Store, useValue: { dispatch } }]
    });

    const store = TestBed.inject(TestStore);
    const error = new HttpErrorResponse({ status: 500 });

    store.handleError(error);

    expect(dispatch).toHaveBeenCalledWith(new ApiError(error));
  });
});
