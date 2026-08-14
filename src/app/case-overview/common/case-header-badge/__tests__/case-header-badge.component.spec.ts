import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CaseHeaderBadgeComponent } from '../case-header-badge.component';
import { MOCK_CASE } from '../../../__tests__/test-mock-data';

describe('CaseHeaderBadgeComponent', () => {
  let fixture: ComponentFixture<CaseHeaderBadgeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CaseHeaderBadgeComponent],
      teardown: { destroyAfterEach: false }
    });

    fixture = TestBed.createComponent(CaseHeaderBadgeComponent);
    fixture.componentInstance.kase = MOCK_CASE;
  });

  it('should compile correctly', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
