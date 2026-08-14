import { Pipe, PipeTransform } from '@angular/core';
import { Address } from '../../../contexts/sjp';

@Pipe({
  name: 'formatAddress'
})
export class FormatAddressPipe implements PipeTransform {
  transform(address: Address, joinBy: string = ' '): string {
    if (!address) {
      return null;
    }

    return Object.entries(address)
      .sort((a, b) => (a[0] > b[0] ? 1 : 0))
      .map(entry => entry[1] && entry[1].trim().replace(/\n/g, joinBy))
      .filter(value => !!value)
      .join(joinBy);
  }
}
