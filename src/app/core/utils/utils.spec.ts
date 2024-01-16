import * as utils from './utils';
import { Prosecutor } from '@cpp/reference-data';

describe('utils', () => {
  it('filterByCpsFlag', () => {
    expect(utils.filterByCpsFlag(true)({ cpsFlag: true } as Prosecutor)).toBe(true);
    expect(utils.filterByCpsFlag(false)({ cpsFlag: true } as Prosecutor)).toBe(false);
    expect(utils.filterByCpsFlag()({ cpsFlag: false } as Prosecutor)).toBe(false);
  });
});
