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
  PdkTabsModule
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

const DECLARATIONS = [
  OverviewComponent,
  CaseDetailsComponent,
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
    SharedModule,
    DownloadDocumentModule
  ],
  exports: [OverviewContainer]
})
export class OverviewModule {}
