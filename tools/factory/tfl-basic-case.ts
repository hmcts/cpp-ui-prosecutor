import { DataBuilder } from '../helpers/data-builder';
import { stageSjpCase } from '../contexts/sjp-staging';
import { build, TFL_USER } from '../utils';
import { fetchCaseByUrn } from '../helpers';

export const buildTflBasicCase = async () => {
  const caseData = DataBuilder.createCaseDataForTfl();

  await stageSjpCase(caseData.buildStagingParam(), TFL_USER);
  const kase = await fetchCaseByUrn(caseData.getUrn());

  return kase;
};

export const createBasicTflCase = build('Basic tfl case', buildTflBasicCase);
