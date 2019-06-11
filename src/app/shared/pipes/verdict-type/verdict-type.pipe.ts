import { Pipe, PipeTransform } from '@angular/core';

export const verdictTypeMap = {
  PROVED_SJP: 'Proved SJP',
  FOUND_NOT_GUILTY: 'Found Not Guilty',
  FOUND_GUILTY: 'Found Guilty',
  NO_VERDICT: 'NO_VERDICT'
};

@Pipe({ name: 'verdictType' })
export class VerdictTypePipe implements PipeTransform {
  transform(verdict: string): string {
    return verdictTypeMap[verdict] || 'UNKNOWN VERDICT:' + verdict;
  }
}
