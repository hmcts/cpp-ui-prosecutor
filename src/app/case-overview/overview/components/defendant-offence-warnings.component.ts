import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Offence } from '../../../contexts/sjp';
import { OffenceWarningComponent } from "../../common/offence-warning/offence-warning.component";

@Component({
    selector: 'defendant-offence-warnings',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    @if (offence.outOfTime) {
      <offence-warning>
        Offence may be out of time
      </offence-warning>
    }
    @if (offence.notInEffect) {
      <offence-warning>
        Offence not in effect - refer to court and see SJPN for offence details
      </offence-warning>
    }
    @if (offence.imprisonable) {
      <offence-warning>
        Imprisonable offence
      </offence-warning>
    }
    @if (offence?.isNonSummaryOffence) {
      <offence-warning>
        Case includes non summary offence
      </offence-warning>
    }
    `,
    imports: [OffenceWarningComponent]
})
export class DefendantOffenceWarningsComponent {
  @Input() offence: Offence;
}
