import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ValidationError } from '@cpp/pdk/form/form.interfaces';

@Component({
  selector: 'upload-documents',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ol pdk-breadcrumb-list pdk-margin-vertical="4">
      <li pdk-breadcrumb-list-item>
        <a href="javascript: void(0)" routerLink="/tfl" pdk-breadcrumb>Home</a>
      </li>
      <li pdk-breadcrumb-list-item>
        <a pdk-breadcrumb>Upload SJP notices and other documents</a>
      </li>
    </ol>

    <div pdk-margin-vertical="1" *ngIf="uploadSuccess; else mainPage">
      <pdk-context-panel title="Your zip file is being checked for errors" icon="tick">
        Check back within 24 hours to find out if it's been successfully sent to court
      </pdk-context-panel>
      <div pdk-margin-vertical="6">
        <a href="javascript:void(0)" pdk-link routerLink="/tfl">
          Back to case tasks
        </a>
      </div>
    </div>

    <ng-template #mainPage>
      <h1 pdk-typography="heading-xlarge" pdk-margin-vertical="4">Upload SJP notices and <br />other documents</h1>
      <pdk-error-summary
        *ngIf="errors && errors.length > 0"
        pdk-margin-top="5"
        focusOnChange
        title="Fix the following"
        [errors]="errors"
      >
      </pdk-error-summary>
      <p>Put your documents in a zip file and then upload. You can include:</p>
      <ul>
        <li>SJP notices</li>
        <li>previous convictions</li>
        <li>witness statements</li>
      </ul>
      <pdk-inset-text>
        If you only want to upload one document, you'll still need to put it in a zip file.
      </pdk-inset-text>
      <upload-document-form (formSubmit)="uploadDocuments.emit($event)" (errors)="errors = $event">
      </upload-document-form>
    </ng-template>
  `
})
export class UploadDocumentsComponent {
  errors: ValidationError[];

  @Input() uploadSuccess: boolean;

  @Output() uploadDocuments = new EventEmitter<File>();
}
