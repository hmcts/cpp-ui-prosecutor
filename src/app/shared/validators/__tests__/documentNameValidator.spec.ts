import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { DocumentNameValidator } from '../index';

describe('Document Name Validator', () => {
  let fixture: ComponentFixture<TestDocumentNameValidatorComponent>;
  let form: NgForm;
  let ctrlElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, TestDocumentNameValidatorComponent, DocumentNameValidator]
    });

    fixture = TestBed.createComponent(TestDocumentNameValidatorComponent);
    form = fixture.debugElement.children[0].injector.get(NgForm);
    ctrlElement = fixture.debugElement.query(By.css('[name=someDocumentName]'));
    fixture.detectChanges();
  });

  const setValue = (elementRef, value) => {
    elementRef.nativeElement.value = value;
    elementRef.nativeElement.dispatchEvent(new Event('input'));
  };

  const invalidError = {
    invalidDocumentName: { someDocumentName: true }
  };

  it('should validate the supplied document name', () => {
    fixture.componentInstance.model = 'test document name';
    fixture.detectChanges();
    expect(form.valid).toEqual(true);
  });

  it('should not validate an empty or null input', () => {
    setValue(ctrlElement, '');
    expect(form.valid).toEqual(true);

    setValue(ctrlElement, null);
    expect(form.valid).toEqual(true);
  });

  it('should invalidate an incorrect document name and set error', () => {
    setValue(ctrlElement, '      ');
    expect(form.valid).toEqual(false);
    expect(form.control.controls['someDocumentName'].errors).toEqual(invalidError);
  });
});

@Component({
  selector: 'test-document-validation',
  template: `
    <form>
      <input name="someDocumentName" [ngModel]="model" validateDocumentName />
    </form>
  `,
  imports: [FormsModule, DocumentNameValidator]
})
class TestDocumentNameValidatorComponent implements Validators {
  model: string;
}
