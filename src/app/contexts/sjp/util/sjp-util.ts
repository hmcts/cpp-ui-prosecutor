import * as moment from 'moment';

export const isUnderAge = (chargeDate: string, dateOfBirth: string): boolean => {
  return moment(chargeDate).diff(dateOfBirth, 'years') < 18;
};
