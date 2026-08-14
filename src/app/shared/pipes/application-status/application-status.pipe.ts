import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'applicationStatus' })
export class ApplicationStatusPipe implements PipeTransform {
  transform(key: string): string {
    const applicationStatuses = {
      STATUTORY_DECLARATION_PENDING: 'Statutory declaration pending',
      STATUTORY_DECLARATION_GRANTED: 'Statutory declaration granted',
      STATUTORY_DECLARATION_REFUSED: 'Statutory declaration refused',
      STATUTORY_DECLARATION_WITHDRAWN: 'Statutory declaration withdrawn',
      REOPENING_PENDING: 'Re-opening pending',
      REOPENING_GRANTED: 'Re-opening granted',
      REOPENING_REFUSED: 'Re-opening refused',
      REOPENING_WITHDRAWN: 'Re-opening withdrawn',
      APPEAL_PENDING: 'Appeal pending',
      APPEAL_ALLOWED: 'Appeal allowed',
      APPEAL_REFUSED: 'Appeal refused',
      APPEAL_WITHDRAWN: 'Appeal withdrawn',
      APPEAL_DISMISSED: 'Appeal dismissed',
      APPEAL_ABANDONED: 'Appeal abandoned',
      APPLICATION_STATUS_NOT_KNOWN: 'Application status not known',
      APPLICATION_DISMISSED_SENTENCE_VARIED: 'Application dismissed sentence varied'
    };
    return applicationStatuses.hasOwnProperty(key) ? applicationStatuses[key] : key;
  }
}
