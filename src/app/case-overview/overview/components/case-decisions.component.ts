import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CaseDecision } from '../../../contexts/sjp';
import { PdkDividerComponent, PdkCore, PdkGrid } from '@cpp/pdk';
import { CaseDecisionsDetailsComponent } from './case-decisions-details.component';

@Component({
  selector: 'case-decisions',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <pdk-grid container>
      <div pdk-margin-left="2" pdk-margin-bottom="3">
        <b pdk-typography="heading-medium">Court decision</b>
      </div>
      @for (caseDecision of caseDecisionsWithOffenceDecisions.slice(0, 1); track caseDecision.id) {
      <div>
        <case-decisions-details [caseDecisionWithOffenceDecisions]="caseDecision"></case-decisions-details>
      </div>
      } @if (caseDecisionsWithOffenceDecisions?.length > 1) {
      <pdk-divider></pdk-divider>
      @for (caseDecision of caseDecisionsWithOffenceDecisions.slice(1); track caseDecision.id; let last = $last) {
      <div>
        <div pdk-margin-left="2" pdk-margin-bottom="3">
          <b pdk-typography="heading-medium" style="margin-top: 70px;">Previous court decisions</b>
        </div>
        <case-decisions-details [caseDecisionWithOffenceDecisions]="caseDecision"></case-decisions-details>
        @if (!last) {
        <pdk-divider></pdk-divider>
        }
      </div>
      } }
    </pdk-grid>
  `,
  imports: [PdkCore, PdkGrid, CaseDecisionsDetailsComponent, PdkDividerComponent]
})
export class CaseDecisionsComponent {
  @Input() caseDecisionsWithOffenceDecisions: CaseDecision[];
}
