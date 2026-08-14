import { Routes } from '@angular/router';

export enum ComplaintsFileRoutes {
  UPLOAD_NEW_FILES = 'upload-new-files',
  VIEW_YOUR_FILES = 'view-your-files'
}

export const manageYourComplaintsFilesRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./containers/manage-your-complaints-files.container').then(m => m.ManageYourComplaintsFilesContainer)
  },
  {
    path: ComplaintsFileRoutes.UPLOAD_NEW_FILES,
    loadChildren: () =>
      import('./containers/upload-new-files/upload-new-files.routes').then(m => m.uploadNewFilesRoutes)
  },
  {
    path: ComplaintsFileRoutes.VIEW_YOUR_FILES,
    loadComponent: () => import('./containers/view-your-files.container').then(m => m.ViewYourFilesContainer)
  }
];
