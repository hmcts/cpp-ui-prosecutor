import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { Store, StoreModule } from '@ngrx/store';

import { CommonModule } from '@angular/common';
import { reducers, State } from '../../../reducers';
import { CsvFileUploadReport } from '../../../contexts/staging-tfl';
import { ViewCsvUploadReportContainer } from '../view-csv-upload-report.container';
import { LoadCsvUploadReportSuccess } from '../view-csv-upload-report.action';
import { csvFileUploadReportReducer } from '../view-csv-upload-report.reducer';

describe('ViewCsvUploadReportContainer', () => {
  let fixture: ComponentFixture<ViewCsvUploadReportContainer>;
  let navigate: jest.Mock;
  let store: Store<State>;

  const mockUploadReport = {
    uploadId: 'uploadID',
    headerFilename: 'headerFileName.csv'
  } as CsvFileUploadReport;

  beforeEach(() => {
    navigate = jest.fn();
    TestBed.configureTestingModule({
      declarations: [ViewCsvUploadReportContainer, MockViewCsvUploadReportComponent],
      imports: [CommonModule, StoreModule.forRoot({ ...reducers, csvFileUploadReport: csvFileUploadReportReducer })]
    });

    store = TestBed.get(Store);
    fixture = TestBed.createComponent(ViewCsvUploadReportContainer);

    store.dispatch(new LoadCsvUploadReportSuccess(mockUploadReport));
  });

  it('should compile correctly', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  @Component({
    selector: 'view-csv-upload-report',
    template: `
      <span>{{ csvFileUploadReport | json }}</span>
    `
  })
  class MockViewCsvUploadReportComponent {
    @Input() csvFileUploadReport: CsvFileUploadReport;
  }
});
