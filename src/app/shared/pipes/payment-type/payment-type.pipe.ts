import {Pipe, PipeTransform} from '@angular/core';
import {PaymentType} from '../../../contexts/sjp';

@Pipe({
    name: 'paymentType'
})
export class PaymentTypePipe implements PipeTransform {
    transform(paymentType: PaymentType): string {
        switch (paymentType) {
            case 'PAY_TO_COURT':
                return 'Pay to court';
            case 'ATTACH_TO_EARNINGS':
                return 'Attach to earnings';
            case 'DEDUCT_FROM_BENEFITS':
                return 'Deduct from benefits';
            default:
                return '';
        }
    }
}
