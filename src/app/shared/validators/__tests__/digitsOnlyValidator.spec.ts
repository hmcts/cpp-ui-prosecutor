import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DigitsOnlyValidator } from '../digitsOnlyValidator';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule, NgForm, Validators } from '@angular/forms';
import { DELETE, BACKSPACE, TAB, ENTER, ZERO, NINE } from '../digitsOnlyValidator';

const P = 80;
const SHIFT = 16;
const EIGHT = 56;

describe('DigitsOnlyValidator', () => {
  let fixture: ComponentFixture<TestDigitsOnlyComponent>;
  let form: NgForm;
  let textInputElement: DebugElement;
  let preventDefault;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, TestDigitsOnlyComponent, DigitsOnlyValidator]
    });
    fixture = TestBed.createComponent(TestDigitsOnlyComponent);
    form = fixture.debugElement.children[0].injector.get(NgForm);
    textInputElement = fixture.debugElement.query(By.css('input[name="digitsOnly"]'));
    fixture.detectChanges();
    preventDefault = jasmine.createSpy();
  });

  const setValue = (elementRef, value) => {
    elementRef.nativeElement.value = value;
    elementRef.nativeElement.dispatchEvent(new Event('input'));
  };

  it('should allow up to 3 digits', () => {
    fixture.componentInstance.model = '123';
    fixture.detectChanges();
    expect(form.valid).toEqual(true);
  });

  it('should not allow the text to be entered', () => {
    setValue(textInputElement, 'abc');
    expect(form.valid).toEqual(false);
  });

  it('should now allow values that have more than 3 characters', () => {
    setValue(textInputElement, '1234');
    expect(form.valid).toEqual(false);
  });

  it('should allow the digit 0 to be entered', () => {
    textInputElement.triggerEventHandler('keydown', { keyCode: ZERO, preventDefault });
    expect(preventDefault).not.toBeCalled();
  });

  it('should allow the digit 9 to be entered', () => {
    textInputElement.triggerEventHandler('keydown', { keyCode: NINE, preventDefault });
    expect(preventDefault).not.toBeCalled();
  });

  it('should allow backspace to be entered', () => {
    textInputElement.triggerEventHandler('keydown', { keyCode: BACKSPACE, preventDefault });
    expect(preventDefault).not.toBeCalled();
  });

  it('should allow delete to be entered', () => {
    textInputElement.triggerEventHandler('keydown', { keyCode: DELETE, preventDefault });
    expect(preventDefault).not.toBeCalled();
  });

  it('should allow tab to be entered', () => {
    textInputElement.triggerEventHandler('keydown', { keyCode: TAB, preventDefault });
    expect(preventDefault).not.toBeCalled();
  });

  it('should allow enter to be entered', () => {
    textInputElement.triggerEventHandler('keydown', { keyCode: ENTER, preventDefault });
    expect(preventDefault).not.toBeCalled();
  });

  it('should not allow characters to be entered', () => {
    textInputElement.triggerEventHandler('keydown', { keyCode: P, preventDefault });
    expect(preventDefault).toBeCalled();
  });

  it('should not allow shift key and a digit to be entered', () => {
    textInputElement.triggerEventHandler('keydown', { keyCode: SHIFT, preventDefault });
    textInputElement.triggerEventHandler('keydown', { keyCode: EIGHT, preventDefault });
    expect(preventDefault).toBeCalled();
  });

  it('should not allow paste', () => {
    textInputElement.triggerEventHandler('paste', { preventDefault });
    expect(preventDefault).toBeCalled();
  });
});

@Component({
  selector: 'test-digits-only-validation',
  template: `
    <form>
      <input name="digitsOnly" type="text" [ngModel]="model" validateDigitsOnly />
    </form>
  `,
  imports: [FormsModule, DigitsOnlyValidator]
})
class TestDigitsOnlyComponent implements Validators {
  model: string;
}
