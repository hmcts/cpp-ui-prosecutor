import { NgModule } from '@angular/core';
import { CheckCsvUploadContainer } from './check-csv-upload.container';
import { CheckCsvUploadComponent } from './components/check-csv-upload.component';
import { CommonModule } from '@angular/common';
import { PdkBreadcrumbsModule, PdkCoreModule, PdkErrorMessageModule, PdkFormModule, PdkTableModule } from '@cpp/pdk';
import { RouterModule } from '@angular/router';
import { ListCsvUploadDetailsComponent } from './components/list-csv-upload-details.component';
import { CheckCsvUploadGuard } from './check-csv-upload.guard';
import { StoreModule } from '@ngrx/store';
import { csvFileUploadReducer } from './check-csv-upload.reducer';
import { FormatDatePipeModule } from '../../shared/pipes';
import { UploadStatusPipe } from './upload-status.pipe';

@NgModule({
  declarations: [CheckCsvUploadContainer, CheckCsvUploadComponent, ListCsvUploadDetailsComponent, UploadStatusPipe],
  imports: [
    CommonModule,
    PdkCoreModule,
    PdkTableModule,
    PdkBreadcrumbsModule,
    FormatDatePipeModule,
    PdkErrorMessageModule,
    PdkFormModule,
    StoreModule.forFeature('csvFileUploadDetails', csvFileUploadReducer),
    RouterModule.forChild([
      {
        path: '',
        data: {
          title: 'Check CSV uploads - Prosecutor'
        },
        canActivate: [CheckCsvUploadGuard],
        component: CheckCsvUploadContainer
      }
    ])
  ],
  providers: [CheckCsvUploadGuard]
})
export class CheckCsvUploadModule {}
