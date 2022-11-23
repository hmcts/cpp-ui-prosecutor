import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'defendantName' })
export class DefendantNamePipe implements PipeTransform {
  transform({ firstName = '', lastName = '',  legalEntityName = ''}, reOrder = true, capitalize = true): string {
    if (!!legalEntityName) {
      return legalEntityName.charAt(0).toUpperCase() + legalEntityName.slice(1);
    }

    firstName = firstName ? firstName.charAt(0).toUpperCase() + firstName.slice(1) : firstName;
    lastName = capitalize ? lastName.toUpperCase() : lastName;

    return !lastName
      ? firstName
      : reOrder
        ? `${lastName} ${firstName}`
        : `${firstName} ${lastName}`;
  }
}
