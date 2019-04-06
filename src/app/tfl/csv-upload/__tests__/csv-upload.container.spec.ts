import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store, StoreModule } from '@ngrx/store';

import { CommonModule } from '@angular/common';
import { CsvUploadContainer } from '../csv-upload.container';
import { reducers, State } from '../../../reducers';
import { ValidationError } from '@cpp/pdk/form/form.interfaces';
import { SubmitCsvFiles } from '../../tfl.action';
import { tflReducer } from '../../tfl.reducer';
import { CsvUploadRequestParam } from '../../../contexts/staging-tfl/staging-tfl-param.interface';

describe('CsvUploadContainer', () => {
  let fixture: ComponentFixture<CsvUploadContainer>;
  let navigate: jest.Mock;
  let store: Store<State>;

  const csvUploadParam = {
    header: new File(['file1'], 'filename1', { type: 'text/html' }),
    offences: new File(['file2'], 'filename2', { type: 'text/html' })
  } as CsvUploadRequestParam;

  beforeEach(() => {
    navigate = jest.fn();
    TestBed.configureTestingModule({
      declarations: [CsvUploadContainer, MockCsvUploadComponent],
      imports: [CommonModule, StoreModule.forRoot({ ...reducers, tfl: tflReducer })]
    });

    store = TestBed.get(Store);
    fixture = TestBed.createComponent(CsvUploadContainer);

    store.dispatch(new SubmitCsvFiles(csvUploadParam));
  });

  it('should compile correctly', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  @Component({
    selector: 'csv-upload-page',
    template: `
      <span>{{ displayFileSubmittedBanner }}</span>
    `
  })
  class MockCsvUploadComponent {
    @Input() displayFileSubmittedBanner: boolean;
    @Output() formSubmit = new EventEmitter<any>();
  }
});
