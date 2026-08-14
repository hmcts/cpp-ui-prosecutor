import { Component, input } from '@angular/core';
import { PdkAlertComponent, PdkMarginDirective } from '@cpp/pdk';

@Component({
  selector: 'csv-template-download-error',
  template: `
    @if (show()) {
    <pdk-alert type="warning" icon pdk-margin-vertical="5">
      Unable to download the CSV template at the moment. Please try again later.
    </pdk-alert>
    }
  `,
  imports: [PdkAlertComponent, PdkMarginDirective]
})
export class CsvTemplateDownloadErrorComponent {
  show = input(false);
}
