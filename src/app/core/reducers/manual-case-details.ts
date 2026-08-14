import * as manualCaseActions from '../actions';
import { ManualCaseDetailsAction } from '../actions';
import { ManualCaseAndDocuments } from '../model';
import { cloneDeep } from 'lodash';
import { ManualCaseOffence } from '../model/manual-case-offence';
import { ManualCaseDefendant } from '../model/manual-case-defendant';
import { createProsecutorSuccess } from '../actions';

import { ProsecutorType } from '../model/prosecutor';

export type ManualCaseDetailsState = ManualCaseAndDocuments;

const initialState = {
  caseDetails: { initiationCode: 'J' },
  defendants: [],
  channel: 'MCC'
} as ManualCaseAndDocuments;

export function manualCaseDetailsReducer(
  state: ManualCaseAndDocuments = initialState,
  action: ManualCaseDetailsAction
): ManualCaseDetailsState {
  switch (action.type) {
    case manualCaseActions.LOAD_MANUAL_CASE_DETAILS_SUCCESS:
      return action.manualCaseDetails || { ...state };

    case manualCaseActions.STORE_MANUAL_CASE:
      return {
        ...state,
        ...{
          caseDetails: action.payload
        }
      };

    case manualCaseActions.STORE_MANUAL_CASE_DEFENDANT:
      const newState = cloneDeep(state);
      const index = newState.defendants.findIndex(e => e.id === action.payload.id);

      if (index === -1) {
        newState.defendants.push(action.payload);
      } else {
        newState.defendants[index] = action.payload;
      }

      return newState;
    case manualCaseActions.STORE_MANUAL_CASE_DEFENDANT_LIST:
      return {
        ...state,
        ...{
          defendants: action.payload
        }
      };
    case manualCaseActions.STORE_MANUAL_CASE_DEFENDANTS_EITHER_WAY_OFFENCES: {
      const updatedDefendants = action.payload;
      const currentDefendants = cloneDeep(state.defendants);
      const defendants = mapToUpdatedDefendants(currentDefendants, updatedDefendants);
      return {
        ...state,
        ...{
          defendants
        }
      };
    }
    case manualCaseActions.REMOVE_MANUAL_CASE_DEFENDANT: {
      return {
        ...state,
        defendants: state.defendants.filter(d => d.id !== action.payload)
      };
    }
    case manualCaseActions.REMOVE_MANUAL_CASE_OFFENCE: {
      const defendants = cloneDeep(state.defendants);
      const defendant = defendants.find(d => d.id === action.payload.defendantId);
      defendant.offences = defendant.offences.filter(o => o.offenceId !== action.payload.offenceId);
      return {
        ...state,
        defendants
      };
    }
    case createProsecutorSuccess.type: {
      if (
        action.prosecutorType === ProsecutorType.MANUAL_CASE ||
        action.prosecutorType === ProsecutorType.EDIT_MANUAL_CASE
      ) {
        const { id, fullName, oucode, standard, address } = action.prosecutor;

        return {
          ...state,
          caseDetails: {
            ...state.caseDetails,
            prosecutor: {
              prosecutionAuthorityId: id,
              name: fullName,
              prosecutingAuthority: oucode,
              address,
              standard
            }
          }
        };
      }
      return state;
    }

    default:
      return state;
  }
}

function mapToUpdatedDefendants(
  currentDefendants: ManualCaseDefendant[],
  updatedDefendants: ManualCaseDefendant[]
): ManualCaseDefendant[] {
  return currentDefendants.map(defendant => {
    const foundDefendant = updatedDefendants.find(updatedDefendant => updatedDefendant.id === defendant.id);
    if (foundDefendant) {
      const foundDefendantCopy = cloneDeep(foundDefendant);
      const offences = mapToUpdatedOffences(defendant.offences, foundDefendantCopy.offences);
      foundDefendantCopy.offences = offences;
      return foundDefendantCopy;
    } else {
      return defendant;
    }
  });
}

function mapToUpdatedOffences(
  currentOffences: ManualCaseOffence[],
  updateOffences: ManualCaseOffence[]
): ManualCaseOffence[] {
  return currentOffences.map(currentOffence => {
    const offence = updateOffences.find(updatedOffence => updatedOffence.offenceId === currentOffence.offenceId);
    return offence ? offence : currentOffence;
  });
}
