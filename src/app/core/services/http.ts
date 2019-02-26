import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  CommandSyncArgs,
  CppHttp,
  CppHttpBackend,
  HttpGetRequestOptions,
  HttpPostRequestOptions,
  Notifications
} from '@cpp/core';
import { CompletedApiRequest, PendingApiRequest } from '../actions/api';
import { State } from '../reducers';
import { finalize } from 'rxjs/operators';

export type RequestOptions = HttpGetRequestOptions | HttpPostRequestOptions | CommandSyncArgs;

// Extend CppHttp so that we can spy on its requests

interface ExtendedCommandSyncArgs extends CommandSyncArgs {
  background?: boolean;
}

@Injectable()
export class C2IHttp extends CppHttp {
  constructor(generateUniqueKey: any, backend: any, notifications: any, private store: Store<State>) {
    super(generateUniqueKey, backend, notifications);
  }

  handleRequest(options: RequestOptions) {
    if (options.url.indexOf('bg=true') === -1) {
      this.store.dispatch(new PendingApiRequest(options));
    }
  }

  handleResponse(options: RequestOptions) {
    if (options.url.indexOf('bg=true') === -1) {
      return source$ =>
        source$.pipe(
          finalize(() => {
            this.store.dispatch(new CompletedApiRequest(options));
          })
        );
    }
    return source$ => source$;
  }

  query<R>(options: HttpGetRequestOptions): Observable<R> {
    this.handleRequest(options);

    return super.query<R>(options).pipe(this.handleResponse(options));
  }

  command<R>(options: HttpPostRequestOptions): Observable<R> {
    this.handleRequest(options);

    return super.command(options).pipe(this.handleResponse(options));
  }

  commandSync<R>(options: ExtendedCommandSyncArgs): Observable<R> {
    this.handleRequest(options);

    return super.commandSync(options).pipe(this.handleResponse(options));
  }
}

export function c2iHttpFactory(
  generateUniqueKey: any,
  backend: CppHttpBackend,
  notifications: Notifications,
  store: Store<State>
) {
  return new C2IHttp(generateUniqueKey, backend, notifications, store);
}
