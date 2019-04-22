import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CsvError } from '../../../contexts/staging-tfl';

@Component({
  selector: 'csv-upload-error-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <table pdk-table>
      <thead pdk-table-head>
        <tr pdk-table-row>
          <th pdk-table-header pdk-typography="body-small"><b>Row</b></th>
          <th pdk-table-header pdk-typography="body-small"><b>Reference name</b></th>
          <th pdk-table-header pdk-typography="body-small"><b>Column</b></th>
          <th pdk-table-header pdk-typography="body-small"><b>Error</b></th>
        </tr>
      </thead>
      <tbody pdk-table-body>
        <tr pdk-table-row *ngFor="let csvError of csvErrors">
          <td pdk-table-cell pdk-typography="body-small">{{ csvError.csvRow | ifEmpty: '–' }}</td>
          <td pdk-table-cell pdk-typography="body-small">{{ csvError.tflCaseUrn }}</td>
          <td pdk-table-cell pdk-typography="body-small">{{ csvError.csvColumn }}</td>
          <td pdk-table-cell pdk-typography="body-small" pdk-text-colour="red">
            {{ csvError.validationMessageKey | uploadError }}
          </td>
        </tr>
      </tbody>
    </table>
  `
})
export class CsvUploadErrorListComponent {
  @Input() csvErrors: CsvError[];
}
