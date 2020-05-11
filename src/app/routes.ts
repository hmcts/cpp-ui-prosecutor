import { Routes } from '@angular/router';
import { TechnicalErrorComponent } from './shared/error-pages';
import { CaseDataGuard, DefendantDetailsUpdatesLinkDataGuard, PleadedNotGuiltyDataGuard } from './core/guards';
import { CaseNotesGuard } from './core/guards/case-notes.guard';

export const routes: Routes = [
  {
    path: 'user',
    loadChildren: './dashboard/dashboard.module#DashboardModule',
    canActivate: [PleadedNotGuiltyDataGuard, DefendantDetailsUpdatesLinkDataGuard]
  },
  {
    path: 'tfl',
    loadChildren: './tfl/tfl.module#TflModule',
    canActivate: [PleadedNotGuiltyDataGuard, DefendantDetailsUpdatesLinkDataGuard]
  },
  {
    path: ':role/case-overview/:caseId',
    loadChildren: './case-overview/case-overview.module#CaseOverviewModule',
    canActivate: [CaseDataGuard, CaseNotesGuard]
  },
  {
    path: ':role/review-not-guilty-pleas',
    loadChildren: './review-not-guilty-pleas/review-not-guilty-pleas.module#ReviewNotGuiltyPleasModule',
    canActivate: [PleadedNotGuiltyDataGuard]
  },
  {
    path: ':role/export-case-decisions',
    loadChildren: './export-case-decisions/export-case-decisions.module#ExportCaseDecisionsModule'
  },
  {
    path: ':role/defendant-details-updates',
    loadChildren: './defendant-details-updates/defendant-details-updates.module#DefendantDetailsUpdatesModule'
  },
  { path: 'technical-error', pathMatch: 'full', component: TechnicalErrorComponent },
  { path: 'accessibility', loadChildren: './shared/accessibility/accessibility.module#AccessibilityModule' },

  // Fallbacks for if the user enters /prosecutor/tvl or /prosecutor
  // These will need to be updated when the TFL dashboard is removed
  {
    path: ':role',
    redirectTo: 'user',
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: 'user',
    pathMatch: 'full'
  }
];
