import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OnlinePlea } from 'src/app/contexts/sjp';
import { OnlinePleaUi } from './online-plea-interface';
import { getOnlinePlea } from '../case-overview.selectors';


@Component({
    selector: 'online-plea-details-container',
    template: `
      <ol pdk-breadcrumb-list pdk-margin-top="4">
        <li pdk-breadcrumb-list-item>
          <a href="javascript: void(0)" routerLink="/" pdk-breadcrumb>Home</a>
        </li>
        <li pdk-breadcrumb-list-item>
          <a href="javascript: void(0)" routerLink="../../../../../../search" pdk-breadcrumb>
            Search for a case
          </a>
        </li>
        <li pdk-breadcrumb-list-item>
          <a href="javascript: void(0)" routerLink="../../../../" pdk-breadcrumb>
            Case Details
          </a>
        </li>
        <li pdk-breadcrumb-list-item>
          Online plea
        </li>
      </ol>
      <case-header-badge-container></case-header-badge-container>
      <online-plea-details [onlinePlea]="onlinePlea$ | async"></online-plea-details>
      <button
        pdk-margin-top="4"
        id="onlinePleaBackButton"
        pdk-button
        routerLink="../../../../"
        >
        Back
      </button>
    `
  })
export class OnlinePleaDetailsContainer {

  onlinePlea$: Observable<OnlinePleaUi>;

  constructor(private store: Store<State>) {
    this.onlinePlea$ = this.store.pipe(select(getOnlinePlea)).pipe(
      map(this.transformToUiModel),
    );
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
    // Only show court hearing if there's at least one not guilty or guilty request hearing
    onlinePleaUi.pleaDetails.hasHearing = onlinePlea.onlinePleaDetails
      .some(plea => plea.plea === 'NOT_GUILTY' || plea.plea === 'GUILTY_REQUEST_HEARING');

    if (onlinePlea.onlinePleaDetails.some(plea => plea.plea === 'NOT_GUILTY') ) {
      onlinePleaUi.pleaDetails.comeToCourt = undefined;
    }
    return onlinePleaUi;
  }
}
