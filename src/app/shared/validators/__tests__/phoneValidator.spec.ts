import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { PhoneValidator } from '../index';

describe('PhoneNumber Validator', () => {
  let fixture: ComponentFixture<TestPhoneValidatorComponent>;
  let form: NgForm;
  let ctrlElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, TestPhoneValidatorComponent, PhoneValidator]
    });

    fixture = TestBed.createComponent(TestPhoneValidatorComponent);
    form = fixture.debugElement.children[0].injector.get(NgForm);
    ctrlElement = fixture.debugElement.query(By.css('[name=phoneNumber]'));
    fixture.detectChanges();
  });

  const setValue = (elementRef, value) => {
    elementRef.nativeElement.value = value;
    elementRef.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  };

  const invalidError = {
    inValidPhone: { phoneNumber: true }
  };

  it('should validate the supplied phone number', () => {
    fixture.componentInstance.model = '01509 813888';
    fixture.detectChanges();
    expect(form.valid).toEqual(true);
  });

  it('should not validate an empty or null input', () => {
    setValue(ctrlElement, '');
    expect(form.valid).toEqual(true);

    setValue(ctrlElement, null);
    expect(form.valid).toEqual(true);
  });

  it('should invalidate an incorrect phone number and set error', () => {
    setValue(ctrlElement, '500-500');
    expect(form.valid).toEqual(false);
    expect(form.control.controls['phoneNumber'].errors).toEqual(invalidError);

    setValue(ctrlElement, '+44 CDEF GAHC');
    expect(form.valid).toEqual(false);
    expect(form.control.controls['phoneNumber'].errors).toEqual(invalidError);
    expect(form.control.hasError('inValidPhone', ['phoneNumber'])).toBe(true);
  });
});

@Component({
  selector: 'test-phone-validation',
  template: `
    <form>
      <input name="phoneNumber" [ngModel]="model" validatePhone />
    </form>
  `,
  imports: [FormsModule, PhoneValidator]
})
class TestPhoneValidatorComponent implements Validators {
  model: string;
}
