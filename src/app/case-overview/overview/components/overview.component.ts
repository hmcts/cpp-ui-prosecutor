import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Case, CaseDecision, Defendant, Offence, CaseNotes } from '../../../contexts/sjp';
import { Breadcrumb } from '../../../shared/breadcrumb-links/breadcrumb-links.interface';
import { Breadcrumbs } from '../../../shared/breadcrumb-links/breadcrumb-links.constant';
import { CaseNotesComponent } from './case-notes.component';
import {
  PdkTabComponent,
  PdkTabsetComponent,
  PdkRelatedComponent,
  PdkDividerComponent,
  PdkGrid,
  PdkCore
} from '@cpp/pdk';
import { DefendantDetailsChangeNotificationBannerComponent } from './defendant-details-change-notification-banner.component';
import { BreadcrumbLinksComponent } from '../../../shared/breadcrumb-links/breadcrumb-links.component';
import { CaseHeaderBadgeContainer } from '../../common/case-header-badge/case-header-badge.container';
import { CaseSubmissionMessagesComponent } from './case-submission-messages.component';
import { DateOfBirthComponent } from '../../../shared/date-of-birth/date-of-birth.component';
import { CaseWarningsComponent } from './case-warnings.component';
import { CaseDetailsComponent } from './case-details.component';
import { DefendantDetailsPersonComponent } from './defendant-details-person.component';
import { DocumentListComponent } from './document-list.component';
import { DefendantOffenceComponent } from './defendant-offence.component';
import { StatementOfFactsComponent } from './statement-of-facts.component';
import { PleaMitigationComponent } from './plea-mitigation.component';
import { CaseDecisionsComponent } from './case-decisions.component';
import { DefendantDetailsLegalEntityComponent } from './defendant-details-legal-entity.component';
import { DefendantNamePipe } from '../../../shared/pipes/defendant-name/defendant-name.pipe';
import { FormatAddressPipe } from '../../../shared/pipes/format-address/format-address.pipe';
import { RouterLink } from '@angular/router';

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
        @if (!!defendant.personalDetails) {
        <div>
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
              @if (kase.caseDocuments?.length) {
              <pdk-tab heading="Documents">
                <document-list [caseId]="kase.id" [documents]="kase.caseDocuments"></document-list>
              </pdk-tab>
              }
            </pdk-tabs>
          </div>
        </div>
        } @else {
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
            @if (kase.caseDocuments?.length) {
            <pdk-tab heading="Documents">
              <document-list [caseId]="kase.id" [documents]="kase.caseDocuments"></document-list>
            </pdk-tab>
            }
          </pdk-tabs>
        </div>
        }
      </pdk-grid>
      @if (showSideBar) {
      <pdk-grid one-third>
        <div pdk-margin-top="5">
          <pdk-related>
            @if (!kase.assigned && !kase.completed) {
            <h1 pdk-typography="heading-medium" pdk-margin-vertical="1">Case options</h1>
            <div>
              <a href="javascript: void(0)" pdk-link pdk-section="small" routerLink="withdraw-offence"
                >Manage offence withdrawals</a
              >
            </div>
            <div>
              <a href="javascript: void(0)" pdk-link pdk-section="small" routerLink="dates-to-avoid">
                @if (!this.kase.datesToAvoid) {
                <span>Add dates to avoid</span>
                } @if (!!this.kase.datesToAvoid) {
                <span>Change dates to avoid</span>
                }
              </a>
            </div>
            } @if (kase.onlinePleaReceived || kase.defendantAcceptedAocp) {
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
            }
          </pdk-related>
        </div>
      </pdk-grid>
      }
    </pdk-grid>
    <pdk-grid container>
      <pdk-grid two-thirds>
        @for (offence of offences; track offence.id; let i = $index; let last = $last) {
        <div pdk-margin-vertical="8">
          <defendant-offence [index]="offences.length > 1 ? i + 1 : 0" [offence]="offence" [kase]="kase">
          </defendant-offence>
          @if (offence.prosecutionFacts) {
          <statement-of-facts [statementOfFacts]="offence.prosecutionFacts"> </statement-of-facts>
          } @if (offence.pleaMitigation) {
          <plea-mitigation [pleaMitigation]="offence.pleaMitigation"></plea-mitigation>
          } @if (!last) {
          <pdk-divider></pdk-divider>
          }
        </div>
        }
      </pdk-grid>
    </pdk-grid>

    @if (showInformationTabs) {
    <div pdk-margin-top="5" pdk-margin-bottom="0">
      <pdk-grid container>
        <pdk-grid two-thirds>
          <pdk-tabs (selectedTabChange)="tabChanged($event)">
            @if (showDecisionsTab) {
            <pdk-tab heading="Decisions" [selected]="showDecisionsTab">
              <case-decisions [caseDecisionsWithOffenceDecisions]="caseDecisions"></case-decisions>
            </pdk-tab>
            } @if (showNotesTab) {
            <pdk-tab heading="Notes" [selected]="!showDecisionsTab" data-locator="case-notes-tab">
              <case-notes [caseNotes]="caseNotes"></case-notes>
            </pdk-tab>
            }
          </pdk-tabs>
        </pdk-grid>
      </pdk-grid>
    </div>
    }
  `,
  imports: [
    PdkCore,
    PdkGrid,
    DefendantDetailsChangeNotificationBannerComponent,
    BreadcrumbLinksComponent,
    CaseHeaderBadgeContainer,
    CaseSubmissionMessagesComponent,
    DateOfBirthComponent,
    CaseWarningsComponent,
    PdkTabsetComponent,
    PdkTabComponent,
    CaseDetailsComponent,
    DefendantDetailsPersonComponent,
    DocumentListComponent,
    PdkRelatedComponent,
    DefendantOffenceComponent,
    StatementOfFactsComponent,
    PleaMitigationComponent,
    PdkDividerComponent,
    CaseDecisionsComponent,
    CaseNotesComponent,
    DefendantDetailsLegalEntityComponent,
    DefendantNamePipe,
    FormatAddressPipe,
    RouterLink
  ]
})
export class OverviewComponent implements OnInit {
  @Input() kase: Case;
  @Input() defendant: Defendant;
  @Input() offences: Offence[];
  @Input() displayOffencesWithdrawnBanner: boolean;
  @Input() displayDatesToAvoidUpdateFailedBanner: boolean;
  @Input() caseDecisions: CaseDecision[];
  @Input() caseNotes: CaseNotes;
  @ViewChild(CaseNotesComponent)
  caseNotesComponent: CaseNotesComponent;

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

  tabChanged(_: PdkTabComponent): void {
    this.caseNotesComponent?.changeRef.markForCheck();
  }
}
