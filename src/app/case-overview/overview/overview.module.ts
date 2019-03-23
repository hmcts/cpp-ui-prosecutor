import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
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

const DECLARATIONS = [
  OverviewComponent,
  CaseDetailsComponent,
  CaseWarningsComponent,
  DocumentListComponent,
  DefendantDetailsComponent,
  StatementOfFactsComponent,
  DefendantOffenceComponent,
  OverviewContainer,
  PleaMitigationComponent
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
    PdkWarningTextModule,
    SharedModule,
    OffenceWarningModule,
    DownloadDocumentModule
  ],
  exports: [OverviewContainer]
})
export class OverviewModule {}
