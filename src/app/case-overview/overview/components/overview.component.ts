import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Case, CaseDecision, Defendant, Offence, OffenceDecision } from '../../../contexts/sjp';

@Component({
  selector: 'case-overview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ol pdk-breadcrumb-list pdk-margin-top="4">
      <li pdk-breadcrumb-list-item>
        <a href="javascript: void(0)" routerLink="../../../" pdk-breadcrumb>Home</a>
      </li>
      <li pdk-breadcrumb-list-item>
        <a href="javascript: void(0)" routerLink="../../search" pdk-breadcrumb>
          Search for a case
        </a>
      </li>
      <li pdk-breadcrumb-list-item>
        Case details
      </li>
    </ol>
    <case-header-badge-container></case-header-badge-container>
    <case-submission-messages
      [kase]="kase"
      [displayOffencesWithdrawnBanner]="displayOffencesWithdrawnBanner"
      [displayDatesToAvoidUpdateFailedBanner]="displayDatesToAvoidUpdateFailedBanner"
    >
    </case-submission-messages>
    <pdk-grid container>
      <pdk-grid two-thirds>
        <h1 pdk-typography="heading-xlarge" pdk-margin-vertical="4">
          {{ defendant.personalDetails | defendantName: false }}
        </h1>

        <p pdk-typography="body-medium">
          {{ defendant.personalDetails.dateOfBirth | formatDate: 'd MMM y' }}
          ({{ defendant.personalDetails.dateOfBirth | age }} years old)<br />
          {{ defendant.personalDetails.address | formatAddress: ', ' }}
        </p>

        <personal-details-change-alert [personalDetails]="defendant.personalDetails"></personal-details-change-alert>

        <case-warnings [offences]="offences" [defendant]="defendant"></case-warnings>

        <div pdk-margin-vertical="8">
          <pdk-tabs>
            <pdk-tab heading="Case details">
              <case-details [kase]="kase"></case-details>
            </pdk-tab>
            <pdk-tab heading="Defendant details">
              <defendant-details [defendantDetails]="defendant.personalDetails"></defendant-details>
            </pdk-tab>
            <pdk-tab heading="Documents" *ngIf="kase.caseDocuments?.length">
              <document-list [caseId]="kase.id" [documents]="kase.caseDocuments"></document-list>
            </pdk-tab>
          </pdk-tabs>
        </div>
      </pdk-grid>
      <pdk-grid one-third *ngIf="!kase.assigned && !kase.completed">
        <div pdk-margin-top="5">
          <pdk-related>
            <h1 pdk-typography="heading-medium" pdk-margin-vertical="1">Case options</h1>
            <div>
              <a href="javascript: void(0)" pdk-link pdk-section="small" routerLink="withdraw-offence"
                >Manage offence withdrawals</a
              >
            </div>
            <div>
              <a href="javascript: void(0)" pdk-link pdk-section="small" routerLink="dates-to-avoid">
                <span *ngIf="!this.kase.datesToAvoid">Add dates to avoid</span>
                <span *ngIf="!!this.kase.datesToAvoid">Change dates to avoid</span>
              </a>
            </div>
          </pdk-related>
        </div>
      </pdk-grid>
    </pdk-grid>
    <pdk-grid container>
      <pdk-grid two-thirds>
        <div pdk-margin-vertical="8" *ngFor="let offence of offences; let i = index; let last = last">
          <defendant-offence [index]="offences.length > 1 ? i + 1 : 0" [offence]="offence" [kase]="kase">
          </defendant-offence>
          <statement-of-facts *ngIf="offence.prosecutionFacts" [statementOfFacts]="offence.prosecutionFacts">
          </statement-of-facts>
          <plea-mitigation *ngIf="offence.pleaMitigation" [pleaMitigation]="offence.pleaMitigation"></plea-mitigation>
          <pdk-divider *ngIf="!last"></pdk-divider>
        </div>
      </pdk-grid>
    </pdk-grid>

    <div pdk-margin-top="5" pdk-margin-bottom="0">
      <pdk-grid container>
        <pdk-grid two-thirds>
          <pdk-tabs>
            <pdk-tab heading="Decisions" ng-if="caseDecisions?.length">
              <case-decisions [caseDecisionsWithOffenceDecisions]="caseDecisions"></case-decisions>
            </pdk-tab>
          </pdk-tabs>
        </pdk-grid>
      </pdk-grid>
    </div>
  `
})
export class OverviewComponent {
  @Input() kase: Case;
  @Input() defendant: Defendant;
  @Input() offences: Offence[];
  @Input() displayOffencesWithdrawnBanner: boolean;
  @Input() displayDatesToAvoidUpdateFailedBanner: boolean;
  @Input() caseDecisions: CaseDecision[];
}
