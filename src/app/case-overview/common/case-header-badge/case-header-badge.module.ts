import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdkCoreModule, PdkPageHeaderModule } from '@cpp/pdk';
import { DefendantNamePipeModule } from '../../../shared/pipes';
import { CaseHeaderBadgeComponent } from './case-header-badge.component';
import { CaseHeaderBadgeContainer } from './case-header-badge.container';

const DECLARATIONS = [CaseHeaderBadgeContainer, CaseHeaderBadgeComponent];

@NgModule({
  declarations: [...DECLARATIONS],
  imports: [CommonModule, PdkCoreModule, PdkPageHeaderModule, DefendantNamePipeModule],
  exports: [CaseHeaderBadgeContainer]
})
export class CaseHeaderBadgeModule {}
