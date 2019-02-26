import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'prosecutor-dashboard-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <prosecutor-dashboard></prosecutor-dashboard>
  `
})
export class DashboardContainer {}
