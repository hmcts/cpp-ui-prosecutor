import { TestBed } from '@angular/core/testing';
import { RouterTestingHarness } from '@angular/router/testing';
import { provideRouter, Router, Routes } from '@angular/router';
import { Component, signal, WritableSignal } from '@angular/core';
import { supportDocumentsGuard } from '../support-documents.guard';
import { ViewYourFilesStore } from '../../signal-store/view-your-files.store';

@Component({ selector: 'test-page', template: '' })
class TestPageComponent {}

describe('supportDocumentsGuard', () => {
  let referenceNumber: WritableSignal<string | null>;

  beforeEach(() => {
    referenceNumber = signal<string | null>(null);

    const routes: Routes = [
      {
        path: 'manage-your-complaints-files',
        children: [
          {
            path: 'view-your-files',
            children: [
              { path: '', component: TestPageComponent },
              {
                path: 'support-documents',
                children: [
                  { path: '', canActivate: [supportDocumentsGuard], component: TestPageComponent },
                  { path: 'success', canActivate: [supportDocumentsGuard], component: TestPageComponent },
                  { path: 'failure', canActivate: [supportDocumentsGuard], component: TestPageComponent }
                ]
              }
            ]
          }
        ]
      }
    ];

    TestBed.configureTestingModule({
      providers: [provideRouter(routes), { provide: ViewYourFilesStore, useValue: { referenceNumber } }]
    });
  });

  it('should allow navigation to the support-documents form when a complaints file is loaded', async () => {
    referenceNumber.set('dummy-id-1');
    const harness = await RouterTestingHarness.create();

    await harness.navigateByUrl('/manage-your-complaints-files/view-your-files/support-documents');

    expect(TestBed.inject(Router).url).toBe('/manage-your-complaints-files/view-your-files/support-documents');
  });

  it('should redirect to view-your-files when navigating directly to the form without a complaints file', async () => {
    const harness = await RouterTestingHarness.create();

    await harness.navigateByUrl('/manage-your-complaints-files/view-your-files/support-documents');

    expect(TestBed.inject(Router).url).toBe('/manage-your-complaints-files/view-your-files');
  });

  it('should redirect to view-your-files when navigating directly to the success page without a complaints file', async () => {
    const harness = await RouterTestingHarness.create();

    await harness.navigateByUrl('/manage-your-complaints-files/view-your-files/support-documents/success');

    expect(TestBed.inject(Router).url).toBe('/manage-your-complaints-files/view-your-files');
  });

  it('should redirect to view-your-files when navigating directly to the failure page without a complaints file', async () => {
    const harness = await RouterTestingHarness.create();

    await harness.navigateByUrl('/manage-your-complaints-files/view-your-files/support-documents/failure');

    expect(TestBed.inject(Router).url).toBe('/manage-your-complaints-files/view-your-files');
  });
});
