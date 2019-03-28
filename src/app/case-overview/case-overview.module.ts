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
        component: OverviewContainer
      },
      {
        path: 'withdraw-offence',
        loadChildren: './withdraw-offence/withdraw-offence.module#WithdrawOffenceModule'
      }
    ])
  ]
})
export class CaseOverviewModule {}
