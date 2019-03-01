import { Pipe, PipeTransform } from '@angular/core';
import { Defendant } from '../../../search/search.interface';

@Pipe({ name: 'defendantNamePipe' })
export class DefendantNamePipe implements PipeTransform {
  transform(defendant: Defendant): string {
    return defendant.firstName.toUpperCase() + ` ` + defendant.lastName;
  }
}
