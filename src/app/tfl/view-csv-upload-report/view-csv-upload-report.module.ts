import { NgModule } from '@angular/core';
import {
  PdkBreadcrumbsModule,
  PdkButtonModule,
  PdkCoreModule,
  PdkGridModule,
  PdkRelatedModule,
  PdkTableModule
} from '@cpp/pdk';
import { ViewCsvUploadReportComponent } from './components/view-csv-upload-report.component';
import { ViewCsvUploadReportContainer } from './view-csv-upload-report.container';
import { CsvUploadErrorListComponent } from './components/csv-upload-error-list.component';
import { RouterModule } from '@angular/router';
import { ViewCsvUploadReportGuard } from './view-csv-upload-report.guard';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { csvFileUploadReportReducer } from './view-csv-upload-report.reducer';
import { IfEmptyPipeModule, UploadErrorPipeModule, UploadStatusPipeModule } from '../../shared/pipes';

@NgModule({
  declarations: [ViewCsvUploadReportContainer, ViewCsvUploadReportComponent, CsvUploadErrorListComponent],
  imports: [
    CommonModule,
    PdkCoreModule,
    PdkGridModule,
    PdkBreadcrumbsModule,
    PdkButtonModule,
    PdkTableModule,
    PdkRelatedModule,
    IfEmptyPipeModule,
    UploadErrorPipeModule,
    UploadStatusPipeModule,
    StoreModule.forFeature('csvFileUploadReport', csvFileUploadReportReducer),
    RouterModule.forChild([
      {
        path: ':uploadId',
        data: {
          title: 'View CSV upload report | Common platform'
        },
        canActivate: [ViewCsvUploadReportGuard],
        component: ViewCsvUploadReportContainer
      }
    ])
  ],
  providers: [ViewCsvUploadReportGuard]
})
export class ViewCsvUploadReportModule {}
