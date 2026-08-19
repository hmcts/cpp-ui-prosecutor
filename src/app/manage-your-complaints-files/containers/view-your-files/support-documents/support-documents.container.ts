import { Component } from '@angular/core';
import { PdkMarginDirective, PdkTypographyDirective } from '@cpp/pdk';
import { BackButtonComponent } from '../../../../shared';

@Component({
  selector: 'support-documents-container',
  template: `
    <back-button actionText="Back" linkUrl="../"></back-button>
    <h1 pdk-typography="heading-large" pdk-margin-top="6" pdk-margin-bottom="6">Add supporting documents</h1>
  `,
  imports: [BackButtonComponent, PdkTypographyDirective, PdkMarginDirective]
})
export class SupportDocumentsContainer {}
