import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { of, throwError } from 'rxjs';
import FileSaver from 'file-saver';
import { ViewYourFilesStore } from '../view-your-files.store';
import { ManageYourComplaintsFilesService } from '../../services/manage-your-complaints-files.service';
import { ApiError } from '../../../core';
import { ComplaintsFileRecord, ComplaintsFileStatus } from '../../models/manage-your-complaints-files';

jest.mock('file-saver', () => ({
  saveAs: jest.fn()
}));

describe('ViewYourFilesStore', () => {
  let store: InstanceType<typeof ViewYourFilesStore>;
  let searchComplaintsFiles: jest.Mock;
  let fetchErrorReport: jest.Mock;
  let dispatch: jest.Mock;

  const complaintsFile: ComplaintsFileRecord = {
    id: 'dummy-id-1',
    status: ComplaintsFileStatus.PENDING,
    warnings: [],
    errors: [],
    type: 'PROSECUTION',
    receivedAt: '16 June 2026',
    filename: 'complaints-list-KM',
    username: 'Sarah Hall',
    caseErrors: [],
    defendantErrors: []
  };

  beforeEach(() => {
    searchComplaintsFiles = jest.fn();
    fetchErrorReport = jest.fn();
    dispatch = jest.fn();

    TestBed.configureTestingModule({
      providers: [
        ViewYourFilesStore,
        { provide: ManageYourComplaintsFilesService, useValue: { searchComplaintsFiles, fetchErrorReport } },
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

  it('should store the matching record when the search succeeds', () => {
    searchComplaintsFiles.mockReturnValue(of(complaintsFile));

    store.searchComplaintsFiles('dummy-id-1');

    expect(searchComplaintsFiles).toHaveBeenCalledWith('dummy-id-1');
    expect(store.complaintsFile()).toEqual(complaintsFile);
  });

  it('should show the dummy error record and dispatch an ApiError when the search fails', () => {
    searchComplaintsFiles.mockReturnValue(of(complaintsFile));
    store.searchComplaintsFiles('dummy-id-1');

    const error = new HttpErrorResponse({ status: 500 });
    searchComplaintsFiles.mockReturnValue(throwError(() => error));
    store.searchComplaintsFiles('dummy-id-1');

    expect(store.complaintsFile()).toEqual(expect.objectContaining({ id: expect.any(String) }));
    expect(dispatch).toHaveBeenCalledWith(new ApiError(error));
  });

  it('should set a backend validation message when the reference number is rejected as invalid', () => {
    const error = new HttpErrorResponse({
      status: 400,
      error: JSON.stringify({ error: 'Enter a valid reference number' })
    });
    searchComplaintsFiles.mockReturnValue(throwError(() => error));

    store.searchComplaintsFiles('not-a-reference');

    expect(store.complaintsFile()).toEqual(expect.objectContaining({ id: expect.any(String) }));
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

    searchComplaintsFiles.mockReturnValue(of(complaintsFile));
    store.searchComplaintsFiles('dummy-id-1');

    expect(store.searchErrorMessage()).toBeNull();
  });

  it('should not show the download error report error by default', () => {
    expect(store.hasDownloadErrorReportError()).toBe(false);
  });

  it('should save the error report as a csv file named after the submission', () => {
    const blob = new Blob(['a,b,c'], { type: 'text/csv' });
    fetchErrorReport.mockReturnValue(of(blob));

    store.downloadErrorReport('dummy-id-1');

    expect(fetchErrorReport).toHaveBeenCalledWith('dummy-id-1');
    expect(FileSaver.saveAs).toHaveBeenCalledWith(blob, 'error-report-dummy-id-1.csv');
    expect(store.hasDownloadErrorReportError()).toBe(false);
  });

  it('should show the download error report error and dispatch an ApiError when the download fails', () => {
    const error = new HttpErrorResponse({ status: 500 });
    fetchErrorReport.mockReturnValue(throwError(() => error));

    store.downloadErrorReport('dummy-id-1');

    expect(store.hasDownloadErrorReportError()).toBe(true);
    expect(dispatch).toHaveBeenCalledWith(new ApiError(error));
    expect(FileSaver.saveAs).not.toHaveBeenCalled();
  });

  it('should clear a previous download error report error when a new download attempt succeeds', () => {
    fetchErrorReport.mockReturnValue(throwError(() => new HttpErrorResponse({ status: 500 })));
    store.downloadErrorReport('dummy-id-1');
    expect(store.hasDownloadErrorReportError()).toBe(true);

    fetchErrorReport.mockReturnValue(of(new Blob()));
    store.downloadErrorReport('dummy-id-1');

    expect(store.hasDownloadErrorReportError()).toBe(false);
  });

  it('should reset the state back to its initial values', () => {
    searchComplaintsFiles.mockReturnValue(of(complaintsFile));
    store.searchComplaintsFiles('dummy-id-1');
    expect(store.complaintsFile()).toEqual(complaintsFile);

    fetchErrorReport.mockReturnValue(throwError(() => new HttpErrorResponse({ status: 500 })));
    store.downloadErrorReport('dummy-id-1');
    expect(store.hasDownloadErrorReportError()).toBe(true);

    store.resetState();

    expect(store.complaintsFile()).toBeNull();
    expect(store.searchErrorMessage()).toBeNull();
    expect(store.hasDownloadErrorReportError()).toBe(false);
  });
});
