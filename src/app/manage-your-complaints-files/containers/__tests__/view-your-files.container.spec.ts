import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ViewYourFilesContainer } from '../view-your-files.container';

describe('ViewYourFilesContainer', () => {
  let fixture: ComponentFixture<ViewYourFilesContainer>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ViewYourFilesContainer],
      providers: [{ provide: ActivatedRoute, useValue: {} }],
      teardown: { destroyAfterEach: false }
    });

    fixture = TestBed.createComponent(ViewYourFilesContainer);
    fixture.detectChanges();
  });

  it('should render the container correctly', () => {
    expect(fixture).toMatchSnapshot();
  });
});
