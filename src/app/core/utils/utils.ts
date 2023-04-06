import { InjectionToken } from '@angular/core';
import { Prosecutor } from '@cpp/reference-data';

export const REDIRECT_TOKEN = new InjectionToken<(url: string) => void>('InjectionToken');

export const filterByCpsFlag = (isCps = true) => ({ cpsFlag }: Prosecutor) => {
  if (!isCps) {
    return !cpsFlag;
  }
  return cpsFlag;
};
