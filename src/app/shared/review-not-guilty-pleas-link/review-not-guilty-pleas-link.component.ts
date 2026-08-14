import { Component, Input } from '@angular/core';
import { PdkCore, PdkWarningTextComponent } from '@cpp/pdk';
import { NgPlural, NgPluralCase, NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'review-not-guilty-pleas-link',
  imports: [PdkWarningTextComponent, NgPlural, NgPluralCase, NgTemplateOutlet, PdkCore, RouterLink, NgTemplateOutlet],
  template: `
    <p>
      @if (numberOfCases > 0) {
      <pdk-warning-text>
        <a href="javascript: void(0)" pdk-link pdk-section="small" routerLink="review-not-guilty-pleas">
          Review not guilty pleas ({{ numberOfCases }} <ng-container [ngTemplateOutlet]="casesText"></ng-container>)
        </a>
      </pdk-warning-text>
      } @else { Review not guilty pleas (0) }

      <ng-template #casesText>
        <span [ngPlural]="numberOfCases">
          <ng-template ngPluralCase="=1">case</ng-template>
          <ng-template ngPluralCase="other">cases</ng-template>
        </span>
      </ng-template>
    </p>
  `
})
export class ReviewNotGuiltyPleasLinkComponent {
  @Input() numberOfCases = 0;
}
