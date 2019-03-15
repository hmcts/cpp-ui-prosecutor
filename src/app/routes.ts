import { Routes } from '@angular/router';
import { DashboardContainer } from './dashboard/dashboard.container';
import { TechnicalErrorComponent } from './shared/error-pages/technical-error.component';
import { PleadedNotGuiltyCasesDataGuard } from './core/guards';

export const routes: Routes = [
  {
    path: '',
    canActivate: [PleadedNotGuiltyCasesDataGuard],
    children: [
      {
        path: '',
        component: DashboardContainer
      },
      {
        path: 'case-overview',
        loadChildren: './case-overview/case-overview.module#CaseOverviewModule'
      },
      {
        path: 'review-not-guilty-pleas',
        loadChildren: './review-not-guilty-pleas/review-not-guilty-pleas.module#ReviewNotGuiltyPleasModule'
      }
    ]
  },
  { path: 'technical-error', pathMatch: 'full', component: TechnicalErrorComponent }
];
