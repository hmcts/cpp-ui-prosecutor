import { fetch, User } from '@cpp/ui.priming';
import { getCaseByUrn, assignCase, startSJPSession, getSession } from '../contexts/sjp';
import { Case } from '../../src/app/contexts/sjp';

export const fetchCaseByUrn = (urn: string): Promise<Case> => {
  return fetch(() => getCaseByUrn(urn), (kase: any) => kase.urn === urn);
};

export const fetchCaseDocument = (urn: string): Promise<Case> => {
  return fetch(() => getCaseByUrn(urn), (kase: any) => kase.caseDocuments.length > 0);
};

export const fetchCaseWithCondition = (urn: string, conditionFn?: (result: Case) => boolean): Promise<Case> => {
  return fetch(() => getCaseByUrn(urn), conditionFn);
};

export const assignCaseToUser = (caseId: string, user: User): Promise<void> => {
  return assignCase(caseId, user);
};

export const startSession = (sessionId: string, user: User): Promise<void> => {
  return startSJPSession(sessionId, user, 'B01LY00');
};

export const fetchSession = (sessionId: string, user: User): Promise<void> => {
  return fetch(() => getSession(sessionId, user));
};
