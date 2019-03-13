import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CaseOverviewComponent } from './components/case-overview.component';
import { CaseOverviewContainer } from './case-overview.container';
import { CaseDetailsComponent } from './components/case-details.component';
import {
  PdkBadgeModule,
  PdkBreadcrumbsModule,
  PdkCoreModule,
  PdkDividerModule,
  PdkFoldableTextModule,
  PdkGridModule,
  PdkPageHeaderModule,
  PdkTabsModule
} from '@cpp/pdk';
import { DocumentListComponent } from './components/document-list.component';
import { DefendantDetailsComponent } from './components/defendant-details.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CaseOverviewEffects } from './case-overview.effects';
import { caseOverviewReducer } from './case-overview.reducer';
import { CaseOverviewGuard } from './case-overview.guard';
import { DownloadDocumentModule } from './common/download-document/download-document.module';
import { StatementOfFactsComponent } from './components/statement-of-facts.component';
import { DefendantOffenceComponent } from './components/defendant-offence.component';
import { PleaMitigationComponent } from './components/plea-mitigation.component';
import { SharedModule } from '../shared';
import { SjpModule } from '../contexts/sjp/sjp.module';

const DECLARATIONS = [
  CaseOverviewComponent,
  CaseDetailsComponent,
  DocumentListComponent,
  DefendantDetailsComponent,
  StatementOfFactsComponent,
  DefendantOffenceComponent,
  CaseOverviewContainer,
  PleaMitigationComponent
];

@NgModule({
  declarations: [...DECLARATIONS],
  imports: [
    CommonModule,
    PdkCoreModule,
    PdkBreadcrumbsModule,
    PdkGridModule,
    PdkTabsModule,
    PdkPageHeaderModule,
    PdkFoldableTextModule,
    PdkDividerModule,
    PdkBadgeModule,
    SharedModule,
    SjpModule,
    DownloadDocumentModule,
    StoreModule.forFeature('kase', caseOverviewReducer),
    EffectsModule.forFeature([CaseOverviewEffects]),
    RouterModule.forChild([
      {
        path: ':caseId',
        component: CaseOverviewContainer,
        canActivate: [CaseOverviewGuard],
        data: {
          title: 'Case overview'
        }
      }
    ])
  ],
  providers: [CaseOverviewGuard],
  exports: [...DECLARATIONS]
})
export class CaseOverviewModule {}
