import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Case, LegalEntityDetails, PersonalDetails } from '../../../contexts/sjp';

@Component({
  selector: 'case-header-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div pdk-margin-top="4">
      <pdk-page-header>
        <pdk-page-header-content reference="{{ kase.urn }}">
          <b>{{ defendantDetails | defendantName: false }}</b>
        </pdk-page-header-content>
      </pdk-page-header>
    </div>
  `
})
export class CaseHeaderBadgeComponent {
  @Input() kase: Case;

  get defendantDetails(): PersonalDetails | LegalEntityDetails {
    return !!this.kase.defendant.personalDetails
      ? this.kase.defendant.personalDetails
      : this.kase.defendant.legalEntityDetails;
  }
}
