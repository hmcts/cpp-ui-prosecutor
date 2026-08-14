import { Component, OnDestroy, inject } from '@angular/core';
import { CsvTemplateDownloadErrorComponent } from '../shared/csv-template-download-error/csv-template-download-error.component';
import { PdkCore, PdkGrid, PdkTypographyDirective } from '@cpp/pdk';
import { BackButtonComponent } from '../../shared';
import { RouterLink } from '@angular/router';
import { ManageYourComplaintsFilesStore } from '../signal-store/manage-your-complaints-files.store';

@Component({
  selector: 'manage-your-complaints-files-container',
  template: `
    <csv-template-download-error [show]="store.hasDownloadCsvError()"></csv-template-download-error>
    <back-button actionText="Back" linkUrl="/"></back-button>

    <h1 pdk-typography="heading-large" pdk-margin-top="6" pdk-margin-bottom="6">Manage your complaints files</h1>

    <pdk-grid container>
      <pdk-grid one-third>
        <div data-test-id="upload-new-files" pdk-border-colour="mid-grey" tint="25" class="complaints-tile">
          <div pdk-fill-colour="light-grey" pdk-padding="3">
            <h2 pdk-typography="heading-small" pdk-margin="0">
              <a href="javascript:void(0)" pdk-link routerLink="upload-new-files">Upload new files</a>
            </h2>
          </div>
          <div pdk-padding="3">
            <p>Upload the list to be authorised before the summons. Additional files need to be uploaded separately.</p>
          </div>
        </div>
      </pdk-grid>
      <pdk-grid one-third>
        <div data-test-id="view-your-files" pdk-border-colour="mid-grey" tint="25" class="complaints-tile">
          <div pdk-fill-colour="light-grey" pdk-padding="3">
            <h2 pdk-typography="heading-small" pdk-margin="0">
              <a href="javascript:void(0)" pdk-link routerLink="view-your-files">View your files</a>
            </h2>
          </div>
          <div pdk-padding="3">
            <p>View and manage files already uploaded.</p>
          </div>
        </div>
      </pdk-grid>
      <pdk-grid one-third>
        <div data-test-id="download-csv-template" pdk-border-colour="mid-grey" tint="25" class="complaints-tile">
          <div pdk-fill-colour="light-grey" pdk-padding="3">
            <h2 pdk-typography="heading-small" pdk-margin="0">
              <a href="javascript:void(0)" pdk-link (click)="store.downloadCsvTemplate()">Download CSV template</a>
            </h2>
          </div>
          <div pdk-padding="3">
            <p>Download the template you need to convert your files into CSV ready for uploading.</p>
          </div>
        </div>
      </pdk-grid>
    </pdk-grid>
  `,
  imports: [
    PdkCore,
    PdkGrid,
    PdkTypographyDirective,
    BackButtonComponent,
    RouterLink,
    CsvTemplateDownloadErrorComponent
  ],
  styles: [
    `
      .complaints-tile {
        border: 1px solid lightgrey;
      }
    `
  ]
})
export class ManageYourComplaintsFilesContainer implements OnDestroy {
  readonly store = inject(ManageYourComplaintsFilesStore);

  ngOnDestroy() {
    this.store.resetState();
  }
}
