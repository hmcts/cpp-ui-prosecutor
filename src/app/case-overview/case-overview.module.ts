import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routesCaseOverview } from './routes.case-overview';
import { StoreModule } from '@ngrx/store';
import { caseOverviewReducer } from './case-overview.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CaseOverviewEffects } from './case-overview.effects';
import { CaseOverviewService } from './case-overview.service';
import { CaseOverviewContainer } from './case-overview.container';

const DECLARATIONS = [CaseOverviewContainer];

@NgModule({
  declarations: [...DECLARATIONS],
  imports: [
    CommonModule,
    RouterModule.forChild(routesCaseOverview),
    StoreModule.forFeature('case-overview', caseOverviewReducer),
    EffectsModule.forFeature([CaseOverviewEffects])
  ],
  providers: [CaseOverviewService],
  exports: [...DECLARATIONS]
})
export class CaseOverviewModule {}
