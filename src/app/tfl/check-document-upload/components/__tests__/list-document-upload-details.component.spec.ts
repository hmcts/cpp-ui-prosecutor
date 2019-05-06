import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PdkCoreModule, PdkGridModule, PdkTableModule } from '@cpp/pdk';
import { DocumentUploadDetails, UploadStatus } from '../../../../contexts/staging-tfl';
import { ListDocumentUploadDetailsComponent } from '../list-document-upload-details.component';
import { FormatDatePipeModule } from '../../../../shared/pipes';
import { UploadStatusPipe } from '../../../../shared/pipes/upload-status/upload-status.pipe';
import { RouterTestingModule } from '@angular/router/testing';

describe('ListDocumentUploadDetailsComponent', () => {
  let fixture: ComponentFixture<ListDocumentUploadDetailsComponent>;
  let component: ListDocumentUploadDetailsComponent;

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
      declarations: [ListDocumentUploadDetailsComponent, UploadStatusPipe],
      imports: [PdkCoreModule, PdkGridModule, PdkTableModule, FormatDatePipeModule, RouterTestingModule]
    });
    fixture = TestBed.createComponent(ListDocumentUploadDetailsComponent);
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
});
