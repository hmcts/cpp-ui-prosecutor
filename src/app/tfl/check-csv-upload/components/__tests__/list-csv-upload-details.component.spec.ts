import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PdkCoreModule, PdkGridModule, PdkTableModule } from '@cpp/pdk';
import { CsvFileUploadDetails, UploadStatus } from '../../../../contexts/staging-tfl';
import { ListCsvUploadDetailsComponent } from '../list-csv-upload-details.component';
import { FormatDatePipeModule } from '../../../../shared/pipes';
import { UploadStatusPipe } from '../../upload-status.pipe';

describe('ListCsvUploadDetailsComponent', () => {
  let fixture: ComponentFixture<ListCsvUploadDetailsComponent>;
  let component;

  const mockFileUploadDetailsArray = [
    {
      headerFilename: 'fileName.csv',
      uploadId: 'uploadId',
      uploadStatus: {
        status: 'SUCCEEDED'
      } as UploadStatus
    } as CsvFileUploadDetails,
    {
      headerFilename: 'fileName.csv',
      uploadId: 'uploadId',
      uploadStatus: {
        status: 'FAILED'
      } as UploadStatus
    } as CsvFileUploadDetails
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListCsvUploadDetailsComponent, UploadStatusPipe],
      imports: [PdkCoreModule, PdkGridModule, PdkTableModule, FormatDatePipeModule]
    });
    fixture = TestBed.createComponent(ListCsvUploadDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should compile correctly with no data', () => {
    component.csvFileUploadDetails = [];
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should compile correctly with single row', () => {
    component.csvFileUploadDetails = [mockFileUploadDetailsArray[0]];
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should compile correctly with  multiple rows', () => {
    component.csvFileUploadDetails = mockFileUploadDetailsArray;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
