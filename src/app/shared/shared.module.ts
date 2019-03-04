import { NgModule } from '@angular/core';
import { PdkCoreModule, PdkDateInputModule, PdkFormModule } from '@cpp/pdk';
import { CommonModule } from '@angular/common';
import { FromToDatesModule } from './from-to-dates/from-to-dates.module';
import {
  AgePipeModule,
  CaseProsecutorPipeModule,
  CaseStatusPipeModule,
  DefendantNamePipeModule,
  FormatAddressPipeModule,
  FormatDatePipeModule,
  IfEmptyPipeModule,
  PleaStatusPipeModule
} from './pipes';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PdkCoreModule,
    PdkFormModule,
    PdkDateInputModule,
    AgePipeModule,
    CaseProsecutorPipeModule,
    CaseStatusPipeModule,
    DefendantNamePipeModule,
    FormatAddressPipeModule,
    FormatDatePipeModule,
    IfEmptyPipeModule,
    PleaStatusPipeModule
  ],
  exports: [
    FromToDatesModule,
    PdkCoreModule,
    AgePipeModule,
    CaseProsecutorPipeModule,
    CaseStatusPipeModule,
    DefendantNamePipeModule,
    FormatAddressPipeModule,
    FormatDatePipeModule,
    IfEmptyPipeModule,
    PleaStatusPipeModule
  ]
})
export class SharedModule {}
