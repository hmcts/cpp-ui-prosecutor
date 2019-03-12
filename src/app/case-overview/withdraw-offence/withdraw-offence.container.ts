import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { FeatureState, getCase, getOffences } from '../case-overview.selectors';
import { Observable } from 'rxjs';
import { Case, Offence } from '../../contexts/sjp';

@Component({
  selector: 'withdraw-offence',
  template: `
    <ol pdk-breadcrumb-list pdk-margin-vertical="4">
      <li pdk-breadcrumb-list-item>
        <a href="javascript: void(0)" routerLink="../../../../.." pdk-breadcrumb>Home</a>
      </li>
      <li pdk-breadcrumb-list-item>
        <a href="javascript: void(0)" routerLink="/search/results" pdk-breadcrumb>
          Search for a case
        </a>
      </li>
      <li pdk-breadcrumb-list-item>
        <a pdk-breadcrumb href="javascript: void(0)" routerLink="../../..">Case Overview</a>
      </li>
      <li pdk-breadcrumb-list-item>
        <a pdk-breadcrumb>Withdraw offence</a>
      </li>
    </ol>
    <defendant-highlight [case]="case$ | async"></defendant-highlight>

    <withdraw-offence-list [offences]="offences$ | async" (formSubmit)="prepareState($event)"> </withdraw-offence-list>
  `
})
export class WithdrawOffenceContainer {
  offences$: Observable<Offence[]>;
  case$: Observable<Case>;

  constructor(private store: Store<FeatureState>) {
    this.case$ = this.store.select(getCase);
    this.offences$ = this.store.select(getOffences);
  }

  prepareState($event: any) {
    // TODO: prepare the state with reasons; ... let state = [];
    console.log($event);
  }
}
