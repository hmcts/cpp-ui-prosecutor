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
  let uploadSupportingDocument: jest.Mock;
  let fetchErrorReport: jest.Mock;
  let dispatch: jest.Mock;

  const complaintsFile: ComplaintsFileRecord = {
    id: 'dummy-id-1',
    status: ComplaintsFileStatus.PENDING,
    warnings: [],
    errors: [],
    type: 'PROSECUTION',
    receivedAt: '16 June 2026',
    fileName: 'complaints-list-KM',
    username: 'Sarah Hall',
    caseErrors: [],
    defendantErrors: [],
    prosecutingAuthority: 'Crown Prosecution Service',
    completedAt: '16 June 2026'
  };

  beforeEach(() => {
    searchComplaintsFiles = jest.fn();
    uploadSupportingDocument = jest.fn();
    fetchErrorReport = jest.fn();
    dispatch = jest.fn();

    TestBed.configureTestingModule({
      providers: [
        ViewYourFilesStore,
        {
          provide: ManageYourComplaintsFilesService,
          useValue: { searchComplaintsFiles, uploadSupportingDocument, fetchErrorReport }
        },
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

  it('should clear the complaints file and dispatch an ApiError when the search fails', () => {
    searchComplaintsFiles.mockReturnValue(of(complaintsFile));
    store.searchComplaintsFiles('dummy-id-1');

    const error = new HttpErrorResponse({ status: 500 });
    searchComplaintsFiles.mockReturnValue(throwError(() => error));
    store.searchComplaintsFiles('dummy-id-1');

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

    searchComplaintsFiles.mockReturnValue(of(complaintsFile));
    store.searchComplaintsFiles('dummy-id-1');

    expect(store.searchErrorMessage()).toBeNull();
  });

  it('should not show the download error report error by default', () => {
    expect(store.hasDownloadErrorReportError()).toBe(false);
  });

  it('should save the error report as a csv file named after the uploaded file', () => {
    searchComplaintsFiles.mockReturnValue(of(complaintsFile));
    store.searchComplaintsFiles('dummy-id-1');
    const blob = new Blob(['a,b,c'], { type: 'text/csv' });
    fetchErrorReport.mockReturnValue(of(blob));

    store.downloadErrorReport('dummy-id-1');

    expect(fetchErrorReport).toHaveBeenCalledWith('dummy-id-1');
    expect(FileSaver.saveAs).toHaveBeenCalledWith(blob, 'complaints-list-KM_error.csv');
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

  it('should not have a document type id by default', () => {
    expect(store.documentTypeId()).toBeNull();
  });

  it('should store the document type id', () => {
    store.setDocumentTypeId('document-type-id-1');

    expect(store.documentTypeId()).toBe('document-type-id-1');
  });

  it('should upload a supporting document using the stored document type id', () => {
    store.setDocumentTypeId('document-type-id-1');
    uploadSupportingDocument.mockReturnValue(of(undefined));
    const file = new File(['a'], 'test.csv');
    const onUploadSuccess = jest.fn();
    const onUploadError = jest.fn();

    store.uploadSupportingDocument({ file, onUploadSuccess, onUploadError });

    expect(uploadSupportingDocument).toHaveBeenCalledWith(file, 'document-type-id-1');
    expect(onUploadSuccess).toHaveBeenCalled();
  });

  it('should not show the supporting document upload failure by default', () => {
    expect(store.hasUploadSupportingDocumentFailed()).toBe(false);
  });

  it('should record the supporting document upload failure and call onUploadError', () => {
    const error = new HttpErrorResponse({ status: 500 });
    uploadSupportingDocument.mockReturnValue(throwError(() => error));
    const file = new File(['a'], 'test.csv');
    const onUploadSuccess = jest.fn();
    const onUploadError = jest.fn();

    store.uploadSupportingDocument({ file, onUploadSuccess, onUploadError });

    expect(store.hasUploadSupportingDocumentFailed()).toBe(true);
    expect(onUploadError).toHaveBeenCalledWith(error);
    expect(onUploadSuccess).not.toHaveBeenCalled();
  });

  it('should clear a previous supporting document upload failure when a new upload attempt is made', () => {
    uploadSupportingDocument.mockReturnValue(throwError(() => new HttpErrorResponse({ status: 500 })));
    const file = new File(['a'], 'test.csv');
    store.uploadSupportingDocument({ file, onUploadSuccess: jest.fn(), onUploadError: jest.fn() });
    expect(store.hasUploadSupportingDocumentFailed()).toBe(true);

    uploadSupportingDocument.mockReturnValue(of(undefined));
    store.uploadSupportingDocument({ file, onUploadSuccess: jest.fn(), onUploadError: jest.fn() });

    expect(store.hasUploadSupportingDocumentFailed()).toBe(false);
  });

  it('should clear a previous supporting document upload failure when a new search is made', () => {
    uploadSupportingDocument.mockReturnValue(throwError(() => new HttpErrorResponse({ status: 500 })));
    const file = new File(['a'], 'test.csv');
    store.uploadSupportingDocument({ file, onUploadSuccess: jest.fn(), onUploadError: jest.fn() });
    expect(store.hasUploadSupportingDocumentFailed()).toBe(true);

    searchComplaintsFiles.mockReturnValue(of(complaintsFile));
    store.searchComplaintsFiles('dummy-id-1');

    expect(store.hasUploadSupportingDocumentFailed()).toBe(false);
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
