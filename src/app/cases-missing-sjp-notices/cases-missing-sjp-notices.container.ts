import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import { getCasesMissingSjpNotices } from './cases-missing-sjp-notices.selector';
import { CasesMissingSjpNoticesComponent } from './components/cases-missing-sjp-notices.component';

@Component({
  selector: 'cases-missing-sjp-notices-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <cases-missing-sjp-notices [casesMissingNotices]="casesMissingNotices()"></cases-missing-sjp-notices>
  `,
  imports: [CasesMissingSjpNoticesComponent]
})
export class CasesMissingSjpNoticesContainer {
  private store = inject<Store<State>>(Store);

  readonly casesMissingNotices = this.store.selectSignal(getCasesMissingSjpNotices);
}
