import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WithdrawOffenceContainer } from '../withdraw-offence.container';
import { provideStore } from '@ngrx/store';
import { reducers } from '../../../core/reducers';
import { Option } from '../../../shared/interfaces';
import { of } from 'rxjs';
import { JsonPipe } from '@angular/common';
import { WithdrawOffenceComponent } from '../withdraw-offence.component';
import { CaseHeaderBadgeContainer } from '../../common/case-header-badge/case-header-badge.container';

describe('WithdrawOffenceContainer', () => {
  let fixture: ComponentFixture<WithdrawOffenceContainer>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideStore(reducers, { runtimeChecks: {} }),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { id: '123' } },
            params: of({ id: '123' })
          }
        }
      ],
      teardown: { destroyAfterEach: false }
    }).overrideComponent(WithdrawOffenceContainer, {
      remove: {
        imports: [WithdrawOffenceComponent, CaseHeaderBadgeContainer]
      },
      add: {
        imports: [MockWithdrawOffenceListComponent]
      }
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
    `,
    imports: [JsonPipe]
  })
  class MockWithdrawOffenceListComponent {
    @Input() offences: any;
    @Input() kase: any;
    @Input() caseWithdrawnStatus: any;
    @Input() offenceWithdrawalReasons: Option[];
  }
});
