import {NgModule} from '@angular/core';
import {SjpCurrencyPipe} from './sjp-currency.pipe';

@NgModule({
    declarations: [SjpCurrencyPipe],
    exports: [SjpCurrencyPipe]
})
export class SjpCurrencyPipeModule {
}
