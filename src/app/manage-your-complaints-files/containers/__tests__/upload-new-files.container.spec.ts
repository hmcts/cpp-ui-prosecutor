import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { UploadNewFilesContainer } from '../upload-new-files.container';

describe('UploadNewFilesContainer', () => {
  let fixture: ComponentFixture<UploadNewFilesContainer>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UploadNewFilesContainer],
      providers: [{ provide: ActivatedRoute, useValue: {} }],
      teardown: { destroyAfterEach: false }
    });

    fixture = TestBed.createComponent(UploadNewFilesContainer);
    fixture.detectChanges();
  });

  it('should render the container correctly', () => {
    expect(fixture).toMatchSnapshot();
  });
});
