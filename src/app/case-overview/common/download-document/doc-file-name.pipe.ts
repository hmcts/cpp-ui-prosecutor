import { Pipe, PipeTransform } from '@angular/core';
import { CaseDocumentType } from '../../../contexts/sjp';

export const fileNameMap = {
  SJPN: 'SJP notice',
  PLEA: 'Plea',
  EMPLOYER_ATTACHMENT_TO_EARNINGS: `Employer's AEO`,
  RESULT_ORDER: 'Result order'
};

@Pipe({ name: 'docFileName' })
export class DocFileNamePipe implements PipeTransform {
  transform(type: CaseDocumentType): string {
    return fileNameMap[type];
  }
}
