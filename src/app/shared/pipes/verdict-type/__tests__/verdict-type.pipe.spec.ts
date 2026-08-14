import { VerdictTypePipe } from '../verdict-type.pipe';

describe('VerdictTypePipe', () => {
  const pipe = new VerdictTypePipe();

  it('should return unknown if invalid verdict', () => {
    expect(pipe.transform('ABC')).toBe('UNKNOWN VERDICT:ABC');
  });

  it('should return correct label for employment type', () => {
    expect(pipe.transform('PROVED_SJP')).toBe('Proved SJP');
    expect(pipe.transform('FOUND_NOT_GUILTY')).toBe('Found not guilty');
    expect(pipe.transform('FOUND_GUILTY')).toBe('Guilty plea accepted');
    expect(pipe.transform('NO_VERDICT')).toBe('NO_VERDICT');
  });
});
