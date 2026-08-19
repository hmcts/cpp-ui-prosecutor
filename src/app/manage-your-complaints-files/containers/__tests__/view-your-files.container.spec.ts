import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewYourFilesContainer } from '../view-your-files/view-your-files.container';
import { ViewYourFilesStore } from '../../signal-store/view-your-files.store';
import { ComplaintsFileRecord } from '../../models/manage-your-complaints-files';

describe('ViewYourFilesContainer', () => {
  let fixture: ComponentFixture<ViewYourFilesContainer>;
  let result: WritableSignal<ComplaintsFileRecord | null>;
  let searchErrorMessage: WritableSignal<string | null>;
  let searchComplaintsFiles: jest.Mock;

  const complaintsFile: ComplaintsFileRecord = {
    reference: 'KUJ5953G',
    dateUploaded: '16 June 2026',
    status: 'File processing',
    action: null,
    fileName: 'complaints-list-KM',
    uploadedBy: 'Sarah Hall'
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
    expect(fixture).toMatchSnapshot();
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
    expect(fixture.debugElement.query(By.css('[data-role="no-results"]'))).toBeNull();
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
