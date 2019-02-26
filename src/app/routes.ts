import { Routes } from '@angular/router';
import { DashboardContainer } from './dashboard/dashboard.container';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Single Justice Procedure - Prosecutor'
    },
    component: DashboardContainer
  }
];
