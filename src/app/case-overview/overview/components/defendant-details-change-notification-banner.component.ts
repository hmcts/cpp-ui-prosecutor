import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import {
  DefendantDetailUpdateRequest,
  DefendantDetailUpdateRequestStatusType,
  LegalEntityDetails,
  PersonalDetails
} from '../../../contexts/sjp';

const DefendantStatusMessages: Record<DefendantDetailUpdateRequestStatusType, string> = {
  PENDING: 'The following defendant details have been updated and are awaiting approval',
  UPDATED: 'The following defendant details have been updated',
  REJECTED: ''
};

@Component({
  selector: 'defendant-details-change-notification-banner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <pdk-notification-banner *ngIf="displayNotificationBanner" title="Important">
      <div pdk-typography="body-medium">
        <p [innerHTML]="statusMessage"></p>
        <ul class="list list-bullet">
          <li *ngIf="nameChanged">Name</li>
          <li *ngIf="dobChanged">Date of birth</li>
          <li *ngIf="addressChanged">Address</li>
        </ul>
      </div>
    </pdk-notification-banner>
  `
})
export class DefendantDetailsChangeNotificationBannerComponent implements OnChanges {
  @Input() personalDetails?: PersonalDetails;
  @Input() legalEntityDetails?: LegalEntityDetails;
  @Input() defendantDetailUpdateRequest?: DefendantDetailUpdateRequest;

  dobChanged: boolean;
  addressChanged: boolean;
  nameChanged: boolean;
  status: DefendantDetailUpdateRequestStatusType;
  statusMessage: string;

  get displayNotificationBanner(): boolean {
    return (this.dobChanged || this.addressChanged || this.nameChanged) && this.status !== 'REJECTED';
  }

  ngOnChanges(): void {
    if (!!this.defendantDetailUpdateRequest) {
      this.status = this.defendantDetailUpdateRequest.status;
      if (this.status !== 'REJECTED') {
        this.statusMessage = DefendantStatusMessages[this.status];
        this.dobChanged = this.defendantDetailUpdateRequest.dobUpdated;
        this.addressChanged = this.defendantDetailUpdateRequest.addressUpdated;
        this.nameChanged = this.defendantDetailUpdateRequest.nameUpdated;
      }
    } else {
      // Backward compatibility for old cases with changes already done
      this.statusMessage = DefendantStatusMessages.UPDATED;
      if (!!this.personalDetails) {
        this.dobChanged = this.personalDetails.dobChanged;
        this.addressChanged = this.personalDetails.addressChanged;
        this.nameChanged = this.personalDetails.nameChanged;
      } else {
        this.addressChanged = this.legalEntityDetails.addressChanged;
        this.nameChanged = this.legalEntityDetails.legalEntityNameChanged;
      }
    }
  }
}
