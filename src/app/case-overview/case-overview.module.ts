import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CaseOverviewEffects } from './case-overview.effects';
import { caseOverviewReducer } from './case-overview.reducer';
import { SjpModule } from '../contexts/sjp/sjp.module';
import { OverviewModule } from './overview/overview.module';
import { OverviewContainer } from './overview/overview.container';

@NgModule({
  imports: [
    CommonModule,
    SjpModule,
    OverviewModule,
    StoreModule.forFeature('caseOverview', caseOverviewReducer),
    EffectsModule.forFeature([CaseOverviewEffects]),
    RouterModule.forChild([
      {
        path: '',
        component: OverviewContainer,
        data: { title: 'Case Overview | Common platform' }
      },
      {
        path: 'withdraw-offence',
        loadChildren: './withdraw-offence/withdraw-offence.module#WithdrawOffenceModule',
        data: { title: 'Manage offence withdrawals | Common platform'}
      },
      {
        path: 'dates-to-avoid',
        loadChildren: './dates-to-avoid/dates-to-avoid.module#DatesToAvoidModule',
        data: {title: 'Dates to avoid | Common platform'}
      },
      {
        path: 'online-plea-details',
        loadChildren: './online-plea-details/online-plea-details.module#OnlinePleaDetailsModule',
        data: { title: 'Online plea | Common platform' }
      }
    ])
  ]
})
export class CaseOverviewModule {}
