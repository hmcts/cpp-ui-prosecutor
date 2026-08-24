import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  ErrorMessageConfig,
  PdkButton,
  PdkCore,
  PdkErrorSummaryComponent,
  PdkForm,
  PdkFormFieldComponent,
  PdkInput,
  PdkMarginDirective,
  PdkSummaryList,
  PdkTagComponent,
  PdkTextInput,
  PdkTypographyDirective,
  ValidationError
} from '@cpp/pdk';
import { BackButtonComponent } from '../../../shared';
import { COMPLAINTS_FILE_STATUS_LABELS, ComplaintsFileStatus } from '../../models/manage-your-complaints-files';
import { ViewYourFilesStore } from '../../signal-store/view-your-files.store';
import { DatePipe } from '@angular/common';

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
    <dl pdk-summary-list pdk-margin-top="6">
      <div pdk-summary-list-item pdk-margin-bottom="2">
        <dt pdk-summary-list-key>Reference</dt>
        <dd pdk-summary-list-value data-role="reference">{{ result.id }}</dd>
      </div>
      <div pdk-summary-list-item pdk-margin-bottom="2">
        <dt pdk-summary-list-key>Date uploaded</dt>
        <dd pdk-summary-list-value>{{ result.receivedAt | date: 'd MMMM yyyy' }}</dd>
      </div>
      <div pdk-summary-list-item pdk-margin-bottom="2">
        <dt pdk-summary-list-key>File name</dt>
        <dd pdk-summary-list-value>{{ result.filename }}</dd>
      </div>
      <div pdk-summary-list-item pdk-margin-bottom="2">
        <dt pdk-summary-list-key>Uploaded by</dt>
        <dd pdk-summary-list-value>{{ result.username }}</dd>
      </div>
      <div pdk-summary-list-item pdk-margin-bottom="2">
        <dt pdk-summary-list-key>Status</dt>
        <dd pdk-summary-list-value>
          @if (result.status === ComplaintsFileStatus.FAILED) {
          <pdk-tag color="red">{{ statusLabels[result.status] }}</pdk-tag>
          } @else {
          {{ statusLabels[result.status] }}
          }
        </dd>
      </div>
      <div pdk-summary-list-item borderless pdk-margin-bottom="2">
        <dt pdk-summary-list-key>Action</dt>
        <dd pdk-summary-list-value>
          @if (result.status === ComplaintsFileStatus.FAILED) {
          <a href="#" pdk-link data-role="file-action">View error report</a>
          } @else if (result.status === ComplaintsFileStatus.AWAITING_APPROVAL) {
          <a routerLink="support-documents" pdk-link data-role="file-action">Add supporting documents</a>
          }
        </dd>
      </div>
    </dl>
    } @else {
    <p pdk-margin-top="6" data-role="no-results">No results found. Please check your reference number and try again.</p>
    } }
  `,
  imports: [
    BackButtonComponent,
    PdkCore,
    PdkErrorSummaryComponent,
    PdkSummaryList,
    PdkTypographyDirective,
    PdkMarginDirective,
    PdkForm,
    PdkFormFieldComponent,
    PdkTextInput,
    PdkInput,
    PdkButton,
    PdkTagComponent,
    RouterLink,
    FormsModule,
    DatePipe
  ]
})
export class ViewYourFilesContainer {
  readonly store = inject(ViewYourFilesStore);
  readonly ComplaintsFileStatus = ComplaintsFileStatus;
  readonly statusLabels = COMPLAINTS_FILE_STATUS_LABELS;

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
