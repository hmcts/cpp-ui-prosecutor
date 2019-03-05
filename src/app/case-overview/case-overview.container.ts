import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FeatureState } from './case-overview.selectors';
import { Store } from '@ngrx/store';
import { GetCaseById } from './case-overview.action';

@Component({
  selector: 'case-overview-container',
  template: `
    <h2>Case Overview</h2>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CaseOverviewContainer {
  constructor(private store: Store<FeatureState>) {
    this.store.dispatch(new GetCaseById('734f9fba-445e-461d-9d94-c966a2d71c95'));
  }
}
