import { TestBed } from '@angular/core/testing';
import { RouterTestingHarness } from '@angular/router/testing';
import { provideRouter, Routes } from '@angular/router';
import { Component } from '@angular/core';
import { resetViewYourFilesStoreGuard } from '../reset-view-your-files-store.guard';
import { ViewYourFilesStore } from '../../signal-store/view-your-files.store';

@Component({ selector: 'test-page', template: '' })
class TestPageComponent {}

describe('resetViewYourFilesStoreGuard', () => {
  let resetState: jest.Mock;

  beforeEach(() => {
    resetState = jest.fn();

    const routes: Routes = [
      {
        path: 'manage-your-complaints-files',
        children: [
          { path: '', component: TestPageComponent },
          {
            path: 'view-your-files',
            canDeactivate: [resetViewYourFilesStoreGuard],
            children: [{ path: '', component: TestPageComponent }]
          }
        ]
      }
    ];

    TestBed.configureTestingModule({
      providers: [provideRouter(routes), { provide: ViewYourFilesStore, useValue: { resetState } }]
    });
  });

  it('should reset the store when navigating away from view-your-files', async () => {
    const harness = await RouterTestingHarness.create();

    await harness.navigateByUrl('/manage-your-complaints-files/view-your-files');
    expect(resetState).not.toHaveBeenCalled();

    await harness.navigateByUrl('/manage-your-complaints-files');
    expect(resetState).toHaveBeenCalledTimes(1);
  });

  it('should not reset the store while navigating within view-your-files', async () => {
    const harness = await RouterTestingHarness.create();

    await harness.navigateByUrl('/manage-your-complaints-files/view-your-files');
    expect(resetState).not.toHaveBeenCalled();
  });
});
