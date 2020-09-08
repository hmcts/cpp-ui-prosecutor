import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CaseSummary } from '../../contexts/sjp';

@Component({
  selector: 'list-cases-missing-sjp-notices',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <table pdk-table *ngIf="casesMissingNotices.length > 0">
      <thead pdk-table-head>
        <tr pdk-table-row>
          <th pdk-table-header>Name</th>
          <th pdk-table-header>Reference number</th>
          <th pdk-table-header>Date of birth</th>
        </tr>
      </thead>
      <tbody pdk-table-body>
        <tr pdk-table-row *ngFor="let caseWithoutNotice of casesMissingNotices">
          <td pdk-table-cell>{{ caseWithoutNotice.defendant | defendantName }}</td>
          <td pdk-table-cell data-role="urn">{{ caseWithoutNotice.urn }}</td>
          <td pdk-table-cell>{{ caseWithoutNotice.defendant.dateOfBirth | formatDate: 'd MMM y' }}</td>
        </tr>
      </tbody>
    </table>
  `
})
export class ListCasesMissingSjpNoticesComponent {
  @Input() casesMissingNotices: CaseSummary[];
}
