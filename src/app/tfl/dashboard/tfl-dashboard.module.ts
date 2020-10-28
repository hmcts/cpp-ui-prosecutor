import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PdkCoreModule, PdkGridModule, PdkSummaryItemModule, PdkWarningTextModule } from '@cpp/pdk';
import { TflDashboardContainer } from './tfl-dashboard.container';
import { TflDashboardComponent } from './tfl-dashboard.component';
import { SearchInputModule } from '../../search/search-input/search-input.module';
import { ReviewNotGuiltyPleasLinkModule } from '../../shared/review-not-guilty-pleas-link';
import { DefendantDetailsUpdatesLinkModule } from 'src/app/shared/defendant-details-updates-link';

const DECLARATIONS = [TflDashboardContainer, TflDashboardComponent];

@NgModule({
  imports: [
    CommonModule,
    PdkCoreModule,
    RouterModule,
    SearchInputModule,
    PdkWarningTextModule,
    PdkSummaryItemModule,
    PdkGridModule,
    DefendantDetailsUpdatesLinkModule,
    ReviewNotGuiltyPleasLinkModule,
    RouterModule.forChild([
      {
        path: '',
        data: {
          title: 'Single Justice Procedure | Common platform'
        },
        component: TflDashboardContainer
      }
    ])
  ],
  declarations: [...DECLARATIONS]
})
export class TflDashboardModule {}
