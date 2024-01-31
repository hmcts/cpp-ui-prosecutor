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
  PdkNotificationBannerModule,
  PdkPageHeaderModule,
  PdkRelatedModule,
  PdkTabsModule,
  PdkWarningTextModule
} from '@cpp/pdk';
import {
  CaseDetailsComponent,
  DefendantDetailsPersonComponent,
  DefendantDetailsLegalEntityComponent,
  DefendantOffenceComponent,
  DocumentListComponent,
  OverviewComponent,
  PleaMitigationComponent,
  StatementOfFactsComponent,
  NoSeparatePenaltyOffenceDecisionComponent
} from './components';
import { SharedModule } from '../../shared';
import { OverviewContainer } from './overview.container';
import { DownloadDocumentModule } from '../common';
import { RouterModule } from '@angular/router';
import { CaseWarningsComponent } from './components/case-warnings.component';
import { OffenceWarningModule } from '../common/offence-warning/offence-warning.module';
import { DefendantOffenceWarningsComponent } from './components/defendant-offence-warnings.component';
import { CaseHeaderBadgeModule } from '../common/case-header-badge/case-header-badge.module';
import { DefendantDetailsChangeNotificationBannerComponent } from './components/defendant-details-change-notification-banner.component';
import { CaseSubmissionMessagesComponent } from './components/case-submission-messages.component';
import { CaseDecisionsComponent } from './components/case-decisions.component';
import { SavedDecisionInformationPipeModule } from '../../shared/pipes';
import { VerdictTypePipeModule } from '../../shared/pipes/verdict-type/verdict-type.module';
import { CaseDecisionsDetailsComponent } from './components/case-decisions-details.component';
import { FinancialImpositionsComponent } from './components/financial-impositions.component';
import { FinancialOffenceDecisionComponent } from './components/financial-offence-decision.component';
import { PaymentAndCollectionComponent } from './components/payment-and-collection.component';
import { ReferredToOpenCourtOffenceDecisionComponent } from './components/referred-open-court-offence-decision.component';
import { CaseNotesComponent } from './components/case-notes.component';
import { BreadcrumbLinksModule } from '../../shared/breadcrumb-links/breadcrumb-links.module';
import { ApplicationDecisionDetailsComponent } from './components/application-decision-details.component';
import { CaseStatusPipeModule } from '../../shared/pipes';

const DECLARATIONS = [
  OverviewComponent,
  CaseDetailsComponent,
  CaseWarningsComponent,
  DefendantOffenceWarningsComponent,
  DocumentListComponent,
  DefendantDetailsChangeNotificationBannerComponent,
  DefendantDetailsPersonComponent,
  DefendantDetailsLegalEntityComponent,
  StatementOfFactsComponent,
  DefendantOffenceComponent,
  OverviewContainer,
  PleaMitigationComponent,
  CaseSubmissionMessagesComponent,
  CaseNotesComponent,
  CaseDecisionsComponent,
  CaseDecisionsDetailsComponent,
  ReferredToOpenCourtOffenceDecisionComponent,
  FinancialImpositionsComponent,
  FinancialOffenceDecisionComponent,
  NoSeparatePenaltyOffenceDecisionComponent,
  PaymentAndCollectionComponent,
  ApplicationDecisionDetailsComponent
];

@NgModule({
  declarations: [...DECLARATIONS],
  imports: [
    CommonModule,
    RouterModule,
    PdkCoreModule,
    PdkBreadcrumbsModule,
    PdkGridModule,
    PdkNotificationBannerModule,
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
    CaseHeaderBadgeModule,
    CaseStatusPipeModule,
    SavedDecisionInformationPipeModule,
    VerdictTypePipeModule,
    BreadcrumbLinksModule
  ],
  exports: [OverviewContainer]
})
export class OverviewModule {}
