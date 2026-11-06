import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PdkLinkDirective, PdkMarginDirective, PdkPanelComponent, PdkTypographyDirective } from '@cpp/pdk';
import { ViewYourFilesStore } from '../../../signal-store/view-your-files.store';
import { ComplaintsFileRoutes } from '../../../manage-your-complaints-files.routes';

@Component({
  selector: 'support-documents-success-container',
  template: `
    <div pdk-margin-top="8">
      <pdk-panel title="Supporting documents uploaded">
        For file
        <br /><strong>{{ store.referenceNumber() }}</strong>
      </pdk-panel>
    </div>

    <h4 pdk-typography="heading-small" pdk-margin-top="6" pdk-margin-bottom="4">What happens next</h4>

    <p pdk-margin-bottom="4">The supporting document will be considered by the court alongside your file.</p>

    <p pdk-margin-bottom="6">
      You can check the status of your files on the
      <a
        href="javascript:void(0)"
        pdk-link
        [routerLink]="['/manage-your-complaints-files', ComplaintsFileRoutes.VIEW_YOUR_FILES]"
        >view your files</a
      >
      page.
    </p>
  `,
  imports: [PdkPanelComponent, PdkTypographyDirective, PdkMarginDirective, PdkLinkDirective, RouterLink]
})
export class SupportDocumentsSuccessContainer {
  readonly store = inject(ViewYourFilesStore);
  readonly ComplaintsFileRoutes = ComplaintsFileRoutes;
}
