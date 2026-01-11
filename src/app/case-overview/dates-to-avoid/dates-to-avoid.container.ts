import { Component, OnDestroy, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { FeatureState, getDatesToAvoidStatus } from '../case-overview.selectors';
import { Observable } from 'rxjs';
import { Case } from '../../contexts/sjp';
import { ResetDatesToAvoidState, SubmitDatesToAvoid } from '../case-overview.action';
import { getCase } from '../../core/selectors';
import { DatesToAvoidComponent } from "./dates-to-avoid.component";
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'dates-to-avoid',
    template: `
    <dates-to-avoid-page
      [kase]="case$ | async"
      [displayDatesToAvoidBanner]="displayDatesToAvoidBanner$ | async"
      (formSubmit)="submit($event)"
    >
    </dates-to-avoid-page>
  `,
    imports: [DatesToAvoidComponent, AsyncPipe]
})
export class DatesToAvoidContainer implements OnDestroy {
  private store = inject<Store<FeatureState>>(Store);

  case$: Observable<Case>;
  displayDatesToAvoidBanner$: Observable<boolean>;

  constructor() {
    this.case$ = this.store.select(getCase);
    this.displayDatesToAvoidBanner$ = this.store.pipe(select(getDatesToAvoidStatus));
  }

  submit(datesToAvoid: string) {
    this.store.dispatch(new SubmitDatesToAvoid(datesToAvoid));
  }

  ngOnDestroy(): void {
    this.store.dispatch(new ResetDatesToAvoidState());
  }
}
