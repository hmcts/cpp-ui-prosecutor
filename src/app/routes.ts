import { Routes } from '@angular/router';
import { DashboardContainer } from './dashboard/dashboard.container';
import { TechnicalErrorComponent } from './shared/error-pages/technical-error.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: DashboardContainer
      },
      {
        path: 'case-overview',
        loadChildren: './case-overview/case-overview.module#CaseOverviewModule'
      }
    ]
  },
  { path: 'technical-error', pathMatch: 'full', component: TechnicalErrorComponent }
];
