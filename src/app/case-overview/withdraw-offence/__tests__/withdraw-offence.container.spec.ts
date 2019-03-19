import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { WithdrawOffenceContainer } from '../withdraw-offence.container';
import { StoreModule, Store } from '@ngrx/store';
import { caseOverviewReducer } from '../../case-overview.reducer';
import { reducers } from '../../../core/reducers';

describe('WithdrawOffenceContainer', () => {
  let fixture: ComponentFixture<WithdrawOffenceContainer>;
  let navigate: jest.Mock;
  let store: Store<any>;

  beforeEach(() => {
    navigate = jest.fn();
    TestBed.configureTestingModule({
      declarations: [WithdrawOffenceContainer, MockWithdrawOffenceListComponent],
      imports: [StoreModule.forRoot(reducers), StoreModule.forFeature('kase', caseOverviewReducer)],
      providers: [
        {
          provide: Router,
          useValue: {
            navigate
          }
        }
      ]
    });
    fixture = TestBed.createComponent(WithdrawOffenceContainer);
    store = TestBed.get(Store);
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
  }
});
