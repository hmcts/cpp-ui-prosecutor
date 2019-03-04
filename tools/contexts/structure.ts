import { TFL_USER } from '../utils';
import { request } from '@cpp/ui.priming';
import { Case } from '../interfaces';

export const getCaseByUrn = (urn: string): Promise<Case> => {
  return request({
    method: 'GET',
    url: `/sjp-query-api/query/api/rest/sjp/cases?urn=${urn}`,
    headers: {
      Accept: 'application/vnd.sjp.query.case-by-urn+json'
    },
    user: TFL_USER
  });
};
