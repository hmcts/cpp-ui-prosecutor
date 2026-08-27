import { Component, OnDestroy, inject, signal } from '@angular/core';
import { CsvTemplateDownloadErrorComponent } from '../shared/csv-template-download-error/csv-template-download-error.component';
import { PdkCore, PdkGrid, PdkTypographyDirective } from '@cpp/pdk';
import { BackButtonComponent } from '../../shared';
import { RouterLink } from '@angular/router';
import { ManageYourComplaintsFilesStore } from '../signal-store/manage-your-complaints-files.store';
import { ComplaintsTile } from '../interface/manage-your-complaints-files';

@Component({
  selector: 'manage-your-complaints-files-container',
  template: `
    <csv-template-download-error [show]="store.hasDownloadCsvError()">
      <span error-message>Unable to download the CSV template at the moment. Please try again later.</span>
    </csv-template-download-error>
    <back-button actionText="Back" linkUrl="/"></back-button>

    <h1 pdk-typography="heading-large" pdk-margin-top="6" pdk-margin-bottom="6">Manage your complaints files</h1>

    <pdk-grid container>
      @for (tile of tiles(); track tile.testId) {
      <pdk-grid one-third>
        <div [attr.data-test-id]="tile.testId" pdk-border-colour="mid-grey" tint="25" class="complaints-tile">
          <div pdk-fill-colour="light-grey" pdk-padding="3">
            <h2 pdk-typography="heading-small" pdk-margin="0">
              @if (tile.link) {
              <a href="javascript:void(0)" pdk-link [routerLink]="tile.link">{{ tile.title }}</a>
              } @else {
              <a href="javascript:void(0)" pdk-link (click)="tile.action?.()">{{ tile.title }}</a>
              }
            </h2>
          </div>
          <div pdk-padding="3">
            <p>{{ tile.description }}</p>
          </div>
        </div>
      </pdk-grid>
      }
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

  readonly tiles = signal<ComplaintsTile[]>([
    {
      testId: 'upload-new-files',
      title: 'Upload new files',
      description:
        'Upload the list to be authorised before the summons. Additional files need to be uploaded separately.',
      link: 'upload-new-files'
    },
    {
      testId: 'view-your-files',
      title: 'View your files',
      description: 'View and manage files already uploaded.',
      link: 'view-your-files'
    },
    {
      testId: 'download-csv-template',
      title: 'Download CSV template',
      description: 'Download the template you need to convert your files into CSV ready for uploading.',
      action: () => this.store.downloadCsvTemplate()
    }
  ]);

  ngOnDestroy() {
    this.store.resetState();
  }
}
