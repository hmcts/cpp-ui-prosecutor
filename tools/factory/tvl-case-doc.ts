import { stageDocument } from '../contexts/staging';
import { build, SYSTEM_TVL_USER } from '../utils';
import { fetchCaseDocument, CaseDataBuilder } from '../helpers';
import { buildTvlCaseWithMultipleOffences } from './tvl-mo-case';

export const buildTvlCaseWithDoc = async (postedDays?: number, numberOfOffences?: number) => {
  const kase = await buildTvlCaseWithMultipleOffences(postedDays, numberOfOffences);
  await stageDocument(CaseDataBuilder.createSjpnDocData(kase.urn), SYSTEM_TVL_USER);
  const caseWithDocuments = await fetchCaseDocument(kase.urn);
  return caseWithDocuments;
};

export const createTvlCaseWithDoc = build('Build tvl case with multiple offences and SJPN doc', buildTvlCaseWithDoc);
