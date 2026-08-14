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
import { FileSizeValidatorDirective } from '../../../shared';

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
              [fileSizeLimit]="maxFileSizeBytes()"
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
  imports: [
    PdkCore,
    PdkGrid,
    PdkForm,
    PdkFileInput,
    FormsModule,
    PdkButton,
    PdkTypographyDirective,
    FileSizeValidatorDirective
  ]
})
export class FileUploadPageComponent {
  readonly acceptedFileTypes = input<string[]>([]);
  readonly hint = input<string>('');
  readonly serverErrorMessage = input<string | null>(null);
  readonly maxFileSizeBytes = input<number>(1024 * 1024);

  readonly errors = output<ValidationError[] | null>();
  readonly fileSubmitted = output<File>();
  readonly fileChanged = output<void>();

  readonly selectedFile = signal<File | null>(null);

  readonly errorMessages = computed<ErrorMessageConfig[]>(() => [
    { rule: 'required', message: 'Select a file to upload' },
    { rule: 'fileSize', message: `File size must not exceed 1MB` },
    { rule: 'serverError', message: this.serverErrorMessage() ?? '' }
  ]);

  readonly fieldErrors = computed(() => (this.serverErrorMessage() ? { serverError: true } : null));

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedFile.set(input.files?.[0] ?? null);
    this.fileChanged.emit();
  }

  onContinue(): void {
    const file = this.selectedFile();
    if (file) {
      this.fileSubmitted.emit(file);
    }
  }
}
