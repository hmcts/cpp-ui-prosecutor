import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import { LoadResultedCaseCount, ResetResultedCaseCount } from './export-case-decisions.actions';
import { Observable } from 'rxjs';
import { CaseCountResult } from '../contexts/mi-report';
import { getResultedCaseCount } from './export-case-decisions.selector';

@Component({
  selector: 'export-case-decisions-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <export-case-decisions
      [caseCountResult]="caseCountResult$ | async"
      (loadCaseCount)="loadCaseCount($event)"
      (errorsOutput)="ngOnDestroy()"
    >
    </export-case-decisions>
  `
})
export class ExportCaseDecisionsContainer implements OnDestroy {
  caseCountResult$: Observable<CaseCountResult>;

  constructor(private store: Store<State>) {
    this.caseCountResult$ = this.store.select(getResultedCaseCount);
  }

  loadCaseCount({ fromDate, toDate }) {
    this.store.dispatch(new LoadResultedCaseCount({ fromDate, toDate }));
  }

  ngOnDestroy(): void {
    this.store.dispatch(new ResetResultedCaseCount());
  }
}
