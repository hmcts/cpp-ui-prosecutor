import { Component, Input } from '@angular/core';

@Component({
  selector: 'review-not-guilty-pleas',
  template: `
    <ol pdk-breadcrumb-list pdk-margin-top="4">
      <li pdk-breadcrumb-list-item>
        <a href="javascript: void(0)" routerLink="../" pdk-breadcrumb>Home</a>
      </li>
      <li pdk-breadcrumb-list-item>
        Review not guilty pleas
        <span *ngIf="pleadedNotGuiltyCasesDetail.count > 0" [ngPlural]="pleadedNotGuiltyCasesDetail.count">
          ({{ pleadedNotGuiltyCasesDetail.count }} <ng-template ngPluralCase="=1">case</ng-template>
          <ng-template ngPluralCase="other">cases</ng-template>)
        </span>
      </li>
    </ol>
    <span *ngIf="pleadedNotGuiltyCasesDetail.count > 0; else noNotGuiltyPleaCases">
      <span>
        <h2 pdk-section="large">
          Review not guilty pleas ({{ pleadedNotGuiltyCasesDetail.count }}
          <span [ngPlural]="pleadedNotGuiltyCasesDetail.count">
            <ng-template ngPluralCase="=1">case</ng-template>
            <ng-template ngPluralCase="other">cases</ng-template> </span
          >)
        </h2>
        <h4 pdk-section="large">
          <pdk-warning-text>
            These cases will be reviewed by a legal adviser after you have sent your dates to avoid or after 10 working
            days from plea entry whichever is sooner
          </pdk-warning-text>
          <pdk-divider></pdk-divider>
        </h4>
      </span>
      <table pdk-table>
        <thead pdk-table-head>
          <tr pdk-table-row>
            <th pdk-table-header>Name</th>
            <th pdk-table-header>Address</th>
            <th pdk-table-header>Reference Number</th>
            <th pdk-table-header>Region</th>
            <th pdk-table-header>Date of birth</th>
            <th pdk-table-header>Plea entry</th>
          </tr>
        </thead>
        <tbody pdk-table-body>
          <tr pdk-table-row *ngFor="let pleadedNotGuiltyCase of pleadedNotGuiltyCasesDetail.cases">
            <td pdk-table-cell>
              <a href="javascript:void(0)" pdk-link [routerLink]="['../case-overview', pleadedNotGuiltyCase.caseId]">
                <b>{{ pleadedNotGuiltyCase | defendantName: false }}</b>
              </a>
            </td>
            <td pdk-table-cell class="pre-line">
              {{ pleadedNotGuiltyCase.address | formatAddress: '\\n' }}
            </td>
            <td pdk-table-cell data-role="urn">
              {{ pleadedNotGuiltyCase.referenceNumber }}
            </td>
            <td pdk-table-cell data-role="region">
              {{ pleadedNotGuiltyCase.region }}
            </td>
            <td pdk-table-cell>
              {{ pleadedNotGuiltyCase.dateOfBirth | date: 'dd MMM yyyy' }}
            </td>
            <td pdk-table-cell>
              {{ pleadedNotGuiltyCase.pleaEntry | date: 'dd MMM yyyy' }}
            </td>
          </tr>
        </tbody>
      </table>
    </span>
    <ng-template #noNotGuiltyPleaCases>
      <h2 pdk-section="large">
        Review not guilty pleas
      </h2>
      <h4 pdk-section="large">
        <pdk-warning-text>
          There are no cases to review
        </pdk-warning-text>
        <pdk-divider></pdk-divider>
      </h4>
      <button pdk-button="" type="button" routerLink="../">Done</button>
    </ng-template>
  `
})
export class ReviewNotGuiltyPleasComponent {
  @Input() pleadedNotGuiltyCasesDetail;
}
