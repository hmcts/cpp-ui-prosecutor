import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DocumentUploadDetails } from '../../../contexts/staging-tfl';

@Component({
  selector: 'check-document-upload',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ol pdk-breadcrumb-list pdk-margin-top="4">
      <li pdk-breadcrumb-list-item>
        <a href="javascript: void(0)" routerLink="../../" pdk-breadcrumb>Home</a>
      </li>
      <li pdk-breadcrumb-list-item>
        Check document uploads
      </li>
    </ol>
    <h1 pdk-typography="heading-xlarge" pdk-margin-vertical="6">Check document uploads</h1>
    <p pdk-typography="heading-medium">
      <span [ngPlural]="documentUploadDetails.length">
        <ng-template ngPluralCase="=0">No files</ng-template>
        <ng-template ngPluralCase="=1">1 file</ng-template>
        <ng-template ngPluralCase="other">{{ documentUploadDetails.length }} files</ng-template>
      </span>
      found
    </p>
    <list-document-upload-details [documentUploadDetails]="documentUploadDetails"></list-document-upload-details>
  `
})
export class CheckDocumentUploadComponent {
  @Input() documentUploadDetails: DocumentUploadDetails[];
}
