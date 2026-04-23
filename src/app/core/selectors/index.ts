import { State } from '../../reducers';
import { createSelector } from '@ngrx/store';

export * from './manual-case-details';
export * from './reference-data';

export const getRouteParams = (state: State) =>
  (state.router && state.router.state && (state.router.state.params as { [key: string]: string })) || {};

export const getRole = createSelector(getRouteParams, ({ role }) => role);

export const getHasApiActivity = (state: State) => state.api.requests.length > 0;
export const getHasApiError = (state: State) => state.api.errors.length > 0;

export const getCase = (state: State) => {
  return state.case;
};
export const getDefendant = (state: State) => state.case && state.case.defendant;

export const getOffences = createSelector(getDefendant, defendant => defendant.offences || []);

export const getWithdrawCaseStatus = createSelector(
  getCase,
  kase =>
    kase.defendant.offences.length > 1 &&
    kase.defendant.offences.every(
      offence =>
        offence.withdrawalRequestReasonId &&
        offence.withdrawalRequestReasonId === kase.defendant.offences[0].withdrawalRequestReasonId
    )
);

export const getPleadedNotGuiltyCasesDetail = (state: State) => state.pleadedNotGuiltyCases;
export const getFormFilter = (state: State) => state.region;

export const getDefendantDetailsUpdates = (state: State) => state.defendantDetailsUpdates;
export const getCasesMissingSJPNotice = (state: State) => state.casesMissingSJPNoticeCount;

export const getCaseDecisions = (state: State) => state.case && state.case.caseDecisions;

export const getOffenceWithdrawalReasons = (state: State) => state.offenceWithdrawalReasons;

export const getOffenceWithdrawalRequestReasons = createSelector(
  getOffenceWithdrawalReasons,
  offenceWithdrawalReasons =>
    offenceWithdrawalReasons
      .filter(offenceWithdrawalReason => offenceWithdrawalReason.prosecutor)
      .sort((reason1, reason2) => reason1.sequence - reason2.sequence)
      .map(reason => ({ value: reason.id, label: reason.reasonCodeDescription }))
);
