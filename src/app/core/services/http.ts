import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  CppHttp,
  CppHttpBackend,
  GenerateUniqueKeyFn,
  GENERATE_UNIQUE_KEY,
  HttpComandOptions,
  HttpCommandSyncOptions,
  HttpQueryOptions,
  NotificationDispatcher
} from '@cpp/core';
import { CompletedApiRequest, PendingApiRequest } from '../actions/api';
import { State } from '../reducers';
import { finalize } from 'rxjs/operators';

export type RequestOptions = HttpQueryOptions | HttpComandOptions | HttpCommandSyncOptions;

/* istanbul ignore file */
@Injectable()
export class CustomHttp extends CppHttp {
  private store = inject<Store<State>>(Store);

  constructor() {
    const generateUniqueKey = inject<GenerateUniqueKeyFn>(GENERATE_UNIQUE_KEY);
    const backend = inject(CppHttpBackend);
    const notifications = inject(NotificationDispatcher);

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
  return new CustomHttp();
}
