import { Routes } from '@angular/router';
import { documentTypeAccessGuard } from '../../../guards/document-type-access.guard';
import { supportDocumentsGuard } from '../../../guards/support-documents.guard';
import { supportDocumentsFailureGuard } from '../../../guards/support-documents-failure.guard';
import { UploadFailurePageComponent } from '../../../shared/upload-failure-page/upload-failure-page.component';

export enum SupportDocumentsRoutes {
  SUCCESS = 'success',
  FAILURE = 'failure'
}

export const supportDocumentsRoutes: Routes = [
  {
    path: '',
    canActivate: [supportDocumentsGuard, documentTypeAccessGuard],
    loadComponent: () => import('./support-documents.container').then(m => m.SupportDocumentsContainer),
    data: {
      title: 'Upload Support Documents'
    }
  },
  {
    path: SupportDocumentsRoutes.SUCCESS,
    canActivate: [supportDocumentsGuard],
    loadComponent: () => import('./support-documents-success.container').then(m => m.SupportDocumentsSuccessContainer),
    data: {
      title: 'Uploaded Support Documents Successfully'
    }
  },
  {
    path: SupportDocumentsRoutes.FAILURE,
    canActivate: [supportDocumentsFailureGuard],
    component: UploadFailurePageComponent,
    data: {
      title: 'Document failed to upload'
    }
  }
];
