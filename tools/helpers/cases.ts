import { fetch } from '@cpp/ui.priming';
import { getCaseByUrn } from '../contexts/sjp';
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
