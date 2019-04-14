import { request } from '@cpp/ui.priming';
import { TVL_USER } from '../utils';

const MIREPORT_QUERY = '/mireportdata-query-api/query/api/rest/mireportdata/sjp';

export const exportCaseDecisions = (fromDate: string, toDate: string) => {
  return request({
    method: 'GET',
    url: `${MIREPORT_QUERY}/resulted-cases-count?fromDate=${fromDate}&toDate=${toDate}`,
    headers: {
      Accept: 'application/vnd.mireportdata.sjp-resulted-cases-count+json'
    },
    user: TVL_USER
  });
};
