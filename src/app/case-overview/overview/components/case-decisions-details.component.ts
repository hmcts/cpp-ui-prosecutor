import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CaseDecision, OffenceDecision } from '../../../contexts/sjp';

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
            <div *ngIf="caseDecisionWithOffenceDecisions.session.magistrate">
              Magistrate: {{ caseDecisionWithOffenceDecisions.session.magistrate }}
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
      [attr.data-role]="'offence-decision-container-' + offenceDecision.offenceId"
    >
      <pdk-grid container pdk-padding-horizontal="2">
        <pdk-grid one-third>
          <div>
            <b>Offence {{ offenceDecision.offenceSequenceNumber }} </b>
          </div>
        </pdk-grid>
        <pdk-grid two-thirds pdk-padding-bottom="2">
          {{ offenceDecision.offenceTitle }}
          <p *ngIf="offenceDecision.verdict && offenceDecision.verdict !== 'NO_VERDICT'">
            {{ offenceDecision.verdict | verdictType }}
          </p>
          <financial-offence-decision
            *ngIf="isFinancial(offenceDecision); else nonFinancial"
            [offenceDecision]="offenceDecision"
          >
          </financial-offence-decision>
          <ng-template #nonFinancial>
            <p data-role="offence-decision">{{ offenceDecision | savedDecisionInformation }}</p>
            <refer-to-open-court-offence-decision
              *ngIf="offenceDecision.decisionType === 'REFERRED_TO_OPEN_COURT'"
              [offenceDecision]="offenceDecision"
            >
            </refer-to-open-court-offence-decision>
            <no-separate-penalty-offence-decision
              *ngIf="offenceDecision.decisionType === 'NO_SEPARATE_PENALTY'"
              [offenceDecision]="offenceDecision"
            >
            </no-separate-penalty-offence-decision>
          </ng-template>
        </pdk-grid>
        <!-- START Press restriction -->
        <div *ngIf="offenceDecision.pressRestriction" data-role="press-restrictions">
          <pdk-grid one-third>
            <div>
              <p><b>Reporting restrictions</b></p>
            </div>
          </pdk-grid>
          <pdk-grid two-thirds>
            <ng-container *ngIf="offenceDecision.pressRestriction.requested">
              <p data-role="reporting-restriction">
                Direction made under section 45 Youth Justice and Criminal Evidence Act 1999, in respect of
                {{ offenceDecision.pressRestriction.name }}
              </p>
            </ng-container>
            <ng-container *ngIf="!offenceDecision.pressRestriction.requested">
              <p data-role="reporting-restriction">
                Direction restricting publicity revoked
              </p>
            </ng-container>
          </pdk-grid>
        </div>
        <!-- END Press restriction -->
      </pdk-grid>
      <pdk-divider *ngIf="!last"></pdk-divider>
    </div>
    <div *ngIf="caseDecisionWithOffenceDecisions.financialImposition">
      <pdk-divider></pdk-divider>
      <financial-impositions [caseDecision]="caseDecisionWithOffenceDecisions"></financial-impositions>
      <pdk-divider></pdk-divider>
      <payment-and-collection [caseDecision]="caseDecisionWithOffenceDecisions"></payment-and-collection>
    </div>
  `
})
export class CaseDecisionsDetailsComponent {
  @Input() caseDecisionWithOffenceDecisions: CaseDecision;

  isFinancial(offenceDecision: OffenceDecision): boolean {
    return offenceDecision.decisionType === 'FINANCIAL_PENALTY' || offenceDecision.decisionType === 'DISCHARGE';
  }
}
