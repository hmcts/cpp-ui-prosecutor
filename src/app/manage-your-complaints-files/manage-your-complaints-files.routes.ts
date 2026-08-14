import { Routes } from '@angular/router';

export const manageYourComplaintsFilesRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./containers/manage-your-complaints-files.container').then(m => m.ManageYourComplaintsFilesContainer)
  },
  {
    path: 'upload-new-files',
    loadComponent: () => import('./containers/upload-new-files.container').then(m => m.UploadNewFilesContainer)
  },
  {
    path: 'view-your-files',
    loadComponent: () => import('./containers/view-your-files.container').then(m => m.ViewYourFilesContainer)
  }
];
