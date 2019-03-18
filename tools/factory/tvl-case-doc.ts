import { stageDocument } from '../contexts/staging';
import { build, SYSTEM_TVL_USER } from '../utils';
import { fetchCaseDocument } from '../helpers';
import { ProsecutorCaseDataBuilder } from '../helpers/prosecutor-case-data-builder';
import { buildTvlBasicCase } from './tvl-basic-case';

export const buildTvlCaseWithDoc = async (postedDays = 28) => {
  const kase = await buildTvlBasicCase(postedDays);
  await stageDocument(ProsecutorCaseDataBuilder.createSjpnDocData(kase.urn), SYSTEM_TVL_USER);
  const caseWithDocuments = await fetchCaseDocument(kase.urn);
  return caseWithDocuments;
};

export const createTvlCaseWithDoc = build('Build tvl case with multiple offences and SJPN doc', buildTvlCaseWithDoc);
