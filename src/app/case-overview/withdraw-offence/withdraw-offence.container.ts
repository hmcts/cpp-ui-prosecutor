import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { FeatureState, getCase, getOffences } from '../case-overview.selectors';
import { Observable } from 'rxjs';
import { Case, Offence, WithdrawOffence } from '../../contexts/sjp';
import { map, take } from 'rxjs/operators';
import { WithdrawOffences } from '../case-overview.action';

@Component({
  selector: 'withdraw-offence',
  template: `
    <withdraw-offence-list
      [kase]="case$ | async"
      [offences]="offences$ | async"
      (formSubmit)="submit($event)"
    ></withdraw-offence-list>
  `
})
export class WithdrawOffenceContainer {
  offences$: Observable<Offence[]>;
  case$: Observable<Case>;

  constructor(private store: Store<FeatureState>) {
    this.case$ = this.store.select(getCase);
    this.offences$ = this.store.select(getOffences);
  }

  submit(offences: WithdrawOffence[]) {
    this.case$
      .pipe(
        map(({ id }) => id),
        map(id => new WithdrawOffences(offences, id)),
        take(1)
      )
      .subscribe(this.store);
  }
}
