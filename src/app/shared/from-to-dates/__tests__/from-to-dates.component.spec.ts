import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FromToDatesComponent } from '../from-to-dates.component';
import { MaxDaysDirective } from '../max-days.directive';
import { By } from '@angular/platform-browser';
import { PdkForm } from '@cpp/pdk';

describe('FromToDatesComponent', () => {
  let fixture: ComponentFixture<TestFromToDatesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, TestFromToDatesComponent, FromToDatesComponent, MaxDaysDirective],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      teardown: { destroyAfterEach: false }
    });
    fixture = TestBed.createComponent(TestFromToDatesComponent);
    fixture.componentInstance.maxDaysForToDate = 31;
    fixture.componentInstance.fromDate = '2018-09-15';
    fixture.componentInstance.toDate = '2018-10-01';
    fixture.detectChanges();
  });

  it('should compile correctly', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should submit the form', fakeAsync(() => {
    fixture.detectChanges();

    fixture.debugElement.query(By.css('button')).nativeElement.click();
    fixture.detectChanges();
    tick();

    fixture.whenStable().then(() => {
      expect(fixture.componentInstance.submit).toHaveBeenCalledWith({
        fromDate: '2018-09-15',
        toDate: '2018-10-01'
      });
    });
  }));

  it('should emit errors if the duration is more that 31 days', fakeAsync(() => {
    fixture.componentInstance.toDate = '2018-10-30';
    fixture.detectChanges();
    tick();

    fixture.debugElement.query(By.css('button')).nativeElement.click();
    fixture.detectChanges();
    tick();

    fixture.debugElement.query(By.css('button')).nativeElement.click();
    fixture.detectChanges();
    tick();

    fixture.whenStable().then(() => {
      expect(fixture.componentInstance.errors).toHaveBeenCalled();
    });
  }));

  @Component({
    selector: 'from-to-dates-test',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
      <form #form="ngForm" pdk-form (errors)="errors($event)" (validSubmit)="submit(form.value)">
        <from-to-dates [maxDaysForToDate]="maxDaysForToDate" [fromDate]="fromDate" [toDate]="toDate"></from-to-dates>
        <button type="submit">Submit</button>
      </form>
    `,
    imports: [FormsModule, FromToDatesComponent, PdkForm]
  })
  class TestFromToDatesComponent {
    maxDaysForToDate: number;
    fromDate: string;
    toDate: string;
    errors = jest.fn();
    submit = jest.fn();
  }
});
