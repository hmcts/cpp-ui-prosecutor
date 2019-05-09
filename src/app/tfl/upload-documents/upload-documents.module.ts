import { NgModule } from '@angular/core';
import { UploadDocumentsContainer } from './upload-documents.container';
import { CommonModule } from '@angular/common';
import {
  PdkBreadcrumbsModule,
  PdkButtonModule,
  PdkContextPanelModule,
  PdkCoreModule,
  PdkErrorSummaryModule,
  PdkFormModule,
  PdkGridModule,
  PdkInsetTextModule,
  PdkTextInputModule
} from '@cpp/pdk';
import { UploadDocumentsComponent } from './components/upload-documents.component';
import { UploadDocumentFormComponent } from './components/upload-document-form.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [UploadDocumentsContainer, UploadDocumentsComponent, UploadDocumentFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    PdkCoreModule,
    PdkFormModule,
    PdkInsetTextModule,
    PdkContextPanelModule,
    PdkErrorSummaryModule,
    PdkGridModule,
    PdkButtonModule,
    PdkBreadcrumbsModule,
    PdkTextInputModule,
    RouterModule.forChild([
      {
        path: '',
        component: UploadDocumentsContainer
      }
    ])
  ]
})
export class UploadDocumentsModule {}
