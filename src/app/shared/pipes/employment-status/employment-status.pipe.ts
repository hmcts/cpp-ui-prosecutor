import { Pipe, PipeTransform } from '@angular/core';
import { Employment } from '../../../contexts/sjp';

export const employmentStatusMap = {
  EMPLOYED: 'Employed',
  SELF_EMPLOYED: 'Self employed',
  UNEMPLOYED: 'Unemployed',
  UNKNOWN: `Don't know`,
  OTHER: 'Other'
};

@Pipe({ name: 'employmentStatus' })
export class EmploymentStatusPipe implements PipeTransform {
  transform(employment: Employment, defaultStatus = employmentStatusMap.UNKNOWN): string {
    if (employment && employment.status) {
      if (employment.status === 'OTHER') {
        return employment.details || employmentStatusMap.OTHER;
      }
      return employmentStatusMap[employment.status];
    }
    return defaultStatus;
  }
}
