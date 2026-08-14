import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { MaxDaysDirective } from '../max-days.directive';

describe('`maxDays` directive', () => {
  const setValue = (elementRef, value) => {
    elementRef.nativeElement.value = value;
    elementRef.nativeElement.dispatchEvent(new Event('input'));
  };

  let fixture: ComponentFixture<TestMaxDateValidationComponent>;
  let form: NgForm;
  let dateInput;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, TestMaxDateValidationComponent, MaxDaysDirective],
      teardown: { destroyAfterEach: false }
    });

    fixture = TestBed.createComponent(TestMaxDateValidationComponent);
    fixture.detectChanges();
    tick();

    form = fixture.debugElement.children[0].injector.get(NgForm);
    dateInput = fixture.debugElement.query(By.css('[name=toDate]'));
  }));

  it('should validate `false` if the to date exceeds the max number of days', () => {
    fixture.componentInstance.fromDate = '2019-02-01';
    fixture.componentInstance.maxDays = 3;
    fixture.detectChanges();

    setValue(dateInput, '2019-02-04');
    expect(form.control.get('toDate').hasError('maxDays')).toBe(true);
  });

  it('should validate `true` if the to date does not exceed the max number of days', () => {
    fixture.componentInstance.fromDate = '2019-02-01';
    fixture.componentInstance.maxDays = 3;
    fixture.detectChanges();
    setValue(dateInput, '2019-02-03');
    expect(form.valid).toEqual(true);
  });

  it('should not validate if no value set', () => {
    fixture.componentInstance.fromDate = '2019-02-01';
    fixture.componentInstance.maxDays = 0;
    fixture.detectChanges();
    setValue(dateInput, '2019-02-03');
    expect(form.valid).toEqual(true);
  });

  @Component({
    selector: 'test-max-date-validation',
    template: `
      <form>
        <input type="text" name="toDate" ngModel [maxDays]="maxDays" [fromDate]="fromDate" />
      </form>
    `,
    imports: [FormsModule, MaxDaysDirective]
  })
  class TestMaxDateValidationComponent {
    fromDate: string;
    maxDays: number;
  }
});
