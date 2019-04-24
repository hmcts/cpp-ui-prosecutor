import {build} from '../utils';
import {fetchCaseWithCondition} from '../helpers';
import {updateDefendantDetails} from '../contexts/sjp';
import {CaseDataBuilder} from '../helpers/case-data-builder';
import {buildTvlBasicCase} from './tvl-basic-case';

export const buildTvlDefendantDetailsUpdatesCase = async (postedDays = 28) => {
  const kase = await buildTvlBasicCase(postedDays);
  const updatedDateOfBirth = '2005-07-15';

  await updateDefendantDetails(kase.id, kase.defendant.id, CaseDataBuilder.buildDefendantDetailsUpdatesPayload(kase, updatedDateOfBirth));

  return await fetchCaseWithCondition(kase.urn, ({defendant}) => defendant.personalDetails.dobChanged);
};

export const createTvlDefendantDetailsUpdatesCase = build('Build tvl case with defendant details updates',
  buildTvlDefendantDetailsUpdatesCase);
