import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CaseDecision } from '../../../contexts/sjp';

@Component({
  selector: 'case-decisions-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <pdk-grid container>
        <pdk-grid one-third>
          <div pdk-padding-vertical="2" pdk-margin-left="2">
            <b>Decision made</b>
          </div>
        </pdk-grid>
        <pdk-grid two-thirds>
          <div pdk-padding-vertical="2">
            <div>
              {{ caseDecisionWithOffenceDecisions.savedAt | formatDate: 'd MMMM y' }}
            </div>
            <div>
              {{ caseDecisionWithOffenceDecisions.savedAt | formatDate: 'h:mma' }}
            </div>
            <div class="pre-line">&nbsp;</div>
            <div *ngIf="caseDecisionWithOffenceDecisions.session.legalAdviser">
              Legal Adviser: {{ caseDecisionWithOffenceDecisions.session.legalAdviser | firstLastName: false:false }}
            </div>
            <div *ngIf="caseDecisionWithOffenceDecisions.session.courtHouseName" pdk-text-colour="grey-1">
              {{ caseDecisionWithOffenceDecisions.session.courtHouseName }}
            </div>
          </div>
        </pdk-grid>
      </pdk-grid>
      <pdk-divider></pdk-divider>
    </div>
    <div
      *ngFor="
        let offenceDecision of caseDecisionWithOffenceDecisions.offenceDecisions;
        let idx = index;
        let last = last
      "
    >
      <pdk-grid container>
        <pdk-grid one-third>
          <div pdk-margin-left="2">
            <b>Offence {{ offenceDecision.offenceSequenceNumber }} </b>
          </div>
        </pdk-grid>
        <pdk-grid two-thirds>
          {{ offenceDecision.offenceTitle }}
          <p *ngIf="offenceDecision.verdict != 'NO_VERDICT'">{{ offenceDecision.verdict | verdictType }}</p>
          <p data-role="offence-decision">{{ offenceDecision | savedDecisionInformation }}</p>
        </pdk-grid>
      </pdk-grid>
      <pdk-divider *ngIf="!last"></pdk-divider>
    </div>
  `
})
export class CaseDecisionsDetailsComponent {
  @Input() caseDecisionWithOffenceDecisions: CaseDecision;
}
