import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { Store, StoreModule } from '@ngrx/store';

import { CommonModule } from '@angular/common';
import { reducers, State } from '../../../reducers';
import { DocumentUploadDetails, UploadStatus } from '../../../contexts/staging-tfl';
import { CheckDocumentUploadContainer } from '../check-document-upload.container';
import { documentUploadReducer } from '../check-document-upload.reducer';
import { LoadDocumentUploadDetailsSuccess } from '../document-upload.action';

describe('CheckDocumentUploadContainer', () => {
  let fixture: ComponentFixture<CheckDocumentUploadContainer>;
  let navigate: jest.Mock;
  let store: Store<State>;

  const mockDocumentUploadDetails = {
    zipFilename: 'fileName.zipFile',
    bundleUploadId: 'uploadId',
    uploadStatus: {
      status: 'SUCCEEDED'
    } as UploadStatus
  } as DocumentUploadDetails;

  beforeEach(() => {
    navigate = jest.fn();
    TestBed.configureTestingModule({
      declarations: [CheckDocumentUploadContainer, MockDocumentUploadComponent],
      imports: [CommonModule, StoreModule.forRoot({ ...reducers, documentUploadDetails: documentUploadReducer }, {runtimeChecks: {}})]
    });

    store = TestBed.get(Store);
    fixture = TestBed.createComponent(CheckDocumentUploadContainer);

    store.dispatch(new LoadDocumentUploadDetailsSuccess([mockDocumentUploadDetails]));
  });

  it('should compile correctly', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  @Component({
    selector: 'check-document-upload',
    template: `
      <span>{{ documentUploadDetails | json }}</span>
    `
  })
  class MockDocumentUploadComponent {
    @Input() documentUploadDetails: DocumentUploadDetails[];
  }
});
