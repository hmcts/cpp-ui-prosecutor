import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CaseDocument } from '../case-overview.interfaces';

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
        <ng-container *ngFor="let document of documents">
          <download-document [document]="document"></download-document>
        </ng-container>
      </pdk-grid>
    </pdk-grid>
  `
})
export class DocumentListComponent {
  @Input() documents: CaseDocument[];
}
