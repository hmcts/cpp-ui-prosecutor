import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { ValidationError } from '@cpp/pdk';

@Component({
  selector: 'upload-document-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <pdk-grid container>
      <pdk-grid two-thirds>
        <form
          pdk-form
          (validSubmit)="formSubmit.emit(zipFileRef.files[0])"
          (errors)="errors.emit($event)"
          #form="ngForm"
        >
          <div pdk-padding-vertical="2">
            <pdk-form-field label="Select file" labelType="medium" [errorMessages]="errorMessages">
              <input type="file" accept=".zip" name="documentsZipFile" required pdk-text-input ngModel #zipFileRef />
            </pdk-form-field>
          </div>

          <button pdk-button pdk-margin-vertical="5" type="submit">
            Send to court
          </button>
          <div>
            <a href="javascript:void(0)" pdk-link routerLink="../../" pdk-margin-vertical="5">Cancel</a>
          </div>
        </form>
      </pdk-grid>
    </pdk-grid>
  `
})
export class UploadDocumentFormComponent {
  public readonly errorMessages = [
    {
      rule: 'required',
      message: 'You need to upload a file'
    }
  ];

  @Output() formSubmit = new EventEmitter<File>();
  @Output() errors = new EventEmitter<ValidationError[]>();
}
