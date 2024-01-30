import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OnlinePleaUi } from './online-plea-interface';
import { getOnlinePlea } from '../case-overview.selectors';
import { getCase } from '../../core';
import { Case } from '../../contexts/sjp';
import { State } from '../../reducers';
import { transformOnlinePleaToUiModel } from './online-plea-utils';
import { getUserGroups, UserGroup } from '@cpp/users-groups';

@Component({
  selector: 'online-plea-details-container',
  template: `
    <online-plea-details [onlinePleas]="onlinePlea$ | async" [kase]="kase$ | async" [userGroups]="userGroups$ | async">
    </online-plea-details>
    <button pdk-margin-top="4" id="onlinePleaBackButton" pdk-button routerLink="../">
      Back
    </button>
  `
})
export class OnlinePleaDetailsContainer {
  kase$: Observable<Case>;
  onlinePlea$: Observable<OnlinePleaUi[]>;
  userGroups$: Observable<UserGroup[]>;

  constructor(private store: Store<State>) {
    this.kase$ = this.store.pipe(select(getCase));
    this.onlinePlea$ = this.store
      .pipe(select(getOnlinePlea))
      .pipe(map(state => transformOnlinePleaToUiModel(state.pleas)));
    this.userGroups$ = this.store.pipe(select(getUserGroups));
  }
}
