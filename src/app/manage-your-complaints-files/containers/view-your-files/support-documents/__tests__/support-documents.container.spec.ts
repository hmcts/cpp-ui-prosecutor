import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { SupportDocumentsContainer } from '../support-documents.container';
import { ViewYourFilesStore } from '../../../../signal-store/view-your-files.store';
import { SupportDocumentsRoutes } from '../support-documents.routes';

describe('SupportDocumentsContainer', () => {
  let fixture: ComponentFixture<SupportDocumentsContainer>;
  let uploadSupportingDocument: jest.Mock;
  let navigate: jest.SpyInstance;

  beforeEach(() => {
    uploadSupportingDocument = jest.fn();

    TestBed.configureTestingModule({
      imports: [SupportDocumentsContainer],
      providers: [
        {
          provide: ViewYourFilesStore,
          useValue: { referenceNumber: () => 'dummy-id-1', uploadSupportingDocument }
        },
        { provide: ActivatedRoute, useValue: {} }
      ],
      teardown: { destroyAfterEach: false }
    });

    navigate = jest.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    fixture = TestBed.createComponent(SupportDocumentsContainer);
    fixture.detectChanges();
  });

  it('should render the container correctly', () => {
    expect(fixture.nativeElement).toMatchSnapshot();
  });

  it('should show the reference number in the page header', () => {
    expect(fixture.nativeElement.textContent).toContain('Upload supporting documents for dummy-id-1 (optional)');
  });

  it('should navigate to the success page when the upload succeeds', () => {
    const file = new File(['a'], 'doc.pdf');
    fixture.componentInstance.onFileSubmitted(file);

    expect(uploadSupportingDocument).toHaveBeenCalledWith(
      expect.objectContaining({ file, onUploadSuccess: expect.any(Function), onUploadError: expect.any(Function) })
    );

    const { onUploadSuccess } = uploadSupportingDocument.mock.calls[0][0];
    onUploadSuccess();

    expect(navigate).toHaveBeenCalledWith(
      [SupportDocumentsRoutes.SUCCESS],
      expect.objectContaining({ relativeTo: expect.anything() })
    );
  });

  it('should navigate to the failure page when the upload fails', () => {
    fixture.componentInstance.onFileSubmitted(new File(['a'], 'doc.pdf'));

    const { onUploadError } = uploadSupportingDocument.mock.calls[0][0];
    onUploadError(new HttpErrorResponse({ status: 500 }));

    expect(navigate).toHaveBeenCalledWith(
      [SupportDocumentsRoutes.FAILURE],
      expect.objectContaining({ relativeTo: expect.anything() })
    );
  });
});
