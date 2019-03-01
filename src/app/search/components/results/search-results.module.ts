import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchResultsComponent } from './search-results.component';
import { SearchInputModule } from '../search/search-input.module';
import { SearchResultsContainer } from './seach-results.container';
import { SearchResultsTableModule } from './table/search-result-table.module';
import { PdkBreadcrumbModule, PdkCoreModule, PdkErrorSummaryModule, PdkFormModule } from '@cpp/pdk';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

const DECLARATIONS = [SearchResultsComponent, SearchResultsContainer];

@NgModule({
  declarations: [...DECLARATIONS],
  exports: [...DECLARATIONS],
  imports: [
    CommonModule,
    SearchInputModule,
    SearchResultsTableModule,
    FormsModule,
    PdkCoreModule,
    PdkFormModule,
    PdkBreadcrumbModule,
    PdkErrorSummaryModule,
    RouterModule
  ]
})
export class SearchResultsModule {}
