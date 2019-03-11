import { stageProsecutorCase } from '../contexts/staging';
import { build, TVL_USER } from '../utils';
import { fetchCaseByUrn, ProsecutorCaseDataBuilder } from '../helpers';

export const buildTvlBasicCase = async () => {
  const caseDataBuilder = ProsecutorCaseDataBuilder.createCaseDataForTvl();

  await stageProsecutorCase(caseDataBuilder.getData(), TVL_USER);
  const kase = await fetchCaseByUrn(caseDataBuilder.getUrn());

  return kase;
};

export const createBasicTvlCase = build('Basic tvl case', buildTvlBasicCase);
