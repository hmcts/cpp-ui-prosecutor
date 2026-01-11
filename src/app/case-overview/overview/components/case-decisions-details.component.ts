import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  CaseDecision,
  DischargeOffenceDecision,
  FinancialPenaltyOffenceDecision,
  NoSeparatePenaltyOffenceDecision,
  OffenceDecision,
  ReferredToOpenCourtOffenceDecision
} from '../../../contexts/sjp';
import { PdkDividerComponent, PdkCore, PdkGrid } from '@cpp/pdk';
import { ApplicationDecisionDetailsComponent } from './application-decision-details.component';
import { FinancialOffenceDecisionComponent } from './financial-offence-decision.component';
import { FinancialImpositionsComponent } from './financial-impositions.component';
import { FormatDatePipe } from '../../../shared/pipes/format-date/format-date.pipe';
import { PaymentAndCollectionComponent } from './payment-and-collection.component';
import { FirstLastNamePipe } from '../../../shared/pipes/first-last-name/first-last-name.pipe';
import { ReferredToOpenCourtOffenceDecisionComponent } from './referred-open-court-offence-decision.component';
import { NoSeparatePenaltyOffenceDecisionComponent } from './no-separate-penalty-decision.component';
import { VerdictTypePipe } from '../../../shared/pipes/verdict-type/verdict-type.pipe';
import { SavedDecisionInformationPipe } from '../../../shared/pipes/saved-decision-information/saved-decision-information.pipe';

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
            @if (caseDecisionWithOffenceDecisions.session.legalAdviser) {
            <div>
              Legal Adviser: {{ caseDecisionWithOffenceDecisions.session.legalAdviser | firstLastName: false:false }}
            </div>
            } @if (caseDecisionWithOffenceDecisions.session.magistrate) {
            <div>Magistrate: {{ caseDecisionWithOffenceDecisions.session.magistrate }}</div>
            } @if (caseDecisionWithOffenceDecisions.session.courtHouseName) {
            <div pdk-text-colour="dark-grey">
              {{ caseDecisionWithOffenceDecisions.session.courtHouseName }}
            </div>
            }
          </div>
        </pdk-grid>
      </pdk-grid>
      @if (!!caseDecisionWithOffenceDecisions.applicationDecision) {
      <application-decision-details
        [applicationDecision]="caseDecisionWithOffenceDecisions.applicationDecision"
      ></application-decision-details>
      } @else {
      <pdk-divider></pdk-divider>
      }
    </div>
    @for (offenceDecision of caseDecisionWithOffenceDecisions.offenceDecisions; track offenceDecision.id; let idx =
    $index; let last = $last) {
    <div [attr.data-role]="'offence-decision-container-' + offenceDecision.offenceId">
      <pdk-grid container pdk-padding-horizontal="2">
        <pdk-grid one-third>
          <div>
            <b>Offence {{ offenceDecision.offenceSequenceNumber }} </b>
          </div>
        </pdk-grid>
        <pdk-grid two-thirds pdk-padding-bottom="2">
          {{ offenceDecision.offenceTitle }}
          @if (offenceDecision.verdict && offenceDecision.verdict !== 'NO_VERDICT') {
          <p>
            {{ offenceDecision.verdict | verdictType }}
          </p>
          } @if (isFinancial(offenceDecision)) {
          <financial-offence-decision [offenceDecision]="offenceDecision"> </financial-offence-decision>
          } @else {
          <p data-role="offence-decision">{{ offenceDecision | savedDecisionInformation }}</p>
          @if (isReferredToOpenCourt(offenceDecision)) {
          <refer-to-open-court-offence-decision [offenceDecision]="offenceDecision">
          </refer-to-open-court-offence-decision>
          } @if (isNoSeparatePenalty(offenceDecision)) {
          <no-separate-penalty-offence-decision [offenceDecision]="offenceDecision">
          </no-separate-penalty-offence-decision>
          } }
        </pdk-grid>
        <!-- START Press restriction -->
        @if (offenceDecision.pressRestriction) {
        <div data-role="press-restrictions">
          <pdk-grid one-third>
            <div>
              <p><b>Reporting restrictions</b></p>
            </div>
          </pdk-grid>
          <pdk-grid two-thirds>
            @if (offenceDecision.pressRestriction.requested) {
            <p data-role="reporting-restriction">
              Direction made under section 45 Youth Justice and Criminal Evidence Act 1999, in respect of
              {{ offenceDecision.pressRestriction.name }}
            </p>
            } @if (!offenceDecision.pressRestriction.requested) {
            <p data-role="reporting-restriction">
              Direction restricting publicity revoked
            </p>
            }
          </pdk-grid>
        </div>
        }
        <!-- END Press restriction -->
      </pdk-grid>
      @if (!last) {
      <pdk-divider></pdk-divider>
      }
    </div>
    } @if (caseDecisionWithOffenceDecisions.financialImposition) {
    <div>
      <pdk-divider></pdk-divider>
      <financial-impositions [caseDecision]="caseDecisionWithOffenceDecisions"></financial-impositions>
      <pdk-divider></pdk-divider>
      <payment-and-collection [caseDecision]="caseDecisionWithOffenceDecisions"></payment-and-collection>
    </div>
    }
  `,
  imports: [
    PdkCore,
    PdkGrid,
    ApplicationDecisionDetailsComponent,
    PdkDividerComponent,
    FinancialOffenceDecisionComponent,
    FinancialImpositionsComponent,
    FormatDatePipe,
    PaymentAndCollectionComponent,
    FirstLastNamePipe,
    ReferredToOpenCourtOffenceDecisionComponent,
    NoSeparatePenaltyOffenceDecisionComponent,
    VerdictTypePipe,
    SavedDecisionInformationPipe
  ]
})
export class CaseDecisionsDetailsComponent {
  @Input() caseDecisionWithOffenceDecisions: CaseDecision;

  isFinancial(
    offenceDecision: OffenceDecision
  ): offenceDecision is FinancialPenaltyOffenceDecision | DischargeOffenceDecision {
    return offenceDecision.decisionType === 'FINANCIAL_PENALTY' || offenceDecision.decisionType === 'DISCHARGE';
  }
  isReferredToOpenCourt(decision: OffenceDecision): decision is ReferredToOpenCourtOffenceDecision {
    return decision.decisionType === 'REFERRED_TO_OPEN_COURT';
  }

  isNoSeparatePenalty(decision: OffenceDecision): decision is NoSeparatePenaltyOffenceDecision {
    return decision.decisionType === 'NO_SEPARATE_PENALTY';
  }
}
