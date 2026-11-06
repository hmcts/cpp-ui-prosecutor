import { TestBed } from '@angular/core/testing';
import { RouterTestingHarness } from '@angular/router/testing';
import { provideRouter, Router, Routes } from '@angular/router';
import { Component, signal, WritableSignal } from '@angular/core';
import { supportDocumentsFailureGuard } from '../support-documents-failure.guard';
import { ViewYourFilesStore } from '../../signal-store/view-your-files.store';

@Component({ selector: 'test-page', template: '' })
class TestPageComponent {}

describe('supportDocumentsFailureGuard', () => {
  let hasUploadSupportingDocumentFailed: WritableSignal<boolean>;

  beforeEach(() => {
    hasUploadSupportingDocumentFailed = signal(false);

    const routes: Routes = [
      {
        path: 'manage-your-complaints-files',
        children: [
          {
            path: 'view-your-files',
            children: [
              {
                path: 'support-documents',
                children: [
                  { path: '', component: TestPageComponent },
                  { path: 'failure', canActivate: [supportDocumentsFailureGuard], component: TestPageComponent }
                ]
              }
            ]
          }
        ]
      }
    ];

    TestBed.configureTestingModule({
      providers: [
        provideRouter(routes),
        { provide: ViewYourFilesStore, useValue: { hasUploadSupportingDocumentFailed } }
      ]
    });
  });

  it('should allow navigation to the failure page when an upload has failed', async () => {
    hasUploadSupportingDocumentFailed.set(true);
    const harness = await RouterTestingHarness.create();

    await harness.navigateByUrl('/manage-your-complaints-files/view-your-files/support-documents/failure');

    expect(TestBed.inject(Router).url).toBe('/manage-your-complaints-files/view-your-files/support-documents/failure');
  });

  it('should redirect to the support-documents form when navigating directly without a failed upload', async () => {
    const harness = await RouterTestingHarness.create();

    await harness.navigateByUrl('/manage-your-complaints-files/view-your-files/support-documents/failure');

    expect(TestBed.inject(Router).url).toBe('/manage-your-complaints-files/view-your-files/support-documents');
  });
});
