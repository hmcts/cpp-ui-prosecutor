import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
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
  let dispatch: jest.Mock;

  beforeEach(() => {
    fetchCsvTemplate = jest.fn();
    dispatch = jest.fn();

    TestBed.configureTestingModule({
      providers: [
        ManageYourComplaintsFilesStore,
        { provide: ManageYourComplaintsFilesService, useValue: { fetchCsvTemplate } },
        { provide: Router, useValue: {} },
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
    expect(store.getShowDownloadErrorMessage()).toBe(false);
  });

  it('should save the csv template when the download succeeds', () => {
    const blob = new Blob(['a,b,c'], { type: 'text/csv' });
    fetchCsvTemplate.mockReturnValue(of(blob));

    store.downloadCsvTemplate();

    expect(FileSaver.saveAs).toHaveBeenCalledWith(blob, 'complaints-files-template.csv');
    expect(store.getShowDownloadErrorMessage()).toBe(false);
  });

  it('should show the download error message when the download fails', () => {
    fetchCsvTemplate.mockReturnValue(throwError(() => new Error('network error')));

    store.downloadCsvTemplate();

    expect(store.getShowDownloadErrorMessage()).toBe(true);
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
    expect(store.getShowDownloadErrorMessage()).toBe(true);

    fetchCsvTemplate.mockReturnValue(of(new Blob()));
    store.downloadCsvTemplate();

    expect(store.getShowDownloadErrorMessage()).toBe(false);
  });

  it('should reset the state back to its initial values', () => {
    fetchCsvTemplate.mockReturnValue(throwError(() => new Error('network error')));
    store.downloadCsvTemplate();
    expect(store.getShowDownloadErrorMessage()).toBe(true);

    store.resetState();

    expect(store.getShowDownloadErrorMessage()).toBe(false);
    expect(store.getReferenceNumber()).toBe('');
  });
});
