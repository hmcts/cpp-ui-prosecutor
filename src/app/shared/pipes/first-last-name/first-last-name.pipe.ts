import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'firstLastName' })
export class FirstLastNamePipe implements PipeTransform {
  transform({ firstName = '', lastName = '' }, reOrder = true, capitalize = true): string {
    const lName = capitalize ? lastName.toUpperCase() : lastName;
    return reOrder ? lName + ' ' + firstName : firstName + ' ' + lName;
  }
}
