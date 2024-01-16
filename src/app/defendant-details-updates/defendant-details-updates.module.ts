import { NgModule } from '@angular/core';
import { DefendantDetailsUpdatesComponent } from './defendant-details-updates.component';
import { RouterModule } from '@angular/router';
import { DefendantDetailsUpdatesContainer } from './defendant-details-updates.container';
import { CommonModule } from '@angular/common';
import {
  PdkButtonModule,
  PdkCoreModule,
  PdkDividerModule,
  PdkFormModule,
  PdkGridModule,
  PdkInsetTextModule,
  PdkSelectModule,
  PdkTableModule,
  PdkWarningTextModule
} from '@cpp/pdk';
import { DefendantNamePipeModule } from '../shared/pipes';
import { DefendantDetailsUpdatesPageDataGuard } from '../defendant-details-updates/defendant-details-updates.guard';
import { WhatChangedComponent } from './what-changed/what-changed.component';
import { EffectsModule } from '@ngrx/effects';
import { DefendantDetailsUpdatesEffects } from './defendant-details-updates.effects';
import { BreadcrumbLinksModule } from '../shared/breadcrumb-links/breadcrumb-links.module';

const DECLARATIONS = [DefendantDetailsUpdatesComponent, DefendantDetailsUpdatesContainer, WhatChangedComponent];

@NgModule({
  imports: [
    CommonModule,
    PdkCoreModule,
    PdkTableModule,
    PdkDividerModule,
    PdkButtonModule,
    PdkInsetTextModule,
    DefendantNamePipeModule,
    BreadcrumbLinksModule,
    PdkSelectModule,
    PdkFormModule,
    PdkGridModule,
    PdkWarningTextModule,
    EffectsModule.forFeature([DefendantDetailsUpdatesEffects]),
    RouterModule.forChild([
      {
        path: '',
        data: {
          title: 'Defendant details updates | Common platform'
        },
        component: DefendantDetailsUpdatesContainer,
        canActivate: [DefendantDetailsUpdatesPageDataGuard]
      }
    ])
  ],
  declarations: [...DECLARATIONS],
  providers: [DefendantDetailsUpdatesPageDataGuard],
  exports: [DefendantDetailsUpdatesComponent]
})
export class DefendantDetailsUpdatesModule {}
