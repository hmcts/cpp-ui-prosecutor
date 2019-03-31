import { Component, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { FeatureState, getDatesToAvoidStatus } from '../case-overview.selectors';
import { Observable } from 'rxjs';
import { Case } from '../../contexts/sjp';
import { map, take } from 'rxjs/operators';
import { ResetCaseOverviewState, SubmitDatesToAvoid } from '../case-overview.action';
import { getCase } from '../../core/selectors';

@Component({
  selector: 'dates-to-avoid',
  template: `
    <dates-to-avoid-page
      [kase]="case$ | async"
      [displayDatesToAvoidBanner]="displayDatesToAvoidBanner$ | async"
      (formSubmit)="submit($event)"
    >
    </dates-to-avoid-page>
  `
})
export class DatesToAvoidContainer implements OnDestroy {
  case$: Observable<Case>;
  displayDatesToAvoidBanner$: Observable<boolean>;

  constructor(private store: Store<FeatureState>) {
    this.case$ = this.store.select(getCase);
    this.displayDatesToAvoidBanner$ = this.store.pipe(select(getDatesToAvoidStatus));
  }

  submit(datesToAvoid: string) {
    this.store.dispatch(new SubmitDatesToAvoid(datesToAvoid));
  }

  ngOnDestroy(): void {
    this.store.dispatch(new ResetCaseOverviewState());
  }
}
