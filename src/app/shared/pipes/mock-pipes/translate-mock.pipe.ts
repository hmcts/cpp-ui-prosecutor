import { Pipe, PipeTransform } from '@angular/core';
import { values } from 'lodash';
@Pipe({ name: 'translate' })
export class TranslateMockPipe implements PipeTransform {
  transform(value: string, params: { [key: string]: string }): string {
    return `${value}${params && values(params).length ? ', translated with ' + JSON.stringify(params) : ''}`;
  }
}
