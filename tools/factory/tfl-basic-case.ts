import { DataBuilder } from '../helpers/data-builder';
import { stageSjpCase } from '../contexts/sjp-staging';
import { build, TFL_USER } from '../utils';
import { fetchCaseByUrn } from '../helpers';

export const buildTflBasicCase = async () => {
  const caseDataBuilder = DataBuilder.createCaseDataForTfl();

  await stageSjpCase(caseDataBuilder.buildStagingParam(), TFL_USER);
  const kase = await fetchCaseByUrn(caseDataBuilder.getUrn());

  return kase;
};

export const createBasicTflCase = build('Basic tfl case', buildTflBasicCase);
