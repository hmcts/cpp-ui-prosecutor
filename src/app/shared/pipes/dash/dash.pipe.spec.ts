import { DashPipe } from './dash.pipe';

describe('DashPipe', () => {
  it('should return input value if input is not empty, null or undefined', () => {
    const pipe = new DashPipe();
    const output = pipe.transform('Hello world');
    expect(output).toEqual('Hello world');
  });

  it('should return dash if input is empty string', () => {
    const pipe = new DashPipe();
    const output = pipe.transform('');
    expect(output).toEqual('-');
  });

  it('should return dash if input is null', () => {
    const pipe = new DashPipe();
    const output = pipe.transform(null);
    expect(output).toEqual('-');
  });

  it('should return dash if input is undefined', () => {
    const pipe = new DashPipe();
    const output = pipe.transform(undefined);
    expect(output).toEqual('-');
  });
});
