import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getPleadedNotGuiltyCasesDetail, getRegion } from '../core/selectors';
import { PleadedNotGuiltyCaseResult} from '../contexts/sjp';
import { State } from '../reducers';
import { RegionState } from '../core/reducers/entities.reducer';
import { LoadSelectedRegionSuccess } from '../core';
import { Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { ReviewNotGuiltyPleasComponent } from './review-not-guilty-pleas.component';
import { FormsModule } from '@angular/forms';

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
  `,
    imports: [AsyncPipe, ReviewNotGuiltyPleasComponent, AsyncPipe, FormsModule]
})
export class ReviewNotGuiltyPleasContainer {
  private store = inject<Store<State>>(Store);
  private router = inject(Router);

  pleadedNotGuiltyCasesDetail$: Observable<PleadedNotGuiltyCaseResult>;
  region$: Observable<RegionState>;

  constructor() {
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
