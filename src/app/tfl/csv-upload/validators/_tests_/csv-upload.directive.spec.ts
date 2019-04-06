import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { CsvUploadDirective } from '../csv-upload.directive';
import { PdkFormModule } from '@cpp/pdk';
import { CommonModule } from '@angular/common';

describe('`csvUpload` directive', () => {
  const setValueForInputFile = (elementRef, value) => {
    elementRef.nativeElement.value = value;
    elementRef.nativeElement.dispatchEvent(new Event('input'));
  };

  let fixture: ComponentFixture<TestCsvUploadComponent>;
  let form: NgForm;
  let headerCsv;
  let offencesCsv: DebugElement;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CsvUploadDirective, TestCsvUploadComponent],
      imports: [FormsModule, PdkFormModule, CommonModule]
    });

    fixture = TestBed.createComponent(TestCsvUploadComponent);
    fixture.detectChanges();
    tick();

    form = fixture.debugElement.children[0].injector.get(NgForm);
    headerCsv = fixture.debugElement.query(By.css('[name=headerCsv]'));
    offencesCsv = fixture.debugElement.query(By.css('[name=offencesCsv]'));
  }));

  it('should validate `true` if the header and offence files are valid', () => {
    setValueForInputFile(offencesCsv, 'nppcase_tfl_000001_offence_20170101133045.csv');
    setValueForInputFile(headerCsv, 'nppcase_tfl_000001_header_20170101133045.csv');

    fixture.detectChanges();
    expect(form.valid).toEqual(true);
  });

  it('should validate `false` if the header file is not valid', () => {
    setValueForInputFile(offencesCsv, 'xppcase_tfl_000001_offence_20170101133045.csv');
    setValueForInputFile(headerCsv, 'nppcase_tfl_000001_header_20170101133045.csv');

    fixture.detectChanges();
    expect(form.valid).toEqual(false);
  });

  it('should validate `false` if the offence file is not valid', () => {
    setValueForInputFile(offencesCsv, 'nppcase_tfl_000001_offence_20170101133045.csv');
    setValueForInputFile(headerCsv, 'xppcase_tfl_000001_header_20170101133045.csv');

    fixture.detectChanges();
    expect(form.valid).toEqual(false);
  });

  // using input type="text" instead of type="file"
  // it is not supported to programmatically set value to html file input (for security reasons)
  @Component({
    selector: 'test-csv-upload-validation',
    template: `
      <form>
        <input
          type="text"
          accept=".csv"
          name="headerCsv"
          required
          pdk-text-input
          [fileToValidateAgainst]="offenceCsvName"
          csvType="Header"
          fileTypeToValidateAgainst="Offence"
          csvUpload
          ngModel
          #headerCsvRef
        />
        <input
          type="text"
          accept=".csv"
          name="offencesCsv"
          required
          pdk-text-input
          [fileToValidateAgainst]="headerCsvName"
          csvType="Offence"
          fileTypeToValidateAgainst="Header"
          csvUpload
          ngModel
          #offencesCsvRef
        />
      </form>
    `
  })
  class TestCsvUploadComponent {
    headerCsvName: string;
    offenceCsvName: string;
  }
});
