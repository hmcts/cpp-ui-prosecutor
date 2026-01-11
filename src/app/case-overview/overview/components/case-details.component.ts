import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Case } from '../../../contexts/sjp';
import { PdkCore, PdkGrid } from "@cpp/pdk";
import { IfEmptyPipe } from '../../../shared/pipes/if-empty/if-empty.pipe';
import { CaseStatusPipe } from '../../../shared/pipes/case-status/case-status.pipe';
import { ApplicationStatusPipe } from '../../../shared/pipes/application-status/application-status.pipe';
import { DatePipe } from '@angular/common';

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
      @if (kase.reopenedDate) {
        <pdk-grid two-thirds>
          <div pdk-padding-vertical="2" pdk-typography="body-medium">
            Reopened {{ kase.reopenedDate | date: 'd MMM y' }}<br />
            Libra account no: {{ kase.libraCaseNumber }}<br />
            Reason: {{ kase.reopenedInLibraReason }} <br />
          </div>
        </pdk-grid>
      } @else {
        <pdk-grid two-thirds>
          <div pdk-padding-vertical="2" data-role="case-status">
            {{ kase.status | caseStatus }}
            @if (kase.listedInCriminalCourts) {
              <div pdk-typography="body-xsmall">
                {{ kase.hearingCourtName }}
                {{ kase.hearingTime | date:'d MMM yyyy \\'at\\' h:mm a' | ifEmpty: '–' }}<br />
                Summons issued
              </div>
            }
            @if (kase.status === 'REFERRED_FOR_COURT_HEARING' && !kase.listedInCriminalCourts) {
              <div
                pdk-typography="body-xsmall"
                >
                Awaiting Listing
              </div>
            }
          </div>
        </pdk-grid>
      }
    
    </pdk-grid>
    
    @if (!!kase.ccApplicationStatus) {
      <pdk-grid container>
        <pdk-grid one-third>
          <div pdk-padding-vertical="2">
            <b>CC Application Status</b>
          </div>
        </pdk-grid>
        <pdk-grid two-thirds>
          <div pdk-padding-vertical="2" data-role="cc-application-status">
            {{ kase.ccApplicationStatus | applicationStatus }}
          </div>
        </pdk-grid>
      </pdk-grid>
    }
    
    @if (!!kase.caseApplication) {
      <pdk-grid container>
        <pdk-grid one-third>
          <div pdk-padding-vertical="2">
            <b>Date application received</b>
          </div>
        </pdk-grid>
        <pdk-grid two-thirds>
          <div pdk-padding-vertical="2" data-role="prosecutor">
            {{ kase.caseApplication.dateReceived | date: 'd MMM y' | ifEmpty: '–' }}
          </div>
        </pdk-grid>
      </pdk-grid>
    }
    
    @if (!!kase.caseApplication) {
      <pdk-grid container>
        <pdk-grid one-third>
          <div pdk-padding-vertical="2">
            <b>Application status</b>
          </div>
        </pdk-grid>
        <pdk-grid two-thirds>
          <div pdk-padding-vertical="2" data-role="prosecutor">
            {{ kase.caseApplication.applicationStatus | applicationStatus }}
          </div>
        </pdk-grid>
      </pdk-grid>
    }
    
    <pdk-grid container>
      <pdk-grid one-third>
        <div pdk-padding-vertical="2">
          <b>Prosecutor</b>
        </div>
      </pdk-grid>
      <pdk-grid two-thirds>
        <div pdk-padding-vertical="2" data-role="prosecutor">
          {{ kase.prosecutingAuthorityName }}
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
    `,
    imports: [PdkCore, PdkGrid, IfEmptyPipe, CaseStatusPipe, ApplicationStatusPipe, DatePipe]
})
export class CaseDetailsComponent {
  @Input() kase: Case;
}
