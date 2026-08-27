import { Component, inject } from '@angular/core';
import { BackButtonComponent } from '../../../shared';
import { ManageYourComplaintsFilesStore } from '../../signal-store/manage-your-complaints-files.store';
import { PdkLinkDirective, PdkMarginDirective, PdkNotificationBanner, PdkTypographyDirective } from '@cpp/pdk';
import { RouterLink } from '@angular/router';
import { ComplaintsFileRoutes } from '../../manage-your-complaints-files.routes';

@Component({
  selector: 'upload-success-container',
  template: `
    <back-button actionText="Back" [linkUrl]="'../'"></back-button>
    <pdk-notification-banner title="Important">
      <h1 pdk-margin-top="1" pdk-typography="heading-large">
        File is being processed
      </h1>
      <p pdk-typography="body">
        Your reference number is <strong>{{ store.referenceNumber() }}</strong>
      </p>
    </pdk-notification-banner>

    <h4 pdk-typography="heading-small" pdk-margin-top="6" pdk-margin-bottom="4">What happens next</h4>

    <p pdk-margin-bottom="4">The file is being processed. If there are no errors it will be sent to the court.</p>

    <p pdk-margin-bottom="4">
      You should make a note of your reference number in case you, or the court, has any queries.
    </p>

    <p pdk-margin-bottom="4">The court can either accept or reject the file.</p>

    <p pdk-margin-bottom="6">
      You can check the status of your files on the
      <a
        href="javascript:void(0)"
        pdk-link
        [routerLink]="['/manage-your-complaints-files', ComplaintsFileRoutes.VIEW_YOUR_FILES]"
        >view your files</a
      >
      page. You can also add supporting documents here once the file has been successfully processed.
    </p>

    <a href="javascript:void(0)" pdk-link [routerLink]="['../']">Upload another complaints list</a>
  `,
  imports: [
    BackButtonComponent,
    PdkNotificationBanner,
    PdkTypographyDirective,
    PdkMarginDirective,
    PdkLinkDirective,
    RouterLink
  ]
})
export class UploadSuccessContainer {
  readonly store = inject(ManageYourComplaintsFilesStore);
  readonly ComplaintsFileRoutes = ComplaintsFileRoutes;
}
