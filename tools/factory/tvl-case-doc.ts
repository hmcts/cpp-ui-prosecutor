import { stageDocument, stageProsecutorCase } from '../contexts/staging';
import { build, TVL_USER } from '../utils';
import { fetchCaseByUrn, fetchCaseDocument } from '../helpers';
import { ProsecutorCaseDataBuilder } from '../helpers/prosecutor-case-data-builder';

export const buildTvlCaseWithDoc = async () => {
  const caseDataBuilder = ProsecutorCaseDataBuilder.createCaseDataForMultipleOffences();

  await stageProsecutorCase(caseDataBuilder.getData(), TVL_USER);
  const kase = await fetchCaseByUrn(caseDataBuilder.getUrn());

  await stageDocument(ProsecutorCaseDataBuilder.createSjpnDocData(kase.urn), TVL_USER);
  const caseWithDocuments = await fetchCaseDocument(kase.urn);
  return caseWithDocuments;
};

export const createTvlCaseWithDoc = build('Build tvl case with multiple offences and sjpn doc', buildTvlCaseWithDoc);
