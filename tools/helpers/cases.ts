import { fetch } from '@cpp/ui.priming';
import { getCaseByUrn } from '../contexts/structure';
import { Case } from '../interfaces/case';

export const fetchCaseByUrn = (urn: string): Promise<Case> => {
  return fetch(() => getCaseByUrn(urn), (kase: any) => kase.urn === urn);
};
