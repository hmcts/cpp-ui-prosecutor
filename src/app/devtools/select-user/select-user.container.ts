import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

import { mockUsers } from '../session/users.constant';
import { SessionService } from '../session/service';
import { DevtoolsSelectUserComponent } from "./select-user.component";
import { DevToolsBackButtonComponent } from "../back-button/back-button.component";

@Component({
    selector: 'dev-tools-select-user-page',
    template: `
    <dev-tools-select-user [users]="users" [userId]="userId" (selectUser)="selectUser($event)"> </dev-tools-select-user>
    <dev-tools-back></dev-tools-back>
  `,
    imports: [DevtoolsSelectUserComponent, DevToolsBackButtonComponent]
})
export class DevtoolsSelectUserPageComponent implements OnInit {
  readonly fakeSession = inject(SessionService);
  readonly router = inject(Router);

  users: any[];
  userId: string;

  constructor() {}

  ngOnInit(): void {
    this.users = mockUsers.map(user => ({ value: user.id, label: user.displayName }));
    this.userId = this.fakeSession.getUserId();
  }

  selectUser(userId: string) {
    this.fakeSession.setUserId(userId);
    this.router.navigate(['dev-tools']);
  }
}
