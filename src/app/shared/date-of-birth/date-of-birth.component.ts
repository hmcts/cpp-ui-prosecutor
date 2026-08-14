import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { AgePipe } from '../pipes/age/age.pipe';
import { FormatDatePipe } from '../pipes/format-date/format-date.pipe';

@Component({
    selector: 'date-of-birth',
    template: `
    @if (!!dateOfBirth) {
      <div>
        {{ dateOfBirth | formatDate: 'd MMM y' }}
        ({{ dateOfBirth | age }} years old)
      </div>
    } @else {
      <div>
        {{ defaultSubstitute }}
      </div>
    }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [AgePipe, FormatDatePipe],
})
export class DateOfBirthComponent {
  @Input()
  dateOfBirth: string;

  @Input()
  defaultSubstitute = '–';

  constructor() {}
}
