import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { DateValidator } from '../index';

describe('Date Format Validator', () => {

  let fixture: ComponentFixture<TestDateValidator>;
  let form: NgForm;
  let ctrlElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule(
      {
        declarations: [
          TestDateValidator,
          DateValidator
        ],
        imports: [
          FormsModule
        ]
      }
    );

    fixture = TestBed.createComponent(TestDateValidator);
    form = fixture.debugElement.children[0].injector.get(NgForm);
    ctrlElement = fixture.debugElement.query(By.css('[name=someDate]'));
    fixture.detectChanges();
  });

  const setValue = (elementRef, value) => {
    elementRef.nativeElement.value = value;
    elementRef.nativeElement.dispatchEvent(new Event('input'));
  };

  const invalidError = {
    invalidDate: { someDate: true }
  };

  it('should validate the supplied date', () => {
    fixture.componentInstance.model = '2015-01-01';
    fixture.detectChanges();
    expect(form.valid).toEqual(true);
  });

  it('should not validate an empty or null input', () => {
    setValue(ctrlElement, '');
    expect(form.valid).toEqual(true);

    setValue(ctrlElement, null);
    expect(form.valid).toEqual(true);
  });

  it('should invalidate an incorrect date and set error', () => {
    setValue(ctrlElement, '15-01-01');
    expect(form.valid).toEqual(false);
    expect(form.control.controls['someDate'].errors).toEqual(invalidError);
  });
});

@Component({
  selector: 'test-date-validation',
  template: `
    <form>
      <input
        name="someDate"
        [ngModel]="model"
        validateDate
      >
  `
})
class TestDateValidator {
  model: string;
}
