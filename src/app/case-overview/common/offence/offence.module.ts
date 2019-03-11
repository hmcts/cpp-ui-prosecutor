import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdkCheckboxInputModule, PdkCoreModule } from '@cpp/pdk';
import { OffenceComponent } from './offence.component';

const DECLARATIONS = [OffenceComponent];

@NgModule({
  declarations: [...DECLARATIONS],
  imports: [CommonModule, PdkCoreModule, PdkCheckboxInputModule],
  exports: [...DECLARATIONS]
})
export class OffenceModule {}
