import { VerdictTypePipe } from '../verdict-type.pipe';

describe('VerdictTypePipe', () => {
  const pipe = new VerdictTypePipe();

  it('should return unknown if invalid verdict', () => {
    expect(pipe.transform('ABC')).toBe('UNKNOWN VERDICT:ABC');
  });

  it('should return correct label for employment type', () => {
    expect(pipe.transform('PROVED_SJP')).toBe('Proved SJP');
    expect(pipe.transform('FOUND_NOT_GUILTY')).toBe('Found Not Guilty');
    expect(pipe.transform('FOUND_GUILTY')).toBe('Found Guilty');
    expect(pipe.transform('NO_VERDICT')).toBe('NO_VERDICT');
  });
});
