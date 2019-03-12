import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CaseDetails } from '../../../../contexts/sjp';

@Component({
  selector: 'search-results-table',
  template: `
    <pdk-inset-text *ngIf="searchPayload" pdk-margin-top="0"
      >{{ searchPayload.length }} results available
    </pdk-inset-text>
    <table pdk-table *ngIf="searchPayload?.length">
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
        <tr pdk-table-row *ngFor="let searchResult of searchPayload">
          <td pdk-table-cell>
            <a href="javascript:void(0)" pdk-link [routerLink]="['/case-overview', searchResult.caseId]">
              <b>{{ searchResult.defendant | defendantName }}</b>
            </a>
          </td>
          <td pdk-table-cell data-role="urn">{{ searchResult.urn }}</td>
          <td pdk-table-cell>{{ searchResult.status | caseStatus }}</td>
          <td pdk-table-cell>{{ searchResult.prosecutingAuthority | caseProsecutor }}</td>
          <td pdk-table-cell>{{ searchResult.defendant.dateOfBirth | date: 'dd MMM yyyy' }}</td>
          <td pdk-table-cell>{{ searchResult.postingDate | date: 'dd MMM yyyy' }}</td>
        </tr>
      </tbody>
    </table>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultsTableComponent {
  @Input() searchPayload: CaseDetails[];
}
