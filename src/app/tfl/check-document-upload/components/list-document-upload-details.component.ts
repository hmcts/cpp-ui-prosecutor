import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DocumentUploadDetails } from '../../../contexts/staging-tfl';

@Component({
  selector: 'list-document-upload-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <table pdk-table *ngIf="documentUploadDetails.length">
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
        <tr pdk-table-row *ngFor="let documentUploadData of documentUploadDetails">
          <td pdk-table-cell>{{ documentUploadData.timestamp | formatDate: 'd MMM y' }}</td>
          <td pdk-table-cell>{{ documentUploadData.timestamp | formatDate: 'h:mma' }}</td>
          <td pdk-table-cell data-col="file-name">{{ documentUploadData.zipFilename }}</td>
          <td pdk-table-cell data-col="document-upload-status">
            <span *ngIf="documentUploadData.uploadStatus.status !== 'FAILED'; else error">
              {{ documentUploadData.uploadStatus.status | uploadStatus }}
            </span>
            <ng-template #error>
              <b pdk-text-colour="red">
                {{ documentUploadData.uploadStatus.status | uploadStatus }}
              </b>
            </ng-template>
          </td>
          <td pdk-table-cell>
            <a
              *ngIf="documentUploadData.uploadStatus.status === 'FAILED'; else dash"
              href="javascript:void(0)"
              routerLink="report/{{ documentUploadData.bundleUploadId }}"
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
export class ListDocumentUploadDetailsComponent {
  @Input() documentUploadDetails: DocumentUploadDetails[];
}
