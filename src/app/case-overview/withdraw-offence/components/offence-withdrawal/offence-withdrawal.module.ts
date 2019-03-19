import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DefendantNamePipeModule } from '../../../../shared/pipes';
import {
  PdkBadgeModule,
  PdkCoreModule,
  PdkDividerModule,
  PdkFoldableTextModule,
  PdkFormModule,
  PdkPageHeaderModule,
  PdkRadioInputModule
} from '@cpp/pdk';
import { OffenceWithdrawalComponent } from './offence-withdrawal.component';

const DECLARATIONS = [OffenceWithdrawalComponent];

@NgModule({
  declarations: [...DECLARATIONS],
  imports: [
    CommonModule,
    FormsModule,
    DefendantNamePipeModule,
    PdkPageHeaderModule,
    PdkDividerModule,
    PdkBadgeModule,
    PdkRadioInputModule,
    PdkFormModule,
    PdkFoldableTextModule,
    PdkCoreModule
  ],
  exports: [...DECLARATIONS]
})
export class OffenceWithdrawalModule {}
