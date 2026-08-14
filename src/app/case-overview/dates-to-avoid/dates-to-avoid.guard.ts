import { CanActivate } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from '../../core/reducers';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { getCase } from '../../core/selectors';

@Injectable({
  providedIn: 'root'
})
export class DatesToAvoidGuard implements CanActivate {
  private store = inject<Store<State>>(Store);

  constructor() {}

  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(getCase),
      map(kase => !!kase && (!kase.assigned && !kase.completed)),
      take(1)
    );
  }
}
