import { fetch } from '@cpp/ui.priming';
import { getCaseByUrn } from '../contexts/structure';
import { Case } from '../../src/app/case-overview/case-overview.interfaces';

export const fetchCaseByUrn = (urn: string): Promise<Case> => {
  return fetch(() => getCaseByUrn(urn), (kase: any) => kase.urn === urn);
};

export const fetchCaseDocument = (urn: string): Promise<Case> => {
  return fetch(() => getCaseByUrn(urn), (kase: any) => kase.caseDocuments.length > 0);
};
