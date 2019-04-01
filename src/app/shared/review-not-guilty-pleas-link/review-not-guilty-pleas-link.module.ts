import { NgModule } from '@angular/core';
import { PdkCoreModule, PdkWarningTextModule } from '@cpp/pdk';
import { CommonModule } from '@angular/common';
import { ReviewNotGuiltyPleasLinkComponent } from './review-not-guilty-pleas-link.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ReviewNotGuiltyPleasLinkComponent],
  imports: [CommonModule, RouterModule, PdkCoreModule, PdkWarningTextModule],
  exports: [ReviewNotGuiltyPleasLinkComponent]
})
export class ReviewNotGuiltyPleasLinkModule {}
