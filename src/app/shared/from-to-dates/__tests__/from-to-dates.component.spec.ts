import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PdkDateInputModule, PdkFormModule } from '@cpp/pdk';
import { FromToDatesComponent } from '../from-to-dates.component';
import { MaxDaysDirective } from '../max-days.directive';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

describe('FromToDatesComponent', () => {
  let fixture: ComponentFixture<TestFromToDatesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, PdkDateInputModule, PdkFormModule],
      declarations: [FromToDatesComponent, MaxDaysDirective, TestFromToDatesComponent]
    });
    fixture = TestBed.createComponent(TestFromToDatesComponent);
    fixture.componentInstance.maxDaysForToDate = 31;
    fixture.componentInstance.fromDate = '2018-09-15';
    fixture.componentInstance.toDate = '2018-10-01';
  });

  it('should compile correctly', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should submit the form', async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.debugElement.query(By.css('button')).nativeElement.click();
    expect(fixture.componentInstance.submit).toHaveBeenCalledWith({
      fromDate: '2018-09-15',
      toDate: '2018-10-01'
    });
  });

  it('should emit errors if the duration is more that 31 days', async () => {
    fixture.componentInstance.toDate = '2018-12-30';
    fixture.detectChanges();
    await fixture.whenStable();
    await fixture.debugElement.query(By.css('button')).nativeElement.click();
    expect(fixture.componentInstance.errors).toHaveBeenCalled();
  });

  @Component({
    selector: 'from-to-dates-test',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
      <form #form="ngForm" pdk-form (errors)="errors($event)" (validSubmit)="submit(form.value)">
        <from-to-dates [maxDaysForToDate]="maxDaysForToDate" [fromDate]="fromDate" [toDate]="toDate"></from-to-dates>
        <button type="submit">Submit</button>
      </form>
    `
  })
  class TestFromToDatesComponent {
    maxDaysForToDate: number;
    fromDate: string;
    toDate: string;
    errors = jest.fn();
    submit = jest.fn();
  }
});
