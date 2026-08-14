import {Action} from '@ngrx/store';
import {AcknowledgeDefendantDetailsUpdatesParam} from '../contexts/sjp';

export const enum DefendantDetailsUpdatesActionType {
  ACKNOWLEDGE_DEFENDANT_DETAILS_UPDATES = '[ATCM] Acknowledge defendant details updates'
}

export class AcknowledgeDefendantDetailsUpdates implements Action {
  readonly type = DefendantDetailsUpdatesActionType.ACKNOWLEDGE_DEFENDANT_DETAILS_UPDATES;

  constructor(public defendantDetailsUpdates: AcknowledgeDefendantDetailsUpdatesParam) {
  }
}

export type DefendantDetailsUpdatesAction = AcknowledgeDefendantDetailsUpdates;
