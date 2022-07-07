import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionService } from '../session/service';
import { mockUsers, User } from '../session/users.constant';

const getDefaultUserId = (): string => {
  const defaultUser: User = mockUsers.find(user => user.default);
  return defaultUser.id || '';
};

@Injectable()
export class SessionInterceptor implements HttpInterceptor {
  constructor(readonly fakeSession: SessionService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.responseType !== 'arraybuffer') {
      const params = request.params || new HttpParams();
      const CJSCPPUID = this.fakeSession.getUserId() || getDefaultUserId();
      const authenticatedRequest = request.clone({
        params: params.set('CJSCPPUID', CJSCPPUID),
        setHeaders: { CJSCPPUID }
      });
      return next.handle(authenticatedRequest);
    }

    return next.handle(request);
  }
}
