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
  PdkWarningTextModule
} from '@cpp/pdk';
import { DefendantNamePipeModule, FormatAddressPipeModule } from '../shared/pipes';

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
    PdkBreadcrumbsModule,
    DefendantNamePipeModule,
    RouterModule.forChild([
      {
        path: '',
        data: {
          title: 'Review not guilty pleas'
        },
        component: ReviewNotGuiltyPleasContainer
      }
    ])
  ],
  declarations: [...DECLARATIONS]
})
export class ReviewNotGuiltyPleasModule {}
