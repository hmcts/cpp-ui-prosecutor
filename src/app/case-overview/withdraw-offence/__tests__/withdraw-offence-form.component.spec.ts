import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { PdkBadgeModule, PdkCoreModule, PdkFormModule, PdkGridModule, PdkRadioInputModule } from '@cpp/pdk';
import { WithdrawOffenceFormComponent } from '../withdraw-offence-form.component';
import { Offence } from '../../../contexts/sjp';
import { MOCK_OFFENCES } from '../../__tests__/test-mock-data';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Option } from '../../../shared/interfaces';

describe('WithdrawOffenceFormComponent', () => {
  let fixture: ComponentFixture<TestWithdrawOffenceListFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        WithdrawOffenceFormComponent,
        TestWithdrawOffenceListFormComponent,
        MockOffenceWithdrawalComponent
      ],
      imports: [
        CommonModule,
        FormsModule,
        PdkFormModule,
        PdkCoreModule,
        PdkGridModule,
        PdkBadgeModule,
        PdkRadioInputModule
      ]
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
    `
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
    `
  })
  class MockOffenceWithdrawalComponent {
    @Input() index: number;
    @Input() offence: Offence;
    @Input() caseWithdrawn: boolean;
    @Input() offenceWithdrawalReasons: Option[];
  }
});
