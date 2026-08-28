import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewYourFilesContainer } from '../view-your-files.container';
import { ViewYourFilesStore } from '../../../signal-store/view-your-files.store';
import { ComplaintsFileRecord, ComplaintsFileStatus } from '../../../interface/manage-your-complaints-files';

describe('ViewYourFilesContainer', () => {
  let fixture: ComponentFixture<ViewYourFilesContainer>;
  let result: WritableSignal<ComplaintsFileRecord | null>;
  let searchErrorMessage: WritableSignal<string | null>;
  let searchComplaintsFiles: jest.Mock;
  let downloadErrorReport: jest.Mock;
  let hasDownloadErrorReportError: WritableSignal<boolean>;
  let resetState: jest.Mock;
  let clearErrorStates: jest.Mock;

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
    result = signal(null);
    searchErrorMessage = signal(null);
    searchComplaintsFiles = jest.fn();
    downloadErrorReport = jest.fn();
    hasDownloadErrorReportError = signal(false);
    resetState = jest.fn();
    clearErrorStates = jest.fn();

    TestBed.configureTestingModule({
      imports: [ViewYourFilesContainer],
      providers: [
        {
          provide: ViewYourFilesStore,
          useValue: {
            complaintsFile: result,
            searchErrorMessage,
            searchComplaintsFiles,
            downloadErrorReport,
            hasDownloadErrorReportError,
            resetState,
            clearErrorStates
          }
        },
        { provide: ActivatedRoute, useValue: {} }
      ],
      teardown: { destroyAfterEach: false }
    });

    fixture = TestBed.createComponent(ViewYourFilesContainer);
    fixture.detectChanges();
  });

  it('should render the container correctly', () => {
    expect(fixture.nativeElement).toMatchSnapshot();
  });

  it('should not show a results summary before a search has been made', () => {
    expect(fixture.debugElement.query(By.css('dl[pdk-summary-list]'))).toBeNull();
  });

  it('should search the store with the entered search term', () => {
    fixture.componentInstance.referenceNumber.set('dummy-id-1');

    fixture.componentInstance.search();

    expect(searchComplaintsFiles).toHaveBeenCalledWith('dummy-id-1');
    expect(fixture.componentInstance.hasSearched()).toBe(true);
  });

  it('should show the matching record once a search has been made', () => {
    fixture.componentInstance.hasSearched.set(true);
    result.set(complaintsFile);
    fixture.detectChanges();

    const row = fixture.debugElement.query(By.css('[data-role="reference"]')).nativeElement;
    expect(row.textContent).toContain('dummy-id-1');
    expect(fixture.nativeElement.textContent).toContain('File processing');
    expect(fixture.debugElement.query(By.css('[data-role="no-results"]'))).toBeNull();
  });

  it('should show the status as a red tag with a "View error report" link when the upload failed', () => {
    fixture.componentInstance.hasSearched.set(true);
    result.set({ ...complaintsFile, status: ComplaintsFileStatus.FAILED });
    fixture.detectChanges();

    const tag = fixture.debugElement.query(By.css('pdk-tag'));
    expect(tag.attributes['color']).toBe('red');
    expect(tag.nativeElement.textContent).toContain('Upload failed');

    const link = fixture.debugElement.query(By.css('[data-role="file-action"]')).nativeElement;
    expect(link.textContent).toContain('View error report');
  });

  it('should download the error report when the "View error report" link is clicked', () => {
    fixture.componentInstance.hasSearched.set(true);
    result.set({ ...complaintsFile, status: ComplaintsFileStatus.FAILED });
    fixture.detectChanges();

    fixture.debugElement.query(By.css('[data-role="file-action"]')).triggerEventHandler('click', new Event('click'));

    expect(downloadErrorReport).toHaveBeenCalledWith(complaintsFile.id);
  });

  it('should not show a download error report error by default', () => {
    expect(fixture.debugElement.query(By.css('pdk-alert'))).toBeNull();
  });

  it('should show a download error report error when downloading the error report fails', () => {
    hasDownloadErrorReportError.set(true);
    fixture.detectChanges();

    const alert = fixture.debugElement.query(By.css('pdk-alert')).nativeElement;
    expect(alert.textContent).toContain('Unable to download the error report at the moment');
  });

  it('should show an "Add supporting documents" link when pending court decision', () => {
    fixture.componentInstance.hasSearched.set(true);
    result.set({ ...complaintsFile, status: ComplaintsFileStatus.PENDING_COURT_DECISION });
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('pdk-tag'))).toBeNull();
    expect(fixture.nativeElement.textContent).toContain('Add supporting documents');
  });

  it('should show the status label and no action link when the case was created successfully', () => {
    fixture.componentInstance.hasSearched.set(true);
    result.set({ ...complaintsFile, status: ComplaintsFileStatus.SUCCESS });
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('pdk-tag'))).toBeNull();
    expect(fixture.nativeElement.textContent).toContain('Case Created Successfully');
    expect(fixture.debugElement.query(By.css('[data-role="file-action"]'))).toBeNull();
  });

  it('should show a no results message when the search finds nothing', () => {
    fixture.componentInstance.referenceNumber.set('dummy-id-1');
    fixture.componentInstance.search();
    result.set(null);
    fixture.detectChanges();

    const message = fixture.debugElement.query(By.css('[data-role="no-results"]')).nativeElement;
    expect(message.textContent).toContain('No results found. Please check your reference number and try again.');
    expect(fixture.debugElement.query(By.css('dl[pdk-summary-list]'))).toBeNull();
  });

  it('should show the error summary and not search when submitted with an empty reference number', () => {
    fixture.debugElement.query(By.css('form')).triggerEventHandler('submit', new Event('submit'));
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('pdk-error-summary'))).not.toBeNull();
    expect(fixture.nativeElement.textContent).toContain('Enter a reference number');
    expect(searchComplaintsFiles).not.toHaveBeenCalled();
  });

  it('should show the error summary and not search when submitted with an invalid reference number', () => {
    const input = fixture.debugElement.query(By.css('[data-role="search-input"]')).nativeElement;
    input.value = 'dummy id!';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    fixture.debugElement.query(By.css('form')).triggerEventHandler('submit', new Event('submit'));
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('pdk-error-summary'))).not.toBeNull();
    expect(fixture.nativeElement.textContent).toContain(
      'Reference number must only contain letters, numbers and hyphens'
    );
    expect(searchComplaintsFiles).not.toHaveBeenCalled();
  });

  it('should show a backend validation message when the reference number is rejected as invalid', () => {
    searchErrorMessage.set('Enter a valid reference number');
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Enter a valid reference number');
  });

  it('should reset the store when the "Back" link is clicked', () => {
    fixture.debugElement.query(By.css('back-button a')).triggerEventHandler('click', new Event('click'));

    expect(resetState).toHaveBeenCalled();
  });

  it('should show the previously found record on creation, e.g. when returning from supporting documents', () => {
    result.set({ ...complaintsFile, status: ComplaintsFileStatus.PENDING_COURT_DECISION });

    const newFixture = TestBed.createComponent(ViewYourFilesContainer);
    newFixture.detectChanges();

    expect(newFixture.componentInstance.hasSearched()).toBe(true);
    expect(newFixture.debugElement.query(By.css('dl[pdk-summary-list]'))).not.toBeNull();
  });
});
