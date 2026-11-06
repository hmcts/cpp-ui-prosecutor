import { TestBed } from '@angular/core/testing';
import { RouterTestingHarness } from '@angular/router/testing';
import { provideRouter, Router, Routes } from '@angular/router';
import { Component, signal, WritableSignal } from '@angular/core';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { documentTypeAccessGuard } from '../document-type-access.guard';
import { ViewYourFilesStore } from '../../signal-store/view-your-files.store';
import { ReferenceDataService } from '../../../contexts/reference-data/reference-data.service';

@Component({ selector: 'test-page', template: '' })
class TestPageComponent {}

describe('documentTypeAccessGuard', () => {
  let documentTypeId: WritableSignal<string | null>;
  let setDocumentTypeId: jest.Mock;
  let handleError: jest.Mock;
  let getDocumentTypeAccess: jest.Mock;

  beforeEach(() => {
    documentTypeId = signal<string | null>(null);
    setDocumentTypeId = jest.fn(value => documentTypeId.set(value));
    handleError = jest.fn();
    getDocumentTypeAccess = jest.fn();

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
                children: [{ path: '', canActivate: [documentTypeAccessGuard], component: TestPageComponent }]
              }
            ]
          }
        ]
      }
    ];

    TestBed.configureTestingModule({
      providers: [
        provideRouter(routes),
        { provide: ViewYourFilesStore, useValue: { documentTypeId, setDocumentTypeId, handleError } },
        { provide: ReferenceDataService, useValue: { getDocumentTypeAccess } }
      ]
    });
  });

  it('should allow navigation and store the document type id when the lookup succeeds', async () => {
    getDocumentTypeAccess.mockReturnValue(
      of([
        { id: 'case-level-id', documentCategory: 'Case level' },
        { id: 'document-type-id-1', documentCategory: 'Applications' }
      ])
    );
    const harness = await RouterTestingHarness.create();

    await harness.navigateByUrl('/manage-your-complaints-files/view-your-files/support-documents');

    expect(TestBed.inject(Router).url).toBe('/manage-your-complaints-files/view-your-files/support-documents');
    expect(setDocumentTypeId).toHaveBeenCalledWith('document-type-id-1');
  });

  it('should not call the reference data lookup when the document type id is already stored', async () => {
    documentTypeId.set('document-type-id-1');
    const harness = await RouterTestingHarness.create();

    await harness.navigateByUrl('/manage-your-complaints-files/view-your-files/support-documents');

    expect(TestBed.inject(Router).url).toBe('/manage-your-complaints-files/view-your-files/support-documents');
    expect(getDocumentTypeAccess).not.toHaveBeenCalled();
  });

  it('should redirect to the view-your-files screen when the lookup fails', async () => {
    const error = new HttpErrorResponse({ status: 500 });
    getDocumentTypeAccess.mockReturnValue(throwError(() => error));
    const harness = await RouterTestingHarness.create();

    await harness.navigateByUrl('/manage-your-complaints-files/view-your-files/support-documents');

    expect(TestBed.inject(Router).url).toBe('/manage-your-complaints-files/view-your-files');
    expect(handleError).toHaveBeenCalledWith(error);
  });
});
