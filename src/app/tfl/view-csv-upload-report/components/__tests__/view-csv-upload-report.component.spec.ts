import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { PdkCoreModule, PdkGridModule, PdkRelatedModule } from '@cpp/pdk';
import { CsvError, CsvFileUploadReport } from '../../../../contexts/staging-tfl';
import { ViewCsvUploadReportComponent } from '../view-csv-upload-report.component';
import { UploadStatusPipeModule } from '../../../../shared/pipes';

describe('ViewCsvUploadReportComponent', () => {
  let fixture: ComponentFixture<ViewCsvUploadReportComponent>;
  let component: ViewCsvUploadReportComponent;

  const mockUploadReport = {
    uploadId: 'uploadID',
    headerFilename: 'headerFileName.csv',
    timestamp: '2019-12-17T14:19:18.902Z',
    headerErrors: [
      {
        csvColumn: 'H',
        csvRow: 1,
        tflCaseUrn: 'TFL88932KI14X',
        validationMessageKey: 'DATE_OF_HEARING_WRONG_FORMAT'
      }
    ],
    offenceErrors: [
      {
        csvColumn: 'H',
        csvRow: 1,
        tflCaseUrn: 'TFL88932KI14X',
        validationMessageKey: 'DATE_OF_HEARING_WRONG_FORMAT'
      }
    ],
    uploadStatus: {
      status: 'FAILED',
      timestamp: '2019-12-17T14:19:18.902Z'
    }
  } as CsvFileUploadReport;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewCsvUploadReportComponent, MockCsvUploadErrorListComponent],
      imports: [PdkCoreModule, PdkGridModule, PdkRelatedModule, UploadStatusPipeModule]
    });
    fixture = TestBed.createComponent(ViewCsvUploadReportComponent);
    component = fixture.componentInstance;
  });

  it('should compile correctly', () => {
    component.csvFileUploadReport = mockUploadReport;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should compile correctly if the status is success', () => {
    component.csvFileUploadReport = {
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
    selector: 'csv-upload-error-list',
    template: `
      <div>{{ csvErrors | json }}</div>
      <div>{{ summary }}</div>
    `
  })
  class MockCsvUploadErrorListComponent {
    @Input() csvErrors: CsvError[];
    @Input() summary: string;
  }
});
