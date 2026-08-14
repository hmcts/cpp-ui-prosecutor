import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getPleadedNotGuiltyCasesDetail, getFormFilter } from '../core/selectors';
import { PleadedNotGuiltyCaseResult } from '../contexts/sjp';
import { State } from '../reducers';
import { RegionState } from '../core/reducers/entities.reducer';
import { SetFilter, SetFilterPayload } from '../core';
import { Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { ReviewNotGuiltyPleasComponent } from './review-not-guilty-pleas.component';
import { FormsModule } from '@angular/forms';
import { SelectOption } from '@cpp/pdk';
import { getProsecutorAuthoritiesOptions, PROSECUTOR_DEFAULT_VALUE } from '../search/search.selectors';

@Component({
  selector: 'review-not-guilty-pleas-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <review-not-guilty-pleas
      [pleadedNotGuiltyCasesDetail]="pleadedNotGuiltyCasesDetail$ | async"
      [region]="region$ | async"
      [prosecutorOptions]="prosecutorOptions$ | async"
      (setFilter)="setFilter($event)"
      (viewCase)="viewCase($event)"
    ></review-not-guilty-pleas>
  `,
  imports: [AsyncPipe, ReviewNotGuiltyPleasComponent, AsyncPipe, FormsModule]
})
export class ReviewNotGuiltyPleasContainer {
  private store = inject<Store<State>>(Store);
  private router = inject(Router);

  pleadedNotGuiltyCasesDetail$: Observable<PleadedNotGuiltyCaseResult>;
  region$: Observable<RegionState>;
  prosecutorOptions$: Observable<SelectOption[]>;

  constructor() {
    this.pleadedNotGuiltyCasesDetail$ = this.store.pipe(select(getPleadedNotGuiltyCasesDetail));
    this.region$ = this.store.pipe(select(getFormFilter));
    this.prosecutorOptions$ = this.store.pipe(select(getProsecutorAuthoritiesOptions));
  }

  setFilter(payload: SetFilterPayload): void {
    this.store.dispatch(new SetFilter(payload));
    const { selectedRegion = 'ALL', prosecutor = PROSECUTOR_DEFAULT_VALUE } = payload;
    this.router.navigate(['user', 'review-not-guilty-pleas', selectedRegion, prosecutor]);
  }

  viewCase(caseId: string): void {
    this.router.navigate(['user', 'case-overview', caseId]);
  }
}
