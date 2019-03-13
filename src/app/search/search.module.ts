import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchInputModule } from './components/search/search-input.module';
import { StoreModule } from '@ngrx/store';
import { searchReducer } from './search.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SearchEffects } from './search.effects';
import { RouterModule } from '@angular/router';
import { routesSearch } from './routes.search';
import { SearchResultsModule } from './components/results/search-results.module';
import { SjpModule } from '../contexts/sjp/sjp.module';

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
    RouterModule.forChild(routesSearch)
  ],
  exports: [...DECLARATIONS]
})
export class SearchModule {}
