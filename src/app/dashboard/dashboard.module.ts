import { NgModule } from '@angular/core';
import { DashboardContainer } from './dashboard.container';
import { DashboardComponent } from './dashboard.component';
import { PdkCoreModule, PdkWarningTextModule, PdkGridModule, PdkSummaryItemModule } from '@cpp/pdk';
import { SearchInputModule } from '../search/search-input/search-input.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReviewNotGuiltyPleasLinkModule } from '../shared/review-not-guilty-pleas-link';
import { DefendantDetailsUpdatesLinkModule } from '../shared/defendant-details-updates-link';

const DECLARATIONS = [DashboardContainer, DashboardComponent];

@NgModule({
  imports: [
    CommonModule,
    PdkCoreModule,
    RouterModule,
    SearchInputModule,
    PdkWarningTextModule,
    ReviewNotGuiltyPleasLinkModule,
    DefendantDetailsUpdatesLinkModule,
    PdkGridModule,
    PdkSummaryItemModule,
    RouterModule.forChild([
      {
        path: '',
        data: {
          title: 'Single Justice Procedure | Common platform'
        },
        component: DashboardContainer
      }
    ])
  ],
  declarations: [...DECLARATIONS]
})
export class DashboardModule {}
