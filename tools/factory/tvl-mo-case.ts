import { stageProsecutorCase } from '../contexts/staging';
import { build, SYSTEM_TVL_USER } from '../utils';
import { fetchCaseByUrn } from '../helpers';
import { ProsecutorCaseDataBuilder } from '../helpers/prosecutor-case-data-builder';

export const buildTvlCaseWithMultipleOffences = async (postedDays = 28) => {
  const caseDataBuilder = ProsecutorCaseDataBuilder.createCaseDataForMultipleOffences(null, postedDays);

  await stageProsecutorCase(caseDataBuilder.getData(), SYSTEM_TVL_USER);
  const kase = await fetchCaseByUrn(caseDataBuilder.getUrn());

  return kase;
};

export const createTvlCaseWithMultipleOffences = build(
  'Build tvl case with multiple offences',
  buildTvlCaseWithMultipleOffences
);
