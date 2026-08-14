import { Component, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FileUploadPageComponent } from '../../shared/file-upload-page/file-upload-page.component';
import { ManageYourComplaintsFilesStore } from '../../signal-store/manage-your-complaints-files.store';
import { CsvTemplateDownloadErrorComponent } from '../../shared/csv-template-download-error/csv-template-download-error.component';
import { PdkErrorSummaryComponent, PdkLinkDirective, PdkMarginDirective, ValidationError } from '@cpp/pdk';
import { BackButtonComponent } from '../../../shared';
import { ComplaintsFileRoutes } from '../../manage-your-complaints-files.routes';
import { NewFilesRoutes } from './upload-new-files.routes';

@Component({
  selector: 'upload-new-files-container',
  template: `
    <csv-template-download-error [show]="store.hasDownloadCsvError()"></csv-template-download-error>

    <back-button actionText="Back" linkUrl="/manage-your-complaints-files"></back-button>
    @if (errors()?.length) {
    <pdk-error-summary [errors]="errors()" shouldFocus="true" pdk-margin-top="4"></pdk-error-summary>
    }
    <file-upload-page
      [acceptedFileTypes]="['.csv']"
      [hint]="'The file name should match the hearing date.'"
      [serverErrorMessage]="store.uploadCsvValidationMessage()"
      (fileSubmitted)="onFileSubmitted($event)"
      (errors)="showValidationError($event)"
      (fileChanged)="store.setUploadErrorMessage(null)"
    >
      <span page-header>Upload new complaints file</span>
      <div ngProjectAs="section">
        <p pdk-margin-bottom="6">
          Use the CSV template to upload one file of up to 1000 cases. Additional files can be uploaded from the start.
        </p>

        <p pdk-margin-bottom="6">
          <a href="javascript:void(0)" pdk-link (click)="store.downloadCsvTemplate()">Download latest CSV template</a>
        </p>
      </div>
      <span submit>Submit</span>
    </file-upload-page>
  `,
  imports: [
    FileUploadPageComponent,
    CsvTemplateDownloadErrorComponent,
    PdkMarginDirective,
    PdkLinkDirective,
    PdkErrorSummaryComponent,
    BackButtonComponent
  ]
})
export class UploadNewFilesContainer {
  readonly store = inject(ManageYourComplaintsFilesStore);
  private readonly router = inject(Router);
  errors = signal<ValidationError[] | null>([]);

  onFileSubmitted(file: File) {
    this.store.validateUploadCsvFile({
      file,
      onUploadSuccess: () => {
        this.router.navigate([
          'manage-your-complaints-files',
          ComplaintsFileRoutes.UPLOAD_NEW_FILES,
          NewFilesRoutes.SUCCESS
        ]);
      },
      onUploadError: (error: HttpErrorResponse) => {
        if (error.status === 400) {
          const parsedError = JSON.parse(error.error);
          this.store.setUploadErrorMessage(parsedError.error);
        } else {
          this.store.setUploadCsvFailed(true);
          this.router.navigate([
            'manage-your-complaints-files',
            ComplaintsFileRoutes.UPLOAD_NEW_FILES,
            NewFilesRoutes.FAILURE
          ]);
        }
      }
    });
  }

  showValidationError(error: ValidationError[] | null): void {
    this.errors.set(error);
  }
}
