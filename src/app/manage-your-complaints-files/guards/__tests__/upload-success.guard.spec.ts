import { TestBed } from '@angular/core/testing';
import { RouterTestingHarness } from '@angular/router/testing';
import { provideRouter, Router, Routes } from '@angular/router';
import { Component, signal, WritableSignal } from '@angular/core';
import { uploadSuccessGuard } from '../upload-success.guard';
import { ManageYourComplaintsFilesStore } from '../../signal-store/manage-your-complaints-files.store';

@Component({ selector: 'test-page', template: '' })
class TestPageComponent {}

describe('uploadSuccessGuard', () => {
  let referenceNumber: WritableSignal<string>;

  beforeEach(() => {
    referenceNumber = signal('');

    const routes: Routes = [
      {
        path: 'manage-your-complaints-files',
        children: [
          { path: '', component: TestPageComponent },
          {
            path: 'upload-new-files',
            children: [
              { path: '', component: TestPageComponent },
              { path: 'success', canActivate: [uploadSuccessGuard], component: TestPageComponent }
            ]
          }
        ]
      }
    ];

    TestBed.configureTestingModule({
      providers: [provideRouter(routes), { provide: ManageYourComplaintsFilesStore, useValue: { referenceNumber } }]
    });
  });

  it('should allow navigation to the success page when a reference number has been recorded', async () => {
    referenceNumber.set('REF123');
    const harness = await RouterTestingHarness.create();

    await harness.navigateByUrl('/manage-your-complaints-files/upload-new-files/success');

    expect(TestBed.inject(Router).url).toBe('/manage-your-complaints-files/upload-new-files/success');
  });

  it('should redirect to the manage-your-complaints-files screen when there is no reference number', async () => {
    const harness = await RouterTestingHarness.create();

    await harness.navigateByUrl('/manage-your-complaints-files/upload-new-files/success');

    expect(TestBed.inject(Router).url).toBe('/manage-your-complaints-files');
  });
});
