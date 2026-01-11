import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { MOCK_CASE } from '../../../__tests__/test-mock-data';
import { DefendantOffenceComponent } from '../defendant-offence.component';
import { Case, Offence } from '../../../../contexts/sjp';
import { DefendantOffenceWarningsComponent } from '../defendant-offence-warnings.component';

describe('DefendantOffenceComponent', () => {
  const offence1 = MOCK_CASE.defendant.offences[0];
  const offence2 = MOCK_CASE.defendant.offences[1];

  let fixture: ComponentFixture<TestDefendantOffenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MockDefendantOffenceWarningsComponent, TestDefendantOffenceComponent, DefendantOffenceComponent],
      teardown: { destroyAfterEach: false }
    });

    fixture = TestBed.createComponent(TestDefendantOffenceComponent);
    fixture.componentInstance.kase = MOCK_CASE;
  });

  it('should compile correctly', () => {
    fixture.componentInstance.offence = offence1;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should display "Pending Withdrawal" if there is withdrawal reason', () => {
    fixture.componentInstance.kase = {
      ...MOCK_CASE,
      completed: false
    };
    fixture.componentInstance.offence = {
      ...offence1,
      withdrawalRequestReason: 'with reason',
      withdrawalRequestReasonId: '1'
    };
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should not show "Pending Withdrawal" if the reason is empty', () => {
    fixture.componentInstance.kase = {
      ...MOCK_CASE,
      completed: false
    };
    fixture.componentInstance.offence = {
      ...offence1,
      withdrawalRequestReason: '',
      withdrawalRequestReasonId: null
    };
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should not show "Pending Withdrawal" if the case is completed', () => {
    fixture.componentInstance.kase = {
      ...MOCK_CASE,
      completed: true
    };
    fixture.componentInstance.offence = {
      ...offence1,
      withdrawalRequestReason: 'some reason',
      withdrawalRequestReasonId: '1'
    };
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should compile correctly with the offence is pending withdrawal', () => {
    fixture.componentInstance.kase = {
      ...MOCK_CASE,
      completed: false
    };
    fixture.componentInstance.offence = offence2;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should compile correctly with offence warnings', () => {
    fixture.componentInstance.kase = MOCK_CASE;
    fixture.componentInstance.offence = {
      ...offence1,
      outOfTime: true,
      notInEffect: true,
      imprisonable: true
    };
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  @Component({
    selector: 'defendant-offence-test',
    template: `
      <defendant-offence [offence]="offence" [kase]="kase"> </defendant-offence>
    `,
    imports: [DefendantOffenceComponent]
  })
  class TestDefendantOffenceComponent {
    offence: Offence;
    kase: Case;
  }

  @Component({
    selector: 'defendant-offence-warnings',
    template: `
      {{ offence | json }}
    `,
    imports: [DefendantOffenceWarningsComponent]
  })
  class MockDefendantOffenceWarningsComponent {
    @Input() offence: Offence;
  }
});
