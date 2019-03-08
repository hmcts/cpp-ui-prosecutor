import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'caseProsecutor' })
export class CaseProsecutorPipe implements PipeTransform {
  transform(content: string): string {
    switch (content) {
      case 'TFL':
        return 'Transport for London';
      case 'TVL':
        return 'TV Licensing';
      default:
        return content;
    }
  }
}
