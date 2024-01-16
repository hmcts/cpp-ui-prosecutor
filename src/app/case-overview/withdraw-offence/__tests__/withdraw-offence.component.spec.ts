import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WithdrawOffenceComponent } from '../withdraw-offence.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PdkCoreModule, PdkErrorSummaryModule, PdkGridModule } from '@cpp/pdk';
import { MOCK_CASE, MOCK_OFFENCES } from '../../__tests__/test-mock-data';

describe('WithdrawOffenceComponent', () => {
  let fixture: ComponentFixture<WithdrawOffenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WithdrawOffenceComponent],
      imports: [PdkCoreModule, PdkGridModule, PdkErrorSummaryModule],
      schemas: [NO_ERRORS_SCHEMA],
      teardown: { destroyAfterEach: false }
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(WithdrawOffenceComponent);
        fixture.componentInstance.kase = MOCK_CASE;
      });
  });

  it('should compile correctly', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should display the offence component', () => {
    fixture.componentInstance.offences = MOCK_OFFENCES;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
