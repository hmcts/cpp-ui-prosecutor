import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { of, throwError } from 'rxjs';
import FileSaver from 'file-saver';
import { ManageYourComplaintsFilesStore } from '../manage-your-complaints-files.store';
import { ManageYourComplaintsFilesService } from '../../services/manage-your-complaints-files.service';
import { ApiError } from '../../../core';

jest.mock('file-saver', () => ({
  saveAs: jest.fn()
}));

describe('ManageYourComplaintsFilesStore', () => {
  let store: InstanceType<typeof ManageYourComplaintsFilesStore>;
  let fetchCsvTemplate: jest.Mock;
  let postCsvFile: jest.Mock;
  let dispatch: jest.Mock;

  beforeEach(() => {
    fetchCsvTemplate = jest.fn();
    postCsvFile = jest.fn();
    dispatch = jest.fn();

    TestBed.configureTestingModule({
      providers: [
        ManageYourComplaintsFilesStore,
        { provide: ManageYourComplaintsFilesService, useValue: { fetchCsvTemplate, postCsvFile } },
        { provide: Store, useValue: { dispatch } }
      ],
      teardown: { destroyAfterEach: false }
    });

    store = TestBed.inject(ManageYourComplaintsFilesStore);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should not show the download error message by default', () => {
    expect(store.getDownloadError()).toBe(false);
  });

  it('should save the csv template when the download succeeds', () => {
    const blob = new Blob(['a,b,c'], { type: 'text/csv' });
    fetchCsvTemplate.mockReturnValue(of(blob));

    store.downloadCsvTemplate();

    expect(FileSaver.saveAs).toHaveBeenCalledWith(blob, 'complaints-files-template.csv');
    expect(store.getDownloadError()).toBe(false);
  });

  it('should show the download error message when the download fails', () => {
    fetchCsvTemplate.mockReturnValue(throwError(() => new Error('network error')));

    store.downloadCsvTemplate();

    expect(store.getDownloadError()).toBe(true);
    expect(FileSaver.saveAs).not.toHaveBeenCalled();
  });

  it('should dispatch an ApiError so backend validation messages can be displayed', () => {
    const error = new Error('backend validation failed');
    fetchCsvTemplate.mockReturnValue(throwError(() => error));

    store.downloadCsvTemplate();

    expect(dispatch).toHaveBeenCalledWith(new ApiError(error));
  });

  it('should clear a previous error message when a new download attempt succeeds', () => {
    fetchCsvTemplate.mockReturnValue(throwError(() => new Error('network error')));
    store.downloadCsvTemplate();
    expect(store.getDownloadError()).toBe(true);

    fetchCsvTemplate.mockReturnValue(of(new Blob()));
    store.downloadCsvTemplate();

    expect(store.getDownloadError()).toBe(false);
  });

  it('should reset the state back to its initial values', () => {
    fetchCsvTemplate.mockReturnValue(throwError(() => new Error('network error')));
    store.downloadCsvTemplate();
    expect(store.getDownloadError()).toBe(true);

    store.resetState();

    expect(store.getDownloadError()).toBe(false);
    expect(store.getReferenceNumber()).toBe('');
  });

  it('should store the reference number and call onUploadSuccess when the upload succeeds', () => {
    postCsvFile.mockReturnValue(of({ submissionId: 'REF123' }));
    const onUploadSuccess = jest.fn();
    const onUploadError = jest.fn();

    store.validateUploadCsvFile({ file: new File(['a,b,c'], 'complaints.csv'), onUploadSuccess, onUploadError });

    expect(store.getReferenceNumber()).toBe('REF123');
    expect(onUploadSuccess).toHaveBeenCalledWith('REF123');
    expect(onUploadError).not.toHaveBeenCalled();
    expect(store.getUploadValidationMessage()).toBeNull();
  });

  it('should call onUploadError with the raw error when the upload fails', () => {
    const error = new HttpErrorResponse({
      status: 400,
      error: JSON.stringify({ error: 'File size must not exceed 2MB' })
    });
    postCsvFile.mockReturnValue(throwError(() => error));
    const onUploadSuccess = jest.fn();
    const onUploadError = jest.fn();

    store.validateUploadCsvFile({ file: new File(['a,b,c'], 'complaints.csv'), onUploadSuccess, onUploadError });

    expect(onUploadError).toHaveBeenCalledWith(error);
    expect(onUploadSuccess).not.toHaveBeenCalled();
  });

  it('should let setUploadErrorMessage set a backend validation message for display', () => {
    store.setUploadErrorMessage('File size must not exceed 2MB');

    expect(store.getUploadValidationMessage()).toBe('File size must not exceed 2MB');
  });

  it('should clear a previous backend validation error when a new upload attempt is made', () => {
    store.setUploadErrorMessage('File size must not exceed 2MB');
    postCsvFile.mockReturnValue(of({ submissionId: 'REF123' }));

    store.validateUploadCsvFile({
      file: new File(['a,b,c'], 'complaints.csv'),
      onUploadSuccess: jest.fn(),
      onUploadError: jest.fn()
    });

    expect(store.getUploadValidationMessage()).toBeNull();
  });
});
