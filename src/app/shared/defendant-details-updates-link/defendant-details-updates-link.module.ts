import { NgModule } from '@angular/core';
import { PdkCoreModule, PdkWarningTextModule } from '@cpp/pdk';
import { CommonModule } from '@angular/common';
import { DefendantDetailsUpdatesLinkComponent } from './defendant-details-updates-link.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [DefendantDetailsUpdatesLinkComponent],
  imports: [CommonModule, RouterModule, PdkCoreModule, PdkWarningTextModule],
  exports: [DefendantDetailsUpdatesLinkComponent]
})
export class DefendantDetailsUpdatesLinkModule {}
