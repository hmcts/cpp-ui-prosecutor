import { PleaStatusPipe } from '../plea-status.pipe';

describe('PleaStatusPipe', () => {
  const pipe = new PleaStatusPipe();

  it('should return default please label if empty', () => {
    expect(pipe.transform(null)).toBe('No plea received');
  });

  it('should return correct label for plea type', () => {
    expect(pipe.transform('GUILTY')).toBe('Notified Guilty');
    expect(pipe.transform('NOT_GUILTY')).toBe('Notified Not Guilty');
  });
});
