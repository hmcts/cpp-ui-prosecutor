import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DefendantNamePipeModule } from '../../shared/pipes';
import { PdkPageHeaderModule } from '@cpp/pdk';
import { CaseHeaderBadgeComponent } from './case-header-badge.component';

const DECLARATIONS = [CaseHeaderBadgeComponent];

@NgModule({
  declarations: [...DECLARATIONS],
  imports: [CommonModule, FormsModule, DefendantNamePipeModule, PdkPageHeaderModule],
  exports: [...DECLARATIONS]
})
export class CaseHeaderBadgeModule {}
