import { Pipe, PipeTransform } from '@angular/core';
import { DisqualificationPeriod } from '../../../contexts/sjp';

export const periodMapPlural = {
  DAY: 'days',
  MONTH: 'months',
  YEAR: 'years'
};

export const periodMapSingular = {
  DAY: 'day',
  MONTH: 'month',
  YEAR: 'year'
};

@Pipe({
    name: 'disqualificationPeriod',
})
export class DisqualificationPeriodPipe implements PipeTransform {
  transform(period: DisqualificationPeriod): string {
    if (period == null) {
      return '';
    }
    if (period.value < 2) {
      return period.value + ' ' + periodMapSingular[period.unit];
    }
    return period.value + ' ' + periodMapPlural[period.unit];
  }
}
