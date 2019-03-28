import { Routes } from '@angular/router';
import { TechnicalErrorComponent } from './shared/error-pages';
import { CaseDataGuard, PleadedNotGuiltyDataGuard } from './core/guards';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tvl', // todo remove or change based on server config
    pathMatch: 'full'
  },
  {
    path: 'tvl',
    loadChildren: './dashboard/dashboard.module#DashboardModule',
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
  { path: 'technical-error', pathMatch: 'full', component: TechnicalErrorComponent }
];
