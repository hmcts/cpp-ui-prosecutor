import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PersonalDetails } from '../../../contexts/sjp';
import { PdkCore, PdkGrid } from "@cpp/pdk";
import { DateOfBirthComponent } from "../../../shared/date-of-birth/date-of-birth.component";
import { DefendantNamePipe } from '../../../shared/pipes/defendant-name/defendant-name.pipe';
import { FormatAddressPipe } from '../../../shared/pipes/format-address/format-address.pipe';
import { IfEmptyPipe } from '../../../shared/pipes/if-empty/if-empty.pipe';

@Component({
    selector: 'defendant-details-person',
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
          {{ personDetails | defendantName: false }}
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
          <date-of-birth [dateOfBirth]="personDetails.dateOfBirth"></date-of-birth>
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
          {{ personDetails.address | formatAddress: '\\n' }}
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
          {{ personDetails.contactDetails?.email | ifEmpty: '–' }}
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
          {{ personDetails.contactDetails?.home | ifEmpty: '–' }}
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
          {{ personDetails.contactDetails?.mobile | ifEmpty: '–' }}
        </div>
      </pdk-grid>
    </pdk-grid>

    <pdk-grid container>
      <pdk-grid one-third>
        <div pdk-padding-vertical="2">
          <b>National Insurance number</b>
        </div>
      </pdk-grid>
      <pdk-grid two-thirds>
        <div pdk-padding-vertical="2">
          {{ personDetails.nationalInsuranceNumber | ifEmpty: '–' }}
        </div>
      </pdk-grid>
    </pdk-grid>

    <pdk-grid container>
      <pdk-grid one-third>
        <div pdk-padding-vertical="2">
          <b>Driver licence number</b>
        </div>
      </pdk-grid>
      <pdk-grid two-thirds>
        <div pdk-padding-vertical="2" data-role="defendant-driver-number">
          {{ personDetails.driverNumber | ifEmpty: '–' }}
        </div>
      </pdk-grid>
    </pdk-grid>
  `,
    imports: [PdkCore, PdkGrid, DateOfBirthComponent, DefendantNamePipe, FormatAddressPipe, IfEmptyPipe]
})
export class DefendantDetailsPersonComponent {
  @Input() personDetails?: PersonalDetails;
}
