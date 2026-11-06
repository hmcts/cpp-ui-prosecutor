import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { UploadFailurePageComponent } from '../upload-failure-page.component';

describe('UploadFailurePageComponent', () => {
  let fixture: ComponentFixture<UploadFailurePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UploadFailurePageComponent],
      providers: [{ provide: ActivatedRoute, useValue: {} }],
      teardown: { destroyAfterEach: false }
    });

    fixture = TestBed.createComponent(UploadFailurePageComponent);
    fixture.componentRef.setInput('title', 'Sorry, there is a problem with service');
    fixture.detectChanges();
  });

  it('should render the container correctly', () => {
    expect(fixture.nativeElement).toMatchSnapshot();
  });

  it('should render the title provided via route data', () => {
    fixture.componentRef.setInput('title', 'Document failed to upload');
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('h1').textContent).toContain('Document failed to upload');
  });

  it('should link back to manage your complaints files', () => {
    const link: HTMLAnchorElement = fixture.nativeElement.querySelector('a[href="/manage-your-complaints-files"]');

    expect(link).not.toBeNull();
    expect(link.textContent).toContain('Go to manage your complaints files');
  });
});
