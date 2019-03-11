import { Component, Input } from '@angular/core';
import { CaseDocument } from '../../case-overview.interfaces';

@Component({
  selector: 'download-document',
  template: `
    <div pdk-margin-vertical="2" class="download-document">
      <pdk-file-download-icon [size]="39"></pdk-file-download-icon>
      <div class="document-item">
        <a href="/api" pdk-link pdk-typography="body-xsmall">
          {{ document.documentType | docFileName }} </a
        ><br />
        <span pdk-typography="body-xsmall">PDF</span>
      </div>
      <div class="clear"></div>
      <p>Added at {{ document.addedAt | formatDate: 'd MMMM yyyy \\'at\\' h:mm a' }}</p>
    </div>
  `,
  styleUrls: ['./download-document.component.scss']
})
export class DownloadDocumentComponent {
  @Input() document: CaseDocument;
}
