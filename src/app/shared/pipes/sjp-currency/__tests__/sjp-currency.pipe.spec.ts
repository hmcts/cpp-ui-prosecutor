import {SjpCurrencyPipe} from '../sjp-currency.pipe';

describe('SjpCurrencyPipe', () => {
    const pipe = new SjpCurrencyPipe();

    it('should transform currency', () => {
        expect(pipe.transform(null)).toBe(null);
        expect(pipe.transform('1')).toBe('£1');
        expect(pipe.transform('1.3')).toBe('£1.30');
        expect(pipe.transform('0.3')).toBe('£0.30');
        expect(pipe.transform('0.00')).toBe('£0');
        expect(pipe.transform('0.8949')).toBe('£0.89');
        expect(pipe.transform('1.30')).toBe('£1.30');
        expect(pipe.transform('1.34')).toBe('£1.34');
        expect(pipe.transform('1.340')).toBe('£1.34');
        expect(pipe.transform('1.368')).toBe('£1.37');
        expect(pipe.transform('1.365')).toBe('£1.37');
        expect(pipe.transform('1.364')).toBe('£1.36');
        expect(pipe.transform('1234.3')).toBe('£1,234.30');
        expect(pipe.transform('1234.37')).toBe('£1,234.37');
        expect(pipe.transform('999999.999999999')).toBe('£1,000,000');
    });
});
