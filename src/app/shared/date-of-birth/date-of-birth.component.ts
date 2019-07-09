import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'date-of-birth',
  template: `
    <div *ngIf="!!dateOfBirth; else noDateOfBirth">
      {{ dateOfBirth | formatDate: 'd MMM y' }}
      ({{ dateOfBirth | age }} years old)
    </div>
    <ng-template #noDateOfBirth>
      <div>
        {{ defaultSubstitute }}
      </div>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateOfBirthComponent {
  @Input()
  dateOfBirth: string;

  @Input()
  defaultSubstitute = '–';

  constructor() {}
}
