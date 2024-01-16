import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WithdrawOffenceContainer } from './withdraw-offence.container';
import { RouterModule } from '@angular/router';
import {
  PdkBadgeModule,
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
import { CaseHeaderBadgeModule } from '../common/case-header-badge/case-header-badge.module';
import { OffenceWithdrawalReasonsGuard } from './withdraw-offence.guard';
import { BreadcrumbLinksModule } from '../../shared/breadcrumb-links/breadcrumb-links.module';

const DECLARATIONS = [WithdrawOffenceContainer, WithdrawOffenceComponent, WithdrawOffenceFormComponent];

@NgModule({
  declarations: [...DECLARATIONS],
  imports: [
    CommonModule,
    PdkCoreModule,
    FormsModule,
    PdkFormModule,
    PdkRadioInputModule,
    PdkCheckboxInputModule,
    PdkGridModule,
    PdkButtonModule,
    PdkErrorSummaryModule,
    PdkBadgeModule,
    CaseHeaderBadgeModule,
    OffenceWithdrawalModule,
    BreadcrumbLinksModule,
    RouterModule.forChild([
      {
        path: '',
        component: WithdrawOffenceContainer,
        canActivate: [OffenceWithdrawalReasonsGuard]
      }
    ])
  ],
  exports: [WithdrawOffenceContainer],
  providers: [OffenceWithdrawalReasonsGuard]
})
export class WithdrawOffenceModule {}
