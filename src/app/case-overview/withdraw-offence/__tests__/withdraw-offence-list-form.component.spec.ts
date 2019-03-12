import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { PdkCoreModule, PdkFormModule, PdkGridModule } from '@cpp/pdk';
import { WithdrawOffenceListFormComponent } from '../withdraw-offence-list-form.component';
import { Offence } from '../../../contexts/sjp';
import { MOCK_OFFENCES } from '../../__tests__/test-mock-data';

describe('WithdrawOffenceListFormComponent', () => {
  let fixture: ComponentFixture<TestWithdrawOffenceListFormComponent>;
  let component: WithdrawOffenceListFormComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WithdrawOffenceListFormComponent, TestWithdrawOffenceListFormComponent],
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

  @Component({
    selector: 'test-withdraw-list-form-',
    template: `
      <withdraw-list-form> </withdraw-list-form>
    `
  })
  class TestWithdrawOffenceListFormComponent {
    offences: Offence[] = MOCK_OFFENCES;
    form = jest.fn();
  }
});
