import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WithdrawOffenceContainer } from './withdraw-offence.container';
import { RouterModule } from '@angular/router';
import {
  PdkBreadcrumbsModule,
  PdkButtonModule,
  PdkCheckboxInputModule,
  PdkCoreModule,
  PdkErrorSummaryModule,
  PdkFormModule,
  PdkGridModule,
  PdkRadioInputModule
} from '@cpp/pdk';
import { WithdrawOffenceComponent } from './withdraw-offence.component';
import { WithdrawOffenceFormComponent } from './withdraw-offence-form.component';
import { FormsModule } from '@angular/forms';
import { OffenceWithdrawalModule } from './components/offence-withdrawal/offence-withdrawal.module';
import { CaseHeaderBadgeModule } from '../case-header-badge/case-header-badge.module';

const DECLARATIONS = [WithdrawOffenceContainer, WithdrawOffenceComponent, WithdrawOffenceFormComponent];

@NgModule({
  declarations: [...DECLARATIONS],
  imports: [
    CommonModule,
    PdkCoreModule,
    FormsModule,
    PdkFormModule,
    PdkRadioInputModule,
    PdkBreadcrumbsModule,
    PdkCheckboxInputModule,
    PdkGridModule,
    PdkButtonModule,
    PdkErrorSummaryModule,
    CaseHeaderBadgeModule,
    OffenceWithdrawalModule,
    RouterModule.forChild([
      {
        path: '',
        component: WithdrawOffenceContainer
      }
    ])
  ],
  exports: [WithdrawOffenceContainer]
})
export class WithdrawOffenceModule {}
