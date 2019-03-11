import { stageProsecutorCase } from '../contexts/staging';
import { build, TVL_USER } from '../utils';
import { fetchCaseByUrn } from '../helpers';
import { ProsecutorCaseDataBuilder } from '../helpers/prosecutor-case-data-builder';

export const buildTvlCaseWithMultipleOffences = async () => {
  const caseDataBuilder = ProsecutorCaseDataBuilder.createCaseDataForMultipleOffences();

  await stageProsecutorCase(caseDataBuilder.getData(), TVL_USER);
  const kase = await fetchCaseByUrn(caseDataBuilder.getUrn());

  return kase;
};

export const createTvlCaseWithMultipleOffences = build(
  'Build tvl case with multiple offences',
  buildTvlCaseWithMultipleOffences
);
