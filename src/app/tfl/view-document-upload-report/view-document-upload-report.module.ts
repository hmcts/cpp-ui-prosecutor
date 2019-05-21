import { NgModule } from '@angular/core';
import {
  PdkBreadcrumbsModule,
  PdkButtonModule,
  PdkCoreModule,
  PdkGridModule,
  PdkRelatedModule,
  PdkTableModule
} from '@cpp/pdk';
import { ViewDocumentUploadReportComponent } from './components/view-document-upload-report.component';
import { ViewDocumentUploadReportContainer } from './view-document-upload-report.container';
import { DocumentUploadErrorListComponent } from './components/document-upload-error-list.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { IfEmptyPipeModule, UploadErrorPipeModule, UploadStatusPipeModule } from '../../shared/pipes';
import { documentUploadReportReducer } from './view-document-upload-report.reducer';
import { ViewDocumentUploadReportGuard } from './view-document-upload-report.guard';
import { DocumentAndErrorTypesPipe } from './document-and-error-types.pipe';

@NgModule({
  declarations: [
    ViewDocumentUploadReportContainer,
    ViewDocumentUploadReportComponent,
    DocumentUploadErrorListComponent,
    DocumentAndErrorTypesPipe
  ],
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
    StoreModule.forFeature('documentUploadReport', documentUploadReportReducer),
    RouterModule.forChild([
      {
        path: ':uploadId',
        data: {
          title: 'View document upload report - Prosecutor'
        },
        canActivate: [ViewDocumentUploadReportGuard],
        component: ViewDocumentUploadReportContainer
      }
    ])
  ],
  providers: [ViewDocumentUploadReportGuard]
})
export class ViewDocumentUploadReportModule {}
