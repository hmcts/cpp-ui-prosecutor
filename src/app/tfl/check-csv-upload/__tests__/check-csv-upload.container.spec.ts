import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { Store, StoreModule } from '@ngrx/store';

import { CommonModule } from '@angular/common';
import { reducers, State } from '../../../reducers';
import { CsvFileUploadDetails, UploadStatus } from '../../../contexts/staging-tfl';
import { CheckCsvUploadContainer } from '../check-csv-upload.container';
import { csvFileUploadReducer } from '../check-csv-upload.reducer';
import { LoadCsvFileUploadDetailsSuccess } from '../check-csv-upload.action';

describe('CheckCsvUploadContainer', () => {
  let fixture: ComponentFixture<CheckCsvUploadContainer>;
  let navigate: jest.Mock;
  let store: Store<State>;

  const mockFileUploadDetails = {
    headerFilename: 'fileName.csv',
    uploadId: 'uploadId',
    uploadStatus: {
      status: 'SUCCEEDED'
    } as UploadStatus
  } as CsvFileUploadDetails;

  beforeEach(() => {
    navigate = jest.fn();
    TestBed.configureTestingModule({
      declarations: [CheckCsvUploadContainer, MockCheckCsvUploadComponent],
      imports: [CommonModule, StoreModule.forRoot({ ...reducers, csvFileUploadDetails: csvFileUploadReducer })]
    });

    store = TestBed.get(Store);
    fixture = TestBed.createComponent(CheckCsvUploadContainer);

    store.dispatch(new LoadCsvFileUploadDetailsSuccess([mockFileUploadDetails]));
  });

  it('should compile correctly', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  @Component({
    selector: 'check-csv-upload',
    template: `
      <span>{{ csvFileUploadDetails | json }}</span>
    `
  })
  class MockCheckCsvUploadComponent {
    @Input() csvFileUploadDetails: CsvFileUploadDetails[];
  }
});
