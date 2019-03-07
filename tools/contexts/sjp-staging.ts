import { request, User } from '@cpp/ui.priming';
import { CaseData, StagingParam } from '../interfaces';
import * as uuid from 'uuid/v4';

export const stageSjpCase = (param: StagingParam, user: User): Promise<any> => {
  const form = {
    headerFileReference: {
      value: param.caseData,
      options: {
        filename: 'nppcase_tfl_000280_header_20170420115600.csv',
        contentType: 'text/csv'
      }
    },
    offenceFileReference: {
      value: param.offenceData,
      options: {
        filename: 'nppcase_tfl_000280_offence_20170420115600.csv',
        contentType: 'text/csv'
      }
    }
  };

  return request({
    method: 'POST',
    url: `/stagingtfl-command-api/command/api/rest/staging-tfl/files/` + uuid(),
    formData: form,
    headers: {
      'Content-Type': 'multipart/form-data',
      charset: 'UTF-8'
    },
    user
  });
};

export const stageCaseWithMultipleOffences = (body: CaseData, user: User): Promise<any> => {
  return request({
    method: 'POST',
    url: `/stagingprosecutors-command-api/command/api/rest/stagingprosecutors/v1/prosecutions`,
    body,
    headers: {
      'Content-Type': 'application/vnd.hmcts.cjs.sjp-prosecution+json',
      charset: 'UTF-8'
    },
    user
  });
};
