import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CaseSummary } from '../contexts/sjp';
import { select, Store } from '@ngrx/store';
import { State } from '../reducers';
import { getCasesMissingSjpNotices } from './cases-missing-sjp-notices.selector';
import { CasesMissingSjpNoticesComponent } from "./components/cases-missing-sjp-notices.component";
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'cases-missing-sjp-notices-container',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <cases-missing-sjp-notices [casesMissingNotices]="casesMissingNotices$ | async"></cases-missing-sjp-notices>
  `,
    imports: [CasesMissingSjpNoticesComponent, AsyncPipe]
})
export class CasesMissingSjpNoticesContainer {
  private store = inject<Store<State>>(Store);

  @Input() casesMissingNotices$: Observable<CaseSummary[]>;


  constructor() {
    this.casesMissingNotices$ = this.store.pipe(select(getCasesMissingSjpNotices));
  }
}
