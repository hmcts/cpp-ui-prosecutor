import { Routes } from '@angular/router';
import { TechnicalErrorComponent } from './shared/error-pages';
import {CaseDataGuard, PleadedNotGuiltyDataGuard, DefendantDetailsUpdatesLinkDataGuard} from './core/guards';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tvl', // todo remove or change based on server config
    pathMatch: 'full'
  },
  {
    path: 'tvl',
    loadChildren: './dashboard/dashboard.module#DashboardModule',
    canActivate: [PleadedNotGuiltyDataGuard, DefendantDetailsUpdatesLinkDataGuard]
  },
  {
    path: 'tfl',
    loadChildren: './tfl/tfl.module#TflModule',
    canActivate: [PleadedNotGuiltyDataGuard]
  },
  {
    path: ':role/case-overview/:caseId',
    loadChildren: './case-overview/case-overview.module#CaseOverviewModule',
    canActivate: [CaseDataGuard]
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
  { path: 'technical-error', pathMatch: 'full', component: TechnicalErrorComponent }
];
