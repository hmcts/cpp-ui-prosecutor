import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { caseOverviewReducer } from './case-overview.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CaseOverviewEffects } from './case-overview.effects';
import { CaseOverviewService } from './case-overview.service';
import { CaseOverviewContainer } from './case-overview.container';
import { CaseOverviewGuard } from './case-overview.guard';

const DECLARATIONS = [CaseOverviewContainer];

@NgModule({
  declarations: [...DECLARATIONS],
  imports: [
    CommonModule,
    StoreModule.forFeature('kase', caseOverviewReducer),
    EffectsModule.forFeature([CaseOverviewEffects]),
    RouterModule.forChild([
      {
        path: ':caseId',
        component: CaseOverviewContainer,
        canActivate: [CaseOverviewGuard]
      }
    ])
  ],
  providers: [CaseOverviewService, CaseOverviewGuard],
  exports: [...DECLARATIONS]
})
export class CaseOverviewModule {}
