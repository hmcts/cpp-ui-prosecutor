import { build } from '../utils';
import { fetchCaseWithCondition } from '../helpers';
import { pleadGuilty } from '../contexts/sjp';
import { CaseDataBuilder } from '../helpers/case-data-builder';
import { buildTvlBasicCase } from './tvl-basic-case';

export const buildTvlPleadNotGuiltyCase = async (postedDays = 28) => {
  const kase = await buildTvlBasicCase(postedDays);

  await pleadGuilty(
    kase.defendant.offences[0].id,
    kase.id,
    CaseDataBuilder.buildPleadNotGuiltyPayload(kase.defendant.offences[0].id, kase.defendant.id)
  );

  return await fetchCaseWithCondition(kase.urn, ({ defendant }) =>
    defendant.offences.some(({ plea }) => plea && plea === 'NOT_GUILTY')
  );
};

export const createTvlPleadNotGuiltyCase = build('Build tvl case and plead not guilty', buildTvlPleadNotGuiltyCase);
