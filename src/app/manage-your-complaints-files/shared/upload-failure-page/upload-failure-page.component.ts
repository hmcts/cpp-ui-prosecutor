import { Component } from '@angular/core';
import { PdkLinkDirective, PdkMarginDirective, PdkTypographyDirective } from '@cpp/pdk';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'upload-failure-page',
  template: `
    <h1 pdk-typography="heading-large" pdk-margin-top="8" pdk-margin-bottom="6">
      Sorry, there is a problem with service
    </h1>

    <p>Try again later</p>

    <a href="javascript:void(0)" pdk-link [routerLink]="['/manage-your-complaints-files']"
      >Go to manage your complaints files</a
    >
  `,
  imports: [PdkTypographyDirective, PdkMarginDirective, PdkLinkDirective, RouterLink]
})
export class UploadFailurePageComponent {}
