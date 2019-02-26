import { NgModule } from '@angular/core';
import { SearchContainer } from './search.container';
import { CommonModule } from '@angular/common';
import { SearchInputModule } from './components/search/search-input.module';
import { SearchService } from './search.service';
import { StoreModule } from '@ngrx/store';
import { searchReducer } from './search.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SearchEffects } from './search.effects';

const DECLARATIONS = [SearchContainer];

@NgModule({
  declarations: [...DECLARATIONS],
  imports: [
    CommonModule,
    SearchInputModule,
    StoreModule.forFeature('search', searchReducer),
    EffectsModule.forFeature([SearchEffects])
  ],
  providers: [SearchService],
  exports: [...DECLARATIONS]
})
export class SearchModule {}
