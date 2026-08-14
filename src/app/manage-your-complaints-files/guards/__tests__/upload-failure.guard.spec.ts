import { TestBed } from '@angular/core/testing';
import { RouterTestingHarness } from '@angular/router/testing';
import { provideRouter, Router, Routes } from '@angular/router';
import { Component, signal, WritableSignal } from '@angular/core';
import { uploadFailureGuard } from '../upload-failure.guard';
import { ManageYourComplaintsFilesStore } from '../../signal-store/manage-your-complaints-files.store';

@Component({ selector: 'test-page', template: '' })
class TestPageComponent {}

describe('uploadFailureGuard', () => {
  let getUploadCsvFailed: WritableSignal<boolean>;

  beforeEach(() => {
    getUploadCsvFailed = signal(false);

    const routes: Routes = [
      {
        path: 'manage-your-complaints-files',
        children: [
          { path: '', component: TestPageComponent },
          {
            path: 'upload-new-files',
            children: [
              { path: '', component: TestPageComponent },
              { path: 'failure', canActivate: [uploadFailureGuard], component: TestPageComponent }
            ]
          }
        ]
      }
    ];

    TestBed.configureTestingModule({
      providers: [provideRouter(routes), { provide: ManageYourComplaintsFilesStore, useValue: { getUploadCsvFailed } }]
    });
  });

  it('should allow navigation to the failure page when the upload has failed', async () => {
    getUploadCsvFailed.set(true);
    const harness = await RouterTestingHarness.create();

    await harness.navigateByUrl('/manage-your-complaints-files/upload-new-files/failure');

    expect(TestBed.inject(Router).url).toBe('/manage-your-complaints-files/upload-new-files/failure');
  });

  it('should redirect to the manage-your-complaints-files screen when there is no recorded failure', async () => {
    const harness = await RouterTestingHarness.create();

    await harness.navigateByUrl('/manage-your-complaints-files/upload-new-files/failure');

    expect(TestBed.inject(Router).url).toBe('/manage-your-complaints-files');
  });
});
