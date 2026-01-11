import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import * as manualCaseDetailsActions from '../actions/manual-case-details.actions';
import { ApiError, CreateManualCaseError, CreateManualCaseSuccess } from '../actions';
import { ProsecutionCaseFileService } from '../../contexts/prosecution-case-file';
import { cloneDeep } from 'lodash';
import moment from 'moment';
import { ManualCaseAndDocuments } from '../model';
import cleanDeep from 'clean-deep';

@Injectable()
export class ManualCaseDetailsEffects {
  private actions$ = inject(Actions);
  private router = inject(Router);
  private prosecutionCaseFileService = inject(ProsecutionCaseFileService);

  createManualCase$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType<manualCaseDetailsActions.CreateManualCase>(manualCaseDetailsActions.CREATE_MANUAL_CASE),
      switchMap(action => {
        // clone the payload to prevent modifying the store
        let payload = cloneDeep(action.payload);
        payload = this.cleanUp(payload);

        const command$ = this.prosecutionCaseFileService.createManualCaseSJP(payload);

        return command$.pipe(
          switchMap(caseData => {
            let actionToReturn: Action;

            if (caseData.errors) {
              actionToReturn = new CreateManualCaseError();

              if (caseData.errors.some(e => e.code === 'DUPLICATED_PROSECUTION')) {
                this.router.navigate(['manual-case', 'duplicated-prosecutor']);
              }
            }

            if (caseData.prosecutorCaseReference && !caseData.errors) {
              this.router.navigate(['manual-case', 'case-created', caseData.prosecutorCaseReference, caseData.caseId]);
              actionToReturn = new CreateManualCaseSuccess();
            }

            if (actionToReturn) {
              return of(actionToReturn);
            }
          }),
          catchError(error => of(new ApiError(error)))
        );
      })
    )
  );

  private cleanUp({ defendants, caseDetails, ...rest }: ManualCaseAndDocuments) {
    if (caseDetails.originatingPoliceForce) {
      delete caseDetails.originatingPoliceForce;
    }

    if (caseDetails.cpsOrganisationName) {
      delete caseDetails.cpsOrganisationName;
    }

    if (caseDetails.initiationCode === 'T' || caseDetails.initiationCode === 'CO') {
      caseDetails.initiationCode = 'O';
    }

    if (caseDetails.prosecutor) {
      defendants.forEach(defendant => {
        defendant.appliedProsecutorCosts = caseDetails.prosecutor.appliedProsecutorCosts;
        defendant.postingDate = caseDetails.prosecutor.chargePostingDate;
      });
    }

    if (caseDetails.initialHearing) {
      caseDetails.initialHearing.timeOfHearing += ':00.000';
      caseDetails.initialHearing.hearingDuration = moment
        .duration(caseDetails.initialHearing.hearingDuration)
        .asMinutes();
      defendants.forEach(defendant => (defendant.initialHearing = caseDetails.initialHearing));
      delete caseDetails.initialHearing;
    }

    const cleanCaseDetails = {
      ...caseDetails,
      prosecutor: {
        prosecutionAuthorityId: caseDetails.prosecutor.prosecutionAuthorityId,
        prosecutingAuthority: caseDetails.prosecutor.prosecutingAuthority
      }
    };

    if (caseDetails.initiationCode === 'S') {
      cleanCaseDetails.dateReceived = caseDetails.prosecutor.summonsRequestReceivedDate;
    }

    defendants.forEach(defendant => {
      if (defendant.aliasForCorporate) {
        const aliasForCorporate = defendant.aliasForCorporate.map(alias => alias.aliasForCorporate);
        defendant.aliasForCorporate = aliasForCorporate;
      }

      if (defendant.individual && defendant.individual.custodyStatus) {
        defendant.custodyStatus = defendant.individual.custodyStatus;
        defendant.individual.bailStatus = defendant.individual.custodyStatus;
      }
      defendant.offences.forEach(offence => {
        this.deleteOffenceProperties(offence);
      });
    });

    const newPayload = {
      caseDetails: cleanCaseDetails,
      defendants,
      ...rest
    };

    return cleanDeep(newPayload) as ManualCaseAndDocuments;
  }

  private deleteOffenceProperties(offence) {
    const offencePropertiesToRemove = [
      'offenceTitle',
      'offenceLegislation',
      'isManual',
      'drugsOrAlcoholRelated',
      'backDutyAllowed',
      'locationRequired',
      'standardOffenceWording',
      'defendantOptions',
      'dynamicParticularFormData'
    ];

    for (const prop in offence) {
      if (offencePropertiesToRemove.find(p => p === prop)) {
        delete offence[prop];
      }
    }
  }


  constructor() {}
}
