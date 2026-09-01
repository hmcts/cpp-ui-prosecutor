import { CanDeactivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { ViewYourFilesStore } from '../signal-store/view-your-files.store';

export const resetViewYourFilesStoreGuard: CanDeactivateFn<unknown> = () => {
  inject(ViewYourFilesStore).resetState();
  return true;
};
