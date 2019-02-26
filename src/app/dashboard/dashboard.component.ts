import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'prosecutor-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1 pdk-typography="heading-xlarge" pdk-margin-vertical="8">
      <span pdk-typography="caption-xlarge">Prosecutor</span>
      Single Justice Procedure
    </h1>
    <h2 pdk-typography="heading-medium" pdk-margin-top="8">Search for a case</h2>
    <search-container></search-container>

    <h2 pdk-typography="heading-medium" pdk-margin-top="8">Other tasks</h2>
    <p pdk-typography="caption-medium">Defendant details updates (0)</p>
    <div>
      <a href="" pdk-link pdk-section="small">Withdraw an offence</a>
    </div>
    <div pdk-margin-top="6">
      <a href="" pdk-link>Export case results by date</a>
    </div>
  `
})
export class DashboardComponent {}
