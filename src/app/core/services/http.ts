import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  CppHttp,
  CppHttpBackend, GenerateUniqueKeyFn,
  HttpComandOptions,
  HttpCommandSyncOptions,
  HttpQueryOptions,
  NotificationDispatcher
} from '@cpp/core';
import { CompletedApiRequest, PendingApiRequest } from '../actions/api';
import { State } from '../reducers';
import { finalize } from 'rxjs/operators';

export type RequestOptions = HttpQueryOptions | HttpComandOptions | HttpCommandSyncOptions;

@Injectable()
export class CustomHttp extends CppHttp {
  constructor(
    generateUniqueKey: GenerateUniqueKeyFn,
    backend: CppHttpBackend,
    notifications: NotificationDispatcher,
    private store: Store<State>
  ) {
    super(generateUniqueKey, backend, notifications);
  }

  private handleRequest(options: RequestOptions) {
    if (options.url.indexOf('bg=true') === -1) {
      this.store.dispatch(new PendingApiRequest(options));
    }
  }

  private handleResponse(options: RequestOptions) {
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

  query<R>(options: HttpQueryOptions): Observable<R> {
    this.handleRequest(options);
    return super.query<R>(options).pipe(this.handleResponse(options));
  }

  command<R>(options: HttpComandOptions): Observable<R> {
    this.handleRequest(options);
    return super.command(options).pipe(this.handleResponse(options));
  }

  commandSync<R>(options: HttpCommandSyncOptions): Observable<R> {
    this.handleRequest(options);
    return super.commandSync(options).pipe(this.handleResponse(options));
  }
}

export function loadHttpFactory(
  generateUniqueKey: GenerateUniqueKeyFn,
  backend: CppHttpBackend,
  notifications: NotificationDispatcher,
  store: Store<State>
) {
  return new CustomHttp(generateUniqueKey, backend, notifications, store);
}
