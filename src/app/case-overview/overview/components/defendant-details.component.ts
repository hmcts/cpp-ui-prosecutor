import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PersonalDetails } from '../../../contexts/sjp';

@Component({
  selector: 'defendant-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h4 pdk-typography="heading-medium">Defendant details</h4>
    <pdk-grid container>
      <pdk-grid one-third>
        <div pdk-padding-vertical="2">
          <b>Name</b>
        </div>
      </pdk-grid>
      <pdk-grid two-thirds>
        <div pdk-padding-vertical="2" data-role="defendant-name">
          {{ defendantDetails | defendantName: false }}
        </div>
      </pdk-grid>
    </pdk-grid>

    <pdk-grid container>
      <pdk-grid one-third>
        <div pdk-padding-vertical="2">
          <b>Date of Birth</b>
        </div>
      </pdk-grid>
      <pdk-grid two-thirds data-role="date-of-birth">
        <div pdk-padding-vertical="2">
          {{ defendantDetails.dateOfBirth | formatDate: 'd MMM y' }}
          ({{ defendantDetails.dateOfBirth | age }} years old)
        </div>
      </pdk-grid>
    </pdk-grid>

    <pdk-grid container>
      <pdk-grid one-third>
        <div pdk-padding-vertical="2">
          <b>Address</b>
        </div>
      </pdk-grid>
      <pdk-grid two-thirds>
        <div pdk-padding-vertical="2" class="pre-line">
          {{ defendantDetails.address | formatAddress: '\\n' }}
        </div>
      </pdk-grid>
    </pdk-grid>

    <pdk-grid container>
      <pdk-grid one-third>
        <div pdk-padding-vertical="2">
          <b>Email</b>
        </div>
      </pdk-grid>
      <pdk-grid two-thirds>
        <div pdk-padding-vertical="2" data-role="defendant-email">
          {{ defendantDetails.contactDetails?.email | ifEmpty: '–' }}
        </div>
      </pdk-grid>
    </pdk-grid>

    <pdk-grid container>
      <pdk-grid one-third>
        <div pdk-padding-vertical="2">
          <b>Home telephone</b>
        </div>
      </pdk-grid>
      <pdk-grid two-thirds>
        <div pdk-padding-vertical="2">
          {{ defendantDetails.contactDetails?.home | ifEmpty: '–' }}
        </div>
      </pdk-grid>
    </pdk-grid>

    <pdk-grid container>
      <pdk-grid one-third>
        <div pdk-padding-vertical="2">
          <b>Mobile</b>
        </div>
      </pdk-grid>
      <pdk-grid two-thirds>
        <div pdk-padding-vertical="2">
          {{ defendantDetails.contactDetails?.mobile | ifEmpty: '–' }}
        </div>
      </pdk-grid>
    </pdk-grid>

    <pdk-grid container>
      <pdk-grid one-third>
        <div pdk-padding-vertical="2">
          <b>National Insurance Number</b>
        </div>
      </pdk-grid>
      <pdk-grid two-thirds>
        <div pdk-padding-vertical="2">
          {{ defendantDetails.nationalInsuranceNumber | ifEmpty: '–' }}
        </div>
      </pdk-grid>
    </pdk-grid>
  `
})
export class DefendantDetailsComponent {
  @Input() defendantDetails: PersonalDetails;
}
