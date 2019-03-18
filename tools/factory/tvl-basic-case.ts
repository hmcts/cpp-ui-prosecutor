import { stageProsecutorCase } from '../contexts/staging';
import { build, SYSTEM_TVL_USER } from '../utils';
import { fetchCaseByUrn, ProsecutorCaseDataBuilder } from '../helpers';

export const buildTvlBasicCase = async (postedDays = 28) => {
  const caseDataBuilder = ProsecutorCaseDataBuilder.createCaseDataForTvl(null, postedDays);

  await stageProsecutorCase(caseDataBuilder.getData(), SYSTEM_TVL_USER);
  return await fetchCaseByUrn(caseDataBuilder.getUrn());
};

export const createBasicTvlCase = build('Basic tvl case', buildTvlBasicCase);
