import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ApplicationDecision } from '../../../contexts/sjp';
import { PdkCore, PdkGridComponent } from "@cpp/pdk";
import { FormatDatePipe } from '../../../shared/pipes/format-date/format-date.pipe';

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
          @if (applicationDecision.applicationType === 'REOPENING') {
            <div data-role="reopening-details">
              Application to reopen case
              @if (applicationDecision.granted) {
                <p data-role="reopening-granted">
                  Case reopened under section 142 of the Magistrates' Courts Act 1980. Conviction and Sentence imposed on
                  {{ applicationDecision.previousFinalDecision | formatDate: 'd MMMM y' }} set aside.
                  @if (applicationDecision.outOfTimeReason) {
                    Service accepted outside 21 day limit. Reasons: {{ applicationDecision.outOfTimeReason }}
                  }
                </p>
              }
            </div>
          }
          @if (applicationDecision.applicationType === 'STAT_DEC') {
            <div data-role="stat-dec-details">
              Appearance to make statutory declaration (SJP case)
              @if (applicationDecision.granted) {
                <p data-role="stat-dec-granted">
                  Statutory declaration made under section 16E of the Magistrates' Courts Act 1980.
                  @if (applicationDecision.outOfTimeReason) {
                    Service accepted outside 21 day limit. Reasons: {{ applicationDecision.outOfTimeReason }}
                  }
                </p>
              }
            </div>
          }
          @if (applicationDecision.rejectionReason) {
            <p data-role="application-rejected">
              Refused: {{ applicationDecision.rejectionReason }}
            </p>
          }
        </div>
      </pdk-grid>
    </pdk-grid>
    `,
    imports: [PdkGridComponent, FormatDatePipe, PdkCore]
})
export class ApplicationDecisionDetailsComponent {
  @Input() applicationDecision: ApplicationDecision;
}
