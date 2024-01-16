import { Component, Input } from '@angular/core';
import { CaseDocument, SjpService } from '../../../contexts/sjp';
import { take } from 'rxjs/operators';
import FileSaver from 'file-saver';

@Component({
  selector: 'download-document',
  template: `
    <div pdk-margin-vertical="2" class="download-document">
      <pdk-file-download-icon [size]="39"></pdk-file-download-icon>
      <div class="document-item">
        <a
          href="javascript:void(0);"
          (click)="onDownloadDocument(document.id, document.metadata.fileName)"
          pdk-link
          pdk-typography="body-xsmall"
        >
          {{ document.documentType | docFileName }}
        </a>
        <br />
        <span pdk-typography="body-xsmall">{{ extension | uppercase }}</span>
      </div>
      <div class="clear"></div>
      <p>Added at {{ document.addedAt | formatDate: "d MMMM yyyy 'at' h:mm a" }}</p>
    </div>
  `,
  styleUrls: ['./download-document.component.scss']
})
export class DownloadDocumentComponent {
  @Input() document: CaseDocument;
  @Input() caseId: string;

  constructor(private sjpService: SjpService) {}

  get extension() {
    const fileName = this.document.metadata && this.document.metadata.fileName;
    if (fileName) {
      return this.document.metadata.fileName.split('.').pop();
    }

    return 'PDF';
  }

  onDownloadDocument(documentId: string, fileName: string): void {
    this.sjpService
      .getDocument(this.caseId, documentId)
      .pipe(take(1))
      .subscribe(blobDoc => {
        FileSaver.saveAs(blobDoc, fileName);
      });
  }
}
