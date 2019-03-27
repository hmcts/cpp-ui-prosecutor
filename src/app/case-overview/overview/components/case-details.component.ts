import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Case } from '../../../contexts/sjp';

@Component({
  selector: 'case-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h4 pdk-typography="heading-medium">Case Details</h4>
    <pdk-grid container>
      <pdk-grid one-third>
        <div pdk-padding-vertical="2">
          <b>Case Status</b>
        </div>
      </pdk-grid>
      <ng-container *ngIf="kase.reopenedDate; else caseStatusSection">
        <pdk-grid two-thirds>
          <div pdk-padding-vertical="2" pdk-typography="body-medium">
            Reopened {{ kase.reopenedDate | date: 'd MMM y' }}<br />
            Libra account no: {{ kase.libraCaseNumber }}<br />
            Reason: {{ kase.reopenedInLibraReason }} <br />
          </div>
        </pdk-grid>
      </ng-container>

      <ng-template #caseStatusSection>
        <pdk-grid two-thirds>
          <div pdk-padding-vertical="2" data-role="case-status">
            {{ kase.status | caseStatus }}
            <div *ngIf="kase.listedInCriminalCourts" pdk-typography="body-xsmall">
              {{ kase.hearingCourtName }}
              {{ kase.hearingTime | date:'d MMM yyyy \\'at\\' h:mm a' | ifEmpty: '–' }}<br />
              Summons issued
            </div>
          </div>
        </pdk-grid>
      </ng-template>
    </pdk-grid>

    <pdk-grid container>
      <pdk-grid one-third>
        <div pdk-padding-vertical="2">
          <b>Prosecutor</b>
        </div>
      </pdk-grid>
      <pdk-grid two-thirds>
        <div pdk-padding-vertical="2" data-role="prosecutor">
          {{ kase.prosecutingAuthority | caseProsecutor }}
        </div>
      </pdk-grid>
    </pdk-grid>

    <pdk-grid container>
      <pdk-grid one-third>
        <div pdk-padding-vertical="2">
          <b>Notice served</b>
        </div>
      </pdk-grid>
      <pdk-grid two-thirds>
        <div pdk-padding-vertical="2">
          {{ kase.postingDate | date: 'd MMM y' | ifEmpty: '–' }}
        </div>
      </pdk-grid>
    </pdk-grid>

    <pdk-grid container>
      <pdk-grid one-third>
        <div pdk-padding-vertical="2">
          <b>Dates to avoid</b>
        </div>
      </pdk-grid>
      <pdk-grid two-thirds>
        <div pdk-padding-vertical="2">
          {{ kase.datesToAvoid | ifEmpty: '–' }}
        </div>
      </pdk-grid>
    </pdk-grid>
  `
})
export class CaseDetailsComponent {
  @Input() kase: Case;
}
