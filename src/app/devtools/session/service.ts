import { Injectable } from '@angular/core';
@Injectable()
export class SessionService {
  clear() {
    window.sessionStorage.removeItem('CJSCPPUID');
  }

  getUserId(): any {
    return window.sessionStorage.getItem('CJSCPPUID');
  }

  setUserId(cjscppuid: string): void {
    window.sessionStorage.setItem('CJSCPPUID', cjscppuid);
  }
}
