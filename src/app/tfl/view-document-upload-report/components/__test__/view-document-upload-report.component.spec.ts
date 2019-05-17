import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { PdkCoreModule, PdkGridModule, PdkRelatedModule } from '@cpp/pdk';
import { DocumentUploadDetails, DocumentUploadError } from '../../../../contexts/staging-tfl';
import { ViewDocumentUploadReportComponent } from '../view-document-upload-report.component';
import { UploadStatusPipeModule } from '../../../../shared/pipes';

describe('ViewDocumentUploadReportComponent', () => {
  let fixture: ComponentFixture<ViewDocumentUploadReportComponent>;
  let component: ViewDocumentUploadReportComponent;

  const mockUploadReport = {
    bundleUploadId: 'uploadID',
    zipFilename: 'sjpn_20190514125752_1.zip',
    documentCount: 1,
    timestamp: '2019-05-14T12:02:16.028Z',
    documentErrors: [
      {
        documentFilename: 'SMITH_SULLIVAN_TFL35072FPS2E_SJPN.pdf',
        documentType: 'SJPN',
        validationMessageKey: 'DUPLICATED_DOCUMENT'
      }
    ],
    uploadStatus: {
      status: 'FAILED',
      timestamp: '2019-05-14T12:02:20.242Z'
    }
  } as DocumentUploadDetails;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewDocumentUploadReportComponent, MockDocumentUploadErrorListComponent],
      imports: [PdkCoreModule, PdkGridModule, PdkRelatedModule, UploadStatusPipeModule]
    });
    fixture = TestBed.createComponent(ViewDocumentUploadReportComponent);
    component = fixture.componentInstance;
  });

  it('should compile correctly', () => {
    component.documentUploadDetails = mockUploadReport;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should compile correctly if the status is success', () => {
    component.documentUploadDetails = {
      ...mockUploadReport,
      uploadStatus: {
        status: 'SUCCESS',
        timestamp: '2019-12-17T14:19:18.902Z'
      }
    };
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  @Component({
    selector: 'document-upload-error-list',
    template: `
      <div>{{ documentUploadErrors | json }}</div>
    `
  })
  class MockDocumentUploadErrorListComponent {
    @Input() documentUploadErrors: DocumentUploadError[];
  }
});
