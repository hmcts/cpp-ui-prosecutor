import { stageTflCase } from '../contexts/staging';
import { build, TFL_USER } from '../utils';
import { fetchCaseByUrn, TflCaseDataBuilder } from '../helpers';

export const buildTflBasicCase = async () => {
  const caseDataBuilder = TflCaseDataBuilder.createCaseDataForTfl();

  await stageTflCase(caseDataBuilder.buildStagingParam(), TFL_USER);
  const kase = await fetchCaseByUrn(caseDataBuilder.getUrn());

  return kase;
};

export const createBasicTflCase = build('Basic tfl case', buildTflBasicCase);
