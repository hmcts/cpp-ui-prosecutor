import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { mockUsers } from '../session/users.constant';
import { SessionService } from '../session/service';

@Component({
  selector: 'dev-tools-select-user-page',
  template: `
    <dev-tools-select-user [users]="users" [userId]="userId" (selectUser)="selectUser($event)"> </dev-tools-select-user>
    <dev-tools-back></dev-tools-back>
  `
})
export class DevtoolsSelectUserPageComponent implements OnInit {
  users: any[];
  userId: string;

  constructor(readonly fakeSession: SessionService, readonly router: Router) {}

  ngOnInit(): void {
    this.users = mockUsers.map(user => ({ value: user.id, label: user.displayName }));
    this.userId = this.fakeSession.getUserId();
  }

  selectUser(userId: string) {
    this.fakeSession.setUserId(userId);
    this.router.navigate(['dev-tools']);
  }
}
