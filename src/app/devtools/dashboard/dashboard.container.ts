import { Component, OnInit, inject } from '@angular/core';
import { SessionService } from '../session/service';
import { mockUsers, User } from '../session/users.constant';
import { DevToolsDashboardComponent } from "./dashboard.component";
import { DevToolsBackButtonComponent } from "../back-button/back-button.component";
import { PdkCore, PdkGrid } from '@cpp/pdk';

@Component({
    selector: 'dev-tools-page',
    template: `
    <dev-tools-dashboard [user]="user"> </dev-tools-dashboard>
    <dev-tools-back></dev-tools-back>
  `,
    imports: [PdkCore, PdkGrid, DevToolsDashboardComponent, DevToolsBackButtonComponent]
})
export class DevToolsDashboardPageComponent implements OnInit {
  readonly fakeSession = inject(SessionService);

  user: User;

  constructor() {}

  ngOnInit(): void {
    const userId = this.fakeSession.getUserId();

    if (userId) {
      this.user = mockUsers.filter((user: User) => user.id === userId)[0];
    }
  }
}
