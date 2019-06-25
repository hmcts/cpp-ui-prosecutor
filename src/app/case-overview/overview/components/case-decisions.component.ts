import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CaseDecision } from '../../../contexts/sjp';

@Component({
  selector: 'case-decisions',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <pdk-grid container>
      <div>
        <pdk-grid container>
          <pdk-grid one-third>
            <div pdk-padding-vertical="2" pdk-margin-left="2">
              <b>Decisions made</b>
            </div>
          </pdk-grid>
          <pdk-grid two-thirds>
            <div pdk-padding-vertical="2">
              <div *ngIf="caseDecision.savedAt">
                {{ caseDecision.savedAt | formatDate: 'd MMM y' }}
              </div>
              <div *ngIf="caseDecision.savedAt">
                {{ caseDecision.savedAt | formatDate: 'hh:mm:ss a' }}
              </div>
              <div class="pre-line">&nbsp;</div>
              <div *ngIf="caseDecision.session.legalAdviser">
                Legal Adviser: {{ caseDecision.session.legalAdviser | firstLastName: false:false }}
              </div>
              <div *ngIf="caseDecision.session.courtHouseName" pdk-text-colour="grey-1">
                {{ caseDecision.session.courtHouseName }}
              </div>
            </div>
          </pdk-grid>
        </pdk-grid>
        <pdk-divider></pdk-divider>
      </div>
      <div *ngFor="let offenceDecision of caseDecision.offenceDecisions; let idx = index; let last = last">
        <pdk-grid container>
          <pdk-grid one-third>
            <div pdk-margin-left="2">
              <b>Offence {{ idx + 1 }} </b>
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
    </pdk-grid>
  `
})
export class CaseDecisionsComponent {
  @Input()
  caseDecision: CaseDecision;
}
