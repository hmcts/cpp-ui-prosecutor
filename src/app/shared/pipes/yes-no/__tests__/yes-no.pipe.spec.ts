import { YesNoPipe } from '../yes-no.pipe';

describe('YesNoPipe', () => {
  const pipe = new YesNoPipe();

  it('should return default char if empty', () => {
    expect(pipe.transform(true)).toBe('Yes');
    expect(pipe.transform(false)).toBe('No');
  });
});
