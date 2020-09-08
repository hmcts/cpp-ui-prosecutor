import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchInputModule } from '../search-input/search-input.module';
import { SearchResultsContainer } from './seach-results.container';
import { ListSearchResultsComponent } from './components/list-search-results.component';
import {
  PdkBreadcrumbsModule,
  PdkCoreModule,
  PdkInsetTextModule,
  PdkTableModule,
  PdkWarningTextModule
} from '@cpp/pdk';
import { RouterModule } from '@angular/router';
import { CaseStatusPipeModule, DefendantNamePipeModule } from '../../shared/pipes';
import { SearchResultsComponent } from './components/search-results.component';
import { SharedModule } from '../../shared';
import { BreadcrumbLinksModule } from '../../shared/breadcrumb-links/breadcrumb-links.module';

@NgModule({
  declarations: [SearchResultsContainer, SearchResultsComponent, ListSearchResultsComponent],
  imports: [
    CommonModule,
    RouterModule,
    PdkCoreModule,
    PdkInsetTextModule,
    PdkTableModule,
    PdkWarningTextModule,
    SearchInputModule,
    CaseStatusPipeModule,
    DefendantNamePipeModule,
    BreadcrumbLinksModule
  ],
  exports: [SearchResultsContainer]
})
export class SearchResultsModule {}
