import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchResultsComponent } from './search-results.component';
import { SearchInputModule } from '../search/search-input.module';

const DECLARATIONS = [SearchResultsComponent];

@NgModule({
  declarations: [...DECLARATIONS],
  exports: [...DECLARATIONS],
  imports: [CommonModule, SearchInputModule]
})
export class SearchResultsModule {}
