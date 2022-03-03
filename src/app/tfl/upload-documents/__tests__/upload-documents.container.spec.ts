import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store, StoreModule } from '@ngrx/store';

import { CommonModule } from '@angular/common';
import { reducers, State } from '../../../reducers';
import { UploadDocuments, UploadDocumentsSuccess } from '../../tfl.action';
import { tflReducer } from '../../tfl.reducer';
import { UploadDocumentsContainer } from '../upload-documents.container';
import { By } from '@angular/platform-browser';

describe('UploadDocumentsContainer', () => {
  let fixture: ComponentFixture<UploadDocumentsContainer>;
  let navigate: jest.Mock;
  let store: Store<State>;

  beforeEach(() => {
    navigate = jest.fn();
    TestBed.configureTestingModule({
      declarations: [UploadDocumentsContainer, MockUploadDocumentComponent],
      imports: [CommonModule, StoreModule.forRoot({ ...reducers, tfl: tflReducer }, { runtimeChecks: {}})]
    });

    store = TestBed.get(Store);
    fixture = TestBed.createComponent(UploadDocumentsContainer);
  });

  it('should compile correctly', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should compile correctly with upload success', () => {
    store.dispatch(new UploadDocumentsSuccess());
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should upload documents', () => {
    spyOn(store, 'dispatch');
    const innerComponent: MockUploadDocumentComponent = fixture.debugElement.query(
      By.directive(MockUploadDocumentComponent)
    ).componentInstance;
    const zipFile = new File(['file1'], 'filename1', { type: 'zip' });
    innerComponent.uploadDocuments.emit(zipFile);
    expect(store.dispatch).toHaveBeenCalledWith(new UploadDocuments(zipFile));
  });

  @Component({
    selector: 'upload-documents',
    template: `
      <span>{{ uploadSuccess }}</span>
    `
  })
  class MockUploadDocumentComponent {
    @Input() uploadSuccess: boolean;
    @Output() uploadDocuments = new EventEmitter<File>();
  }
});
