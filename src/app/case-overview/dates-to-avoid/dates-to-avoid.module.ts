import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  PdkAlertModule,
  PdkButtonModule,
  PdkCheckboxInputModule,
  PdkCoreModule,
  PdkErrorMessageModule,
  PdkErrorSummaryModule,
  PdkFormModule,
  PdkGridModule,
  PdkInputModule,
  PdkPageHeaderModule,
  PdkTextareaModule,
  PdkTextInputModule
} from '@cpp/pdk';
import { FormsModule } from '@angular/forms';
import { DatesToAvoidContainer } from './dates-to-avoid.container';
import { DatesToAvoidComponent } from './dates-to-avoid.component';
import { DefendantNamePipeModule } from '../../shared/pipes';
import { DatesToAvoidFormComponent } from './dates-to-avoid-form.component';
import { CaseHeaderBadgeModule } from '../common/case-header-badge/case-header-badge.module';
import { DatesToAvoidGuard } from './dates-to-avoid.guard';
import { BreadcrumbLinksModule } from '../../shared/breadcrumb-links/breadcrumb-links.module';

const DECLARATIONS = [DatesToAvoidContainer, DatesToAvoidComponent, DatesToAvoidFormComponent];

@NgModule({
  declarations: [...DECLARATIONS],
  imports: [
    CommonModule,
    PdkCoreModule,
    FormsModule,
    PdkFormModule,
    PdkTextInputModule,
    PdkInputModule,
    PdkTextareaModule,
    PdkCheckboxInputModule,
    PdkGridModule,
    PdkButtonModule,
    PdkErrorSummaryModule,
    PdkAlertModule,
    PdkErrorMessageModule,
    DefendantNamePipeModule,
    CaseHeaderBadgeModule,
    PdkPageHeaderModule,
    BreadcrumbLinksModule,
    RouterModule.forChild([
      {
        path: '',
        component: DatesToAvoidContainer,
        canActivate: [DatesToAvoidGuard]
      }
    ])
  ],
  providers: [DatesToAvoidGuard],
  exports: [DatesToAvoidContainer]
})
export class DatesToAvoidModule {}
