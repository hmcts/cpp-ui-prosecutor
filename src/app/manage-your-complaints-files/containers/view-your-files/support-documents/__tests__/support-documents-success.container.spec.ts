import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { SupportDocumentsSuccessContainer } from '../support-documents-success.container';
import { ViewYourFilesStore } from '../../../../signal-store/view-your-files.store';

describe('SupportDocumentsSuccessContainer', () => {
  let fixture: ComponentFixture<SupportDocumentsSuccessContainer>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SupportDocumentsSuccessContainer],
      providers: [
        { provide: ViewYourFilesStore, useValue: { referenceNumber: () => 'KUJ5953G' } },
        { provide: ActivatedRoute, useValue: {} }
      ],
      teardown: { destroyAfterEach: false }
    });

    fixture = TestBed.createComponent(SupportDocumentsSuccessContainer);
    fixture.detectChanges();
  });

  it('should render the container correctly', () => {
    expect(fixture.nativeElement).toMatchSnapshot();
  });

  it('should show the reference number for the uploaded file', () => {
    expect(fixture.nativeElement.textContent).toContain('Supporting documents uploaded');
    expect(fixture.nativeElement.textContent).toContain('For file');
    expect(fixture.nativeElement.textContent).toContain('KUJ5953G');
  });

  it('should link to view your files', () => {
    const link = fixture.debugElement.query(By.css('a[pdk-link]')).nativeElement;
    expect(link.textContent).toContain('view your files');
  });
});
