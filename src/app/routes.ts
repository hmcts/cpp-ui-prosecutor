import { Routes } from '@angular/router';
import { CaseDataGuard, DefendantDetailsUpdatesLinkDataGuard, PleadedNotGuiltyDataGuard } from './core/guards';
import { CaseNotesGuard } from './core/guards/case-notes.guard';
import { SjpNoticeCasesDataGuard } from './cases-missing-sjp-notices/sjp-notice-cases-data.guard';
import { RegionsGuard } from './core/guards/regions.guard';
import { ERROR_PAGES_ROUTES } from '@cpp/application';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'user'
  },
  {
    path: 'user',
    loadChildren: './dashboard/dashboard.module#DashboardModule',
    canActivate: [PleadedNotGuiltyDataGuard, DefendantDetailsUpdatesLinkDataGuard, SjpNoticeCasesDataGuard]
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
    canActivate: [PleadedNotGuiltyDataGuard, RegionsGuard]
  },
  {
    path: ':role/review-not-guilty-pleas/:regionFilter',
    loadChildren: './review-not-guilty-pleas/review-not-guilty-pleas.module#ReviewNotGuiltyPleasModule',
    canActivate: [PleadedNotGuiltyDataGuard, RegionsGuard]
  },
  {
    path: 'user/cases-missing-sjp-notices',
    loadChildren: './cases-missing-sjp-notices/cases-missing-sjp-notices.module#CasesMissingSjpNoticesModule'
  },
  {
    path: ':role/export-case-decisions',
    loadChildren: './export-case-decisions/export-case-decisions.module#ExportCaseDecisionsModule'
  },
  {
    path: ':role/defendant-details-updates',
    loadChildren: './defendant-details-updates/defendant-details-updates.module#DefendantDetailsUpdatesModule',
    canActivate: [RegionsGuard]
  },
  {
    path: ':role/defendant-details-updates/:regionFilter',
    loadChildren: './defendant-details-updates/defendant-details-updates.module#DefendantDetailsUpdatesModule',
    canActivate: [RegionsGuard]
  },
  { path: 'accessibility', loadChildren: './shared/accessibility/accessibility.module#AccessibilityModule' },
  ...ERROR_PAGES_ROUTES,

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
