import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  PdkAlertModule,
  PdkBadgeModule,
  PdkBreadcrumbsModule,
  PdkCoreModule,
  PdkDividerModule,
  PdkFoldableTextModule,
  PdkGridModule,
  PdkPageHeaderModule,
  PdkRelatedModule,
  PdkTabsModule,
  PdkWarningTextModule
} from '@cpp/pdk';
import {
  CaseDetailsComponent,
  DefendantDetailsComponent,
  DefendantOffenceComponent,
  DocumentListComponent,
  OverviewComponent,
  PleaMitigationComponent,
  StatementOfFactsComponent
} from './components';
import { SharedModule } from '../../shared';
import { OverviewContainer } from './overview.container';
import { DownloadDocumentModule } from '../common';
import { RouterModule } from '@angular/router';
import { CaseWarningsComponent } from './components/case-warnings.component';
import { OffenceWarningModule } from '../common/offence-warning/offence-warning.module';
import { DefendantOffenceWarningsComponent } from './components/defendant-offence-warnings.component';
import { CaseHeaderBadgeModule } from '../common/case-header-badge/case-header-badge.module';
import { PersonalDetailsChangeAlertComponent } from './components/personal-details-change-alert.component';
import { CaseSubmissionMessagesComponent } from './components/case-submission-messages.component';
import { CaseDecisionsComponent } from './components/case-decisions.component';

const DECLARATIONS = [
  OverviewComponent,
  CaseDetailsComponent,
  CaseWarningsComponent,
  DefendantOffenceWarningsComponent,
  DocumentListComponent,
  DefendantDetailsComponent,
  StatementOfFactsComponent,
  DefendantOffenceComponent,
  OverviewContainer,
  PleaMitigationComponent,
  PersonalDetailsChangeAlertComponent,
  CaseSubmissionMessagesComponent,
  CaseDecisionsComponent
];

@NgModule({
  declarations: [...DECLARATIONS],
  imports: [
    CommonModule,
    RouterModule,
    PdkCoreModule,
    PdkBreadcrumbsModule,
    PdkGridModule,
    PdkTabsModule,
    PdkPageHeaderModule,
    PdkFoldableTextModule,
    PdkDividerModule,
    PdkBadgeModule,
    PdkRelatedModule,
    PdkAlertModule,
    PdkWarningTextModule,
    SharedModule,
    OffenceWarningModule,
    DownloadDocumentModule,
    CaseHeaderBadgeModule
  ],
  exports: [OverviewContainer]
})
export class OverviewModule {}
