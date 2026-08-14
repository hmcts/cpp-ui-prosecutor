import { Pipe, PipeTransform } from '@angular/core';
import { CaseDocumentType } from '../../../contexts/sjp';

export const fileNameMap = {
  SJPN: 'SJP notice',
  PLEA: 'Plea',
  CITN: 'Previous convictions',
  EMPLOYER_ATTACHMENT_TO_EARNINGS: `Employer's AEO`,
  RESULT_ORDER: 'Result order',
  APPLICATION: 'Application',
};

@Pipe({
    name: 'docFileName',
})
export class DocFileNamePipe implements PipeTransform {
  transform(type: CaseDocumentType): string {
    return fileNameMap[type];
  }
}
