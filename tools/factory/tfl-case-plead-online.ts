import { build } from '../utils';
import { pleadOnline } from '../contexts/sjp';
import { CaseDataBuilder } from '../helpers/case-data-builder';
import { buildTflBasicCase } from './tfl-basic-case';
import { Case } from '../../src/app/contexts/sjp';

export const buildTflCaseAndPleadOnline = async (postedDays = 28) => {
  const kase: Case = await buildTflBasicCase(postedDays);
  const body = CaseDataBuilder.buildPleadOnlinePayload(kase);
  await pleadOnline(kase.id, kase.defendant.id, body);

  return kase;
};

export const createTflCaseAndPleadOnline = build('Build tfl case and plead online', buildTflCaseAndPleadOnline);
