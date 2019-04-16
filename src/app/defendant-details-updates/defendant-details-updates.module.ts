import { NgModule } from '@angular/core';
import { DefendantDetailsUpdatesComponent } from './defendant-details-updates.component';
import { RouterModule } from '@angular/router';
import { DefendantDetailsUpdatesContainer } from './defendant-details-updates.container';
import { CommonModule } from '@angular/common';
import {
  PdkBreadcrumbsModule,
  PdkButtonModule,
  PdkCoreModule,
  PdkDividerModule,
  PdkInsetTextModule,
  PdkTableModule
} from '@cpp/pdk';
import { DefendantNamePipeModule } from '../shared/pipes';
import { DefendantDetailsUpdatesPageDataGuard } from '../defendant-details-updates/defendant-details-updates.guard';
import {WhatChangedComponent} from './what-changed/what-changed.component';
import {EffectsModule} from '@ngrx/effects';
import {DefendantDetailsUpdatesEffects} from './defendant-details-updates.effects';

const DECLARATIONS = [DefendantDetailsUpdatesComponent, DefendantDetailsUpdatesContainer, WhatChangedComponent];

@NgModule({
  imports: [
    CommonModule,
    PdkCoreModule,
    PdkTableModule,
    PdkDividerModule,
    PdkBreadcrumbsModule,
    PdkButtonModule,
    PdkInsetTextModule,
    DefendantNamePipeModule,
    EffectsModule.forFeature([DefendantDetailsUpdatesEffects]),
    RouterModule.forChild([
      {
        path: '',
        data: {
          title: 'Defendant details updates'
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
