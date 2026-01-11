import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { WithdrawOffenceFormComponent } from '../withdraw-offence-form.component';
import { Offence } from '../../../contexts/sjp';
import { MOCK_OFFENCES } from '../../__tests__/test-mock-data';
import { FormsModule } from '@angular/forms';
import { Option } from '../../../shared/interfaces';
import { OffenceWithdrawalComponent } from '../components/offence-withdrawal/offence-withdrawal.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('WithdrawOffenceFormComponent', () => {
  let fixture: ComponentFixture<TestWithdrawOffenceListFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        TestWithdrawOffenceListFormComponent,
        MockOffenceWithdrawalComponent,
        WithdrawOffenceFormComponent
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { id: '123' } },
            params: of({ id: '123' })
          }
        }
      ],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
    fixture = TestBed.createComponent(TestWithdrawOffenceListFormComponent);
    fixture.componentInstance.offences = MOCK_OFFENCES;
  });

  it('should compile correctly', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  @Component({
    selector: 'test-withdraw-list-form',
    template: `
      <withdraw-list-form
        [offences]="offences"
        [caseWithdrawnStatus]="caseWithdrawnStatus"
        [offenceWithdrawalReasons]="offenceWithdrawalReasons"
        (errors)="errors = $event"
        (submitOffenceWithdrawals)="formSubmit.emit($event)"
      >
      </withdraw-list-form>
    `,
    imports: [TestWithdrawOffenceListFormComponent, WithdrawOffenceFormComponent]
  })
  class TestWithdrawOffenceListFormComponent {
    offences: Offence[];
    offenceWithdrawalReasons: Option[];
    form = jest.fn();
    formSubmit = jest.fn();
    errors = jest.fn();
  }

  @Component({
    selector: 'offence-withdrawal-component',
    template: `
      <span></span>
    `,
    imports: [OffenceWithdrawalComponent]
  })
  class MockOffenceWithdrawalComponent {
    @Input() index: number;
    @Input() offence: Offence;
    @Input() caseWithdrawn: boolean;
    @Input() offenceWithdrawalReasons: Option[];
  }
});
