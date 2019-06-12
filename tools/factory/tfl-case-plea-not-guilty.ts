import { build } from '../utils';
import { fetchCaseWithCondition } from '../helpers';
import { pleadGuilty } from '../contexts/sjp';
import { CaseDataBuilder } from '../helpers/case-data-builder';
import { buildTflBasicCase } from './tfl-basic-case';

export const buildTflCaseAndPleadNotGuilty = async (postedDays = 28) => {
  const kase = await buildTflBasicCase(postedDays);

  await pleadGuilty(
    kase.defendant.offences[0].id,
    kase.id,
    CaseDataBuilder.buildPleadNotGuiltyPayload(kase.defendant.offences[0].id, kase.defendant.id)
  );

  return await fetchCaseWithCondition(kase.urn, ({ defendant }) =>
    defendant.offences.some(({ plea }) => plea && plea === 'NOT_GUILTY')
  );
};

export const createTflCaseAndPleadNotGuilty = build(
  'Build tfl case and plead not guilty',
  buildTflCaseAndPleadNotGuilty
);
