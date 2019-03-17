import { build, TVL_USER } from '../utils';
import { fetchCaseWithCondition } from '../helpers';
import { withdrawOffences } from '../contexts/sjp';
import { buildTvlBasicCase } from './tvl-basic-case';

export const buildTvlCaseWithdrawOffence = async (postedDays = 28) => {
  const kase = await buildTvlBasicCase(postedDays);
  await withdrawOffences(kase.id, TVL_USER);
  return await fetchCaseWithCondition(kase.urn, ({ defendant }) =>
    defendant.offences.some(({ pendingWithdrawal }) => !!pendingWithdrawal)
  );
};

export const createTvlCaseWithdrawOffence = build('Build tvl case with withdraw offence', buildTvlCaseWithdrawOffence);
