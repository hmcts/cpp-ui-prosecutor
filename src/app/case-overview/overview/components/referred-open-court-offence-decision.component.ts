import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ReferredToOpenCourtOffenceDecision } from '../../../contexts/sjp';
import { FormatDatePipe } from '../../../shared/pipes/format-date/format-date.pipe';

@Component({
    selector: 'refer-to-open-court-offence-decision',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div>
      <p>
        Summons issued for hearing before {{ offenceDecision.referredToCourt }}
        @if (offenceDecision.referredToRoom !== undefined) {
          (Room {{ offenceDecision.referredToRoom }})
        }
        on {{ offenceDecision.referredToDateTime | formatDate: 'd MMM y' }} at {{ offenceDecision.magistratesCourt }} at
        {{ offenceDecision.referredToDateTime | formatDate: 'h:mmaa' }}
      </p>
      <p>Reason: {{ offenceDecision.reason }}</p>
    </div>
    `,
    imports: [FormatDatePipe]
})
export class ReferredToOpenCourtOffenceDecisionComponent {
  @Input() offenceDecision: ReferredToOpenCourtOffenceDecision;
}
