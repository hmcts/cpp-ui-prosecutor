import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OnlinePleaUi } from './online-plea-interface';
import { getOnlinePlea } from '../case-overview.selectors';
import { getCase } from '../../core';
import { Case, OnlinePlea } from '../../contexts/sjp';
import { State } from '../../reducers';

@Component({
  selector: 'online-plea-details-container',
  template: `
    <online-plea-details [kase]="case$ | async" [onlinePlea]="onlinePlea$ | async"></online-plea-details>
  `
})
export class OnlinePleaDetailsContainer {
  onlinePlea$: Observable<OnlinePleaUi>;
  case$: Observable<Case>;

  constructor(private store: Store<State>) {
    this.onlinePlea$ = this.store.pipe(select(getOnlinePlea)).pipe(map(this.transformToUiModel));
    this.case$ = this.store.select(getCase);
  }

  transformToUiModel(onlinePlea: OnlinePlea): OnlinePleaUi {
    const onlinePleaUi: OnlinePleaUi = onlinePlea as any;
    if (onlinePlea.onlinePleaDetails) {
      onlinePleaUi.onlinePleaDetails.forEach(offencePlea => {
        offencePlea.pleasGuilty = offencePlea.plea === 'GUILTY' || offencePlea.plea === 'GUILTY_REQUEST_HEARING';
      });
      onlinePleaUi.pleaDetails.doHaveOwnWitness = !!onlinePlea.pleaDetails.witnessDetails;
      onlinePleaUi.pleaDetails.existsUnavailability = !!onlinePlea.pleaDetails.unavailability;
    }
    if (onlinePlea.personalDetails) {
      onlinePleaUi.personalDetails.hasDriverLicense =
        !!onlinePlea.personalDetails.driverNumber || !!onlinePlea.personalDetails.driverLicenceDetails;
      onlinePleaUi.personalDetails.hasUkDriverLicense = !!onlinePlea.personalDetails.driverNumber;
    }
    // Only show court hearing if there's at least one not guilty or guilty request hearing
    onlinePleaUi.pleaDetails.hasHearing = onlinePlea.onlinePleaDetails.some(
      plea => plea.plea === 'NOT_GUILTY' || plea.plea === 'GUILTY_REQUEST_HEARING'
    );

    if (onlinePlea.onlinePleaDetails.some(plea => plea.plea === 'NOT_GUILTY')) {
      onlinePleaUi.pleaDetails.comeToCourt = undefined;
    }
    return onlinePleaUi;
  }
}
