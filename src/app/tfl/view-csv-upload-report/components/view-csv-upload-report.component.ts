import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { CsvFileUploadReport } from '../../../contexts/staging-tfl';

@Component({
  selector: 'view-csv-upload-report',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ol pdk-breadcrumb-list pdk-margin-top="4">
      <li pdk-breadcrumb-list-item>
        <a href="javascript: void(0)" routerLink="../../../" pdk-breadcrumb>Home</a>
      </li>
      <li pdk-breadcrumb-list-item>
        <a href="javascript: void(0)" routerLink="../../" pdk-breadcrumb>Check CSV uploads</a>
      </li>
      <li pdk-breadcrumb-list-item>
        View upload report
      </li>
    </ol>
    <pdk-grid container>
      <pdk-grid two-thirds>
        <h1 pdk-typography="heading-large" pdk-margin-vertical="4">View upload report</h1>
        <p>
          Name:<br />
          {{ csvFileUploadReport.headerFilename }}
        </p>
        <p>
          Uploaded:<br />
          {{ csvFileUploadReport.timestamp | date: 'd MMM yyyy' }}
        </p>
        <p>
          Status:<br />
          <span *ngIf="csvFileUploadReport.uploadStatus.status !== 'FAILED'; else error">
            {{ csvFileUploadReport.uploadStatus.status | uploadStatus }}
          </span>
          <ng-template #error>
            <b pdk-text-colour="red">
              {{ csvFileUploadReport.uploadStatus.status | uploadStatus }}
            </b>
          </ng-template>
        </p>

        <span *ngIf="csvFileUploadReport.uploadStatus.status === 'FAILED'">
          You will need to fix errors in one or both of your CSV files and try again.
        </span>

        <section *ngIf="csvFileUploadReport.headerErrors?.length">
          <h3>
            Header - fix {{ csvFileUploadReport.headerErrors.length }}
            <span [ngPlural]="csvFileUploadReport.headerErrors?.length">
              <ng-template ngPluralCase="=1">error</ng-template>
              <ng-template ngPluralCase="other">errors</ng-template>
            </span>
          </h3>
          <csv-upload-error-list [csvErrors]="csvFileUploadReport.headerErrors"> </csv-upload-error-list>
        </section>

        <section *ngIf="csvFileUploadReport.offenceErrors?.length">
          <h3>
            Offences - fix {{ csvFileUploadReport.offenceErrors.length }}
            <span [ngPlural]="csvFileUploadReport.offenceErrors?.length">
              <ng-template ngPluralCase="=1">error</ng-template>
              <ng-template ngPluralCase="other">errors</ng-template>
            </span>
          </h3>
          <csv-upload-error-list [csvErrors]="csvFileUploadReport.offenceErrors"> </csv-upload-error-list>
        </section>
      </pdk-grid>
      <pdk-grid one-third *ngIf="csvFileUploadReport.uploadStatus.status === 'FAILED'">
        <pdk-related>
          <h1 pdk-typography="heading-medium" pdk-margin-vertical="1">Related links</h1>
          <div>
            <a href="javascript: void(0)" pdk-link routerLink="upload-csv">
              Upload CSVs
            </a>
          </div>
        </pdk-related>
      </pdk-grid>
    </pdk-grid>
    <pdk-grid container>
      <h3>After you've fixed all errors</h3>
      <p>You noe need to upload both header and offences CSVs again</p>
      <p>The CSVs mut include:</p>

      <ul>
        <li>your correct data</li>
        <li>all the remaining original data which didn’t contain errors</li>
      </ul>
      <button pdk-button routerLink="upload-csv">Upload CSVs again</button>
    </pdk-grid>
  `
})
export class ViewCsvUploadReportComponent {
  @Input() csvFileUploadReport: CsvFileUploadReport;
}
