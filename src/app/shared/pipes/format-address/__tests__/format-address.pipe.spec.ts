import { FormatAddressPipe } from '../format-address.pipe';
import { Address } from '../../../../contexts/sjp';

describe('FormatAddressPipe', () => {
  const pipe = new FormatAddressPipe();
  it('should transform address to one string with default(space) option', () => {
    const result = pipe.transform({
      address1: '',
      address2: 'a\n',
      address3: null,
      address4: 'b',
      postcode: ''
    } as Address);
    expect(result).toEqual('a b');
  });

  it('should transform address to one string with comma', () => {
    const result = pipe.transform(
      {
        address1: 'a\n',
        address2: 'b',
        address3: null,
        address4: 'c',
        postcode: 'd\ne'
      } as Address,
      ','
    );
    expect(result).toEqual('a,b,c,d,e');
  });

  it('should return null if address is null', () => {
    const result = pipe.transform(null, ',');
    expect(result).toBe(null);
  });
});
