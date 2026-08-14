import { ChangeDetectionStrategy, Component, OnDestroy, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import { LoadResultedCaseCount, ResetResultedCaseCount } from './export-case-decisions.actions';
import { Observable } from 'rxjs';
import { CaseCountResult } from '../contexts/mi-report';
import { getResultedCaseCount } from './export-case-decisions.selector';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { ExportCaseDecisionsComponent } from './components/export-case-decisions.component';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'export-case-decisions-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <export-case-decisions
      [role]="role$ | async"
      [caseCountResult]="caseCountResult$ | async"
      (loadCaseCount)="loadCaseCount($event)"
      (errorsOutput)="ngOnDestroy()"
    >
    </export-case-decisions>
  `,
  imports: [ExportCaseDecisionsComponent, AsyncPipe, FormsModule]
})
export class ExportCaseDecisionsContainer implements OnDestroy {
  private store = inject<Store<State>>(Store);

  caseCountResult$: Observable<CaseCountResult>;
  role$: Observable<string>;

  constructor() {
    const route = inject(ActivatedRoute);

    this.caseCountResult$ = this.store.select(getResultedCaseCount);
    this.role$ = route.params.pipe(map(params => params.role));
  }

  loadCaseCount({ fromDate, toDate }) {
    this.store.dispatch(new LoadResultedCaseCount({ fromDate, toDate }));
  }

  ngOnDestroy(): void {
    this.store.dispatch(new ResetResultedCaseCount());
  }
}
