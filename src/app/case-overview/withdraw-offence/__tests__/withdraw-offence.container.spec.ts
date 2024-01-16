import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { WithdrawOffenceContainer } from '../withdraw-offence.container';
import { StoreModule } from '@ngrx/store';
import { caseOverviewReducer } from '../../case-overview.reducer';
import { reducers } from '../../../core/reducers';
import { Option } from '../../../shared/interfaces';

describe('WithdrawOffenceContainer', () => {
  let fixture: ComponentFixture<WithdrawOffenceContainer>;
  let navigate: jest.Mock;

  beforeEach(() => {
    navigate = jest.fn();
    TestBed.configureTestingModule({
      declarations: [WithdrawOffenceContainer, MockWithdrawOffenceListComponent],
      imports: [
        StoreModule.forRoot(reducers, { runtimeChecks: {} }),
        StoreModule.forFeature('kase', caseOverviewReducer)
      ],
      providers: [
        {
          provide: Router,
          useValue: {
            navigate
          }
        }
      ],
      teardown: { destroyAfterEach: false }
    });
    fixture = TestBed.createComponent(WithdrawOffenceContainer);
  });

  it('should compile correctly', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  @Component({
    selector: 'withdraw-offence-list',
    template: `
      <pre>{{ offences | json }}</pre>
    `
  })
  class MockWithdrawOffenceListComponent {
    @Input() offences: any;
    @Input() kase: any;
    @Input() caseWithdrawnStatus: any;
    @Input() offenceWithdrawalReasons: Option[];
  }
});
