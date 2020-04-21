import { Pipe, PipeTransform } from '@angular/core';

export const verdictTypeMap = {
  PROVED_SJP: 'Proved SJP',
  FOUND_NOT_GUILTY: 'Found not guilty',
  FOUND_GUILTY: 'Guilty plea accepted',
  NO_VERDICT: 'NO_VERDICT'
};

@Pipe({ name: 'verdictType' })
export class VerdictTypePipe implements PipeTransform {
  transform(verdict: string): string {
    return verdictTypeMap[verdict] || 'UNKNOWN VERDICT:' + verdict;
  }
}
