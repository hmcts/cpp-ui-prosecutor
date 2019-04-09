import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CsvFileUploadDetails } from '../../../contexts/staging-tfl';

@Component({
  selector: 'check-csv-upload',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ol pdk-breadcrumb-list pdk-margin-top="4">
      <li pdk-breadcrumb-list-item>
        <a href="javascript: void(0)" routerLink="../../" pdk-breadcrumb>Home</a>
      </li>
      <li pdk-breadcrumb-list-item>
        Check CSV uploads
      </li>
    </ol>
    <h1 pdk-typography="heading-xlarge" pdk-margin-vertical="6">Check CSV uploads</h1>
    <p pdk-typography="heading-medium">
      <span [ngPlural]="csvFileUploadDetails.length">
        <ng-template ngPluralCase="=0">No files</ng-template>
        <ng-template ngPluralCase="=1">1 file</ng-template>
        <ng-template ngPluralCase="other">{{ csvFileUploadDetails.length }} files</ng-template>
      </span>
      found
    </p>
    <list-csv-upload-details [csvFileUploadDetails]="csvFileUploadDetails"></list-csv-upload-details>
  `
})
export class CheckCsvUploadComponent {
  @Input() csvFileUploadDetails: CsvFileUploadDetails[];
}
