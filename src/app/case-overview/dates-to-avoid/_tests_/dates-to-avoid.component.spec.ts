import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { PdkCoreModule, PdkErrorSummaryModule, PdkGridModule } from '@cpp/pdk';
import { Case } from '../../../contexts/sjp';
import { MOCK_CASE } from '../../__tests__/test-mock-data';
import { DatesToAvoidComponent } from '../dates-to-avoid.component';
import { MockModule } from '../../../shared/mock-components/mock.module';

describe('DatesToAvoidComponent', () => {
  let component: DatesToAvoidComponent;
  let fixture: ComponentFixture<DatesToAvoidComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatesToAvoidComponent],
      imports: [PdkCoreModule, PdkGridModule, PdkErrorSummaryModule, MockModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DatesToAvoidComponent);
    fixture.componentInstance.kase = {id: 'case-id'} as any;
    component = fixture.componentInstance;
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

  @Component({
    selector: 'case-header-badge',
    template: `
      <pre>{{ kase | json }}</pre>
    `
  })
  class MockCaseHeaderBadgeComponent {
    @Input() kase: any;
  }

  @Component({
    selector: 'dates-to-avoid-form',
    template: `
      <pre>{{ kase | json }}</pre>
    `
  })
  class MockDatesToAvoidFormComponent {
    @Input() kase: any;
  }

  @Component({
    selector: 'dates-to-avoid-page-test',
    template: `
      <dates-to-avoid-page [kase]="kase" [displayDatesToAvoidBanner]="displayDatesToAvoidBanner"></dates-to-avoid-page>
    `
  })
  class TestDatesToAvoidComponent {
    kase: Case;
    displayDatesToAvoidBanner: boolean;
  }
});
