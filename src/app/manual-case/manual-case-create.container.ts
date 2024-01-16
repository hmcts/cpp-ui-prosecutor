import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import {
  State,
  getManualCaseDetails,
  getSummonTypes,
  StoreManualCase,
  StoreManualCaseDefendant,
  getManualCaseDefendants,
  getManualCaseType,
  StoreManualCaseDefendantList,
  StoreManualCaseDefendantsEitherWayOffences,
  getCourtCentres,
  CourtCentreWithRooms,
  CreateManualCase,
  getManualCase,
  getRemandStatuses,
  getNationalities,
  getOffenceDateCodes,
  getAlcoholLevelMethods,
  RemoveManualCaseDefendant,
  RemoveManualCaseOffence,
  getPoliceForces,
  getHearingTypes,
  getEthnicities,
  getObservedEthnicities,
  getModeOfTrialPleaOptions,
  getMagistrateVerdictOptions,
  getProsecutorByUserGroup,
  ProsecutorType
} from '../core';
import { ManualCasePath } from './manual-case.interface';
import { ManualCaseNavigationService } from './manual-case-nav.service';
import { takeUntil } from 'rxjs/operators';
import { ManualCase } from '../core/model/manual-case';
import { ManualCaseDefendant } from '../core/model/manual-case-defendant';
import { ManualCaseDetailsState } from '../core/reducers/manual-case-details';
import {
  Nationality,
  HearingType,
  Ethnicity,
  EthnicityCode,
  OffenceDateCode,
  AlcoholLevelMethod,
  PoliceForce
} from '../core/model';
import uuid from 'uuid/v4';
import { isEmpty } from 'lodash';
import { Option } from '../core/model/global/option';
import { getMotReasonOptions, getMotReasons, getVerdictTypes, getPleaTypes } from '../core/selectors/reference-data';
import { getProsecutors, PleaType, Prosecutor } from '@cpp/reference-data';
import { VerdictType } from '../core/model/reference-data-interfaces/verdicts';
import { MotReason } from '../core/model/reference-data-interfaces/mot-reason';
import { ManualCaseOffenceStateService } from './offences-state.service';

