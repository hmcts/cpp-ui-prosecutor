import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { GetRequestOptions } from '@cpp/core';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { finalize, switchMap, tap } from 'rxjs/operators';
import { RequestOptions } from '.';
import { CompletedApiRequest, PendingApiRequest } from '../actions';
import { State } from '../reducers';

@Injectable({
  providedIn: 'root'
})
export class ExternalHttp {
  private http = inject(HttpClient);
  private store = inject<Store<State>>(Store);

  constructor() {}

  get<T>(url: string, options: GetRequestOptions): Observable<T> {
    const request: RequestOptions = {
      url,
      requestType: ''
    };

    return of(null).pipe(
      tap({
        next: () => this.store.dispatch(new PendingApiRequest(request))
      }),
      switchMap(() => this.http.get<T>(url, options)),
      finalize(() => this.store.dispatch(new CompletedApiRequest(request)))
    );
  }
}
