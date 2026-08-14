import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ViewYourFilesComponent } from '../view-your-files.component';

describe('ViewYourFilesComponent', () => {
  let fixture: ComponentFixture<ViewYourFilesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ViewYourFilesComponent],
      providers: [{ provide: ActivatedRoute, useValue: {} }],
      teardown: { destroyAfterEach: false }
    });

    fixture = TestBed.createComponent(ViewYourFilesComponent);
    fixture.detectChanges();
  });

  it('should render the component correctly', () => {
    expect(fixture).toMatchSnapshot();
  });
});
