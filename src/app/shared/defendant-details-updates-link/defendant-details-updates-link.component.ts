import { Component, Input } from '@angular/core';

@Component({
  selector: 'defendant-details-updates-link',
  template: `
    <p>
      <a
        *ngIf="numberOfUpdates > 0; else noDefendantDetailsUpdates"
        href="javascript: void(0)"
        pdk-link
        pdk-section="small"
        routerLink="defendant-details-updates"
      >
        Defendant details updates ({{ numberOfUpdates }})
      </a>
      <ng-template #noDefendantDetailsUpdates>
        Defendant details updates (0)
      </ng-template>
    </p>
  `
})
export class DefendantDetailsUpdatesLinkComponent {
  @Input() numberOfUpdates = 0;
}
