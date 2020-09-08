import { NgModule } from '@angular/core';
import { PdkCoreModule, PdkDateInputModule, PdkFormModule } from '@cpp/pdk';
import { CommonModule } from '@angular/common';
import { FromToDatesModule } from './from-to-dates/from-to-dates.module';
import { DateOfBirthModule } from './date-of-birth/date-of-birth.module';
import {
  AgePipeModule,
  CaseStatusPipeModule,
  DefendantNamePipeModule,
  FirstLastNamePipeModule,
  FormatAddressPipeModule,
  FormatDatePipeModule,
  IfEmptyPipeModule,
  PleaStatusPipeModule,
  YesNoPipeModule
} from './pipes';
import { PaymentTypePipeModule } from './pipes/payment-type/payment-type-pipe.module';
import { SjpCurrencyPipeModule } from './pipes/sjp-currency/sjp-currency.module';
import { TranslateModule } from '@ngx-translate/core';
import { BreadcrumbLinksModule } from './breadcrumb-links/breadcrumb-links.module';

const MODULE_EXPORT = [
  AgePipeModule,
  CaseStatusPipeModule,
  DefendantNamePipeModule,
  FormatAddressPipeModule,
  FormatDatePipeModule,
  IfEmptyPipeModule,
  PleaStatusPipeModule,
  YesNoPipeModule,
  FirstLastNamePipeModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PdkCoreModule,
    PdkFormModule,
    PdkDateInputModule,
    ...MODULE_EXPORT
  ],
  exports: [
    FromToDatesModule,
    PdkCoreModule,
    DateOfBirthModule,
    PaymentTypePipeModule,
    SjpCurrencyPipeModule,
    TranslateModule,
    ...MODULE_EXPORT
  ]
})
export class SharedModule {}
