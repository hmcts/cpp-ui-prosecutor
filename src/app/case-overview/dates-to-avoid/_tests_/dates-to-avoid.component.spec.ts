import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PdkCoreModule, PdkErrorSummaryModule, PdkGridModule } from '@cpp/pdk';
import { MOCK_CASE } from '../../__tests__/test-mock-data';
import { DatesToAvoidComponent } from '../dates-to-avoid.component';
import { MockModule } from '../../../shared/mock-components/mock.module';

describe('DatesToAvoidComponent', () => {
  let fixture: ComponentFixture<DatesToAvoidComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatesToAvoidComponent],
      imports: [PdkCoreModule, PdkGridModule, PdkErrorSummaryModule, MockModule],
      schemas: [NO_ERRORS_SCHEMA],
      teardown: { destroyAfterEach: false }
    }).compileComponents();

    fixture = TestBed.createComponent(DatesToAvoidComponent);
    fixture.componentInstance.kase = { id: 'case-id' } as any;
  });

  it('should compile correctly', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should display the dates to avoid component', () => {
    fixture.componentInstance.displayDatesToAvoidBanner = false;
    fixture.componentInstance.kase = MOCK_CASE;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should display confirmation banner', () => {
    fixture.componentInstance.displayDatesToAvoidBanner = true;
    fixture.componentInstance.kase = MOCK_CASE;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
