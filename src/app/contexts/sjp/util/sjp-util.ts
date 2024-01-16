import moment from 'moment';
import { CurrencyPipe } from '@angular/common';
import { Constants } from '../../../shared/pipes/constants';

export const isUnderAge = (chargeDate: string, dateOfBirth: string): boolean => {
  return !!dateOfBirth && moment(chargeDate).diff(dateOfBirth, 'years') < 18;
};

export const formatCurrency = (value: any): string => {
  let transformedValue = new CurrencyPipe(Constants.DEFAULT_LOCALE).transform(value, 'GBP', 'symbol-narrow', '1.0-2');
  if (transformedValue && transformedValue.lastIndexOf('.') === transformedValue.length - 2) {
    return (transformedValue += '0');
  }
  return transformedValue;
};

export const formatString = (value: string, ...args): string => {
  return value.replace(/{(\d+)}/g, (match, index) => {
    return typeof args[index] !== 'undefined' ? args[index] : match;
  });
};
