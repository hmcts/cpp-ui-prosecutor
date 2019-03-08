import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'caseStatus' })
export class CaseStatusPipe implements PipeTransform {
  transform(content: string): string {
    switch (content) {
      case 'COMPLETED':
        return 'Completed';
      case 'NO_PLEA_RECEIVED':
        return 'No plea received';
      case 'NO_PLEA_RECEIVED_READY_FOR_DECISION':
        return 'No plea received - ready for decision';
      case 'PLEA_RECEIVED_READY_FOR_DECISION':
        return 'Plea received - ready for decision';
      case 'PLEA_RECEIVED_NOT_READY_FOR_DECISION':
        return 'Plea received - not ready for decision';
      case 'WITHDRAWAL_REQUEST_READY_FOR_DECISION':
        return 'Withdrawal requested - ready for decision';
      case 'REFERRED_FOR_COURT_HEARING':
        return 'Referred for court hearing';
      case 'REOPENED_IN_LIBRA':
        return 'Reopened in Libra';
      default:
        return content;
    }
  }
}
