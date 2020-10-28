import { NgModule } from '@angular/core';
import { ReviewNotGuiltyPleasComponent } from './review-not-guilty-pleas.component';
import { RouterModule } from '@angular/router';
import { ReviewNotGuiltyPleasContainer } from './review-not-guilty-pleas.container';
import { CommonModule } from '@angular/common';
import {
  PdkBreadcrumbsModule,
  PdkButtonModule,
  PdkCoreModule,
  PdkDividerModule,
  PdkTableModule,
  PdkWarningTextModule,
  PdkSelectModule,
  PdkGridModule,
  PdkFormModule
} from '@cpp/pdk';
import { DefendantNamePipeModule, FormatAddressPipeModule } from '../shared/pipes';
import { SharedModule } from '../shared';
import { BreadcrumbLinksModule } from '../shared/breadcrumb-links/breadcrumb-links.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const DECLARATIONS = [ReviewNotGuiltyPleasComponent, ReviewNotGuiltyPleasContainer];

@NgModule({
  imports: [
    CommonModule,
    PdkCoreModule,
    PdkButtonModule,
    FormatAddressPipeModule,
    PdkTableModule,
    PdkWarningTextModule,
    PdkDividerModule,
    DefendantNamePipeModule,
    BreadcrumbLinksModule,
    PdkSelectModule,
    PdkGridModule,
    PdkFormModule,
    RouterModule.forChild([
      {
        path: '',
        data: {
          title: 'Review not guilty pleas | Common platform'
        },
        component: ReviewNotGuiltyPleasContainer
      }
    ])
  ],
  declarations: [...DECLARATIONS]
})
export class ReviewNotGuiltyPleasModule {}
