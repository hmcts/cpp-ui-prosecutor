import { Pipe, PipeTransform } from '@angular/core';
import { PleaseStatus } from '../../../contexts/sjp';

export const pleaseStatusMap = {
  GUILTY: 'Notified Guilty',
  GUILTY_CASE_COMPLETED: 'Pleaded Guilty SJP',
  GUILTY_REQUEST_HEARING: 'Notified Guilty - court hearing requested',
  NOT_GUILTY: 'Notified Not Guilty',
  NO_PLEA: 'No plea received'
};

@Pipe({ name: 'pleaStatus' })
export class PleaStatusPipe implements PipeTransform {
  transform(pleaStatus: PleaseStatus, defaultStatus = 'NO_PLEA'): string {
    return pleaStatus ? pleaseStatusMap[pleaStatus] : pleaseStatusMap[defaultStatus];
  }
}
