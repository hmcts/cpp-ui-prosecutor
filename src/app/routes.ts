import { Routes } from '@angular/router';
import { CaseDataGuard, DefendantDetailsUpdatesLinkDataGuard, PleadedNotGuiltyDataGuard } from './core/guards';
import { CaseNotesGuard } from './core/guards/case-notes.guard';
import { SjpNoticeCasesDataGuard } from './cases-missing-sjp-notices/sjp-notice-cases-data.guard';
import { RegionsGuard } from './core/guards/regions.guard';
import { ERROR_PAGES_ROUTES, ERROR_ROUTE_PATHS } from '@cpp/application';
import { UserPermissionsGuard } from '@cpp/users-groups';
import { ProsecutorByCodeGuard } from './shared/guards/prosecutorByCode.guard';

export const routes: Routes = [
  {
    path: '',
     canActivate: [UserPermissionsGuard],
    data: {
      serviceUnavailableRedirectTo: `/${ERROR_ROUTE_PATHS.serviceUnavailable}`
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'user'
       },
      {
        path: 'user',
        loadChildren: './dashboard/dashboard.module#DashboardModule',
        canActivate: [PleadedNotGuiltyDataGuard, DefendantDetailsUpdatesLinkDataGuard, SjpNoticeCasesDataGuard, ProsecutorByCodeGuard]
      },
      {
        path: 'tfl',
        redirectTo: 'user',
        pathMatch: 'prefix'
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
      {
        path: 'manual-case',
        loadChildren: './manual-case/manual-case.module#ManualCaseModule'
      },
    ]
  },
  ...ERROR_PAGES_ROUTES
];
