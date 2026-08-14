import { Component, computed, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ErrorMessageConfig,
  PdkButton,
  PdkCore,
  PdkFileInput,
  PdkForm,
  PdkGrid,
  PdkTypographyDirective,
  ValidationError
} from '@cpp/pdk';

@Component({
  selector: 'file-upload-page',
  template: `
    <h1 pdk-typography="heading-large" pdk-margin-top="2" pdk-margin-bottom="2">
      <ng-content select="[page-header]"></ng-content>
    </h1>
    <pdk-grid container>
      <pdk-grid full>
        <ng-content select="section"></ng-content>
        <form pdk-form (validSubmit)="onContinue()" (errors)="errors.emit($event)">
          <pdk-form-field
            label="Upload a file"
            [hintText]="hint()"
            [errorMessages]="errorMessages()"
            [errors]="fieldErrors()"
          >
            <input
              type="file"
              id="file"
              name="file-upload"
              ngModel
              pdk-file-input
              [accept]="acceptedFileTypes()"
              (change)="onFileSelected($event)"
              required
              pdk-margin-top="3"
            />
          </pdk-form-field>

          <button type="submit" pdk-button pdk-margin-vertical="5">
            <ng-content select="[submit]"></ng-content>
          </button>
        </form>
      </pdk-grid>
    </pdk-grid>
  `,
  imports: [PdkCore, PdkGrid, PdkForm, PdkFileInput, FormsModule, PdkButton, PdkTypographyDirective]
})
export class FileUploadPageComponent {
  acceptedFileTypes = input<string[]>([]);
  hint = input<string>('');
  serverErrorMessage = input<string | null>(null);
  maxFileSizeBytes = input<number>(1024 * 1024);
  readonly errors = output<ValidationError[] | null>();
  fileSubmitted = output<File>();
  readonly selectedFile = signal<File | null>(null);
  readonly fileTooLarge = signal(false);

  readonly errorMessages = computed<ErrorMessageConfig[]>(() => [
    { rule: 'required', message: 'Select a file to upload' },
    { rule: 'fileSize', message: 'File size must not exceed 1MB' },
    { rule: 'serverError', message: this.serverErrorMessage() ?? '' }
  ]);

  readonly fieldErrors = computed(() => {
    if (this.fileTooLarge()) {
      return { fileSize: true };
    }
    return this.serverErrorMessage() ? { serverError: true } : null;
  });

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;

    if (file && file.size > this.maxFileSizeBytes()) {
      this.fileTooLarge.set(true);
      this.selectedFile.set(null);
      return;
    }

    this.fileTooLarge.set(false);
    this.selectedFile.set(file);
  }

  onContinue() {
    const file = this.selectedFile();
    if (file) {
      this.fileSubmitted.emit(file);
    }
  }
}
