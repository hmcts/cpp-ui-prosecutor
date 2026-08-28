import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { UploadSuccessContainer } from '../upload-success.container';
import { ManageYourComplaintsFilesStore } from '../../../signal-store/manage-your-complaints-files.store';

describe('UploadSuccessContainer', () => {
  let fixture: ComponentFixture<UploadSuccessContainer>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UploadSuccessContainer],
      providers: [
        { provide: ManageYourComplaintsFilesStore, useValue: { referenceNumber: () => 'dummy-id-1' } },
        { provide: ActivatedRoute, useValue: {} }
      ],
      teardown: { destroyAfterEach: false }
    });

    fixture = TestBed.createComponent(UploadSuccessContainer);
    fixture.detectChanges();
  });

  it('should render the container correctly', () => {
    expect(fixture.nativeElement).toMatchSnapshot();
  });

  it('should show the reference number for the uploaded file', () => {
    expect(fixture.nativeElement.textContent).toContain('File is being processed');
    expect(fixture.nativeElement.textContent).toContain('Your reference number is');
    expect(fixture.nativeElement.textContent).toContain('dummy-id-1');
  });

  it('should link to view your files', () => {
    const links = fixture.debugElement.queryAll(By.css('a[pdk-link]'));
    const link = links.find(debugEl => (debugEl.nativeElement.textContent as string).includes('view your files'));

    expect(link).toBeDefined();
  });

  it('should link back to upload another complaints list', () => {
    const links = fixture.debugElement.queryAll(By.css('a[pdk-link]'));
    const link = links.find(debugEl =>
      (debugEl.nativeElement.textContent as string).includes('Upload another complaints list')
    );

    expect(link).toBeDefined();
  });
});
