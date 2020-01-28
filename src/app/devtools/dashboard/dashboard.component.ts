import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { User } from '../session/users.constant';

@Component({
  selector: 'dev-tools-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <pdk-grid container>
      <pdk-grid one-half>
        <h1 pdk-typography="heading-xlarge" pdk-margin-vertical="8">Developer tools</h1>
      </pdk-grid>
    </pdk-grid>
    <pdk-grid container pdk-margin-vertical="8">
      <pdk-grid two-thirds>
        <span *ngIf="user; else notLoggedIn" pdk-typography="body-medium">
          You are currently logged in as <b>{{ user.displayName }}</b
          >.
        </span>
        <ng-template #notLoggedIn>
          <span pdk-typography="body-medium">You are not currently logged in as a user.</span>
        </ng-template>
      </pdk-grid>
    </pdk-grid>

    <pdk-grid container>
      <pdk-grid one-quarter>
        <ul pdk-list pdk-margin-top="6">
          <li><a routerLink="select-user" pdk-link>Select user</a></li>
        </ul>
      </pdk-grid>
      <pdk-grid one-quarter>
        <ul pdk-list pdk-margin-top="6">
          <li><a routerLink="/user" pdk-link>Prosecutor</a></li>
          <li><a routerLink="/tfl" pdk-link>Tfl prosecutor</a></li>
        </ul>
      </pdk-grid>
    </pdk-grid>
  `
})
export class DevToolsDashboardComponent {
  @Input() user: User;
}
