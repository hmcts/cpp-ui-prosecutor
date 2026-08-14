import { DisqualificationPeriodPipe } from '../disqualification-period.pipe';

describe('DisqualificationPeriodPipe', () => {
  const pipe = new DisqualificationPeriodPipe();

  it('should return disqualification period', () => {
    expect(pipe.transform({ value: 1, unit: 'DAY' })).toBe('1 day');
    expect(pipe.transform({ value: 1, unit: 'MONTH' })).toBe('1 month');
    expect(pipe.transform({ value: 1, unit: 'YEAR' })).toBe('1 year');
    expect(pipe.transform({ value: 2, unit: 'DAY' })).toBe('2 days');
    expect(pipe.transform({ value: 2, unit: 'MONTH' })).toBe('2 months');
    expect(pipe.transform({ value: 2, unit: 'YEAR' })).toBe('2 years');
    expect(pipe.transform(null)).toBe('');
  });
});
