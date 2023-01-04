import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { searchReducer } from './search.reducer';
import { RouterModule } from '@angular/router';
import { SjpModule } from '../contexts/sjp/sjp.module';
import { SearchInputModule } from './search-input/search-input.module';
import { SearchResultsModule } from './search-results/search-results.module';
import { SearchResultsContainer } from './search-results/seach-results.container';
import { SearchGuard } from './search.guard';
import { ResetGuard } from './reset.guard';

const DECLARATIONS = [];

@NgModule({
  declarations: [...DECLARATIONS],
  imports: [
    CommonModule,
    SearchInputModule,
    SearchResultsModule,
    SjpModule,
    StoreModule.forFeature('search', searchReducer),
    RouterModule.forChild([
      {
        path: 'tfl',
        redirectTo: 'user',
        pathMatch: 'prefix'
      },
      {
        path: ':role/search',
        data: {
          title: 'Search for a case | Common platform'
        },
        children: [
          {
            path: '',
            pathMatch: 'full',
            canActivate: [ResetGuard],
            component: SearchResultsContainer
          },
          {
            path: ':keyword',
            canActivate: [SearchGuard],
            component: SearchResultsContainer
          }
        ]
      }
    ])
  ],
  exports: [...DECLARATIONS],
  providers: [SearchGuard, ResetGuard]
})
export class SearchModule {}
