import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'dash' })
export class DashPipe implements PipeTransform {
  transform(text) {
    if (text === undefined || text === null || text === '') {
      return '-';
    }
    return text;
  }
}
