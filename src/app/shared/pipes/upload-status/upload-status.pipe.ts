import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'uploadStatus' })
export class UploadStatusPipe implements PipeTransform {
  transform(uploadStatus: string): string {
    switch (uploadStatus) {
      case 'SJPN':
        return 'SJP Notice';
      case 'WS':
        return 'Witness statement';
      case 'PLEA':
        return 'Plea';
      case 'CITN':
        return 'Previous convictions';
      case 'NO_CASE_FOUND':
        return 'Doesn’t belong to an SJP case – remove';
      case 'DUPLICATED_DOCUMENT':
        return 'Already sent to court – remove';
      case 'WRONG_FILE_FORMAT':
        return 'Wrong file type – must be a text file, word document or pdf';
      case 'DEFENDANT_NAME_NOT_MATCHING':
        return 'The first and last names on the documents you have uploaded do not match for this case. Please review and amend';
      case 'WRONG_FILE_NAME':
        return 'Wrong file name or file type';
      case 'CASE_REFERRED_FOR_COURT_HEARING':
        return 'Document rejected as case referred to open court no longer in ATCM';
      case 'SUCCEEDED':
      case 'COMPLETED':
        return 'Sent to court';
      case 'FAILED':
        return 'Rejected – errors found';
      case 'PROCESSING':
      case 'ACCEPTED':
      default:
        return 'Being checked';
    }
  }
}
