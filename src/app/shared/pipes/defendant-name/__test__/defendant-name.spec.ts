import { DefendantNamePipe } from '../defendant-name.pipe';
import { Defendant } from '../../../../search/search.interface';

const DEFENDANT: Defendant = {
  dateOfBirth: '',
  outdated: false,
  firstName: 'John',
  lastName: 'Doe'
};

const DEFENDANT_NAME_EXPECTED = 'JOHN Doe';

describe('Case Prosecutor Pipe', () => {
  let pipe: DefendantNamePipe;

  beforeEach(() => {
    pipe = new DefendantNamePipe();
  });

  it('should map the defendant object to a string with first name in capital letters and last name capitalised', () => {
    expect(pipe.transform(DEFENDANT)).toEqual(DEFENDANT_NAME_EXPECTED);
  });
});
