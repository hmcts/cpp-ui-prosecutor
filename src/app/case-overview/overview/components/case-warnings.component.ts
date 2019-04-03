import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Defendant, Offence } from '../../../contexts/sjp';
import { isUnderAge } from '../../../contexts/sjp/util/sjp-util';

@Component({
  selector: 'case-warnings',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <pdk-warning-text error *ngIf="isUnderAge">
      Defendant under 18 at date of charge
    </pdk-warning-text>
    <pdk-warning-text error *ngIf="isOffenceOutOfTime">
      Offence is out of time
    </pdk-warning-text>
    <pdk-warning-text error *ngIf="isOffenceNotInEffect">
      Offence not in effect - refer to court and see SJPN for offence details
    </pdk-warning-text>
    <pdk-warning-text error *ngIf="isImprisonable">
      Imprisonable offence
    </pdk-warning-text>
  `
})
export class CaseWarningsComponent {
  @Input() offences: Offence[];
  @Input() defendant: Defendant;

  get isUnderAge() {
    return isUnderAge(this.offences[0].chargeDate, this.defendant.personalDetails.dateOfBirth);
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
}
