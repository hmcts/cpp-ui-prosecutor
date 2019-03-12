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
      declarations: [
        WithdrawOffenceContainer,
        MockWithdrawOffenceContainer,
        MockDefendantHighlightComponent,
        MockWithdrawOffenceListComponent
      ],
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
    selector: 'withdraw-offence-test',
    template: `
      <span>container</span>
    `
  })
  class MockWithdrawOffenceContainer {}

  @Component({
    selector: 'defendant-highlight',
    template: `
      <pre>{{ case | json }}</pre>
    `
  })
  class MockDefendantHighlightComponent {
    @Input() case: any;
  }

  @Component({
    selector: 'withdraw-offence-list',
    template: `
      <pre>{{ offences | json }}</pre>
    `
  })
  class MockWithdrawOffenceListComponent {
    @Input() offences: any;
  }
});
