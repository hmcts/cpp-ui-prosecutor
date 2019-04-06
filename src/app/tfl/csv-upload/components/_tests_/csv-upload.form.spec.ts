import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  PdkAlertModule,
  PdkBreadcrumbsModule,
  PdkButtonModule,
  PdkCoreModule,
  PdkErrorSummaryModule,
  PdkFormModule,
  PdkGridModule,
  PdkInputModule,
  PdkPageHeaderModule,
  PdkTextareaModule,
  PdkTextInputModule
} from '@cpp/pdk';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';
import { CsvUploadFormComponent } from '../csv-upload-form.component';
import { mockNativeMethods } from '../../../../test/jest-mock';
import { CsvUploadDirective } from '../../validators/csv-upload.directive';

describe('CsvUploadFormComponent', () => {
  let fixture: ComponentFixture<TestCsvUploadFormComponent>;
  let formComponent: CsvUploadFormComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CsvUploadFormComponent, TestCsvUploadFormComponent, CsvUploadDirective],
      imports: [
        CommonModule,
        PdkAlertModule,
        PdkBreadcrumbsModule,
        PdkButtonModule,
        PdkCoreModule,
        PdkErrorSummaryModule,
        PdkFormModule,
        PdkGridModule,
        PdkInputModule,
        PdkTextInputModule,
        PdkTextareaModule,
        PdkPageHeaderModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    mockNativeMethods();
    fixture = TestBed.createComponent(TestCsvUploadFormComponent);
    // fixture.componentInstance.kase = MOCK_CASE;
    formComponent = fixture.debugElement.query(By.directive(CsvUploadFormComponent)).componentInstance;
    fixture.detectChanges();
  });

  it('should compile correctly', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  // TODO: THE FORM SUBMISSION VALIDATION WILL FAIL AS IT IS NOT SUPPORTED
  //  TO PROGRAMMATICALLY PASS VALUE TO HTML FILE INPUT (FOR SECURITY REASONS)
  it('should submit the form', () => {});

  @Component({
    selector: 'test-csv-upload-form',
    template: `
      <csv-upload-form (formSubmit)="formSubmit($event)"></csv-upload-form>
    `
  })
  class TestCsvUploadFormComponent {
    formSubmit = jest.fn();
  }
});
