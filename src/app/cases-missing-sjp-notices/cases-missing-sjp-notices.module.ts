import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdkBreadcrumbsModule, PdkButtonModule, PdkCoreModule, PdkTableModule } from '@cpp/pdk';
import { RouterModule } from '@angular/router';
import { CasesMissingSjpNoticesContainer } from './cases-missing-sjp-notices.container';
import { CasesMissingSjpNoticesComponent } from './components/cases-missing-sjp-notices.component';
import { DefendantNamePipeModule, FormatDatePipeModule } from '../shared/pipes';
import { ListCasesMissingSjpNoticesComponent } from './components/list-cases-missing-sjp-notices.component';
import { CasesMissingSjpNoticesGuard } from './cases-missing-sjp-notices.guard';
import { StoreModule } from '@ngrx/store';
import { casesMissingSjpNoticesReducer } from './cases-missing-sjp-notices.reducer';
import { BreadcrumbLinksModule } from '../shared/breadcrumb-links/breadcrumb-links.module';

@NgModule({
  declarations: [CasesMissingSjpNoticesContainer, CasesMissingSjpNoticesComponent, ListCasesMissingSjpNoticesComponent],
  imports: [
    CommonModule,
    PdkCoreModule,
    RouterModule.forChild([
      {
        path: '',
        canActivate: [CasesMissingSjpNoticesGuard],
        data: {
          title: 'Cases missing SJP notices - Prosecutor'
        },
        component: CasesMissingSjpNoticesContainer
      }
    ]),
    PdkTableModule,
    PdkButtonModule,
    DefendantNamePipeModule,
    FormatDatePipeModule,
    BreadcrumbLinksModule,
    StoreModule.forFeature('casesMissingNotices', casesMissingSjpNoticesReducer)
  ],
  providers: [CasesMissingSjpNoticesGuard]
})
export class CasesMissingSjpNoticesModule {}
