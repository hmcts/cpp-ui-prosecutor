import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { PdkCoreModule, PdkFormModule, PdkGridModule } from '@cpp/pdk';
import { WithdrawOffenceFormComponent } from '../withdraw-offence-form.component';
import { Offence } from '../../../contexts/sjp';
import { MOCK_OFFENCES } from '../../__tests__/test-mock-data';

describe('WithdrawOffenceFormComponent', () => {
  let fixture: ComponentFixture<TestWithdrawOffenceListFormComponent>;
  let component: WithdrawOffenceFormComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WithdrawOffenceFormComponent, TestWithdrawOffenceListFormComponent],
      imports: [PdkFormModule, PdkCoreModule, PdkGridModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(TestWithdrawOffenceListFormComponent);
    component = fixture.componentInstance;
  });

  it('should compile correctly', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should display the offences', () => {
    fixture.componentInstance.offences = MOCK_OFFENCES;
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
