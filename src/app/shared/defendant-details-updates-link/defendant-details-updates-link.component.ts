import { Component, Input } from '@angular/core';
import { PdkLinkDirective, PdkCore } from '@cpp/pdk';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'defendant-details-updates-link',
    template: `
    <p>
      @if (numberOfUpdates > 0) {
        <a id="defendant-details-updates-link"
          href="javascript: void(0)"
          pdk-link
          pdk-section="small"
          routerLink="defendant-details-updates"
          >
          Defendant details updates ({{ numberOfUpdates }})
        </a>
      } @else {
        Defendant details updates (0)
      }
    </p>
    `,
    imports: [PdkLinkDirective, RouterLink, PdkCore]
})
export class DefendantDetailsUpdatesLinkComponent {
  @Input() numberOfUpdates = 0;
}
