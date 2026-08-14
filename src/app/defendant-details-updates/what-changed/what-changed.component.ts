import { Component, Input } from '@angular/core';
import { PdkMarginDirective } from '@cpp/pdk';

@Component({
  selector: 'what-changed',
  template: `
    <ul class="govuk-list" pdk-margin-vertical="2">
      @if (defendantDetailsUpdate.dateOfBirthUpdated) {
      <li data-role="date-of-birth-updated">
        Date of birth
      </li>
      } @if (defendantDetailsUpdate.addressUpdated) {
      <li data-role="address-updated">
        Address details
      </li>
      } @if (defendantDetailsUpdate.nameUpdated) {
      <li data-role="name-updated">
        Name
      </li>
      }
    </ul>
  `,
  imports: [PdkMarginDirective]
})
export class WhatChangedComponent {
  @Input() defendantDetailsUpdate;
}
