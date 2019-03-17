import { build, TFL_USER } from '../utils';
import { fetchCaseWithCondition } from '../helpers';
import { withdrawOffences } from '../contexts/sjp';
import { buildTflBasicCase } from './tfl-basic-case';

export const buildTflCaseWithdrawOffence = async (postedDays = 28) => {
  const kase = await buildTflBasicCase(postedDays);
  await withdrawOffences(kase.id, TFL_USER);
  return await fetchCaseWithCondition(kase.urn, ({ defendant }) =>
    defendant.offences.some(({ pendingWithdrawal }) => !!pendingWithdrawal)
  );
};

export const createTflCaseWithdrawOffence = build('Build tfl case with withdraw offence', buildTflCaseWithdrawOffence);
