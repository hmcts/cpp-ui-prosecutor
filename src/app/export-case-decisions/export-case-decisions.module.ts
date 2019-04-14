import { NgModule } from '@angular/core';
import { ExportCaseDecisionsComponent } from './components/export-case-decisions.component';
import { ExportCaseDecisionsContainer } from './export-case-decisions.container';
import { ExportCaseDecisionsFormComponent } from './components/export-case-decisions-form.component';
import {
  PdkBreadcrumbsModule,
  PdkButtonModule,
  PdkCoreModule,
  PdkErrorSummaryModule,
  PdkFormModule,
  PdkInsetTextModule
} from '@cpp/pdk';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FromToDatesModule } from '../shared/from-to-dates/from-to-dates.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ExportCaseDecisionsEffects } from './export-case-decisions.effects';
import { exportCaseDecisionsReducer } from './export-case-decisions.reducer';
import { DownloadCaseDecisionsComponent } from './components/download-case-decisions.component';
import { CommonModule } from '@angular/common';

const DECLARATIONS = [
  ExportCaseDecisionsComponent,
  ExportCaseDecisionsFormComponent,
  DownloadCaseDecisionsComponent,
  ExportCaseDecisionsContainer
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PdkCoreModule,
    PdkFormModule,
    PdkButtonModule,
    PdkBreadcrumbsModule,
    PdkInsetTextModule,
    FromToDatesModule,
    PdkErrorSummaryModule,
    StoreModule.forFeature('resultedCaseCount', exportCaseDecisionsReducer),
    EffectsModule.forFeature([ExportCaseDecisionsEffects]),
    RouterModule.forChild([
      {
        path: '',
        component: ExportCaseDecisionsContainer,
        data: {
          title: 'Export Case Decisions'
        }
      }
    ])
  ],
  declarations: [...DECLARATIONS]
})
export class ExportCaseDecisionsModule {}
