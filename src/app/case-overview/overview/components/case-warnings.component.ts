import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Defendant, Offence } from '../../../contexts/sjp';
import { isUnderAge } from '../../../contexts/sjp/util/sjp-util';
import { PdkWarningTextComponent } from "@cpp/pdk";

@Component({
    selector: 'case-warnings',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    @if (isUnderAge) {
      <pdk-warning-text [error]="true">
        Defendant under 18 at date of charge
      </pdk-warning-text>
    }
    @if (isOffenceOutOfTime) {
      <pdk-warning-text [error]="true" >
        Offence may be out of time
      </pdk-warning-text>
    }
    @if (isOffenceNotInEffect) {
      <pdk-warning-text [error]="true" >
        Offence not in effect - refer to court and see SJPN for offence details
      </pdk-warning-text>
    }
    @if (isImprisonable) {
      <pdk-warning-text [error]="true" >
        Imprisonable offence
      </pdk-warning-text>
    }
    @if (isNonSummaryOffence) {
      <pdk-warning-text [error]="true" >
        Case includes non summary offence
      </pdk-warning-text>
    }
    `,
    imports: [PdkWarningTextComponent]
})
export class CaseWarningsComponent {
  @Input() offences: Offence[];
  @Input() defendant: Defendant;

  get isUnderAge(): boolean {
    return (
      !!this.defendant.personalDetails &&
      isUnderAge(this.offences[0].chargeDate, this.defendant.personalDetails.dateOfBirth)
    );
  }

  get isOffenceOutOfTime() {
    return this.offences.some(({ outOfTime }) => !!outOfTime);
  }

  get isOffenceNotInEffect() {
    return this.offences.some(({ notInEffect }) => !!notInEffect);
  }

  get isImprisonable() {
    return this.offences.some(({ imprisonable }) => !!imprisonable);
  }

  get isNonSummaryOffence() {
    return this.offences.some(({ isNonSummaryOffence }) => !!isNonSummaryOffence);
  }
}
