import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({ name: 'age' })
export class AgePipe implements PipeTransform {
  transform(dateOfBirth: string): number {
    const date = moment(dateOfBirth, 'YYYY-MM-DD');
    return moment().diff(date, 'years');
  }
}
