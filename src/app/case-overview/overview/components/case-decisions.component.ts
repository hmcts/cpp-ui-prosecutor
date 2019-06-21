import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CaseDecision } from '../../../contexts/sjp';

@Component({
  selector: 'case-decisions',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <pdk-grid container>
      <div pdk-margin-left="2" pdk-margin-bottom="3">
        <b pdk-typography="heading-medium">Court decision</b>
      </div>
      <div *ngFor="let caseDecision of caseDecisionsWithOffenceDecisions.slice(0, 1)">
        <case-decisions-details [caseDecisionWithOffenceDecisions]="caseDecision"></case-decisions-details>
      </div>
      <ng-container *ngIf="caseDecisionsWithOffenceDecisions?.length > 1">
        <pdk-divider></pdk-divider>
        <div *ngFor="let caseDecision of caseDecisionsWithOffenceDecisions.slice(1); let last = last">
          <div pdk-margin-left="2" pdk-margin-bottom="3">
            <b pdk-typography="heading-medium" style="margin-top: 70px;">Previous court decisions</b>
          </div>
          <case-decisions-details [caseDecisionWithOffenceDecisions]="caseDecision"></case-decisions-details>
          <pdk-divider *ngIf="!last"></pdk-divider>
        </div>
      </ng-container>
    </pdk-grid>
  `
})
export class CaseDecisionsComponent {
  @Input() caseDecisionsWithOffenceDecisions: CaseDecision[];
}
