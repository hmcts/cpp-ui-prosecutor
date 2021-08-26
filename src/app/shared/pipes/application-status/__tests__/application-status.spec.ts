import { ApplicationStatusPipe } from '../application-status.pipe';

describe('Application Status Pipe', () => {
  let pipe: ApplicationStatusPipe;

  beforeEach(() => {
    pipe = new ApplicationStatusPipe();
  });

  it('should map STATUTORY_DECLARATION_PENDING', () => {
    expect(pipe.transform('STATUTORY_DECLARATION_PENDING')).toEqual('Statutory declaration pending');
  });

  it('should default to return the same as is sent', () => {
    expect(pipe.transform('UNEXPEXTED')).toEqual('UNEXPEXTED');
  });
});
