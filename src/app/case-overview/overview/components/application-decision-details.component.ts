import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ApplicationDecision } from 'src/app/contexts/sjp';

@Component({
  selector: 'application-decision-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <pdk-grid data-role="application-decision-details" container>
      <pdk-grid one-third>
        <div pdk-padding-vertical="2" pdk-margin-left="2">
          <b>Application</b>
        </div>
      </pdk-grid>
      <pdk-grid two-thirds>
        <div pdk-padding-vertical="2">
          <div data-role="reopening-details" *ngIf="applicationDecision.applicationType === 'REOPENING'">
            Application to reopen case
            <p data-role="reopening-granted" *ngIf="applicationDecision.granted">
              Case reopened under section 142 of the Magistrates' Courts Act 1980. Conviction and Sentence imposed on
              {{ applicationDecision.previousFinalDecision | formatDate: 'd MMMM y' }} set aside.

              <ng-container *ngIf="applicationDecision.outOfTimeReason">
                Service accepted outside 21 day limit. Reasons: {{ applicationDecision.outOfTimeReason }}
              </ng-container>
            </p>
          </div>
          <div data-role="stat-dec-details" *ngIf="applicationDecision.applicationType === 'STAT_DEC'">
            Appearance to make statutory declaration (SJP case)
            <p data-role="stat-dec-granted" *ngIf="applicationDecision.granted">
              Statutory declaration made under section 16E of the Magistrates' Courts Act 1980.
              <ng-container *ngIf="applicationDecision.outOfTimeReason">
                Service accepted outside 21 day limit. Reasons: {{ applicationDecision.outOfTimeReason }}
              </ng-container>
            </p>
          </div>
          <p data-role="application-rejected" *ngIf="applicationDecision.rejectionReason">
            Refused: {{ applicationDecision.rejectionReason }}
          </p>
        </div>
      </pdk-grid>
    </pdk-grid>
  `
})
export class ApplicationDecisionDetailsComponent {
  @Input() applicationDecision: ApplicationDecision;
}
