import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { OffenceWithdrawalComponent } from '../offence-withdrawal.component';
import { MOCK_OFFENCES } from '../../../../__tests__/test-mock-data';
import { Offence } from '../../../../../contexts/sjp/index';
import { By } from '@angular/platform-browser';
import { Option } from '../../../../../shared/interfaces';
import { FormsModule } from '@angular/forms';
import { provideStore } from '@ngrx/store';

describe('OffenceWithdrawalComponent', () => {
  let fixture: ComponentFixture<TestOffenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestOffenceComponent, OffenceWithdrawalComponent, FormsModule],
      providers: [provideStore()],
      teardown: { destroyAfterEach: false }
    });
    fixture = TestBed.createComponent(TestOffenceComponent);

    fixture.componentInstance.offence = MOCK_OFFENCES[0];
    fixture.componentInstance.index = 1;
    fixture.componentInstance.offenceWithdrawalReasons = [
      { value: '1', label: 'First option' },
      { value: '2', label: 'Second option' }
    ];

    fixture.detectChanges();
  });

  it('should compile correctly', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should display the PENDING_WITHDRAWAL badge if there is a reason property present on the offence', () => {
    fixture.componentInstance.offence.reason = 'test-reason-id';
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should display the reasons options when yes is selected', () => {
    fixture.debugElement.query(By.css('pdk-radio-group[name=offenceId1]'));
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  @Component({
    selector: 'offence-component-test',
    template: `
      <form #form="ngForm">
        <offence-withdrawal-component
          [offence]="offence"
          [index]="1"
          [offenceWithdrawalReasons]="offenceWithdrawalReasons"
        ></offence-withdrawal-component>
      </form>
    `,
    imports: [FormsModule, OffenceWithdrawalComponent]
  })
  class TestOffenceComponent {
    offence: Offence;
    index: number;
    offenceWithdrawalReasons: Option[];
  }
});
