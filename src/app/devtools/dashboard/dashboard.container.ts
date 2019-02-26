import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session/service';
import { mockUsers, User } from '../session/users.constant';

@Component({
  selector: 'dev-tools-page',
  template: `
    <dev-tools-dashboard [user]="user"> </dev-tools-dashboard>
    <dev-tools-back></dev-tools-back>
  `
})
export class DevToolsDashboardPageComponent implements OnInit {
  user: User;

  constructor(readonly fakeSession: SessionService) {}

  ngOnInit(): void {
    const userId = this.fakeSession.getUserId();

    if (userId) {
      this.user = mockUsers.filter((user: User) => user.id === userId)[0];
    }
  }
}
