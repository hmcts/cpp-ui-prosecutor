import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'case-overview-container',
  template: `
    <h2>Case Overview</h2>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CaseOverviewContainer {
  constructor() {}
}