export interface SubmitData<T> {
  caseData: T;
  navigateToNextPage: boolean;
}
@Component({
  selector: 'manual-case-container',
  template: `
    <div class="manual-case">
      <ng-container *ngIf="currentView.isCaseTypePage">
        <manual-case-type
          [manualCaseDetail]="manualCaseDetail$ | async"
          [hasNpp]="(nonPoliceProsecutor$ | async).cpsFlag"
          [summonsCodes]="summonTypes$ | async"
          (submitFormData)="storeManualCaseData($event)"
        >
        </manual-case-type>
      </ng-container>

      <ng-container *ngIf="currentView.isProsecutorPage">
        <manual-case-prosecutor
          [manualCaseDetail]="manualCaseDetail$ | async"
          [nonPoliceProsecutor]="nonPoliceProsecutor$ | async"
          [prosecutorRouteType]="prosecutorRouteType"
          (submitFormData)="storeManualCaseData($event)"
        >
        </manual-case-prosecutor>
      </ng-container>

      <ng-container *ngIf="currentView.isHearingPage">
        <manual-case-hearing-details
          [manualCaseDetail]="manualCaseDetail$ | async"
          [courtCentres]="courtCentres$ | async"
          [hearingTypes]="hearingTypes$ | async"
          (submitFormData)="storeManualCaseData($event)"
        >
        </manual-case-hearing-details>
      </ng-container>

      <ng-container *ngIf="currentView.isDefendantPage">
        <manual-case-defendant
          [manualCaseDetail]="manualCaseDetail$ | async"
          [manualCaseDefendants]="manualCaseDefendants$ | async"
          [manualCaseType]="manualCaseType$ | async"
          [prosecutors]="prosecutors$ | async"
          [remandStatuses]="remandTypes$ | async"
          (submitFormData)="storeManualCaseDefendant($event)"
        >
        </manual-case-defendant>
      </ng-container>

      <ng-container *ngIf="currentView.isOffencePage">
        <manual-case-offence
          [manualCaseDefendants]="manualCaseDefendants$ | async"
          [hasNpp]="(nonPoliceProsecutor$ | async).cpsFlag"
          [offenceDateCodes]="offenceDateCodes$ | async"
          [alcoholLevelMethods]="alcoholLevelMethods$ | async"
          [manualCaseType]="manualCaseType$ | async"
          (submitFormData)="storeManualCaseDefendantList($event)"
        >
        </manual-case-offence>
      </ng-container>

      <ng-container *ngIf="currentView.isEitherWayOffencePage">
        <either-way-offence
          [manualCaseDefendants]="manualCaseDefendants$ | async"
          [pleaOptions]="pleaOptions$ | async"
          [verdictsOptions]="verdictOptions$ | async"
          [verdictsTypes]="verdictTypes$ | async"
          [allocationDecisionOptions]="motOptions$ | async"
          [initiationCode]="(manualCaseDetail$ | async)?.initiationCode"
          (submitFormData)="storeEitherWayOffenceData($event)"
        >
        </either-way-offence>
      </ng-container>

      <ng-container *ngIf="currentView.isCaseSummary">
        <manual-case-summary
          [caseDetails]="manualCaseDetail$ | async"
          [defendants]="manualCaseDefendants$ | async"
          [courtCentres]="courtCentres$ | async"
          [hasNpp]="(nonPoliceProsecutor$ | async).cpsFlag"
          [nationalities]="nationalities$ | async"
          [alcoholLevelMethods]="alcoholLevelMethods$ | async"
          [remandStatuses]="remandTypes$ | async"
          [policeForces]="policeForces$ | async"
          [hearingTypes]="hearingTypes$ | async"
          [ethnicities]="ethnicities$ | async"
          [observedEthnicities]="observedEthnicities$ | async"
          [pleaTypes]="pleaTypes$ | async"
          [prosecutors]="prosecutors$ | async"
          [verdictsTypes]="verdictTypes$ | async"
          [allocationDecisionTypes]="motReasons$ | async"
          (edit)="edit($event)"
          (remove)="remove($event)"
          (add)="add($event)"
          (formSubmit)="submitManualCase()"
        >
        </manual-case-summary>
      </ng-container>

      <ng-container *ngIf="currentView.isCaseCreated">
        <manual-case-create-success
          [reference]="reference"
          [caseDetails]="manualCaseDetail$ | async"
        ></manual-case-create-success>
      </ng-container>

      <ng-container *ngIf="currentView.isDuplicatedProsecutor">
        <manual-case-duplicated-prosecutor
          [manualCaseDetail]="manualCaseDetail$ | async"
          (submitFormData)="updateProsecutorAndSave($event)"
        >
        </manual-case-duplicated-prosecutor>
      </ng-container>
    </div>
  `,
  styles: [
    `
      .manual-case {
        margin: 30px 0;
      }
    `
  ]
})
export class ManualCaseCreateContainer implements OnInit, OnDestroy {
  manualCaseDetail$: Observable<ManualCase>;
  summonTypes$: Observable<any[]>;
  courtCentres$: Observable<CourtCentreWithRooms[]>;
  hearingTypes$: Observable<HearingType[]>;
  manualCaseDefendants$: Observable<ManualCaseDefendant[]>;
  manualCaseType$: Observable<string>;
  subscription$: Observable<any>;
  private ngUnsubscribe: Subject<boolean> = new Subject<boolean>();
  manualCase: ManualCaseDetailsState;
  reference: { prosecutorCaseReference: string; caseId: string };
  remandTypes$: Observable<any[]>;
  nationalities$: Observable<Nationality[]>;
  ethnicities$: Observable<Ethnicity[]>;
  observedEthnicities$: Observable<EthnicityCode[]>;
  offenceDateCodes$: Observable<OffenceDateCode[]>;
  alcoholLevelMethods$: Observable<AlcoholLevelMethod[]>;
  policeForces$: Observable<PoliceForce[]>;
  pleaOptions$: Observable<Option[]>;
  prosecutors$: Observable<Prosecutor[]>;
  motOptions$: Observable<Option[]>;
  verdictOptions$: Observable<Option[]>;
  pleaTypes$: Observable<PleaType[]>;
  motReasons$: Observable<MotReason[]>;
  verdictTypes$: Observable<VerdictType[]>;
  nonPoliceProsecutor$: Observable<Prosecutor>;

  prosecutorRouteType: ProsecutorType;

  currentView: any;

  constructor(
    private manualCaseNavService: ManualCaseNavigationService,
    private offenceStateService: ManualCaseOffenceStateService,
    private store: Store<State>,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store
      .pipe(select(getManualCase))
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(manualCase => {
        this.manualCase = manualCase;
      });

    this.setCurrentView(this.route.routeConfig.path);

    this.manualCaseDetail$ = this.store.pipe(select(getManualCaseDetails));
    this.nonPoliceProsecutor$ = this.store.pipe(select(getProsecutorByUserGroup));
    this.summonTypes$ = this.store.pipe(select(getSummonTypes));
    this.manualCaseDefendants$ = this.store.pipe(select(getManualCaseDefendants));
    this.manualCaseType$ = this.store.pipe(select(getManualCaseType));

    this.courtCentres$ = this.store.pipe(select(getCourtCentres));

    this.hearingTypes$ = this.store.pipe(select(getHearingTypes));
    this.ethnicities$ = this.store.pipe(select(getEthnicities));
    this.observedEthnicities$ = this.store.pipe(select(getObservedEthnicities));

    this.policeForces$ = this.store.pipe(select(getPoliceForces));
    this.remandTypes$ = this.store.pipe(select(getRemandStatuses));
    this.nationalities$ = this.store.pipe(select(getNationalities));
    this.offenceDateCodes$ = this.store.pipe(select(getOffenceDateCodes));
    this.alcoholLevelMethods$ = this.store.pipe(select(getAlcoholLevelMethods));
    this.pleaOptions$ = this.store.pipe(select(getModeOfTrialPleaOptions));
    this.prosecutors$ = this.store.pipe(select(getProsecutors));
    this.motOptions$ = this.store.pipe(select(getMotReasonOptions));
    this.verdictOptions$ = this.store.pipe(select(getMagistrateVerdictOptions));
    this.pleaTypes$ = this.store.pipe(select(getPleaTypes));
    this.motReasons$ = this.store.pipe(select(getMotReasons));
    this.verdictTypes$ = this.store.pipe(select(getVerdictTypes));

    this.prosecutorRouteType =
      this.route.routeConfig.path === ManualCasePath.EditProsecutor
        ? ProsecutorType.EDIT_MANUAL_CASE
        : ProsecutorType.MANUAL_CASE;
  }

