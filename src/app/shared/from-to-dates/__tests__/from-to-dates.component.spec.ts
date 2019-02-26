import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PdkDateInputModule, PdkFormModule } from '@cpp/pdk';
import { FromToDatesComponent } from '../from-to-dates.component';
import { MaxDaysDirective } from '../max-days.directive';

describe('FromToDatesComponent', () => {
  let fixture: ComponentFixture<TestFromToDatesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, PdkDateInputModule, PdkFormModule],
      declarations: [FromToDatesComponent, MaxDaysDirective, TestFromToDatesComponent]
    });
    fixture = TestBed.createComponent(TestFromToDatesComponent);
    fixture.componentInstance.maxDaysForToDate = 31;
    fixture.componentInstance.toDate = '2019-10-01';
    fixture.componentInstance.fromDate = '2019-09-01';
  });

  it('should compile correctly', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  @Component({
    selector: 'from-to-dates-test',
    template: `
      {{ form.value }}
      <form #form="ngForm">
        <from-to-dates [maxDaysForToDate]="maxDaysForToDate" [fromDate]="fromDate" [toDate]="toDate"> </from-to-dates>
      </form>
    `
  })
  class TestFromToDatesComponent {
    maxDaysForToDate: number;
    fromDate: string;
    toDate: string;
  }
});
