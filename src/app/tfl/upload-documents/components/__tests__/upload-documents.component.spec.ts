import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, EventEmitter, NO_ERRORS_SCHEMA, Output } from '@angular/core';
import { PdkCoreModule, PdkErrorSummaryModule, PdkGridModule, ValidationError } from '@cpp/pdk';
import { UploadDocumentsComponent } from '../upload-documents.component';
import { By } from '@angular/platform-browser';

describe('UploadDocumentsComponent', () => {
  let component: UploadDocumentsComponent;
  let fixture: ComponentFixture<UploadDocumentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadDocumentsComponent, MockUploadDocumentFormComponent],
      imports: [PdkCoreModule, PdkGridModule, PdkErrorSummaryModule],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(UploadDocumentsComponent);
    component = fixture.componentInstance;
  });

  it('should compile correctly', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should display upload success message', () => {
    fixture.componentInstance.uploadSuccess = true;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should emit upload documents file', () => {
    fixture.detectChanges();
    const formComponent: MockUploadDocumentFormComponent = fixture.debugElement.query(
      By.directive(MockUploadDocumentFormComponent)
    ).componentInstance;
    spyOn(fixture.componentInstance.uploadDocuments, 'emit');

    const zipFile = new File(['file1'], 'filename1', { type: 'zip' });
    formComponent.formSubmit.emit(zipFile);
    expect(fixture.componentInstance.uploadDocuments.emit).toHaveBeenCalledWith(zipFile);
  });

  it('should show errors', () => {
    fixture.detectChanges();
    const formComponent: MockUploadDocumentFormComponent = fixture.debugElement.query(
      By.directive(MockUploadDocumentFormComponent)
    ).componentInstance;

    formComponent.errors.emit([{ id: 'file1', message: 'Select file' }]);
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  @Component({
    selector: 'upload-document-form',
    template: `
      <div>Upload document form</div>
    `
  })
  class MockUploadDocumentFormComponent {
    @Output() formSubmit = new EventEmitter<File>();
    @Output() errors = new EventEmitter<ValidationError[]>();
  }
});
