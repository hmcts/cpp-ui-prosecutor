import { Routes } from '@angular/router';
import { uploadSuccessGuard } from '../../guards/upload-success.guard';
import { uploadFailureGuard } from '../../guards/upload-failure.guard';
import { UploadFailurePageComponent } from '../../shared/upload-failure-page/upload-failure-page.component';

export enum NewFilesRoutes {
  SUCCESS = 'success',
  FAILURE = 'failure'
}

export const uploadNewFilesRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./upload-new-files.container').then(m => m.UploadNewFilesContainer)
  },
  {
    path: NewFilesRoutes.SUCCESS,
    canActivate: [uploadSuccessGuard],
    loadComponent: () => import('./upload-success.container').then(m => m.UploadSuccessContainer)
  },
  {
    path: NewFilesRoutes.FAILURE,
    canActivate: [uploadFailureGuard],
    component: UploadFailurePageComponent
  }
];
