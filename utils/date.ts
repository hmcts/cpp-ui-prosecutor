import moment from 'moment';

export const subtractDays = (days: number) => {
  return moment(moment().subtract(days, 'days')).format('YYYY-MM-DD');
};

export const formatDate = (date: string, format = 'D MMM YYYY') => {
  return moment(date, 'YYYY-MM-DD').format(format);
};

export const getAgeFromDate = datePartials => {
  const date = moment(datePartials, 'YYYY-MM-DD');
  return moment().diff(date, 'years');
};
