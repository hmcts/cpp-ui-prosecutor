import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DocumentUploadDetails } from '../../../contexts/staging-tfl';

@Component({
  selector: 'view-document-upload-report',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ol pdk-breadcrumb-list pdk-margin-top="4">
      <li pdk-breadcrumb-list-item>
        <a href="javascript: void(0)" routerLink="../../../" pdk-breadcrumb>Home</a>
      </li>
      <li pdk-breadcrumb-list-item>
        <a href="javascript: void(0)" routerLink="../../" pdk-breadcrumb>Check document uploads</a>
      </li>
      <li pdk-breadcrumb-list-item>
        View upload report
      </li>
    </ol>

    <pdk-grid container>
      <pdk-grid two-thirds>
        <br />
        <h1 pdk-typography="heading-large" pdk-margin-vertical="4">View upload report</h1>
        <br />
        <p>
          Name: <br />
          <span data-role="file-name">{{ documentUploadDetails.zipFilename }}</span>
        </p>
        <p>
          Uploaded: <br />
          {{ documentUploadDetails.timestamp | date: 'd MMM yyyy' }}
        </p>
        <p>
          Status: <br />
          <span *ngIf="documentUploadDetails.uploadStatus.status !== 'FAILED'; else error">
            {{ documentUploadDetails.uploadStatus.status | uploadStatus }}
          </span>
          <ng-template #error>
            <b pdk-text-colour="red" data-role="csv-upload-status">
              {{ documentUploadDetails.uploadStatus.status | uploadStatus }}
            </b>
          </ng-template>
        </p>
      </pdk-grid>
    </pdk-grid>
    <section *ngIf="documentUploadDetails.documentCount">
      <h3>
        Fix {{ documentUploadDetails.documentCount }} document
        <span [ngPlural]="documentUploadDetails.documentCount">
          <ng-template ngPluralCase="=1">error</ng-template>
          <ng-template ngPluralCase="other">errors</ng-template>
        </span>
      </h3>
      <document-upload-error-list [documentUploadErrors]="documentUploadDetails.documentErrors">
      </document-upload-error-list>
    </section>
    <pdk-grid container>
      <h3>After you've fixed all errors</h3>
      <p>
        If you have corrected documents to send to court, put them in a new <br />
        zip file and upload again
      </p>
      <button pdk-button routerLink="../../../upload-documents">Upload documents</button>
    </pdk-grid>
  `
})
export class ViewDocumentUploadReportComponent {
  @Input() documentUploadDetails: DocumentUploadDetails;
}
