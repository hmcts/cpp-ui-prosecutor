import { FormatDatePipe } from '../format-date.pipe';

describe('FormatDatePipe', () => {
  const pipe = new FormatDatePipe();

  it('should format the date with am', () => {
    const formattedDate = pipe.transform('2018-09-06T08:30:28', 'd MMMM yyyy, h:mmaa');
    expect(formattedDate).toBe('6 September 2018, 8:30am');
  });

  it('should format the date with pm', () => {
    const formattedDate = pipe.transform('2018-09-06T18:30:28', 'd MMMM yyyy, h:mmaa');
    expect(formattedDate).toBe('6 September 2018, 6:30pm');
  });

  it('should format the date without am|pm', () => {
    const formattedDate = pipe.transform('2018-09-06T18:30:28', 'd MMMM yyyy, h:mm');
    expect(formattedDate).toBe('6 September 2018, 6:30');
  });

  it('should return null if the value is empty or null', () => {
    expect(pipe.transform(null, 'd MMMM yyyy, h:mm')).toBe(null);
    expect(pipe.transform(undefined, 'd MMMM yyyy, h:mm')).toBe(null);
    expect(pipe.transform('', 'd MMMM yyyy, h:mm')).toBe(null);
  });
});
