import { DocFileNamePipe } from '../doc-file-name.pipe';

describe('DocFileNamePipe', () => {
  const pipe = new DocFileNamePipe();

  it('should return the age', () => {
    expect(pipe.transform('SJPN')).toBe('SJP notice');
    expect(pipe.transform('PLEA')).toBe('Plea');
    expect(pipe.transform('CITN')).toBe('Previous convictions');
    expect(pipe.transform('EMPLOYER_ATTACHMENT_TO_EARNINGS')).toBe(`Employer's AEO`);
    expect(pipe.transform('APPLICATION')).toBe('Application');
  });
});
