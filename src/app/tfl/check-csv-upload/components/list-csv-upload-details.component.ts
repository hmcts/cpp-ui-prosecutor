import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CsvFileUploadDetails } from '../../../contexts/staging-tfl';

@Component({
  selector: 'list-csv-upload-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <table pdk-table *ngIf="csvFileUploadDetails.length">
      <thead pdk-table-head>
        <tr pdk-table-row>
          <th pdk-table-header>Date Uploaded</th>
          <th pdk-table-header>At</th>
          <th pdk-table-header>File name</th>
          <th pdk-table-header>Status</th>
          <th pdk-table-header><span pdk-visually-hidden>Action</span></th>
        </tr>
      </thead>
      <tbody pdk-table-body>
        <tr pdk-table-row *ngFor="let csvUploadFileData of csvFileUploadDetails">
          <td pdk-table-cell>{{ csvUploadFileData.timestamp | formatDate: 'd MMM y' }}</td>
          <td pdk-table-cell>{{ csvUploadFileData.timestamp | formatDate: 'h:mma' }}</td>
          <td pdk-table-cell data-col="file-name">{{ csvUploadFileData.headerFilename }}</td>
          <td pdk-table-cell data-col="csv-upload-status">
            <span *ngIf="csvUploadFileData.uploadStatus.status !== 'FAILED'; else error">
              {{ csvUploadFileData.uploadStatus.status | uploadStatus }}
            </span>
            <ng-template #error>
              <b pdk-text-colour="red">
                {{ csvUploadFileData.uploadStatus.status | uploadStatus }}
              </b>
            </ng-template>
          </td>
          <td pdk-table-cell>
            <a
              *ngIf="csvUploadFileData.uploadStatus.status === 'FAILED'; else dash"
              href="javascript:void(0)"
              routerLink="report/{{ csvUploadFileData.uploadId }}"
              pdk-link
            >
              View report
            </a>
            <ng-template #dash>–</ng-template>
          </td>
        </tr>
      </tbody>
    </table>
  `
})
export class ListCsvUploadDetailsComponent {
  @Input() csvFileUploadDetails: CsvFileUploadDetails[];
}
