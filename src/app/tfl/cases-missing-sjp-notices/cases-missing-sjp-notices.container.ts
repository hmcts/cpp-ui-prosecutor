import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { CaseSummary } from '../../contexts/sjp';
import { select, Store } from '@ngrx/store';
import { State } from '../../reducers';
import { getCasesMissingSjpNotices } from './cases-missing-sjp-notices.selector';

@Component({
  selector: 'cases-missing-sjp-notices-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <cases-missing-sjp-notices [casesMissingNotices]="casesMissingNotices$ | async"></cases-missing-sjp-notices>
  `
})
export class CasesMissingSjpNoticesContainer {
  @Input() casesMissingNotices$: Observable<CaseSummary[]>;

  constructor(private store: Store<State>) {
    this.casesMissingNotices$ = this.store.pipe(select(getCasesMissingSjpNotices));
  }
}
