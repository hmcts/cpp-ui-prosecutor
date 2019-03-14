import { stageTflCase, stageTflDocument } from '../contexts/staging';
import { build, deleteFile, TFL_USER, zipDocFile } from '../utils';
import { fetchCaseByUrn, fetchCaseDocument, TflCaseDataBuilder } from '../helpers';

export const buildTflCaseWithDoc = async () => {
  const caseDataBuilder = TflCaseDataBuilder.createCaseDataForTfl();

  await stageTflCase(caseDataBuilder.buildStagingParam(), TFL_USER);
  const kase = await fetchCaseByUrn(caseDataBuilder.getUrn());

  const fileStream = await zipDocFile(caseDataBuilder.buildSjpnFileName());

  await stageTflDocument({ zipFile: fileStream }, TFL_USER);
  await deleteFile(fileStream.path);

  return await fetchCaseDocument(kase.urn);
};

export const createTflCaseWithDoc = build('Build tfl case with sjpn doc', buildTflCaseWithDoc);
