import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LegalEntityDetails } from '../../../contexts/sjp';

@Component({
  selector: 'defendant-details-legal-entity',
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
            {{ legalEntityDetails | defendantName: false }}
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
            {{ legalEntityDetails.address | formatAddress: '\\n' }}
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
            {{ legalEntityDetails.contactDetails?.email | ifEmpty: '–' }}
          </div>
        </pdk-grid>
      </pdk-grid>

      <pdk-grid container>
        <pdk-grid one-third>
          <div pdk-padding-vertical="2">
            <b>Telephone</b>
          </div>
        </pdk-grid>
        <pdk-grid two-thirds>
          <div pdk-padding-vertical="2">
            {{ legalEntityDetails.contactDetails?.home | ifEmpty: '–' }}
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
            {{ legalEntityDetails.contactDetails?.mobile | ifEmpty: '–' }}
          </div>
        </pdk-grid>
      </pdk-grid>
  `
})
export class DefendantDetailsLegalEntityComponent {
  @Input() legalEntityDetails: LegalEntityDetails;
}
