import { FullNamePipe } from './full-name.pipe';

describe('FullNamePipe', () => {
  const person = {
    firstName: 'jean claude',
    lastName: 'van Damme'
  };
  let pipe: FullNamePipe<{ firstName: string; lastName: string }>;

  beforeEach(() => {
    pipe = new FullNamePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('returns the full name for the person', () => {
    expect(pipe.transform(person)).toBe('Jean Claude van Damme');
    expect(
      pipe.transform({
        firstName: '',
        lastName: ''
      })
    ).toBe('');
    expect(pipe.transform({} as any, true)).toBe('');
  });

  it('returns the full name with lastName in uppercase for the person', () => {
    expect(pipe.transform(person, true)).toBe('Jean Claude VAN DAMME');
  });
});
