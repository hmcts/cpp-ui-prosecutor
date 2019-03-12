import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdkCoreModule, PdkFormModule, PdkGridModule, PdkSearchbarModule } from '@cpp/pdk';
import { SearchInputComponent } from './search-input.component';
import { FormsModule } from '@angular/forms';
import { SearchInputContainer } from './search-input.container';

const DECLARATIONS = [SearchInputComponent, SearchInputContainer];

@NgModule({
  declarations: [...DECLARATIONS],
  exports: [...DECLARATIONS],
  imports: [CommonModule, FormsModule, PdkCoreModule, PdkFormModule, PdkSearchbarModule, PdkGridModule]
})
export class SearchInputModule {}
