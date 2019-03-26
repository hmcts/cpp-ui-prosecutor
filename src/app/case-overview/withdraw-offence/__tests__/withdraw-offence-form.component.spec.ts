import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { PdkCoreModule, PdkFormModule, PdkGridModule } from '@cpp/pdk';
import { WithdrawOffenceFormComponent } from '../withdraw-offence-form.component';
import { Offence } from '../../../contexts/sjp';
import { MOCK_OFFENCES } from '../../__tests__/test-mock-data';
import { CommonModule } from '@angular/common';

describe('WithdrawOffenceFormComponent', () => {
  let fixture: ComponentFixture<TestWithdrawOffenceListFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WithdrawOffenceFormComponent, TestWithdrawOffenceListFormComponent],
      imports: [CommonModule, PdkFormModule, PdkCoreModule, PdkGridModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(TestWithdrawOffenceListFormComponent);
    fixture.componentInstance.offences = MOCK_OFFENCES;
  });

  it('should compile correctly', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should display the offences', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  @Component({
    selector: 'test-withdraw-list-form-',
    template: `
      <withdraw-list-form [offences]="offences"> </withdraw-list-form>
    `
  })
  class TestWithdrawOffenceListFormComponent {
    offences: Offence[];
    form = jest.fn();
  }
});
