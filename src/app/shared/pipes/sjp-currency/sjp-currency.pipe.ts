import {Pipe, PipeTransform} from '@angular/core';
import {formatCurrency} from '../../../contexts/sjp/util/sjp-util';

@Pipe({name: 'sjpCurrency'})
export class SjpCurrencyPipe implements PipeTransform {
    transform(value: any): string {
        return formatCurrency(value);
    }
}
