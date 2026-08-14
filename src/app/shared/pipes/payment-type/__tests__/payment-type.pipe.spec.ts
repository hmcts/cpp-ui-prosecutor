import {PaymentTypePipe} from '../payment-type.pipe';

describe('PaymentTypePipe', () => {
    const pipe = new PaymentTypePipe();

    it('should return payment type', () => {
        expect(pipe.transform('PAY_TO_COURT')).toBe('Pay to court');
        expect(pipe.transform('ATTACH_TO_EARNINGS')).toBe('Attach to earnings');
        expect(pipe.transform('DEDUCT_FROM_BENEFITS')).toBe('Deduct from benefits');
        expect(pipe.transform(null)).toBe('');
    });
});
