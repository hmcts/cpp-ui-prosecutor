import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { FromToDatesModule } from './from-to-dates/from-to-dates.module';
import { DateOfBirthModule } from './date-of-birth/date-of-birth.module';

import {
  DateValidator,
  EmailValidator,
  NationalInsuranceNumberValidator,
  PhoneValidator,
  DocumentNameValidator,
  ProsecutorValidator,
  DigitsOnlyValidator,
} from './validators';

import {
  PdkAlertModule,
  PdkFormModule,
  PdkCoreModule,
  PdkDateInputModule,
  PdkTimeInputModule,
  PdkPageHeaderModule,
  PdkRelatedModule,
  PdkTableModule,
  PdkDetailsModule,
  PdkDividerModule,
  PdkButtonModule,
  PdkAutosuggestModule,
  PdkCheckboxInputModule,
  PdkRadioInputModule,
  PdkTextInputModule,
  PdkBackLinkModule,
  PdkInsetTextModule,
  PdkGridModule,
  PdkTextareaModule,
  PdkSelectModule,
  PdkServiceNavigationModule,
  PdkErrorMessageModule,
} from '@cpp/pdk';

import {
  AgePipeModule,
  AddressPipeModule,
  CapitalizePipeModule,
  DashPipeModule,
  FullNamePipeModule,
  DefendantNamePipeModule,
  FirstLastNamePipeModule,
  FormatAddressPipeModule,
  FormatDatePipeModule,
  IfEmptyPipeModule,
  PleaStatusPipeModule,
  YesNoPipeModule
} from './pipes';
import {
  BackButtonComponent,
  AddressInputComponent,
  OffenceSearchComponent,
} from './components';

import { PaymentTypePipeModule } from './pipes/payment-type/payment-type-pipe.module';
import { SjpCurrencyPipeModule } from './pipes/sjp-currency/sjp-currency.module';
import { ApplicationStatusPipeModule } from './pipes/application-status/application-status.module';
import { NationalityAutoSuggestComponent } from './components/auto-suggest/nationality/nationality-auto-suggest.component';
import { EthnicityAutoSuggestComponent } from './components/auto-suggest/Ethnicity/ethnicity-auto-suggest.component';
import { EthnicityCodeAutoSuggestComponent } from './components/auto-suggest/EthnicityCode/ethnicity-code-auto-suggest.component';
import { DynamicParticularFormComponent } from '../manual-case/case-defendant-offence/dynamic-particular-form.component';
import { EmploymentStatusModule } from './pipes/employment-status/employment-status.module';

const MODULE_EXPORT = [
  ApplicationStatusPipeModule,
  AgePipeModule,
  AddressPipeModule,
  CapitalizePipeModule,
  DashPipeModule,
  EmploymentStatusModule,
  FullNamePipeModule,
  DefendantNamePipeModule,
  FormatAddressPipeModule,
  FormatDatePipeModule,
  IfEmptyPipeModule,
  PleaStatusPipeModule,
  YesNoPipeModule,
  FirstLastNamePipeModule
];

@NgModule({
  declarations: [
    DateValidator,
    EmailValidator,
    NationalInsuranceNumberValidator,
    PhoneValidator,
    DocumentNameValidator,
    ProsecutorValidator,
    DigitsOnlyValidator,
    AddressInputComponent,
    BackButtonComponent,
    DynamicParticularFormComponent,
    OffenceSearchComponent,
    AddressInputComponent,
    BackButtonComponent,
    DynamicParticularFormComponent,
    OffenceSearchComponent,
    NationalityAutoSuggestComponent,
    EthnicityAutoSuggestComponent,
    EthnicityCodeAutoSuggestComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    PdkAlertModule,
    PdkFormModule,
    PdkCoreModule,
    PdkDateInputModule,
    PdkTimeInputModule,
    PdkPageHeaderModule,
    PdkRelatedModule,
    PdkTableModule,
    PdkDetailsModule,
    PdkDividerModule,
    PdkButtonModule,
    PdkAutosuggestModule,
    PdkCheckboxInputModule,
    PdkRadioInputModule,
    PdkTextInputModule,
    PdkBackLinkModule,
    PdkInsetTextModule,
    PdkGridModule,
    PdkTextareaModule,
    PdkSelectModule,
    PdkServiceNavigationModule,
    PdkErrorMessageModule,
    TranslateModule,
    RouterModule,
    ...MODULE_EXPORT
  ],
  exports: [
    FromToDatesModule,
    PdkCoreModule,
    DateOfBirthModule,
    PaymentTypePipeModule,
    SjpCurrencyPipeModule,
    TranslateModule,
    DateValidator,
    EmailValidator,
    NationalInsuranceNumberValidator,
    PhoneValidator,
    DocumentNameValidator,
    ProsecutorValidator,
    DigitsOnlyValidator,
    AddressInputComponent,
    BackButtonComponent,
    DynamicParticularFormComponent,
    OffenceSearchComponent,
    PdkAlertModule,
    PdkFormModule,
    PdkCoreModule,
    PdkDateInputModule,
    PdkTimeInputModule,
    PdkPageHeaderModule,
    PdkRelatedModule,
    PdkTableModule,
    PdkDetailsModule,
    PdkDividerModule,
    PdkButtonModule,
    PdkAutosuggestModule,
    PdkCheckboxInputModule,
    PdkRadioInputModule,
    PdkTextInputModule,
    PdkBackLinkModule,
    PdkInsetTextModule,
    PdkGridModule,
    PdkTextareaModule,
    PdkSelectModule,
    PdkServiceNavigationModule,
    PdkErrorMessageModule,
    NationalityAutoSuggestComponent,
    EthnicityAutoSuggestComponent,
    EthnicityCodeAutoSuggestComponent,
    ...MODULE_EXPORT
  ]
})
export class SharedModule {}
