import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DateOfBirthComponent } from '../date-of-birth.component';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AgePipeModule, FormatDatePipeModule } from '../../pipes';

describe('DateOfBirthComponent', () => {
  let fixture: ComponentFixture<TestDateOfBirthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, AgePipeModule, FormatDatePipeModule],
      declarations: [TestDateOfBirthComponent, DateOfBirthComponent]
    });
    fixture = TestBed.createComponent(TestDateOfBirthComponent);
    fixture.componentInstance.dateOfBirth = '1998-01-31';
  });

  it('should compile correctly', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should show nothing on the div(withDefaultSubstitute) but the a dash (by default) on the div(withoutDefaultSubstitute)', () => {
    fixture.componentInstance.dateOfBirth = undefined;
    fixture.componentInstance.defaultSubstitute = undefined;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should show dash substitution on both divs', () => {
    fixture.componentInstance.dateOfBirth = undefined;
    fixture.componentInstance.defaultSubstitute = '–';
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  @Component({
    selector: 'date-of-birth-test',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
      <div id="withoutDefaultSubstitute">
        <date-of-birth [dateOfBirth]="dateOfBirth"></date-of-birth>
      </div>
      <div id="withDefaultSubstitute">
        <date-of-birth [dateOfBirth]="dateOfBirth" [defaultSubstitute]="defaultSubstitute"></date-of-birth>
      </div>
    `
  })
  class TestDateOfBirthComponent {
    dateOfBirth: string;
    defaultSubstitute = '–';
  }
});
