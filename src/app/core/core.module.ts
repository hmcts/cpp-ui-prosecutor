import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './components/layout.component';
import { AppContainer } from './containers/app.container';
import { PdkCoreModule, PdkCppPatternModule } from '@cpp/pdk';
import { ContextsModule } from '../contexts/contexts.module';
import { PleadedNotGuiltyDataGuard } from './guards/pleaded-not-guilty-data.guard';
import { DefendantDetailsUpdatesLinkDataGuard } from './guards/defendant-details-updates-data.guard';
import { AppRouterContainer } from './containers/app.router.container';
import { CaseDataGuard } from './guards/case-data.guard';
import { CaseNotesGuard } from './guards/case-notes.guard';
import { OnlinePleaGuard } from './guards/online-plea.guard';

const DECLARATIONS = [LayoutComponent, AppContainer, AppRouterContainer];

@NgModule({
  imports: [CommonModule, PdkCoreModule, PdkCppPatternModule, RouterModule, ContextsModule],
  declarations: [...DECLARATIONS],
  exports: [AppContainer],
  providers: [
    CaseDataGuard,
    PleadedNotGuiltyDataGuard,
    DefendantDetailsUpdatesLinkDataGuard,
    OnlinePleaGuard,
    CaseNotesGuard
  ]
})
export class CoreModule {}
