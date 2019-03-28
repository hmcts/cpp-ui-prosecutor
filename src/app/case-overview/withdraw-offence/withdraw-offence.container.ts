import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Case, Offence, WithdrawOffenceParam } from '../../contexts/sjp';
import { WithdrawOffences } from '../case-overview.action';
import { getCase, getOffences } from '../../core/selectors';
import { State } from '../../reducers';

@Component({
  selector: 'withdraw-offence',
  template: `
    <withdraw-offence-list [kase]="case$ | async" [offences]="offences$ | async" (formSubmit)="submit($event)">
    </withdraw-offence-list>
  `
})
export class WithdrawOffenceContainer {
  offences$: Observable<Offence[]>;
  case$: Observable<Case>;

  constructor(private store: Store<State>) {
    this.case$ = this.store.select(getCase);
    this.offences$ = this.store.select(getOffences);
  }

  submit(selectedOffences: WithdrawOffenceParam[]) {
    window.scrollTo(0, 0);
    this.store.dispatch(new WithdrawOffences({ withdrawalRequestsStatus: selectedOffences }));
  }
}
