import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PersonalDetails } from '../../../contexts/sjp';

@Component({
  selector: 'personal-details-change-alert',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <pdk-alert
      *ngIf="displayRedBanner"
      type="warning"
      icon="true"
      pdk-margin-vertical="1"
      aria-describedby="personal-details-updated-alert"
    >
      The following defendant details have been updated:
      <div *ngIf="personalDetails.dobChanged">Date of birth</div>
      <div *ngIf="personalDetails.addressChanged">Address details</div>
      <div *ngIf="personalDetails.nameChanged">Name</div>
    </pdk-alert>
  `,
  styles: [
    `
      :host /deep/ .pdk-alert__container {
        align-items: stretch !important;
      }
    `
  ]
})
export class PersonalDetailsChangeAlertComponent {
  @Input() personalDetails: PersonalDetails;

  get displayRedBanner(): boolean {
    return (
      (this.personalDetails && this.personalDetails.nameChanged) ||
      this.personalDetails.addressChanged ||
      this.personalDetails.dobChanged
    );
  }
}
