import { NgModule } from '@angular/core';
import { SearchResultsTableComponent } from './search-result-table.component';
import { PdkCoreModule, PdkInsetTextModule, PdkSkipLinkModule, PdkTableModule } from '@cpp/pdk';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CaseProsecutorPipeModule } from '../../../../shared/pipes/case-prosecutor/case-prosecutor.module';
import { CaseStatusPipeModule } from '../../../../shared/pipes/case-status/case-status.module';
import { DefendantNamePipeModule } from '../../../../shared/pipes/defendant-name/defendant-name.module';
import { RouterModule } from '@angular/router';

const DECLARATIONS = [SearchResultsTableComponent];

@NgModule({
  declarations: [...DECLARATIONS],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    PdkCoreModule,
    PdkTableModule,
    PdkInsetTextModule,
    PdkSkipLinkModule,
    CaseProsecutorPipeModule,
    CaseStatusPipeModule,
    DefendantNamePipeModule
  ],
  exports: [...DECLARATIONS]
})
export class SearchResultsTableModule {}
