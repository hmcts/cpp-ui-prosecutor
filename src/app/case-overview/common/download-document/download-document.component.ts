import { Component, Input } from '@angular/core';
import { CaseDocument } from '../../../contexts/sjp';

@Component({
  selector: 'download-document',
  template: `
    <div pdk-margin-vertical="2" class="download-document">
      <pdk-file-download-icon [size]="39"></pdk-file-download-icon>
      <div class="document-item">
        <a
          href="/api/sjp-query-api/query/api/rest/sjp/cases/{{ caseId }}/documents/{{ document.id }}/content"
          pdk-link
          pdk-typography="body-xsmall"
          target="_blank"
        >
          {{ document.documentType | docFileName }}
        </a>
        <br />
        <span pdk-typography="body-xsmall">{{ extension | uppercase }}</span>
      </div>
      <div class="clear"></div>
      <p>Added at {{ document.addedAt | formatDate: 'd MMMM yyyy \\'at\\' h:mm a' }}</p>
    </div>
  `,
  styleUrls: ['./download-document.component.scss']
})
export class DownloadDocumentComponent {
  @Input() document: CaseDocument;
  @Input() caseId: string;

  get extension() {
    const fileName = this.document.metadata && this.document.metadata.fileName;
    if (fileName) {
      return this.document.metadata.fileName.split('.').pop();
    }

    return 'PDF';
  }
}
