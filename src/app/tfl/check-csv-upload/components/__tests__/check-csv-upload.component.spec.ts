import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { PdkCoreModule, PdkGridModule, PdkSummaryItemModule } from '@cpp/pdk';
import { CsvFileUploadDetails, UploadStatus } from '../../../../contexts/staging-tfl';
import { CheckCsvUploadComponent } from '../check-csv-upload.component';

describe('CheckCsvUploadComponent', () => {
  let fixture: ComponentFixture<CheckCsvUploadComponent>;
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
      declarations: [CheckCsvUploadComponent, MockListCsvUploadDetailsComponent],
      imports: [PdkCoreModule, PdkGridModule, PdkSummaryItemModule]
    });
    fixture = TestBed.createComponent(CheckCsvUploadComponent);
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

  @Component({
    selector: 'list-csv-upload-details',
    template: `
      <div>{{ csvFileUploadDetails | json }}</div>
    `
  })
  class MockListCsvUploadDetailsComponent {
    @Input() csvFileUploadDetails: CsvFileUploadDetails[];
  }
});
