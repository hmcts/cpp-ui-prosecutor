import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'ifEmpty' })
export class IfEmptyPipe implements PipeTransform {
  transform(val: string | number, fallBackString: string = ''): string | number {
    if (val === 0) {
      return val;
    }

    return !val || val + ''.trim() === '' ? fallBackString : val;
  }
}
