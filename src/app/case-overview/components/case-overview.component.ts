import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Case, Defendant, Offence } from '../../contexts/sjp';

@Component({
  selector: 'case-overview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ol pdk-breadcrumb-list pdk-margin-top="4">
      <li pdk-breadcrumb-list-item>
        <a href="javascript: void(0)" routerLink=".." pdk-breadcrumb>Home</a>
      </li>
      <li pdk-breadcrumb-list-item>
        <a href="javascript: void(0)" routerLink="/search" pdk-breadcrumb>
          Search for a case
        </a>
      </li>
      <li pdk-breadcrumb-list-item>
        Case Details
      </li>
    </ol>
    <div pdk-margin-vertical="4">
      <pdk-page-header>
        <pdk-page-header-content reference="{{ kase.urn }}">
          <b>{{ defendant.personalDetails | defendantName: false }}</b>
        </pdk-page-header-content>
      </pdk-page-header>
    </div>
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
        <div pdk-margin-vertical="8">
          <pdk-tabs>
            <pdk-tab heading="Case details">
              <case-details [kase]="kase"></case-details>
            </pdk-tab>
            <pdk-tab heading="Defendant details">
              <defendant-details [defendantDetails]="defendant.personalDetails"></defendant-details>
            </pdk-tab>
            <pdk-tab heading="Documents" *ngIf="kase.caseDocuments?.length">
              <document-list [documents]="kase.caseDocuments"></document-list>
            </pdk-tab>
          </pdk-tabs>
        </div>
      </pdk-grid>
      <pdk-grid one-third></pdk-grid>
    </pdk-grid>
    <div pdk-margin-vertical="8" *ngFor="let offence of offences; let i = index; let last = last">
      <defendant-offence [index]="offences.length > 1 ? i + 1 : 0" [offence]="offence" [kase]="kase">
      </defendant-offence>
      <statement-of-facts *ngIf="offence.prosecutionFacts" [statementOfFacts]="offence.prosecutionFacts">
      </statement-of-facts>
      <plea-mitigation *ngIf="offence.pleaMitigation" [pleaMitigation]="offence.pleaMitigation"></plea-mitigation>
      <pdk-divider *ngIf="!last"></pdk-divider>
    </div>
  `
})
export class CaseOverviewComponent {
  @Input() kase: Case;
  @Input() defendant: Defendant;
  @Input() offences: Offence[];
}
