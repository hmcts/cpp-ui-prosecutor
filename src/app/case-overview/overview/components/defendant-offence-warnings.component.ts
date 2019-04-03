import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Offence } from '../../../contexts/sjp';

@Component({
  selector: 'defendant-offence-warnings',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <offence-warning *ngIf="offence.outOfTime">
      Offence is out of time
    </offence-warning>
    <offence-warning *ngIf="offence.notInEffect">
      Offence not in effect - refer to court and see SJPN for offence details
    </offence-warning>
    <offence-warning *ngIf="offence.imprisonable">
      Imprisonable offence
    </offence-warning>
  `
})
export class DefendantOffenceWarningsComponent {
  @Input() offence: Offence;
}
