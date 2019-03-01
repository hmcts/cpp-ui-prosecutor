import { CaseProsecutorPipe } from '../case-prosecutor.pipe';

const TFL = {
  actual: 'TFL',
  expected: 'Transport for London'
};

const TVL = {
  actual: 'TVL',
  expected: 'TV Licensing'
};

const UNEXPECTED = 'This is not expected';

describe('Case Prosecutor Pipe', () => {
  let pipe: CaseProsecutorPipe;

  beforeEach(() => {
    pipe = new CaseProsecutorPipe();
  });

  it('should map TFL to Transport for London', () => {
    expect(pipe.transform(TFL.actual)).toEqual(TFL.expected);
  });

  it('should map TVL to TV Licensing', () => {
    expect(pipe.transform(TVL.actual)).toEqual(TVL.expected);
  });

  it('should not map any other response', () => {
    expect(pipe.transform(UNEXPECTED)).toEqual(UNEXPECTED);
  });
});
