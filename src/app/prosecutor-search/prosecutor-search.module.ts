import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PdkCoreModule, PdkFormModule, PdkCheckboxInputModule } from '@cpp/pdk';
import { ReferenceDataModule } from '@cpp/reference-data';
import { ProsecutorSearchComponent } from './prosecutor-search.component';

@NgModule({
  imports: [CommonModule, PdkFormModule, PdkCoreModule, PdkCheckboxInputModule, ReferenceDataModule, RouterModule],

  declarations: [ProsecutorSearchComponent],
  exports: [ProsecutorSearchComponent]
})
export class ProsecutorSearchModule {}
