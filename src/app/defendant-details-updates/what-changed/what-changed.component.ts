import { Component, Input } from '@angular/core';

@Component({
  selector: 'what-changed',
  template: `
    <ul class="govuk-list">
      <li data-role="date-of-birth-updated" *ngIf="defendantDetailsUpdate.dateOfBirthUpdated">
        Date of birth
      </li>
      <li data-role="address-updated" *ngIf="defendantDetailsUpdate.addressUpdated">
        Address details
      </li>
      <li data-role="name-updated" *ngIf="defendantDetailsUpdate.nameUpdated">
        Name
      </li>
    </ul>
  `
})
export class WhatChangedComponent {
  @Input() defendantDetailsUpdate;
}
