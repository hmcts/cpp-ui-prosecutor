import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LegalEntityDetails, PersonalDetails } from '../../../contexts/sjp';

@Component({
  selector: 'defendant-details-change-alert',
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
      <div *ngIf="personalDetails?.dobChanged">Date of birth</div>
      <div *ngIf="personalDetails?.addressChanged || legalEntityDetails?.addressChanged">Address details</div>
      <div *ngIf="personalDetails?.nameChanged || legalEntityDetails?.legalEntityNameChanged">Name</div>
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
export class DefendantDetailsChangeAlertComponent {
  @Input() personalDetails?: PersonalDetails;
  @Input() legalEntityDetails?: LegalEntityDetails;

  get displayRedBanner(): boolean {
    if (!!this.personalDetails) {
      return (
        this.personalDetails.nameChanged ||
        this.personalDetails.addressChanged ||
        this.personalDetails.dobChanged
      );
    } else {
      return (
        this.legalEntityDetails.legalEntityNameChanged ||
        this.legalEntityDetails.addressChanged
      );
    }
  }
}
