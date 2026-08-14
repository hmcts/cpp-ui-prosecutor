import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { EmailValidator } from '../index';

describe('Email Validator', () => {
  let fixture: ComponentFixture<TestEmailValidatorComponent>;
  let form: NgForm;
  let ctrlElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, TestEmailValidatorComponent, EmailValidator]
    });

    fixture = TestBed.createComponent(TestEmailValidatorComponent);
    form = fixture.debugElement.children[0].injector.get(NgForm);
    ctrlElement = fixture.debugElement.query(By.css('[name=email]'));
    fixture.detectChanges();
  });

  const setValue = (elementRef, value) => {
    elementRef.nativeElement.value = value;
    elementRef.nativeElement.dispatchEvent(new Event('input'));
  };

  const invalidError = {
    email: { email: true }
  };

  it('should validate the supplied email', () => {
    fixture.componentInstance.model = 'xyz@jamesgray.com';
    fixture.detectChanges();
    expect(form.valid).toEqual(true);
  });

  it('should not validate an empty or null input', () => {
    setValue(ctrlElement, '');
    expect(form.valid).toEqual(true);

    setValue(ctrlElement, null);
    expect(form.valid).toEqual(true);
  });

  it('should invalidate an incorrect email and set error', () => {
    setValue(ctrlElement, 'mr.john@smith@gov.co.uk');
    expect(form.valid).toEqual(false);
    expect(form.control.controls['email'].errors).toEqual(invalidError);
    expect(form.control.hasError('email', ['email'])).toBe(true);
  });
});

@Component({
  selector: 'test-email-validation',
  template: `
    <form>
      <input name="email" [ngModel]="model" validateEmail />
    </form>
  `,
  imports: [FormsModule, EmailValidator]
})
class TestEmailValidatorComponent implements Validators {
  model: string;
}
