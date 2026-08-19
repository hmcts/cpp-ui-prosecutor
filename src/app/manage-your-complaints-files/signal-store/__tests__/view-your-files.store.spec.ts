import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { of, throwError } from 'rxjs';
import { ViewYourFilesStore } from '../view-your-files.store';
import { ManageYourComplaintsFilesService } from '../../services/manage-your-complaints-files.service';
import { ApiError } from '../../../core';
import { ComplaintsFileRecord } from '../../models/manage-your-complaints-files';

describe('ViewYourFilesStore', () => {
  let store: InstanceType<typeof ViewYourFilesStore>;
  let searchComplaintsFiles: jest.Mock;
  let dispatch: jest.Mock;

  const complaintsFile: ComplaintsFileRecord = {
    reference: 'KUJ5953G',
    dateUploaded: '16 June 2026',
    status: 'File processing',
    action: null,
    fileName: 'complaints-list-KM',
    uploadedBy: 'Sarah Hall'
  };

  beforeEach(() => {
    searchComplaintsFiles = jest.fn();
    dispatch = jest.fn();

    TestBed.configureTestingModule({
      providers: [
        ViewYourFilesStore,
        { provide: ManageYourComplaintsFilesService, useValue: { searchComplaintsFiles } },
        { provide: Store, useValue: { dispatch } }
      ],
      teardown: { destroyAfterEach: false }
    });

    store = TestBed.inject(ViewYourFilesStore);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should not have a complaints file by default', () => {
    expect(store.complaintsFile()).toBeNull();
  });

  it('should store the first matching record when the search succeeds', () => {
    searchComplaintsFiles.mockReturnValue(of([complaintsFile]));

    store.searchComplaintsFiles('KUJ5953G');

    expect(searchComplaintsFiles).toHaveBeenCalledWith('KUJ5953G');
    expect(store.complaintsFile()).toEqual(complaintsFile);
  });

  it('should store a null result when the search finds nothing', () => {
    searchComplaintsFiles.mockReturnValue(of([]));

    store.searchComplaintsFiles('unknown');

    expect(store.complaintsFile()).toBeNull();
  });

  it('should clear the result and dispatch an ApiError when the search fails', () => {
    searchComplaintsFiles.mockReturnValue(of([complaintsFile]));
    store.searchComplaintsFiles('KUJ5953G');

    const error = new HttpErrorResponse({ status: 500 });
    searchComplaintsFiles.mockReturnValue(throwError(() => error));
    store.searchComplaintsFiles('KUJ5953G');

    expect(store.complaintsFile()).toBeNull();
    expect(dispatch).toHaveBeenCalledWith(new ApiError(error));
  });

  it('should set a backend validation message when the reference number is rejected as invalid', () => {
    const error = new HttpErrorResponse({
      status: 400,
      error: JSON.stringify({ error: 'Enter a valid reference number' })
    });
    searchComplaintsFiles.mockReturnValue(throwError(() => error));

    store.searchComplaintsFiles('not-a-reference');

    expect(store.complaintsFile()).toBeNull();
    expect(store.searchErrorMessage()).toBe('Enter a valid reference number');
    expect(dispatch).not.toHaveBeenCalled();
  });

  it('should clear a previous backend validation message when a new search is made', () => {
    const error = new HttpErrorResponse({
      status: 400,
      error: JSON.stringify({ error: 'Enter a valid reference number' })
    });
    searchComplaintsFiles.mockReturnValue(throwError(() => error));
    store.searchComplaintsFiles('not-a-reference');
    expect(store.searchErrorMessage()).toBe('Enter a valid reference number');

    searchComplaintsFiles.mockReturnValue(of([complaintsFile]));
    store.searchComplaintsFiles('KUJ5953G');

    expect(store.searchErrorMessage()).toBeNull();
  });

  it('should reset the state back to its initial values', () => {
    searchComplaintsFiles.mockReturnValue(of([complaintsFile]));
    store.searchComplaintsFiles('KUJ5953G');
    expect(store.complaintsFile()).toEqual(complaintsFile);

    store.resetState();

    expect(store.complaintsFile()).toBeNull();
    expect(store.searchErrorMessage()).toBeNull();
  });
});
