import { COURT_ADMIN, SYSTEM_ONLINE_PLEA_USER, TFL_USER } from '../utils';
import { request, User } from '@cpp/ui.priming';
import { Case } from '../../src/app/contexts/sjp';

const COMMAND = `/sjp-command-api/command/api/rest/sjp`;

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

export const withdrawOffences = (caseId: string, user: User) => {
  return request({
    method: 'POST',
    url: `${COMMAND}/cases/${caseId}/offences-withdrawal-request`,
    headers: {
      'Content-Type': 'application/vnd.sjp.request-withdrawal-all-offences+json'
    },
    user
  });
};

export const pleadOnline = (caseId: string, defendantId: string, body) => {
  return request({
    method: 'POST',
    url: `${COMMAND}/cases/${caseId}/defendants/${defendantId}/plead-online`,
    headers: {
      'Content-Type': 'application/vnd.sjp.plead-online+json',
      charset: 'UTF-8'
    },
    body,
    user: SYSTEM_ONLINE_PLEA_USER
  });
};

export const pleadGuilty = (offenceId: string, caseId: string, body: any) => {
  return request({
    method: 'POST',
    url: `${COMMAND}/cases/${caseId}/offences/${offenceId}/pleas`,
    headers: {
      'Content-Type': 'application/vnd.sjp.update-plea+json',
      charset: 'UTF-8'
    },
    body,
    user: COURT_ADMIN
  });
};
