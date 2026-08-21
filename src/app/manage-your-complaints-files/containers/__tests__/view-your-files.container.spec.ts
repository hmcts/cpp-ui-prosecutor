import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewYourFilesContainer } from '../view-your-files/view-your-files.container';
import { ViewYourFilesStore } from '../../signal-store/view-your-files.store';
import { ComplaintsFileRecord, ComplaintsFileStatus } from '../../models/manage-your-complaints-files';

describe('ViewYourFilesContainer', () => {
  let fixture: ComponentFixture<ViewYourFilesContainer>;
  let result: WritableSignal<ComplaintsFileRecord | null>;
  let searchErrorMessage: WritableSignal<string | null>;
  let searchComplaintsFiles: jest.Mock;

  const complaintsFile: ComplaintsFileRecord = {
    id: 'KUJ5953G',
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
    result = signal(null);
    searchErrorMessage = signal(null);
    searchComplaintsFiles = jest.fn();

    TestBed.configureTestingModule({
      imports: [ViewYourFilesContainer],
      providers: [
        {
          provide: ViewYourFilesStore,
          useValue: { complaintsFile: result, searchErrorMessage, searchComplaintsFiles }
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

  it('should not show a results table before a search has been made', () => {
    expect(fixture.debugElement.query(By.css('table'))).toBeNull();
  });

  it('should search the store with the entered search term', () => {
    fixture.componentInstance.referenceNumber.set('KUJ5953G');

    fixture.componentInstance.search();

    expect(searchComplaintsFiles).toHaveBeenCalledWith('KUJ5953G');
    expect(fixture.componentInstance.hasSearched()).toBe(true);
  });

  it('should show the matching record in a table once a search has been made', () => {
    fixture.componentInstance.hasSearched.set(true);
    result.set(complaintsFile);
    fixture.detectChanges();

    const row = fixture.debugElement.query(By.css('[data-role="reference"]')).nativeElement;
    expect(row.textContent).toContain('KUJ5953G');
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

  it('should show an "Add supporting documents" link when awaiting court decision', () => {
    fixture.componentInstance.hasSearched.set(true);
    result.set({ ...complaintsFile, status: ComplaintsFileStatus.AWAITING_APPROVAL });
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('pdk-tag'))).toBeNull();
    expect(fixture.nativeElement.textContent).toContain('Add supporting documents');
  });

  it('should show a no results message when the search finds nothing', () => {
    fixture.componentInstance.referenceNumber.set('KUJ5953G');
    fixture.componentInstance.search();
    result.set(null);
    fixture.detectChanges();

    const message = fixture.debugElement.query(By.css('[data-role="no-results"]')).nativeElement;
    expect(message.textContent).toContain('No results found. Please check your reference number and try again.');
    expect(fixture.debugElement.query(By.css('table'))).toBeNull();
  });

  it('should show the error summary and not search when submitted with an empty reference number', () => {
    fixture.debugElement.query(By.css('form')).triggerEventHandler('submit', new Event('submit'));
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('pdk-error-summary'))).not.toBeNull();
    expect(fixture.nativeElement.textContent).toContain('Enter a reference number');
    expect(searchComplaintsFiles).not.toHaveBeenCalled();
  });

  it('should show a backend validation message when the reference number is rejected as invalid', () => {
    searchErrorMessage.set('Enter a valid reference number');
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Enter a valid reference number');
  });
});
