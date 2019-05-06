import { NgModule } from '@angular/core';
import { CheckDocumentUploadContainer } from './check-document-upload.container';
import { CheckDocumentUploadComponent } from './components/check-document-upload.component';
import { CommonModule } from '@angular/common';
import { PdkBreadcrumbsModule, PdkCoreModule, PdkErrorMessageModule, PdkFormModule, PdkTableModule } from '@cpp/pdk';
import { RouterModule } from '@angular/router';
import { ListDocumentUploadDetailsComponent } from './components/list-document-upload-details.component';
import { CheckDocumentUploadGuard } from './check-document-upload.guard';
import { StoreModule } from '@ngrx/store';
import { documentUploadReducer } from './check-document-upload.reducer';
import { FormatDatePipeModule, UploadStatusPipeModule } from '../../shared/pipes';

@NgModule({
  declarations: [CheckDocumentUploadContainer, CheckDocumentUploadComponent, ListDocumentUploadDetailsComponent],
  imports: [
    CommonModule,
    PdkCoreModule,
    PdkTableModule,
    PdkBreadcrumbsModule,
    FormatDatePipeModule,
    PdkErrorMessageModule,
    PdkFormModule,
    UploadStatusPipeModule,
    StoreModule.forFeature('documentUploadDetails', documentUploadReducer),
    RouterModule.forChild([
      {
        path: '',
        data: {
          title: 'Check document uploads - Prosecute SJP cases'
        },
        canActivate: [CheckDocumentUploadGuard],
        component: CheckDocumentUploadContainer
      }
    ])
  ],
  providers: [CheckDocumentUploadGuard]
})
export class CheckDocumentUploadModule {}
