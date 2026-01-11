import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormsModule, NgForm } from '@angular/forms';
import { PdkFormFieldComponent, PdkForm, PdkDateInput } from '@cpp/pdk';
import { MaxDaysDirective } from './max-days.directive';

export interface InputValues {
  fromDate: string;
  toDate: string;
}

@Component({
  selector: 'from-to-dates',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
  template: `
    <pdk-form-field label="From" hintText="For example, 13 6 2016">
      <pdk-date-input #fromDateRef="ngModel" name="fromDate" pastDate [ngModel]="fromDate" required> </pdk-date-input>
    </pdk-form-field>
    <pdk-form-field label="To" hintText="For example, 13 7 2016" [errorMessages]="maxDateErrorMessage">
      <pdk-date-input
        name="toDate"
        pastDate
        [minDate]="fromDateRef.value"
        [maxDays]="maxDaysForToDate"
        [fromDate]="fromDateRef.value"
        [ngModel]="toDate"
        required
      >
      </pdk-date-input>
    </pdk-form-field>
  `,
  imports: [PdkFormFieldComponent, FormsModule, PdkForm, PdkDateInput, MaxDaysDirective]
})
export class FromToDatesComponent implements OnInit {
  maxDateErrorMessage = [
    {
      rule: 'minDate',
      message: 'Cannot be before from date'
    }
  ];

  @Input() fromDate: string;
  @Input() toDate: string;
  @Input() maxDaysForToDate: number;

  ngOnInit() {
    if (this.maxDaysForToDate) {
      this.maxDateErrorMessage.push({
        rule: 'maxDays',
        message: `This date must be within ${this.maxDaysForToDate} days of your start date.`
      });
    }
  }
}
