import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Case, Offence, WithdrawOffenceParam } from '../../contexts/sjp';
import { WithdrawOffences } from '../case-overview.action';
import { getCase, getOffences, getWithdrawCaseStatus, getOffenceWithdrawalRequestReasons } from '../../core/selectors';
import { State } from '../../reducers';
import { Option } from '../../shared/interfaces';
import { WithdrawOffenceComponent } from "./withdraw-offence.component";
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'withdraw-offence',
    template: `
    <withdraw-offence-list
      [kase]="case$ | async"
      [offences]="offences$ | async"
      [caseWithdrawnStatus]="caseWithdrawnStatus$ | async"
      [offenceWithdrawalReasons]="offenceWithdrawalReasons$ | async"
      (formSubmit)="submit($event)"
    >
    </withdraw-offence-list>
  `,
    imports: [WithdrawOffenceComponent, AsyncPipe]
})
export class WithdrawOffenceContainer {
  private store = inject<Store<State>>(Store);

  offences$: Observable<Offence[]>;
  case$: Observable<Case>;
  caseWithdrawnStatus$: Observable<boolean>;
  offenceWithdrawalReasons$: Observable<Option[]>;

  constructor() {
    this.case$ = this.store.select(getCase);
    this.offences$ = this.store.select(getOffences);
    this.caseWithdrawnStatus$ = this.store.select(getWithdrawCaseStatus);
    this.offenceWithdrawalReasons$ = this.store.select(getOffenceWithdrawalRequestReasons);
  }

  submit(selectedOffences: WithdrawOffenceParam[]) {
    this.store.dispatch(new WithdrawOffences({ withdrawalRequestsStatus: selectedOffences }));
  }
}
