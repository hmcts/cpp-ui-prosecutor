import { Routes } from '@angular/router';

export enum ViewYourFilesRoutes {
  SUPPORT_DOCUMENTS = 'support-documents'
}

export const viewYourFilesRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./view-your-files.container').then(m => m.ViewYourFilesContainer)
  },
  {
    path: ViewYourFilesRoutes.SUPPORT_DOCUMENTS,
    loadChildren: () => import('./support-documents/support-documents.routes').then(m => m.supportDocumentsRoutes)
  }
];
