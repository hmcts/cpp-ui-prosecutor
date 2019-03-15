import { NgModule } from '@angular/core';
import { DashboardContainer } from './dashboard.container';
import { DashboardComponent } from './dashboard.component';
import { PdkCoreModule, PdkWarningTextModule } from '@cpp/pdk';
import { SearchInputModule } from '../search/search-input/search-input.module';
import { ReviewNotGuiltyPleasLinkComponent } from './components/review-not-guilty-pleas-link/review-not-guilty-pleas-link.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

const DECLARATIONS = [DashboardContainer, DashboardComponent, ReviewNotGuiltyPleasLinkComponent];

@NgModule({
  imports: [CommonModule, PdkCoreModule, RouterModule, SearchInputModule, PdkWarningTextModule],
  declarations: [...DECLARATIONS],
  providers: []
})
export class DashboardModule {}
