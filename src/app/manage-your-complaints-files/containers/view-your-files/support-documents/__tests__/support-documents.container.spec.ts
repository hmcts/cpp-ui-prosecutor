import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { SupportDocumentsContainer } from '../support-documents.container';

describe('SupportDocumentsContainer', () => {
  let fixture: ComponentFixture<SupportDocumentsContainer>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SupportDocumentsContainer],
      providers: [{ provide: ActivatedRoute, useValue: {} }],
      teardown: { destroyAfterEach: false }
    });

    fixture = TestBed.createComponent(SupportDocumentsContainer);
    fixture.detectChanges();
  });

  it('should render the container correctly', () => {
    expect(fixture).toMatchSnapshot();
  });
});
