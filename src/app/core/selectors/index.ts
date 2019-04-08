import { State } from '../../reducers';
import { createSelector } from '@ngrx/store';

export const getRouteParams = (state: State) =>
  (state.router && state.router.state && (state.router.state.params as { [key: string]: string })) || {};

export const getRole = createSelector(
  getRouteParams,
  ({ role }) => role
);

export const getHasApiActivity = (state: State) => state.api.requests.length > 0;
export const getHasApiError = (state: State) => state.api.errors.length > 0;

export const getCase = (state: State) => {
  return state.case;
};
export const getDefendant = (state: State) => state.case && state.case.defendant;

export const getOffences = createSelector(
  getDefendant,
  defendant => defendant.offences || []
);

export const getWithdrawCaseStatus = createSelector(
  getCase,
  kase =>
    kase.defendant.offences.length > 1 &&
    kase.defendant.offences.every(
      offence =>
        offence.withdrawalRequestReason &&
        offence.withdrawalRequestReason === kase.defendant.offences[0].withdrawalRequestReason
    )
);

export const getPleadedNotGuiltyCasesDetail = (state: State) => state.pleadedNotGuiltyCases;
