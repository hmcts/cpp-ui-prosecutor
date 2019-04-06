import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { tflReducer } from './tfl.reducer';
import { SjpNoticeCasesDataGuard } from './guards/sjp-notice-cases-data.guard';
import { EffectsModule } from '@ngrx/effects';
import { TflEffects } from './tfl.effects';
import { CommonModule } from '@angular/common';
import { StagingTflModule } from '../contexts/staging-tfl/staging-tfl.module';
import { FileUploadStatsDataGuard } from './guards/file-upload-stats-data.guard';

@NgModule({
  imports: [
    CommonModule,
    StagingTflModule,
    StoreModule.forFeature('tfl', tflReducer),
    EffectsModule.forFeature([TflEffects]),
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
      },
      {
        path: 'csv-upload',
        loadChildren: './csv-upload/csv-upload.module#CsvUploadModule'
      }
    ])
  ],
  providers: [SjpNoticeCasesDataGuard, FileUploadStatsDataGuard]
})
export class TflModule {}
