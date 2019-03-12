import { NgModule } from '@angular/core';
import { DefendantHighlightComponent } from './defendant-highlight.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DefendantNamePipeModule } from '../../../../shared/pipes';
import { PdkPageHeaderModule } from '@cpp/pdk';

const DECLARATIONS = [DefendantHighlightComponent];

@NgModule({
  declarations: [...DECLARATIONS],
  imports: [CommonModule, FormsModule, DefendantNamePipeModule, PdkPageHeaderModule],
  exports: [...DECLARATIONS]
})
export class DefendantHighlightModule {}
