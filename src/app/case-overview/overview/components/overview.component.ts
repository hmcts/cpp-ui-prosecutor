import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Case, CaseDecision, Defendant, Offence, CaseNotes } from '../../../contexts/sjp';
import { Breadcrumb } from '../../../shared/breadcrumb-links/breadcrumb-links.interface';
import { Breadcrumbs } from '../../../shared/breadcrumb-links/breadcrumb-links.constant';

@Component({
  selector: 'case-overview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <breadcrumb-links [breadcrumbs]="breadcrumbs"></breadcrumb-links>
    <case-header-badge-container></case-header-badge-container>
    <case-submission-messages
      [kase]="kase"
      [displayOffencesWithdrawnBanner]="displayOffencesWithdrawnBanner"
      [displayDatesToAvoidUpdateFailedBanner]="displayDatesToAvoidUpdateFailedBanner"
    >
    </case-submission-messages>
    <pdk-grid container>
      <pdk-grid two-thirds>
        <div *ngIf="!!defendant.personalDetails; else organisation">
          <h1 pdk-typography="heading-xlarge" pdk-margin-vertical="4">
            {{ defendant.personalDetails | defendantName: false }}
          </h1>

          <p pdk-typography="body-medium">
            <date-of-birth [dateOfBirth]="defendant.personalDetails.dateOfBirth" [defaultSubstitute]=""></date-of-birth>
            {{ defendant.personalDetails.address | formatAddress: ', ' }}
          </p>

          <defendant-details-change-notification-banner
            [personalDetails]="defendant.personalDetails"
            [defendantDetailUpdateRequest]="defendant.defendantDetailUpdateRequest"
          ></defendant-details-change-notification-banner>

          <case-warnings [offences]="offences" [defendant]="defendant"></case-warnings>

          <div pdk-margin-vertical="8">
            <pdk-tabs>
              <pdk-tab heading="Case details">
                <case-details [kase]="kase"></case-details>
              </pdk-tab>
              <pdk-tab heading="Defendant details">
                <defendant-details-person [personDetails]="defendant.personalDetails"></defendant-details-person>
              </pdk-tab>
              <pdk-tab heading="Documents" *ngIf="kase.caseDocuments?.length">
                <document-list [caseId]="kase.id" [documents]="kase.caseDocuments"></document-list>
              </pdk-tab>
            </pdk-tabs>
          </div>
        </div>
      </pdk-grid>
      <pdk-grid one-third *ngIf="showSideBar">
        <div pdk-margin-top="5">
          <pdk-related>
            <ng-container *ngIf="!kase.assigned && !kase.completed">
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
            </ng-container>
            <ng-container *ngIf="kase.onlinePleaReceived || kase.defendantAcceptedAocp">
              <h1 pdk-typography="heading-medium" pdk-margin-top="3" pdk-margin-bottom="1">Online plea</h1>
              <a
                href="javascript: void(0)"
                pdk-link
                pdk-section="small"
                [routerLink]="['online-plea-details']"
                data-role="online-plea-details"
              >
                Defendant's online plea
              </a>
            </ng-container>
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

    <div pdk-margin-top="5" pdk-margin-bottom="0" *ngIf="showInformationTabs">
      <pdk-grid container>
        <pdk-grid two-thirds>
          <pdk-tabs>
            <pdk-tab *ngIf="showDecisionsTab" heading="Decisions" [selected]="showDecisionsTab">
              <case-decisions [caseDecisionsWithOffenceDecisions]="caseDecisions"></case-decisions>
            </pdk-tab>
            <div *ngIf="showNotesTab">
              <pdk-tab heading="Notes" [selected]="!showDecisionsTab" data-locator="case-notes-tab">
                <case-notes [caseNotes]="caseNotes"></case-notes>
              </pdk-tab>
            </div>
          </pdk-tabs>
        </pdk-grid>
      </pdk-grid>
    </div>

    <ng-template #organisation>
      <h1 pdk-typography="heading-xlarge" pdk-margin-vertical="4">
        {{ defendant.legalEntityDetails | defendantName: false }}
      </h1>

      <p pdk-typography="body-medium">
        {{ defendant.legalEntityDetails.address | formatAddress: ', ' }}
      </p>

      <defendant-details-change-notification-banner
        [legalEntityDetails]="defendant.legalEntityDetails"
        [defendantDetailUpdateRequest]="defendant.defendantDetailUpdateRequest"
      ></defendant-details-change-notification-banner>

      <case-warnings [offences]="offences" [defendant]="defendant"></case-warnings>

      <div pdk-margin-vertical="8">
        <pdk-tabs>
          <pdk-tab heading="Case details">
            <case-details [kase]="kase"></case-details>
          </pdk-tab>
          <pdk-tab heading="Defendant details">
            <defendant-details-legal-entity
              [legalEntityDetails]="defendant.legalEntityDetails"
            ></defendant-details-legal-entity>
          </pdk-tab>
          <pdk-tab heading="Documents" *ngIf="kase.caseDocuments?.length">
            <document-list [caseId]="kase.id" [documents]="kase.caseDocuments"></document-list>
          </pdk-tab>
        </pdk-tabs>
      </div>
    </ng-template>
  `
})
export class OverviewComponent implements OnInit {
  @Input() kase: Case;
  @Input() defendant: Defendant;
  @Input() offences: Offence[];
  @Input() displayOffencesWithdrawnBanner: boolean;
  @Input() displayDatesToAvoidUpdateFailedBanner: boolean;
  @Input() caseDecisions: CaseDecision[];
  @Input() caseNotes: CaseNotes;

  breadcrumbs: Breadcrumb[] = [Breadcrumbs.HOME, Breadcrumbs.SEARCH, Breadcrumbs.CASE_OVERVIEW];
  showSideBar: boolean;

  get showInformationTabs(): boolean {
    return this.showNotesTab || this.showDecisionsTab;
  }

  get showDecisionsTab(): boolean {
    return this.caseDecisions && this.caseDecisions.length > 0;
  }

  get showNotesTab(): boolean {
    return this.caseNotes && this.caseNotes.notes && this.caseNotes.notes.length > 0;
  }

  ngOnInit(): void {
    this.showSideBar =
      (!this.kase.assigned && !this.kase.completed) || this.kase.onlinePleaReceived || this.kase.defendantAcceptedAocp;
  }
}
