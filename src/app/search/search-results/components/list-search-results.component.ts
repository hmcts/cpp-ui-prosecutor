import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CaseDetails } from '../../../contexts/sjp';

@Component({
  selector: 'list-search-results',
  template: `
    <pdk-inset-text *ngIf="searchResults" pdk-margin-top="0">
      {{ searchResults.length }}
      <span [ngPlural]="searchResults.length">
        <ng-template ngPluralCase="=1">result</ng-template>
        <ng-template ngPluralCase="other">results</ng-template>
      </span>
      available
      <pdk-warning-text *ngIf="areDefendantDetailsUpdated" pdk-margin-top="2"
        >Cases with updated defendant name
      </pdk-warning-text>
    </pdk-inset-text>
    <table pdk-table *ngIf="searchResults?.length">
      <thead pdk-table-head>
        <tr pdk-table-row>
          <th pdk-table-header>Name</th>
          <th pdk-table-header>Case reference number</th>
          <th pdk-table-header>Case status</th>
          <th pdk-table-header>Prosecutor</th>
          <th pdk-table-header>Date of birth</th>
          <th pdk-table-header>Notice served</th>
        </tr>
      </thead>
      <tbody pdk-table-body>
        <tr pdk-table-row *ngFor="let searchResult of searchResults">
          <td pdk-table-cell>
            <pdk-warning-text *ngIf="searchResult.defendant.outdated" pdk-margin-top="5">
              <a href="javascript:void(0)" pdk-link [routerLink]="['../../case-overview', searchResult.caseId]">
                <b>{{ searchResult.defendant | defendantName }}</b>
              </a>
            </pdk-warning-text>
            <a
              *ngIf="!searchResult.defendant.outdated"
              href="javascript:void(0)"
              pdk-link
              [routerLink]="['../../case-overview', searchResult.caseId]"
            >
              <b>{{ searchResult.defendant | defendantName }}</b>
            </a>
          </td>
          <td pdk-table-cell data-role="urn">{{ searchResult.urn }}</td>
          <td pdk-table-cell>
            {{ searchResult.status | caseStatus }}
            <div>
              <a
                href="javascript:void(0)"
                pdk-link
                [routerLink]="['#', searchResult.caseId]"
                *ngIf="isNoPleaReceived(searchResult)"
              >
                Upload and enter postal reply
              </a>
            </div>
            <div>
              <a
                href="javascript:void(0)"
                pdk-link
                [routerLink]="['#', searchResult.caseId]"
                *ngIf="isReferredForCourtHearing(searchResult)"
              >
                View in Criminal Courts
              </a>
            </div>
          </td>
          <td pdk-table-cell>{{ searchResult.prosecutingAuthority | caseProsecutor }}</td>
          <td pdk-table-cell class="no-wrap">{{ searchResult.defendant.dateOfBirth | date: 'dd MMM yyyy' }}</td>
          <td pdk-table-cell class="no-wrap">{{ searchResult.postingDate | date: 'dd MMM yyyy' }}</td>
        </tr>
      </tbody>
      case-header-badge
    </table>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListSearchResultsComponent {
  @Input() searchResults: CaseDetails[];

  isNoPleaReceived(kase: CaseDetails): boolean {
    return kase.status === 'NO_PLEA_RECEIVED_READY_FOR_DECISION';
  }

  isReferredForCourtHearing(kase: CaseDetails): boolean {
    return kase.status === 'REFERRED_FOR_COURT_HEARING';
  }

  get areDefendantDetailsUpdated() {
    return this.searchResults.some(({ defendant }) => !!defendant.outdated);
  }
}
