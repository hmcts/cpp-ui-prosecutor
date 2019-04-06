import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  PdkAlertModule,
  PdkBreadcrumbsModule,
  PdkButtonModule,
  PdkCoreModule,
  PdkErrorMessageModule,
  PdkErrorSummaryModule,
  PdkFormModule,
  PdkGridModule,
  PdkInputModule,
  PdkPageHeaderModule,
  PdkTextInputModule
} from '@cpp/pdk';
import { FormsModule } from '@angular/forms';
import { CsvUploadContainer } from './csv-upload.container';
import { CsvUploadComponent } from './components/csv-upload.component';
import { StagingTflModule } from '../../contexts/staging-tfl/staging-tfl.module';
import { CsvUploadFormComponent } from './components/csv-upload-form.component';
import { CsvUploadDirective } from './validators/csv-upload.directive';

const DECLARATIONS = [CsvUploadFormComponent, CsvUploadComponent, CsvUploadContainer, CsvUploadDirective];

@NgModule({
  declarations: [...DECLARATIONS],
  imports: [
    CommonModule,
    PdkCoreModule,
    FormsModule,
    PdkFormModule,
    PdkTextInputModule,
    PdkInputModule,
    PdkBreadcrumbsModule,
    PdkGridModule,
    PdkButtonModule,
    PdkErrorSummaryModule,
    PdkAlertModule,
    PdkErrorMessageModule,
    PdkPageHeaderModule,
    StagingTflModule,
    RouterModule.forChild([
      {
        path: '',
        component: CsvUploadContainer
      }
    ])
  ],
  exports: [CsvUploadContainer]
})
export class CsvUploadModule {}
