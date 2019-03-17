import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

/**
 * Pipe that overrides `AM|PM` of formatted date to `am|pm`
 */
@Pipe({ name: 'formatDate' })
export class FormatDatePipe implements PipeTransform {
  private datePipe: DatePipe = new DatePipe('en-GB');

  transform(isoDateString: string, pattern?: string): string {
    const formattedDate = this.datePipe.transform(isoDateString, pattern);
    return formattedDate && formattedDate.replace(/(AM|PM)/gm, match => match.toLowerCase());
  }
}
