import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm, Validators } from '@angular/forms';
import { ProsecutorValidator } from '../index';

describe('Prosecutor Validator', () => {
  let fixture: ComponentFixture<TestProsecutorValidatorComponent>;
  let form: NgForm;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, TestProsecutorValidatorComponent, ProsecutorValidator]
    });

    fixture = TestBed.createComponent(TestProsecutorValidatorComponent);
    form = fixture.debugElement.children[0].injector.get(NgForm);
    fixture.detectChanges();
  });

  it('should trigger an error for the supplied prosecutor case reference number', () => {
    fixture.componentInstance.model = 'TFL123456789';
    fixture.componentInstance.oldValue = 'TFL123456789';
    fixture.detectChanges();
    expect(form.valid).toEqual(false);
  });

  it('should validate the form if the prosecutor case reference has been changed', () => {
    fixture.componentInstance.model = 'TFL123456789';
    fixture.componentInstance.oldValue = 'TFL123456780';
    fixture.detectChanges();
    form.controls['prosecutorCaseReference'].updateValueAndValidity();
    expect(form.valid).toEqual(true);
  });
});

@Component({
  selector: 'test-prosecutor-validation',
  template: `
    <form>
      <input name="prosecutorCaseReference" [ngModel]="model" prosecutorValidator [oldValue]="oldValue" />
    </form>
  `,
  imports: [FormsModule, ProsecutorValidator]
})
class TestProsecutorValidatorComponent implements Validators {
  model: string;
  oldValue: string;
}
