import { Pipe, PipeTransform } from '@angular/core';

export interface PersonLike {
  firstName?: string;
  middleName?: string;
  lastName?: string;
}
@Pipe({ name: 'fullName' })
export class FullNamePipe<T extends PersonLike> implements PipeTransform {
  transform(person: T, capitalize = false): string {
    return fullName(person, capitalize);
  }
}

export function fullName<T extends PersonLike>(person: T, capitalize = false): string {
  const { firstName = '', middleName = '', lastName = '' } = person;

  return (
    (firstName ? firstLetterUpperCase(firstName) + ' ' : '') +
    (middleName ? firstLetterUpperCase(middleName) + ' ' : '') +
    (capitalize ? lastName.toUpperCase() : lastName)
  );
}

function firstLetterUpperCase(value: string): string {
  const names = value.split(' ');
  return names.map(name => name.substr(0, 1).toUpperCase() + name.substr(1, name.length - 1)).join(' ');
}
