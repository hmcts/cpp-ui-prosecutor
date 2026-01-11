import { CanActivate } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { FeatureState } from './search.selectors';
import { ResetSearchResult } from './search.action';

@Injectable({
  providedIn: 'root'
})
export class ResetGuard implements CanActivate {
  private store = inject<Store<FeatureState>>(Store);

  constructor() {}

  canActivate(): boolean {
    this.store.dispatch(new ResetSearchResult());
    return true;
  }
}
