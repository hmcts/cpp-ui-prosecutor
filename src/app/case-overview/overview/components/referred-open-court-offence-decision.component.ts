import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ReferredToOpenCourtOffenceDecision } from 'src/app/contexts/sjp';

@Component({
    selector: 'refer-to-open-court-offence-decision',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
      <div>
        <p>
          Summons issued for hearing before {{ offenceDecision.referredToCourt}}
          <ng-container *ngIf="offenceDecision.referredToRoom != undefined">
          (Room {{ offenceDecision.referredToRoom }})
          </ng-container>
          on {{ offenceDecision.referredToDateTime | formatDate :'d MMM y' }} at
          {{ offenceDecision.magistratesCourt }} at
          {{ offenceDecision.referredToDateTime | formatDate :'h:mmaa' }}
        </p>
        <p>Reason: {{ offenceDecision.reason}}</p>
      </div>
    `
  })
  export class ReferredToOpenCourtOffenceDecisionComponent {

    @Input() offenceDecision: ReferredToOpenCourtOffenceDecision;
  }
