import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ProsecutorValidator } from '../index';

describe('Prosecutor Validator', () => {

  let fixture: ComponentFixture<TestProsecutorValidator>;
  let form: NgForm;
  let ctrlElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule(
      {
        declarations: [
          TestProsecutorValidator,
          ProsecutorValidator
        ],
        imports: [
          FormsModule
        ]
      }
    );

    fixture = TestBed.createComponent(TestProsecutorValidator);
    form = fixture.debugElement.children[0].injector.get(NgForm);
    ctrlElement = fixture.debugElement.query(By.css('[name=prosecutorCaseReference]'));
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
      <input
        name="prosecutorCaseReference"
        [ngModel]="model"
        prosecutorValidator
        [oldValue]="oldValue"
      >
  `
})
class TestProsecutorValidator {
  model: string;
  oldValue: string;
}
