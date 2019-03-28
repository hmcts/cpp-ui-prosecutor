import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { FeatureState } from './search.selectors';
import { ResetSearchResult } from './search.action';

@Injectable()
export class ResetGuard implements CanActivate {
  constructor(private store: Store<FeatureState>) {}

  canActivate(): boolean {
    this.store.dispatch(new ResetSearchResult());
    return true;
  }
}
