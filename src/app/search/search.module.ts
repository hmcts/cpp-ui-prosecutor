import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { searchReducer } from './search.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SearchEffects } from './search.effects';
import { RouterModule } from '@angular/router';
import { SjpModule } from '../contexts/sjp/sjp.module';
import { SearchInputModule } from './search-input/search-input.module';
import { SearchResultsModule } from './search-results/search-results.module';
import { SearchResultsContainer } from './search-results/seach-results.container';

const DECLARATIONS = [];

@NgModule({
  declarations: [...DECLARATIONS],
  imports: [
    CommonModule,
    SearchInputModule,
    SearchResultsModule,
    SjpModule,
    StoreModule.forFeature('search', searchReducer),
    EffectsModule.forFeature([SearchEffects]),
    RouterModule.forChild([
      {
        path: 'search',
        data: {
          title: 'Search for a case'
        },
        component: SearchResultsContainer
      }
    ])
  ],
  exports: [...DECLARATIONS]
})
export class SearchModule {}
