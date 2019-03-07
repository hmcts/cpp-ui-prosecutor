import { DataBuilder } from '../helpers/data-builder';
import { stageSjpCase } from '../contexts/sjp-staging';
import { build, TVL_USER } from '../utils';
import { fetchCaseByUrn } from '../helpers';

export const buildTvlBasicCase = async () => {
  const caseDataBuilder = DataBuilder.createCaseDataForTvl();

  await stageSjpCase(caseDataBuilder.buildStagingParam(), TVL_USER);
  const kase = await fetchCaseByUrn(caseDataBuilder.getUrn());

  return kase;
};

export const createBasicTvlCase = build('Basic tvl case', buildTvlBasicCase);
