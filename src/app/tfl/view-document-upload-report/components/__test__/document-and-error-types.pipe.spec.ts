import { DocumentAndErrorTypesPipe } from '../../document-and-error-types.pipe';

describe('DocumentAndErrorPipe', () => {
  const pipe = new DocumentAndErrorTypesPipe();

  it('should return correct label for upload status', () => {
    expect(pipe.transform('SJPN')).toBe('SJP Notice');
    expect(pipe.transform('WS')).toBe('Witness statement');
    expect(pipe.transform('PLEA')).toBe('Plea');
    expect(pipe.transform('CITN')).toBe('Previous convictions');
    expect(pipe.transform('NO_CASE_FOUND')).toBe('Doesn’t belong to an SJP case – remove');
    expect(pipe.transform('DUPLICATED_DOCUMENT')).toBe('Already sent to court – remove');
    expect(pipe.transform('WRONG_FILE_FORMAT')).toBe('Wrong file type – must be a text file, word document or pdf');
    expect(pipe.transform('DEFENDANT_NAME_NOT_MATCHING')).toBe(
      'The first and last names on the documents you have uploaded do not match for this case. Please review and amend'
    );
    expect(pipe.transform('WRONG_FILE_NAME')).toBe('Wrong file name or file type');
    expect(pipe.transform('CASE_REFERRED_FOR_COURT_HEARING')).toBe(
      'Document rejected as case referred to open court no longer in ATCM'
    );
    expect(pipe.transform('')).toBe('-');
  });
});
