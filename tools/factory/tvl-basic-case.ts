import { DataBuilder } from '../helpers/data-builder';
import { stageSjpCase } from '../contexts/sjp-staging';
import { build, TVL_USER } from '../utils';
import { fetchCaseByUrn } from '../helpers';

export const buildTvlBasicCase = async () => {
  const caseData = DataBuilder.createCaseDataForTvl();

  await stageSjpCase(caseData.buildStagingParam(), TVL_USER);
  const kase = await fetchCaseByUrn(caseData.getUrn());

  return kase;
};

export const createBasicTvlCase = build('Basic tvl case', buildTvlBasicCase);
