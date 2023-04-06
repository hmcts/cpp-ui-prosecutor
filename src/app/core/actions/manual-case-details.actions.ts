import { ManualCaseDefendant } from '../model/manual-case-defendant';
import { Action } from '@ngrx/store';
import { ManualCaseAndDocuments } from '../model';
import { ManualCase } from '../model/manual-case';
import { ManualCaseDetailsState } from '../reducers/manual-case-details';

import { createProsecutorSuccess } from '..';

export const LOAD_MANUAL_CASE_DETAILS_SUCCESS = 'Load manual case details successfully';
export const STORE_MANUAL_CASE = 'Save manual case into the store';
export const STORE_MANUAL_CASE_DEFENDANT = 'Save manual case defendant into the store';
export const STORE_MANUAL_CASE_DEFENDANT_LIST = 'Save manual case defendant list into the store';
export const STORE_MANUAL_CASE_DEFENDANTS_EITHER_WAY_OFFENCES =
  'Save manual case defendants either way offences into the store';
export const CREATE_MANUAL_CASE = 'Create manual case in the API';
export const CREATE_MANUAL_CASE_SUCCESS = 'Manual case created successfully';
export const CREATE_MANUAL_CASE_ERROR = 'Manual case not created';
export const REMOVE_MANUAL_CASE_DEFENDANT = 'Remove manual case defendant from store';
export const REMOVE_MANUAL_CASE_OFFENCE = 'Remove manual case offence from store';

export class LoadManualCaseDetailsSuccess implements Action {
  readonly type = LOAD_MANUAL_CASE_DETAILS_SUCCESS;

  constructor(public readonly manualCaseDetails: ManualCaseAndDocuments) {}
}

export class StoreManualCase implements Action {
  readonly type = STORE_MANUAL_CASE;

  constructor(public readonly payload: ManualCase) {}
}

export class StoreManualCaseDefendant implements Action {
  readonly type = STORE_MANUAL_CASE_DEFENDANT;

  constructor(public readonly payload: ManualCaseDefendant) {}
}

export class StoreManualCaseDefendantList implements Action {
  readonly type = STORE_MANUAL_CASE_DEFENDANT_LIST;

  constructor(public readonly payload: ManualCaseDefendant[]) {}
}

export class StoreManualCaseDefendantsEitherWayOffences implements Action {
  readonly type = STORE_MANUAL_CASE_DEFENDANTS_EITHER_WAY_OFFENCES;

  constructor(public readonly payload: ManualCaseDefendant[]) {}
}

export class CreateManualCase implements Action {
  readonly type = CREATE_MANUAL_CASE;

  constructor(public payload: ManualCaseDetailsState) {}
}

export class CreateManualCaseSuccess implements Action {
  readonly type = CREATE_MANUAL_CASE_SUCCESS;

  constructor() {}
}

export class CreateManualCaseError implements Action {
  readonly type = CREATE_MANUAL_CASE_ERROR;

  constructor() {}
}

export class RemoveManualCaseDefendant implements Action {
  readonly type = REMOVE_MANUAL_CASE_DEFENDANT;

  constructor(public readonly payload: string) {}
}

export class RemoveManualCaseOffence implements Action {
  readonly type = REMOVE_MANUAL_CASE_OFFENCE;

  constructor(public readonly payload: { defendantId: string; offenceId: string }) {}
}

export type ManualCaseDetailsAction =
  | LoadManualCaseDetailsSuccess
  | StoreManualCase
  | StoreManualCaseDefendant
  | StoreManualCaseDefendantList
  | StoreManualCaseDefendantsEitherWayOffences
  | CreateManualCase
  | CreateManualCaseSuccess
  | CreateManualCaseError
  | RemoveManualCaseDefendant
  | RemoveManualCaseOffence
  | ReturnType<typeof createProsecutorSuccess>;
