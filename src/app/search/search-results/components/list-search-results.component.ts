import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CaseDetails } from '../../../contexts/sjp';
import { PdkInsetTextComponent, PdkWarningTextComponent, PdkTable, PdkCore } from '@cpp/pdk';
import { RouterLink } from '@angular/router';
import { DatePipe, NgPlural, NgPluralCase } from '@angular/common';
import { CaseStatusPipe } from '../../../shared/pipes/case-status/case-status.pipe';
import { DefendantNamePipe } from '../../../shared/pipes/defendant-name/defendant-name.pipe';

@Component({
  selector: 'list-search-results',
  imports: [
    PdkInsetTextComponent,
    PdkWarningTextComponent,
    PdkTable,
    PdkCore,
    RouterLink,
    NgPlural,
    NgPluralCase,
    CaseStatusPipe,
    DefendantNamePipe,
    DatePipe
  ],
  template: `
    @if (searchResults) {
    <pdk-inset-text pdk-margin-top="6">
      {{ searchResults.length }}
      <span [ngPlural]="searchResults.length">
        <ng-template ngPluralCase="=1">result</ng-template>
        <ng-template ngPluralCase="other">results</ng-template>
      </span>
      available @if (areDefendantDetailsUpdated) {
      <pdk-warning-text pdk-margin-top="2">Cases with updated defendant name </pdk-warning-text>
      }
    </pdk-inset-text>
    } @if (searchResults?.length) {
    <table pdk-table>
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
        @for (searchResult of searchResults; track searchResult.caseId) {
        <tr pdk-table-row>
          <td pdk-table-cell>
            @if (searchResult.defendant.outdated) {
            <pdk-warning-text pdk-margin-top="5">
              <a href="javascript:void(0)" pdk-link [routerLink]="['../../case-overview', searchResult.caseId]">
                <b>{{ searchResult.defendant | defendantName }}</b>
              </a>
            </pdk-warning-text>
            } @if (!searchResult.defendant.outdated) {
            <a href="javascript:void(0)" pdk-link [routerLink]="['../../case-overview', searchResult.caseId]">
              <b>{{ searchResult.defendant | defendantName }}</b>
            </a>
            }
          </td>
          <td pdk-table-cell data-role="urn">{{ searchResult.urn }}</td>
          <td pdk-table-cell>
            {{ searchResult.status | caseStatus }}
            @if (searchResult.status === 'REFERRED_FOR_COURT_HEARING' && !searchResult.listedInCriminalCourts) {
            <div pdk-typography="body-small">
              Awaiting Listing
            </div>
            }
          </td>
          <td pdk-table-cell>{{ searchResult.prosecutingAuthority }}</td>
          <td pdk-table-cell class="no-wrap">{{ searchResult.defendant.dateOfBirth | date: 'dd MMM yyyy' }}</td>
          <td pdk-table-cell class="no-wrap">{{ searchResult.postingDate | date: 'dd MMM yyyy' }}</td>
        </tr>
        }
      </tbody>
    </table>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListSearchResultsComponent {
  @Input() searchResults: CaseDetails[];

  get areDefendantDetailsUpdated() {
    return this.searchResults.some(({ defendant }) => !!defendant.outdated);
  }
}
