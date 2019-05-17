import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DocumentUploadError } from '../../../contexts/staging-tfl';

@Component({
  selector: 'document-upload-error-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <table pdk-table>
      <thead pdk-table-head>
        <tr pdk-table-row>
          <th pdk-table-header pdk-typography="body-small"><b>Document</b></th>
          <th pdk-table-header pdk-typography="body-small"><b>File name</b></th>
          <th pdk-table-header pdk-typography="body-small"><b>Error</b></th>
        </tr>
      </thead>
      <tbody pdk-table-body>
        <tr pdk-table-row *ngFor="let documentError of documentUploadErrors">
          <td pdk-table-cell pdk-typography="body-small">{{ documentError.documentType | uploadStatus }}</td>
          <td pdk-table-cell pdk-typography="body-small">{{ documentError.documentFilename }}</td>
          <td pdk-table-cell pdk-typography="body-small" pdk-text-colour="red">
            {{ documentError.validationMessageKey | uploadStatus }}
          </td>
        </tr>
      </tbody>
    </table>
  `
})
export class DocumentUploadErrorListComponent {
  @Input() documentUploadErrors: DocumentUploadError[];
}
