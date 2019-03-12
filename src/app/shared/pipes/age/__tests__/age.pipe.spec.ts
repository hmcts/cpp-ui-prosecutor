import { AgePipe } from '../age.pipe';

describe('AgePipe', () => {
  const pipe = new AgePipe();

  beforeEach(() => {
    Date.now = jest.fn(() => Date.parse('2017-02-14'));
  });

  it('should return the age', () => {
    expect(pipe.transform('2000-02-11')).toBe(17);
    expect(pipe.transform('1983-03-11')).toBe(33);
    expect(pipe.transform('1999-02-11')).toBe(18);
  });
});