  setCurrentView(path: string): void {
    window.scrollTo(0, 0);

    if (
      path === ManualCasePath.NewProsecutor &&
      this.route.snapshot.queryParams.type === 'J' &&
      isEmpty(this.manualCase.caseDetails)
    ) {
      this.store.dispatch(
        new StoreManualCase({
          caseId: uuid(),
          initiationCode: 'J'
        })
      );
    }

    if (
      this.manualCase.caseDetails.initiationCode === 'J' &&
      (path === ManualCasePath.NewHearing || path === ManualCasePath.EditHearing)
    ) {
      path = ManualCasePath.NewDefendant;
    }

    if (path === ManualCasePath.CaseCreated) {
      this.reference = {
        prosecutorCaseReference: this.route.snapshot.params['reference'],
        caseId: this.route.snapshot.params['caseId']
      };
    }

    this.currentView = this.manualCaseNavService.getManualCasePageView(path);
  }

  storeManualCaseData(manualCaseData: ManualCase) {
    if (manualCaseData.initiationCode === 'Application') {
      this.router.navigate(['application', 'select-type']);
    } else {
      this.store.dispatch(new StoreManualCase(manualCaseData));

      const navigateTo = this.manualCaseNavService.getNavgationPath(
        this.route.routeConfig.path,
        manualCaseData.initiationCode
      );
      this.navigateTo(navigateTo);
    }
  }

  storeManualCaseDefendant(payload: any) {
    this.store.dispatch(new StoreManualCaseDefendant(payload.defendantToStore));

    let path = this.route.routeConfig.path;
    if (this.manualCase.caseDetails.initiationCode === 'J' && path === 'hearing') {
      path = 'defendant';
    }

    if (payload.navigateToNextPage) {
      const navigateTo = this.manualCaseNavService.getNavgationPath(path);
      this.navigateTo(navigateTo);
    }
  }

  storeManualCaseDefendantList(payload: any) {
    this.store.dispatch(new StoreManualCaseDefendantList(payload.defendantsWithOffences));

    const initiationCode = this.manualCase.caseDetails.initiationCode;
    const hasEitherWayOffence = this.offenceStateService.hasEitherWayOffence(payload.defendantsWithOffences);
    const lastEditedOffenceWasEitherWay = payload.isEitherWayOffence;

    if (this.route.routeConfig.path === ManualCasePath.EditOffence) {
    }

    const isEitherWayOffenceEdited =
      this.route.routeConfig.path === ManualCasePath.EditOffence ? lastEditedOffenceWasEitherWay : hasEitherWayOffence;

    if (payload.navigateToNextPage) {
      const navigateTo = this.manualCaseNavService.getNavgationPath(
        this.route.routeConfig.path,
        initiationCode,
        isEitherWayOffenceEdited
      );
      this.navigateTo(navigateTo);
    }
  }

  storeEitherWayOffenceData(payload: SubmitData<ManualCaseDefendant[]>) {
    this.store.dispatch(new StoreManualCaseDefendantsEitherWayOffences(payload.caseData));

    if (payload.navigateToNextPage) {
      const navigateTo = this.manualCaseNavService.getNavgationPath(this.route.routeConfig.path);
      this.navigateTo(navigateTo);
    }
  }

  updateProsecutorAndSave(manualCaseData) {
    this.store.dispatch(new StoreManualCase(manualCaseData));
    this.store.dispatch(new CreateManualCase(this.manualCase));
  }

  submitManualCase() {
    this.store.dispatch(new CreateManualCase(this.manualCase));
  }

  edit(path) {
    const navigateTo = this.manualCaseNavService.getSummaryNavigationPath(path);
    this.navigateTo(navigateTo);
  }

  remove(params) {
    if (params.offenceId) {
      this.store.dispatch(
        new RemoveManualCaseOffence({
          defendantId: params.defendantId,
          offenceId: params.offenceId
        })
      );
    } else {
      this.store.dispatch(new RemoveManualCaseDefendant(params.defendantId));
    }
    this.navigateTo(['manual-case', 'summary']);
  }

  add(path) {
    const navigateTo = this.manualCaseNavService.getSummaryNavigationPath(path);
    this.navigateTo(navigateTo);
  }

  navigateTo(path) {
    this.manualCaseNavService.updatePrevRouteParams(this.route.routeConfig.path);
    this.router.navigate(path);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
    this.ngUnsubscribe.unsubscribe();
  }
}
