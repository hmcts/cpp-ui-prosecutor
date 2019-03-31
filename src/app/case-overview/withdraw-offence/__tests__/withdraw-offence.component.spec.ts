import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WithdrawOffenceComponent } from '../withdraw-offence.component';
import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { PdkCoreModule, PdkErrorSummaryModule, PdkGridModule } from '@cpp/pdk';
import { Case, Offence } from '../../../contexts/sjp';
import { MOCK_CASE, MOCK_OFFENCES } from '../../__tests__/test-mock-data';

describe('WithdrawOffenceComponent', () => {
  let component: WithdrawOffenceComponent;
  let fixture: ComponentFixture<WithdrawOffenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WithdrawOffenceComponent],
      imports: [PdkCoreModule, PdkGridModule, PdkErrorSummaryModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(WithdrawOffenceComponent);
    component = fixture.componentInstance;
  });

  it('should compile correctly', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should display the offence component', () => {
    fixture.componentInstance.offences = MOCK_OFFENCES;
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
    selector: 'withdraw-list-form',
    template: `
      <pre>{{ kase | json }}</pre>
    `
  })
  class MockWithdrawOffenceListFormComponent {
    @Input() kase: any;
  }

  @Component({
    selector: 'withdraw-offence-list-test',
    template: `
      <withdraw-offence-list [offences]="offences" [kase]="kase"> </withdraw-offence-list>
    `
  })
  class TestWithdrawOffenceListComponent {
    kase: Case;
    offences: Offence[];
  }
});
