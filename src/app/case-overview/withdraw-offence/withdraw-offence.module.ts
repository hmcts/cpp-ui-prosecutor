import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WithdrawOffenceContainer } from './withdraw-offence.container';
import { RouterModule } from '@angular/router';
import {
  PdkBadgeModule,
  PdkBreadcrumbsModule,
  PdkButtonModule,
  PdkCheckboxInputModule,
  PdkCoreModule,
  PdkDividerModule,
  PdkFoldableTextModule,
  PdkFormModule,
  PdkGridModule,
  PdkRadioInputModule
} from '@cpp/pdk';
import { DefendantHighlightModule } from './components/defendant-highlight/defendant-highlight.module';
import { OffenceComponent } from './offence.component';
import { WithdrawOffenceListComponent } from './withdraw-offence-list.component';
import { WithdrawOffenceListFormComponent } from './withdraw-offence-list-form.component';
import { FormsModule } from '@angular/forms';

const DECLARATIONS = [
  WithdrawOffenceContainer,
  OffenceComponent,
  WithdrawOffenceListComponent,
  WithdrawOffenceListFormComponent
];

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
    PdkDividerModule,
    PdkFoldableTextModule,
    PdkBadgeModule,
    DefendantHighlightModule,
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
