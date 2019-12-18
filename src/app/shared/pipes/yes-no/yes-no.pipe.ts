import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'yesNo' })
export class YesNoPipe implements PipeTransform {
  transform(status: boolean): string {
    return status ? 'Yes' : 'No';
  }
}
