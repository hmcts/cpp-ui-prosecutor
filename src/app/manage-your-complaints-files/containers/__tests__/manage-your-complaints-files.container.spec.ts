import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ManageYourComplaintsFilesContainer } from '../manage-your-complaints-files.container';
import { ManageYourComplaintsFilesStore } from '../../signal-store/manage-your-complaints-files.store';

describe('ManageYourComplaintsFilesContainer', () => {
  let fixture: ComponentFixture<ManageYourComplaintsFilesContainer>;
  let showDownloadErrorMessage: WritableSignal<boolean>;
  let downloadCsvTemplate: jest.Mock;
  let resetState: jest.Mock;

  beforeEach(() => {
    showDownloadErrorMessage = signal(false);
    downloadCsvTemplate = jest.fn();
    resetState = jest.fn();

    TestBed.configureTestingModule({
      imports: [ManageYourComplaintsFilesContainer],
      providers: [
        {
          provide: ManageYourComplaintsFilesStore,
          useValue: {
            hasDownloadCsvError: showDownloadErrorMessage,
            downloadCsvTemplate,
            resetState
          }
        },
        { provide: ActivatedRoute, useValue: {} }
      ],
      teardown: { destroyAfterEach: false }
    });

    fixture = TestBed.createComponent(ManageYourComplaintsFilesContainer);
    fixture.detectChanges();
  });

  it('should render the container correctly', () => {
    expect(fixture.nativeElement).toMatchSnapshot();
  });

  it('should not show the download error message by default', () => {
    expect(fixture.debugElement.query(By.css('pdk-alert'))).toBeNull();
  });

  it('should link to the upload-new-files page', () => {
    const link = fixture.debugElement.query(By.css('[data-test-id="upload-new-files"] a')).nativeElement;
    expect(link.getAttribute('routerlink')).toBe('upload-new-files');
  });

  it('should link to the view-your-files page', () => {
    const link = fixture.debugElement.query(By.css('[data-test-id="view-your-files"] a')).nativeElement;
    expect(link.getAttribute('routerlink')).toBe('view-your-files');
  });

  it('should show the download error message when the store reports one', () => {
    showDownloadErrorMessage.set(true);
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('pdk-alert'))).not.toBeNull();
  });

  it('should call the store to download the csv template when requested', () => {
    fixture.debugElement.query(By.css('[data-test-id="download-csv-template"] a')).nativeElement.click();

    expect(downloadCsvTemplate).toHaveBeenCalled();
  });

  it('should reset the store state when the page is left', () => {
    fixture.destroy();

    expect(resetState).toHaveBeenCalled();
  });
});
