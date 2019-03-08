import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

/**
 * Pipe that overrides `AM|PM` of formatted date to `am|pm`
 */
@Pipe({ name: 'formatDate' })
export class FormatDatePipe implements PipeTransform {
  private datePipe: DatePipe = new DatePipe('en-GB');

  transform(isoDateString: string, pattern?: string): string {
    return this.datePipe.transform(isoDateString, pattern).replace(/(AM|PM)/gm, match => match.toLowerCase());
  }
}
