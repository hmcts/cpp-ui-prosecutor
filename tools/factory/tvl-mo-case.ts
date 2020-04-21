import { stageProsecutorCase } from '../contexts/staging';
import { build, SYSTEM_TVL_USER } from '../utils';
import { fetchCaseByUrn, TvlCaseDataBuilder } from '../helpers';

export const buildTvlCaseWithMultipleOffences = async (postedDays?: number, numberOfOffences?: number) => {
  const caseDataBuilder = TvlCaseDataBuilder.createCaseDataForMultipleOffences(
    null,
    postedDays,
    numberOfOffences
  );

  await stageProsecutorCase(caseDataBuilder.getData(), SYSTEM_TVL_USER);
  const kase = await fetchCaseByUrn(caseDataBuilder.getUrn());

  return kase;
};

export const createTvlCaseWithMultipleOffences = build(
  'Build tvl case with multiple offences',
  buildTvlCaseWithMultipleOffences
);
