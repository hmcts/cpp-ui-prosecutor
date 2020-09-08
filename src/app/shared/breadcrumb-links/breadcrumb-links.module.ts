import { NgModule } from '@angular/core';
import { BreadcrumbLinksComponent } from './breadcrumb-links.component';
import {
  PdkCoreModule,
  PdkBreadcrumbsModule
} from '@cpp/pdk';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    BreadcrumbLinksComponent
  ],
  imports: [
    CommonModule,
    PdkCoreModule,
    PdkBreadcrumbsModule
  ],
  exports: [
    BreadcrumbLinksComponent
  ]
})
export class BreadcrumbLinksModule {}
