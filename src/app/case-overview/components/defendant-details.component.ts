import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PersonalDetails } from '../case-overview.interfaces';

@Component({
  selector: 'defendant-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h4 pdk-typography="heading-medium">Personal details</h4>
    <pdk-grid container>
      <pdk-grid one-half>
        <div pdk-padding-vertical="2">
          <b>Name</b>
        </div>
      </pdk-grid>
      <pdk-grid one-half>
        <div pdk-padding-vertical="2">
          {{ defendantDetails | defendantName }}
        </div>
      </pdk-grid>

      <pdk-grid one-half>
        <div pdk-padding-vertical="2">
          <b>Date of Birth</b>
        </div>
      </pdk-grid>
      <pdk-grid one-half>
        <div pdk-padding-vertical="2">
          {{ defendantDetails.dateOfBirth | formatDate: 'd MMM y' }}
          ({{ defendantDetails.dateOfBirth | age }} years old)
        </div>
      </pdk-grid>

      <pdk-grid one-half>
        <div pdk-padding-vertical="2">
          <b>Address</b>
        </div>
      </pdk-grid>
      <pdk-grid one-half>
        <div pdk-padding-vertical="2" class="pre-line">
          {{ defendantDetails.address | formatAddress: '\\n' }}
        </div>
      </pdk-grid>

      <pdk-grid one-half>
        <div pdk-padding-vertical="2">
          <b>Email</b>
        </div>
      </pdk-grid>
      <pdk-grid one-half>
        <div pdk-padding-vertical="2">
          {{ defendantDetails.contactDetails?.email | ifEmpty: '–' }}
        </div>
      </pdk-grid>

      <pdk-grid one-half>
        <div pdk-padding-vertical="2">
          <b>Home telephone</b>
        </div>
      </pdk-grid>
      <pdk-grid one-half>
        <div pdk-padding-vertical="2">
          {{ defendantDetails.contactDetails?.home | ifEmpty: '–' }}
        </div>
      </pdk-grid>

      <pdk-grid one-half>
        <div pdk-padding-vertical="2">
          <b>Mobile</b>
        </div>
      </pdk-grid>
      <pdk-grid one-half>
        <div pdk-padding-vertical="2">
          {{ defendantDetails.contactDetails?.mobile | ifEmpty: '–' }}
        </div>
      </pdk-grid>

      <pdk-grid one-half>
        <div pdk-padding-vertical="2">
          <b>National Insurance Number</b>
        </div>
      </pdk-grid>
      <pdk-grid one-half>
        <div pdk-padding-vertical="2">
          {{ defendantDetails.contactDetails?.niNumber | ifEmpty: '–' }}
        </div>
      </pdk-grid>
    </pdk-grid>
  `,
  styles: [
    `
      .pre-line {
        white-space: pre-line;
      }
    `
  ]
})
export class DefendantDetailsComponent {
  @Input() defendantDetails: PersonalDetails;
}
