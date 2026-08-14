import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { UploadNewFilesComponent } from '../upload-new-files.component';

describe('UploadNewFilesComponent', () => {
  let fixture: ComponentFixture<UploadNewFilesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UploadNewFilesComponent],
      providers: [{ provide: ActivatedRoute, useValue: {} }],
      teardown: { destroyAfterEach: false }
    });

    fixture = TestBed.createComponent(UploadNewFilesComponent);
    fixture.detectChanges();
  });

  it('should render the component correctly', () => {
    expect(fixture).toMatchSnapshot();
  });
});
