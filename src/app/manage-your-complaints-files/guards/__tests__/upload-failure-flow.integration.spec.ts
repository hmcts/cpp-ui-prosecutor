import { TestBed } from '@angular/core/testing';
import { RouterTestingHarness } from '@angular/router/testing';
import { provideRouter, Router, Routes } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { throwError } from 'rxjs';
import { UploadNewFilesContainer } from '../../containers/upload-new-files/upload-new-files.container';
import { UploadFailurePageComponent } from '../../shared/upload-failure-page/upload-failure-page.component';
import { uploadFailureGuard } from '../upload-failure.guard';
import { ManageYourComplaintsFilesStore } from '../../signal-store/manage-your-complaints-files.store';
import { ManageYourComplaintsFilesService } from '../../services/manage-your-complaints-files.service';

describe('real upload failure flow (real store, real guard, real router)', () => {
  it('should let the guard through to the failure page after a real 500 error sets the flag', async () => {
    const postCsvFile = jest.fn().mockReturnValue(throwError(() => new HttpErrorResponse({ status: 500 })));

    const routes: Routes = [
      {
        path: 'manage-your-complaints-files',
        children: [
          {
            path: 'upload-new-files',
            children: [
              { path: '', component: UploadNewFilesContainer },
              { path: 'failure', canActivate: [uploadFailureGuard], component: UploadFailurePageComponent }
            ]
          }
        ]
      }
    ];

    TestBed.configureTestingModule({
      providers: [
        provideRouter(routes),
        { provide: ManageYourComplaintsFilesService, useValue: { postCsvFile } },
        { provide: Store, useValue: { dispatch: jest.fn() } }
      ]
    });

    const harness = await RouterTestingHarness.create('/manage-your-complaints-files/upload-new-files');
    const container = harness.routeDebugElement!.injector.get(UploadNewFilesContainer);

    container.onFileSubmitted(new File(['a,b,c'], 'complaints.csv'));
    await harness.fixture.whenStable();

    expect(TestBed.inject(ManageYourComplaintsFilesStore).hasUploadCsvFailed()).toBe(true);
    expect(TestBed.inject(Router).url).toBe('/manage-your-complaints-files/upload-new-files/failure');
  });
});
