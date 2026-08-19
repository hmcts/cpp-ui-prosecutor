import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ErrorMessageConfig,
  PdkButton,
  PdkErrorSummaryComponent,
  PdkForm,
  PdkFormFieldComponent,
  PdkInput,
  PdkMarginDirective,
  PdkTable,
  PdkTextInput,
  PdkTypographyDirective,
  ValidationError
} from '@cpp/pdk';
import { BackButtonComponent } from '../../../shared';
import { ViewYourFilesStore } from '../../signal-store/view-your-files.store';

@Component({
  selector: 'view-your-files-container',
  template: `
    <back-button actionText="Back" linkUrl="../"></back-button>
    @if (errors()?.length) {
    <pdk-error-summary [errors]="errors()" shouldFocus="true" pdk-margin-top="4"></pdk-error-summary>
    }
    <h1 pdk-typography="heading-large" pdk-margin-top="6" pdk-margin-bottom="6">View your complaints files</h1>

    <form pdk-form (validSubmit)="search()" (errors)="errors.set($event)" #form="ngForm">
      <pdk-form-field label="Find by reference number" [errorMessages]="errorMessages()" [errors]="fieldErrors()">
        <input
          pdk-text-input
          [pdk-input]="20"
          name="referenceNumber"
          type="text"
          [(ngModel)]="referenceNumber"
          required
          data-role="search-input"
        />
        <button pdk-margin-left="2" pdk-button type="submit" data-role="search-button">Search</button>
      </pdk-form-field>
    </form>

    @if (hasSearched()) { @if (store.complaintsFile(); as result) {
    <table pdk-table pdk-margin-top="6">
      <thead pdk-table-head>
        <tr pdk-table-row>
          <th pdk-table-header>Reference</th>
          <th pdk-table-header>Date uploaded</th>
          <th pdk-table-header>Status</th>
          <th pdk-table-header>Action</th>
          <th pdk-table-header>File name</th>
          <th pdk-table-header>Uploaded by</th>
        </tr>
      </thead>
      <tbody pdk-table-body>
        <tr pdk-table-row>
          <td pdk-table-cell data-role="reference">
            <b>{{ result.reference }}</b>
          </td>
          <td pdk-table-cell>{{ result.dateUploaded }}</td>
          <td pdk-table-cell>{{ result.status }}</td>
          <td pdk-table-cell>{{ result.action }}</td>
          <td pdk-table-cell>{{ result.fileName }}</td>
          <td pdk-table-cell>{{ result.uploadedBy }}</td>
        </tr>
      </tbody>
    </table>
    } @else {
    <p pdk-margin-top="6" data-role="no-results">No results found. Please check your reference number and try again.</p>
    } }
  `,
  imports: [
    BackButtonComponent,
    PdkErrorSummaryComponent,
    PdkTypographyDirective,
    PdkMarginDirective,
    PdkForm,
    PdkFormFieldComponent,
    PdkTextInput,
    PdkInput,
    PdkButton,
    PdkTable,
    FormsModule
  ]
})
export class ViewYourFilesContainer {
  readonly store = inject(ViewYourFilesStore);

  referenceNumber = signal('');
  hasSearched = signal(false);
  errors = signal<ValidationError[] | null>(null);

  readonly errorMessages = computed<ErrorMessageConfig[]>(() => [
    { rule: 'required', message: 'Enter a reference number' },
    { rule: 'searchError', message: this.store.searchErrorMessage() ?? '' }
  ]);

  readonly fieldErrors = computed(() => (this.store.searchErrorMessage() ? { searchError: true } : null));

  search(): void {
    this.hasSearched.set(true);
    this.store.searchComplaintsFiles(this.referenceNumber());
  }
}
