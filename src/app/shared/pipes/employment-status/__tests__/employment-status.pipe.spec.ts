import { EmploymentStatusPipe } from '../employment-status.pipe';
import { Employment } from '../../../../contexts/sjp';

describe('EmploymentStatusPipe', () => {
  const pipe = new EmploymentStatusPipe();

  it('should return employment status if empty', () => {
    expect(pipe.transform({} as Employment)).toBe(`Don't know`);
  });

  it('should return correct label for employment type', () => {
    expect(pipe.transform({ status: 'EMPLOYED' } as Employment)).toBe('Employed');
    expect(
      pipe.transform({
        status: 'OTHER',
        details: 'other details'
      } as Employment)
    ).toBe('other details');
  });
});
