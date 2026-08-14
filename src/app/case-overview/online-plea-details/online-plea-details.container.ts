import { Component, inject } from '@angular/core';
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
import { OnlinePleaDetailsComponent } from "./components/online-plea-details.component";
import { AsyncPipe } from '@angular/common';
import { PdkButtonDirective } from '@cpp/pdk';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'online-plea-details-container',
    template: `
    <online-plea-details [onlinePleas]="onlinePlea$ | async" [kase]="kase$ | async" [userGroups]="userGroups$ | async">
    </online-plea-details>
    <button pdk-margin-top="4" id="onlinePleaBackButton" pdk-button routerLink="../">
      Back
    </button>
  `,
    imports: [OnlinePleaDetailsComponent, AsyncPipe, PdkButtonDirective, RouterLink]
})
export class OnlinePleaDetailsContainer {
  private store = inject<Store<State>>(Store);

  kase$: Observable<Case>;
  onlinePlea$: Observable<OnlinePleaUi[]>;
  userGroups$: Observable<UserGroup[]>;

  constructor() {
    this.kase$ = this.store.pipe(select(getCase));
    this.onlinePlea$ = this.store
      .pipe(select(getOnlinePlea))
      .pipe(map(state => transformOnlinePleaToUiModel(state.pleas)));
    this.userGroups$ = this.store.pipe(select(getUserGroups));
  }
}
