import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CaseSummary } from '../../contexts/sjp';
import { DefendantNamePipe } from '../../shared/pipes/defendant-name/defendant-name.pipe';
import { FormatDatePipe } from '../../shared/pipes/format-date/format-date.pipe';
import { PdkTable } from '@cpp/pdk';
@Component({
  selector: 'list-cases-missing-sjp-notices',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (casesMissingNotices.length > 0) {
    <table pdk-table>
      <thead pdk-table-head>
        <tr pdk-table-row>
          <th pdk-table-header>Name</th>
          <th pdk-table-header>Reference number</th>
          <th pdk-table-header>Date of birth</th>
        </tr>
      </thead>
      <tbody pdk-table-body>
        @for (caseWithoutNotice of casesMissingNotices; track caseWithoutNotice.id) {
        <tr pdk-table-row>
          <td pdk-table-cell>{{ caseWithoutNotice.defendant | defendantName }}</td>
          <td pdk-table-cell data-role="urn">{{ caseWithoutNotice.urn }}</td>
          <td pdk-table-cell>{{ caseWithoutNotice.defendant.dateOfBirth | formatDate: 'd MMM y' }}</td>
        </tr>
        }
      </tbody>
    </table>
    }
  `,
  imports: [DefendantNamePipe, FormatDatePipe, PdkTable]
})
export class ListCasesMissingSjpNoticesComponent {
  @Input() casesMissingNotices: CaseSummary[];
}
