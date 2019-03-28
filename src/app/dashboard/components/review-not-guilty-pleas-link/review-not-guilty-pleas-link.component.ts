import { Component, Input } from '@angular/core';

@Component({
  selector: 'review-not-guilty-pleas-link',
  template: `
    <p>
      <pdk-warning-text *ngIf="numberOfCases > 0; else noGuiltyPleaCases">
        <a href="javascript: void(0)" pdk-link pdk-section="small" routerLink="review-not-guilty-pleas">
          Review not guilty pleas ({{ numberOfCases }} <ng-container [ngTemplateOutlet]="casesText"></ng-container>)
        </a>
      </pdk-warning-text>

      <ng-template #noGuiltyPleaCases>
        Review not guilty pleas (0)
      </ng-template>
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
