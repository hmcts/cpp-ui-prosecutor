import { Component } from '@angular/core';
import { BackButtonComponent } from '../../../shared';
import { PdkLinkDirective, PdkMarginDirective, PdkTypographyDirective } from '@cpp/pdk';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'upload-failure-page',
  template: `
    <back-button actionText="Back" [linkUrl]="'../'"></back-button>
    <h1 pdk-typography="heading-large" pdk-margin-top="2" pdk-margin-bottom="6">
      Sorry, there is a problem with service
    </h1>

    <p>Try again later</p>

    <a href="javascript:void(0)" pdk-link [routerLink]="['/manage-your-complaints-files']"
      >Go to manage your complaints files</a
    >
  `,
  imports: [BackButtonComponent, PdkTypographyDirective, PdkMarginDirective, PdkLinkDirective, RouterLinkWithHref]
})
export class UploadFailurePageComponent {}
