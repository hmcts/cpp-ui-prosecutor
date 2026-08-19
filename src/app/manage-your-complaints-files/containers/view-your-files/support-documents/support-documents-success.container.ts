import { Component } from '@angular/core';
import { PdkMarginDirective, PdkNotificationBanner, PdkTypographyDirective } from '@cpp/pdk';
import { BackButtonComponent } from '../../../../shared';

@Component({
  selector: 'support-documents-success-container',
  template: `
    <back-button actionText="Back" linkUrl="../../"></back-button>
    <pdk-notification-banner title="Important">
      <h1 pdk-margin-top="1" pdk-typography="heading-large">Supporting documents uploaded</h1>
    </pdk-notification-banner>
  `,
  imports: [BackButtonComponent, PdkNotificationBanner, PdkTypographyDirective, PdkMarginDirective]
})
export class SupportDocumentsSuccessContainer {}
