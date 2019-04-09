import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { tflReducer } from './tfl.reducer';
import { SjpNoticeCasesDataGuard } from './guards/sjp-notice-cases-data.guard';
import { FileUploadStatsDataGuard } from './guards/file-upload-stats-data.guard';

@NgModule({
  imports: [
    StoreModule.forFeature('tfl', tflReducer),
    RouterModule.forChild([
      {
        path: '',
        canActivate: [SjpNoticeCasesDataGuard],
        loadChildren: './dashboard/tfl-dashboard.module#TflDashboardModule'
      },
      {
        path: 'check-csv-uploads',
        canActivate: [],
        loadChildren: './check-csv-upload/check-csv-upload.module#CheckCsvUploadModule'
      }
    ])
  ],
  providers: [SjpNoticeCasesDataGuard, FileUploadStatsDataGuard]
})
export class TflModule {}
