import { Component, input } from '@angular/core';
import { PdkAlertComponent, PdkMarginDirective } from '@cpp/pdk';

@Component({
  selector: 'csv-template-download-error',
  template: `
    @if (show()) {
    <div pdk-margin-top="3">
      <pdk-alert type="warning" icon pdk-margin-vertical="5">
        <ng-content select="[error-message]"></ng-content>
      </pdk-alert>
    </div>

    }
  `,
  imports: [PdkAlertComponent, PdkMarginDirective]
})
export class CsvTemplateDownloadErrorComponent {
  show = input(false);
}
