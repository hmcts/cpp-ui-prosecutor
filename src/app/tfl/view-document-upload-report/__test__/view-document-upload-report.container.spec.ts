import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { Store, StoreModule } from '@ngrx/store';

import { CommonModule } from '@angular/common';
import { reducers, State } from '../../../reducers';
import { DocumentUploadDetails } from '../../../contexts/staging-tfl';
import { ViewDocumentUploadReportContainer } from '../view-document-upload-report.container';
import { LoadDocumentUploadReportSuccess } from '../view-document-upload-report.action';
import { documentUploadReportReducer } from '../view-document-upload-report.reducer';

describe('ViewDocumentUploadReportContainer', () => {
  let fixture: ComponentFixture<ViewDocumentUploadReportContainer>;
  let navigate: jest.Mock;
  let store: Store<State>;

  const mockUploadReport = {
    bundleUploadId: 'uploadID'
  } as DocumentUploadDetails;

  beforeEach(() => {
    navigate = jest.fn();
    TestBed.configureTestingModule({
      declarations: [ViewDocumentUploadReportContainer, MockViewDocumentUploadReportComponent],
      imports: [CommonModule, StoreModule.forRoot({ ...reducers, documentUploadReport: documentUploadReportReducer }, { runtimeChecks: {}})]
    });

    store = TestBed.get(Store);
    fixture = TestBed.createComponent(ViewDocumentUploadReportContainer);

    store.dispatch(new LoadDocumentUploadReportSuccess(mockUploadReport));
  });

  it('should compile correctly', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  @Component({
    selector: 'view-document-upload-report',
    template: `
      <span>{{ documentUploadDetails | json }}</span>
    `
  })
  class MockViewDocumentUploadReportComponent {
    @Input() documentUploadDetails: DocumentUploadDetails;
  }
});
