import { request, User } from '@cpp/ui.priming';
import { CaseData, StagingParam } from '../interfaces';
import * as uuid from 'uuid/v4';
import { FileUploadStatResult } from '../../src/app/contexts/staging-tfl';

const COMMAND_TFL = `/stagingtfl-command-api/command/api/rest`;
const QUERY_TFL = `/stagingtfl-query-api/query/api/rest/stagingtfl`;

const COMMAND_TVL = `/stagingprosecutors-command-api/command/api/rest/stagingprosecutors/v1`;

export const stageTflCase = (param: StagingParam, user: User): Promise<any> => {
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
    url: `${COMMAND_TFL}/staging-tfl/files/` + uuid(),
    formData: form,
    headers: {
      'Content-Type': 'multipart/form-data',
      charset: 'UTF-8'
    },
    user
  });
};

export const stageTflDocument = (formData: any, user: User): Promise<any> => {
  return request({
    method: 'POST',
    formData,
    url: `${COMMAND_TFL}/staging-tfl/upload-supporting-documents/` + uuid(),
    headers: {
      'Content-Type': 'multipart/form-data',
      charset: 'UTF-8'
    },
    user
  });
};

export const stageProsecutorCase = (body: CaseData, user: User): Promise<any> => {
  return request({
    method: 'POST',
    url: `${COMMAND_TVL}/prosecutions`,
    body,
    headers: {
      'Content-Type': 'application/vnd.hmcts.cjs.sjp-prosecution+json',
      charset: 'UTF-8'
    },
    user
  });
};

export const stageDocument = (formData: any, user: User): Promise<any> => {
  const { caseUrn: urn } = formData;
  return request({
    method: 'POST',
    formData,
    url: `${COMMAND_TVL}/prosecutions/${urn}/materials`,
    headers: {
      'Content-Type': 'multipart/form-data',
      charset: 'UTF-8'
    },
    user
  });
};

export const getFileUploadStats = (user: User): Promise<FileUploadStatResult> => {
  return request({
    method: 'GET',
    url: `${QUERY_TFL}/uploads-status-information`,
    headers: {
      Accept: 'application/vnd.stagingtfl.query.uploads-status-information+json'
    },
    user
  });
};
