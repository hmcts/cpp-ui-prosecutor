import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CaseDocument } from '../../../contexts/sjp';
import { PdkGrid, PdkPaddingDirective, PdkTypographyDirective } from '@cpp/pdk';
import { DownloadDocumentComponent } from '../../common/download-document/download-document.component';

@Component({
  selector: 'document-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h4 pdk-typography="heading-medium">Documents</h4>
    <pdk-grid container>
      <pdk-grid one-third>
        <div pdk-padding-vertical="2"><b>Uploaded files</b></div>
      </pdk-grid>
      <pdk-grid two-thirds>
        @for (document of documents; track document.id) {
        <download-document [document]="document" [caseId]="caseId"></download-document>
        }
      </pdk-grid>
    </pdk-grid>
  `,
  imports: [PdkPaddingDirective, PdkTypographyDirective, PdkGrid, DownloadDocumentComponent]
})
export class DocumentListComponent {
  @Input() documents: CaseDocument[];
  @Input() caseId: string;
}
