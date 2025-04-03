import { Routes } from '@angular/router';
import { CaseDataGuard, DefendantDetailsUpdatesLinkDataGuard, PleadedNotGuiltyDataGuard } from './core/guards';
import { CaseNotesGuard } from './core/guards/case-notes.guard';
import { SjpNoticeCasesDataGuard } from './cases-missing-sjp-notices/sjp-notice-cases-data.guard';
import { RegionsGuard } from './core/guards/regions.guard';
import { ERROR_PAGES_ROUTES, ERROR_ROUTE_PATHS, SYSTEM_ANNOUNCEMENT_ROUTES } from '@cpp/application';
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
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [
          PleadedNotGuiltyDataGuard,
          DefendantDetailsUpdatesLinkDataGuard,
          SjpNoticeCasesDataGuard,
          ProsecutorByCodeGuard
        ]
      },
      {
        path: 'tfl',
        redirectTo: 'user',
        pathMatch: 'prefix'
      },
      {
        path: ':role/case-overview/:caseId',
        loadChildren: () => import('./case-overview/case-overview.module').then(m => m.CaseOverviewModule),
        canActivate: [CaseDataGuard, CaseNotesGuard]
      },
      {
        path: ':role/review-not-guilty-pleas',
        loadChildren: () =>
          import('./review-not-guilty-pleas/review-not-guilty-pleas.module').then(m => m.ReviewNotGuiltyPleasModule),
        canActivate: [PleadedNotGuiltyDataGuard, RegionsGuard]
      },
      {
        path: ':role/review-not-guilty-pleas/:regionFilter',
        loadChildren: () =>
          import('./review-not-guilty-pleas/review-not-guilty-pleas.module').then(m => m.ReviewNotGuiltyPleasModule),
        canActivate: [PleadedNotGuiltyDataGuard, RegionsGuard]
      },
      {
        path: 'user/cases-missing-sjp-notices',
        loadChildren: () =>
          import('./cases-missing-sjp-notices/cases-missing-sjp-notices.module').then(
            m => m.CasesMissingSjpNoticesModule
          )
      },
      {
        path: ':role/export-case-decisions',
        loadChildren: () =>
          import('./export-case-decisions/export-case-decisions.module').then(m => m.ExportCaseDecisionsModule)
      },
      {
        path: ':role/defendant-details-updates',
        loadChildren: () =>
          import('./defendant-details-updates/defendant-details-updates.module').then(
            m => m.DefendantDetailsUpdatesModule
          ),
        canActivate: [RegionsGuard]
      },
      {
        path: ':role/defendant-details-updates/:regionFilter',
        loadChildren: () =>
          import('./defendant-details-updates/defendant-details-updates.module').then(
            m => m.DefendantDetailsUpdatesModule
          ),
        canActivate: [RegionsGuard]
      },
      {
        path: 'accessibility',
        loadChildren: () => import('./shared/accessibility/accessibility.module').then(m => m.AccessibilityModule)
      },
      {
        path: 'manual-case',
        loadChildren: () => import('./manual-case/manual-case.module').then(m => m.ManualCaseModule)
      }
    ]
  },
  ...SYSTEM_ANNOUNCEMENT_ROUTES,
  ...ERROR_PAGES_ROUTES
];
