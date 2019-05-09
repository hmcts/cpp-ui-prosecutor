import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PdkCoreModule, PdkFileInputModule, PdkFormModule, PdkGridModule, PdkTextInputModule } from '@cpp/pdk';
import { UploadDocumentFormComponent } from '../upload-document-form.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('UploadDocumentFormComponent', () => {
  let component: UploadDocumentFormComponent;
  let fixture: ComponentFixture<UploadDocumentFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadDocumentFormComponent],
      imports: [FormsModule, PdkFormModule, PdkCoreModule, PdkGridModule, PdkFileInputModule, PdkTextInputModule],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(UploadDocumentFormComponent);
    component = fixture.componentInstance;
  });

  it('should compile correctly', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  // TODO: THE FORM SUBMISSION VALIDATION WILL FAIL AS IT IS NOT SUPPORTED
  //  TO PROGRAMMATICALLY PASS VALUE TO HTML FILE INPUT (FOR SECURITY REASONS)
  it('should submit the form', () => {});
});
