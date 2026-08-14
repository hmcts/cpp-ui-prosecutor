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
    fixture.detectChanges();
  });

  it('should render the container correctly', () => {
    expect(fixture.nativeElement).toMatchSnapshot();
  });

  it('should link back to manage your complaints files', () => {
    const link: HTMLAnchorElement = fixture.nativeElement.querySelector('a[href="/manage-your-complaints-files"]');

    expect(link).not.toBeNull();
    expect(link.textContent).toContain('Go to manage your complaints files');
  });
});
