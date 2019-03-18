import { stageTflCase } from '../contexts/staging';
import { build, TFL_USER } from '../utils';
import { fetchCaseByUrn, TflCaseDataBuilder } from '../helpers';

export const buildTflBasicCase = async (postedDays = 28) => {
  const caseDataBuilder = TflCaseDataBuilder.createCaseDataForTfl(null, postedDays);

  await stageTflCase(caseDataBuilder.buildStagingParam(), TFL_USER);
  return await fetchCaseByUrn(caseDataBuilder.getUrn());
};

export const createBasicTflCase = build('Basic tfl case', buildTflBasicCase);
