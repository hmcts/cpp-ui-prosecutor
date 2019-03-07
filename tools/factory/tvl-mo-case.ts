import { stageCaseWithMultipleOffences } from '../contexts/sjp-staging';
import { build, TVL_USER } from '../utils';
import { fetchCaseByUrn } from '../helpers';
import { MoCaseDataBuilder } from '../helpers/mo-case-data-builder';

export const buildTvlCaseWithMultipleOffences = async () => {
  const caseDataBuilder = MoCaseDataBuilder.createCaseDataForTvl();

  await stageCaseWithMultipleOffences(caseDataBuilder.getData(), TVL_USER);
  const kase = await fetchCaseByUrn(caseDataBuilder.getUrn());

  return kase;
};

export const createTvlCaseWithMultipleOffences = build(
  'Build tvl case with multiple offences',
  buildTvlCaseWithMultipleOffences
);
