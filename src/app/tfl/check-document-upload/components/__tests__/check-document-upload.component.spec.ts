import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { PdkCoreModule, PdkGridModule, PdkSummaryItemModule } from '@cpp/pdk';
import { DocumentUploadDetails, UploadStatus } from '../../../../contexts/staging-tfl';
import { CheckDocumentUploadComponent } from '../check-document-upload.component';

describe('CheckDocumentUploadComponent', () => {
  let fixture: ComponentFixture<CheckDocumentUploadComponent>;
  let component: CheckDocumentUploadComponent;

  const mockDocumentUploadDetailsArray = [
    {
      zipFilename: 'fileName.zip',
      bundleUploadId: 'uploadId',
      uploadStatus: {
        status: 'SUCCEEDED'
      } as UploadStatus
    } as DocumentUploadDetails,
    {
      zipFilename: 'fileName.zip',
      bundleUploadId: 'uploadId',
      uploadStatus: {
        status: 'FAILED'
      } as UploadStatus
    } as DocumentUploadDetails
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckDocumentUploadComponent, MockListDocumentUploadDetailsComponent],
      imports: [PdkCoreModule, PdkGridModule, PdkSummaryItemModule]
    });
    fixture = TestBed.createComponent(CheckDocumentUploadComponent);
    component = fixture.componentInstance;
  });

  it('should compile correctly with no data', () => {
    component.documentUploadDetails = [];
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should compile correctly with single row', () => {
    component.documentUploadDetails = [mockDocumentUploadDetailsArray[0]];
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should compile correctly with  multiple rows', () => {
    component.documentUploadDetails = mockDocumentUploadDetailsArray;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  @Component({
    selector: 'list-document-upload-details',
    template: `
      <div>{{ documentUploadDetails | json }}</div>
    `
  })
  class MockListDocumentUploadDetailsComponent {
    @Input() documentUploadDetails: DocumentUploadDetails[];
  }
});
