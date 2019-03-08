import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'ifEmpty' })
export class IfEmptyPipe implements PipeTransform {
  transform(val: string, fallBackString: string = ''): string {
    return !val || val.trim() === '' ? fallBackString : val;
  }
}
