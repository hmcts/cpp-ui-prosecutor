import { Routes } from '@angular/router';
import { documentTypeAccessGuard } from '../../../guards/document-type-access.guard';

export enum SupportDocumentsRoutes {
  SUCCESS = 'success',
  FAILURE = 'failure'
}

export const supportDocumentsRoutes: Routes = [
  {
    path: '',
    canActivate: [documentTypeAccessGuard],
    loadComponent: () => import('./support-documents.container').then(m => m.SupportDocumentsContainer)
  },
  {
    path: SupportDocumentsRoutes.SUCCESS,
    loadComponent: () => import('./support-documents-success.container').then(m => m.SupportDocumentsSuccessContainer)
  },
  {
    path: SupportDocumentsRoutes.FAILURE,
    loadComponent: () => import('./support-documents-failure.container').then(m => m.SupportDocumentsFailureContainer)
  }
];
