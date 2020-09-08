import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getPleadedNotGuiltyCasesDetail, getRegion } from '../core/selectors';
import { PleadedNotGuiltyCaseResult, } from '../contexts/sjp';
import { State } from '../reducers';
import { RegionState } from '../core/reducers/entities.reducer';
import { LoadSelectedRegionSuccess } from '../core';
import { Router } from '@angular/router';

@Component({
  selector: 'review-not-guilty-pleas-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <review-not-guilty-pleas
      [pleadedNotGuiltyCasesDetail]="pleadedNotGuiltyCasesDetail$ | async"
      [region]="region$ | async"
      (setRegion)="setRegion($event)"
      (viewCase)="viewCase($event)"
    ></review-not-guilty-pleas>
  `
})
export class ReviewNotGuiltyPleasContainer {
  pleadedNotGuiltyCasesDetail$: Observable<PleadedNotGuiltyCaseResult>;
  region$: Observable<RegionState>;

  constructor(private store: Store<State>, private router: Router) {
    this.pleadedNotGuiltyCasesDetail$ = this.store.pipe(select(getPleadedNotGuiltyCasesDetail));
    this.region$ = this.store.pipe(select(getRegion));
  }

  setRegion(selectedRegion: string): void {
    this.store.dispatch(new LoadSelectedRegionSuccess(selectedRegion));
    this.router.navigate(['user', 'review-not-guilty-pleas', selectedRegion]);
  }

  viewCase(caseId: string): void {
    this.router.navigate(['user', 'case-overview', caseId]);
  }
}
