import { DefendantNamePipe } from '../defendant-name.pipe';

const DEFENDANT = {
  firstName: 'John',
  lastName: 'Doe'
};

describe('Case Prosecutor Pipe', () => {
  let pipe: DefendantNamePipe;

  beforeEach(() => {
    pipe = new DefendantNamePipe();
  });

  it('should re-order and capitalize the last name', () => {
    expect(pipe.transform(DEFENDANT)).toEqual('DOE John');
  });

  it('should not re-order but capitalize the last name', () => {
    expect(pipe.transform(DEFENDANT, false)).toEqual('John DOE');
  });

  it('should not re-order and capitalize the last name', () => {
    expect(pipe.transform(DEFENDANT, false, false)).toEqual('John Doe');
  });
});
