import { IfEmptyPipe } from '../if-empty.pipe';

describe('IfEmptyPipe', () => {
  const pipe = new IfEmptyPipe();

  it('should return default char if empty', () => {
    expect(pipe.transform(null, '–')).toBe('–');
    expect(pipe.transform(undefined)).toBe('');
    expect(pipe.transform('', '–')).toBe('–');
  });
});
