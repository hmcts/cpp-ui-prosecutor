import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, provideRouter, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UploadNewFilesContainer } from '../upload-new-files.container';
import { ManageYourComplaintsFilesStore } from '../../../signal-store/manage-your-complaints-files.store';
import { ComplaintsFileRoutes } from '../../../manage-your-complaints-files.routes';
import { NewFilesRoutes } from '../upload-new-files.routes';

describe('UploadNewFilesContainer', () => {
  let fixture: ComponentFixture<UploadNewFilesContainer>;
  let router: Router;
  let showDownloadErrorMessage: WritableSignal<boolean>;
  let uploadErrorMessage: WritableSignal<string | null>;
  let downloadCsvTemplate: jest.Mock;
  let validateUploadCsvFile: jest.Mock;
  let setUploadErrorMessage: jest.Mock;
  let setUploadCsvFailed: jest.Mock;

  beforeEach(() => {
    showDownloadErrorMessage = signal(false);
    uploadErrorMessage = signal(null);
    downloadCsvTemplate = jest.fn();
    validateUploadCsvFile = jest.fn();
    setUploadErrorMessage = jest.fn();
    setUploadCsvFailed = jest.fn();

    TestBed.configureTestingModule({
      imports: [UploadNewFilesContainer],
      providers: [
        provideRouter([]),
        {
          provide: ManageYourComplaintsFilesStore,
          useValue: {
            getDownloadError: showDownloadErrorMessage,
            getUploadValidationMessage: uploadErrorMessage,
            downloadCsvTemplate,
            validateUploadCsvFile,
            setUploadErrorMessage,
            setUploadCsvFailed
          }
        },
        { provide: ActivatedRoute, useValue: {} }
      ],
      teardown: { destroyAfterEach: false }
    });

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(UploadNewFilesContainer);
    fixture.detectChanges();
  });

  it('should render the container correctly', () => {
    expect(fixture.nativeElement).toMatchSnapshot();
  });

  it('should call the store to upload the selected file with success and error callbacks', () => {
    const file = new File(['a,b,c'], 'complaints.csv', { type: 'text/csv' });

    fixture.componentInstance.onFileSubmitted(file);

    expect(validateUploadCsvFile).toHaveBeenCalledWith(
      expect.objectContaining({
        file,
        onUploadSuccess: expect.any(Function),
        onUploadError: expect.any(Function)
      })
    );
  });

  it('should navigate to the success screen when the upload succeeds', () => {
    const navigateSpy = jest.spyOn(router, 'navigate');
    validateUploadCsvFile.mockImplementation(({ onUploadSuccess }) => onUploadSuccess('REF123'));

    fixture.componentInstance.onFileSubmitted(new File(['a,b,c'], 'complaints.csv'));

    expect(navigateSpy).toHaveBeenCalledWith([
      'manage-your-complaints-files',
      ComplaintsFileRoutes.UPLOAD_NEW_FILES,
      NewFilesRoutes.SUCCESS
    ]);
  });

  it('should show a backend validation error inline when the upload is rejected with a 400', () => {
    const navigateSpy = jest.spyOn(router, 'navigate');
    const error = new HttpErrorResponse({
      status: 400,
      error: JSON.stringify({ error: 'File size must not exceed 2MB' })
    });
    validateUploadCsvFile.mockImplementation(({ onUploadError }) => onUploadError(error));

    fixture.componentInstance.onFileSubmitted(new File(['a,b,c'], 'complaints.csv'));

    expect(setUploadErrorMessage).toHaveBeenCalledWith('File size must not exceed 2MB');
    expect(navigateSpy).not.toHaveBeenCalled();
  });

  it('should redirect to the failure screen when the upload fails for a reason other than validation', () => {
    const navigateSpy = jest.spyOn(router, 'navigate');
    const error = new HttpErrorResponse({ status: 500 });
    validateUploadCsvFile.mockImplementation(({ onUploadError }) => onUploadError(error));

    fixture.componentInstance.onFileSubmitted(new File(['a,b,c'], 'complaints.csv'));

    expect(navigateSpy).toHaveBeenCalledWith([
      'manage-your-complaints-files',
      ComplaintsFileRoutes.UPLOAD_NEW_FILES,
      NewFilesRoutes.FAILURE
    ]);
    expect(setUploadErrorMessage).not.toHaveBeenCalled();
  });

  it('should display a backend validation error returned by the store, inline and in the summary', fakeAsync(() => {
    uploadErrorMessage.set('File size must not exceed 2MB');

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('File size must not exceed 2MB');
  }));
});
