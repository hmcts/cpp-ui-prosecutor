import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';
import { AppContainer } from './containers/app.container';
import { PdkCoreModule } from '@cpp/pdk';
import { ManualCaseDetailsEffects } from './effects/manual-case-details.effects';
import { ContextsModule } from '../contexts/contexts.module';
import { PleadedNotGuiltyDataGuard } from './guards/pleaded-not-guilty-data.guard';
import { DefendantDetailsUpdatesLinkDataGuard } from './guards/defendant-details-updates-data.guard';
import { AppRouterContainer } from './containers/app.router.container';
import { CaseDataGuard } from './guards/case-data.guard';
import { CaseNotesGuard } from './guards/case-notes.guard';
import { OnlinePleaGuard } from './guards/online-plea.guard';
import { SjpNoticeCasesDataGuard } from '../cases-missing-sjp-notices/sjp-notice-cases-data.guard';
import { RegionsGuard } from './guards/regions.guard';
import { ApplicationModule } from '@cpp/application';
import { environment } from 'src/environments/environment';

const DECLARATIONS = [AppContainer, AppRouterContainer];

@NgModule({
  imports: [
    CommonModule,
    ApplicationModule.forRoot(environment),
    EffectsModule.forFeature([
      ManualCaseDetailsEffects,
    ]),
    PdkCoreModule, RouterModule, ContextsModule
  ],
  declarations: [...DECLARATIONS],
  exports: [AppContainer],
  providers: [
    CaseDataGuard,
    PleadedNotGuiltyDataGuard,
    DefendantDetailsUpdatesLinkDataGuard,
    OnlinePleaGuard,
    CaseNotesGuard,
    SjpNoticeCasesDataGuard,
    RegionsGuard
  ]
})
export class CoreModule {}
