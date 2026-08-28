import { Routes } from '@angular/router';

export enum ComplaintsFileRoutes {
  UPLOAD_NEW_FILES = 'upload-new-files',
  VIEW_YOUR_FILES = 'view-your-files'
}

export const manageYourComplaintsFilesRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./containers/manage-your-complaints-files.container').then(m => m.ManageYourComplaintsFilesContainer),
    data: {
      title: 'Manage Your Complaints Files'
    }
  },
  {
    path: ComplaintsFileRoutes.UPLOAD_NEW_FILES,
    loadChildren: () =>
      import('./containers/upload-new-files/upload-new-files.routes').then(m => m.uploadNewFilesRoutes)
  },
  {
    path: ComplaintsFileRoutes.VIEW_YOUR_FILES,
    loadChildren: () => import('./containers/view-your-files/view-your-files.routes').then(m => m.viewYourFilesRoutes)
  }
];
