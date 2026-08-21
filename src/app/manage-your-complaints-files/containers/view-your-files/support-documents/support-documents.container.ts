import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PdkErrorSummaryComponent, PdkMarginDirective, ValidationError } from '@cpp/pdk';
import { BackButtonComponent } from '../../../../shared';
import { FileUploadPageComponent } from '../../../shared/file-upload-page/file-upload-page.component';
import { ViewYourFilesStore } from '../../../signal-store/view-your-files.store';
import { SupportDocumentsRoutes } from './support-documents.routes';

@Component({
  selector: 'support-documents-container',
  template: `
    <back-button actionText="Back" linkUrl="../"></back-button>
    @if (errors()?.length) {
    <pdk-error-summary [errors]="errors()" shouldFocus="true" pdk-margin-top="4"></pdk-error-summary>
    }
    <file-upload-page
      [acceptedFileTypes]="['.pdf', '.doc', '.docx', '.jpeg', '.jpg', '.png', '.odt', '.txt']"
      [hint]="'Make sure the file name includes the reference number and case name.'"
      (fileSubmitted)="onFileSubmitted($event)"
      (errors)="errors.set($event)"
    >
      <span page-header>Upload supporting documents for {{ store.referenceNumber() }} (optional)</span>
      <div ngProjectAs="section">
        <p pdk-margin-bottom="4">You can upload a supporting document.</p>
        <p pdk-margin-bottom="6">Accepted file types include pdf, doc, jpeg, png, jpg, docx, odt and txt.</p>
      </div>
      <span submit>Upload and send</span>
    </file-upload-page>
  `,
  imports: [BackButtonComponent, FileUploadPageComponent, PdkErrorSummaryComponent, PdkMarginDirective]
})
export class SupportDocumentsContainer {
  readonly store = inject(ViewYourFilesStore);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  errors = signal<ValidationError[] | null>(null);

  onFileSubmitted(file: File): void {
    this.store.uploadSupportingDocument({
      file,
      onUploadSuccess: () => this.router.navigate([SupportDocumentsRoutes.SUCCESS], { relativeTo: this.route }),
      onUploadError: () => this.router.navigate([SupportDocumentsRoutes.FAILURE], { relativeTo: this.route })
    });
  }
}
