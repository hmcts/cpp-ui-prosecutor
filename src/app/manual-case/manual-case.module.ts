import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  PdkAccordionModule,
  PdkAlertModule,
  PdkAutosuggestModule,
  PdkCharacterCountModule,
  PdkCheckboxInputModule,
  PdkContextPanelModule,
  PdkCoreModule,
  PdkCurrencyInputModule,
  PdkDateInputModule,
  PdkErrorSummaryModule,
  PdkFormModule,
  PdkGridModule,
  PdkInsetTextModule,
  PdkSelectModule,
  PdkTimeInputModule,
} from '@cpp/pdk';

import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ManualCaseCreateContainer } from './manual-case-create.container';
import { SharedModule } from '../shared';
import { ManualCaseTypeComponent } from './case-type/manual-case-type.component';
import { ManualCaseProsecutorComponent } from './case-prosecutor/manual-case-prosecutor.component';
import { ManualCaseNavigationService } from './manual-case-nav.service';
import { ManualCaseDefendantStateService } from './defendants-state.service';
import { ManualCaseDefendantComponent } from './case-defendant/manual-case-defendant.component';
import { ManualCaseOffenceComponent } from './case-defendant-offence/manual-case-offence.component';
import { SummonsCodesGuard } from '../core/guards/summons-codes';
import { IndividualDefendantFormComponent } from './case-defendant/individual-defendant-form.component';
import { OrganisationDefendantFormComponent } from './case-defendant/organisation-defendant-form.component';
import { ManualCaseSummaryComponent } from './case-summary/case-summary.component';
import { DefendantDetailsComponent } from './case-summary/manual-defendant-details/manual-defendant-details.component';
import { ProsecutionCaseDetailsComponent } from './case-summary/prosecution-case-details/prosecution-case-details.component';
import { IndividualDefendantGuardianComponent } from './case-defendant/individual-defendant-guardian.component';
import { ManualCaseOffenceStateService } from './offences-state.service';
import { ManualCaseHearingDetailsComponent } from './case-hearing-details/manual-case-hearing-details.component';
import { CaseCreateSuccessComponent } from './case-create-success/manual-case-create-success.component';
import { ManualCaseHearingSummaryComponent } from './case-summary/manual-case-hearing-summary/manual-case-hearing-summary.component';
import { RemandStatusesGuard } from '../core/guards/remand-statuses';
import { OffenceDateCodesGuard } from '../core/guards/offence-date-codes';
import { OffenceDetailsComponent } from './case-summary/manual-case-offence-details/manual-case-offence-details.component';
import { CoreModule } from '../core/core.module';
import { AlcoholLevelMethodsGuard } from '../core/guards/alcohol-level-methods';
import { PoliceForcesGuard } from '../core/guards/police-forces';
import { OffenceParsingService } from '../manual-case/case-offence-parsing/offence-parsing.service';
import { OffenceWordingService } from './case-offence-parsing/offence-wording.service';
import { ManualCaseDuplicatedProsecutorComponent } from './case-prosecutor/manual-case-duplicated-prosecutor.component';
import { ManualCaseDetailSummaryComponent } from './case-summary/manual-case-detail-summary/manual-case-detail-summary.component';
import { CapitalizePipe } from '../shared/pipes/capitalize/capitalize.pipe';
import { ReferenceDataModule } from '@cpp/reference-data';
import { ManualCaseRoutingModule } from './manual-case.routing.module';
import { EitherWayOffenceComponent } from './either-way-offences/either-way-offence.component';
import { VerdictTypesGuard } from '../core/guards/verdict-types';
import { MotReasonsGuard } from '../core/guards/mot-reasons';
import { ProsecutorSearchModule } from '../prosecutor-search/prosecutor-search.module';

@NgModule({
  declarations: [
    ManualCaseCreateContainer,
    ManualCaseTypeComponent,
    ManualCaseProsecutorComponent,
    ManualCaseDefendantComponent,
    ManualCaseHearingDetailsComponent,
    ManualCaseHearingSummaryComponent,
    IndividualDefendantFormComponent,
    IndividualDefendantGuardianComponent,
    OrganisationDefendantFormComponent,
    ManualCaseOffenceComponent,
    EitherWayOffenceComponent,
    ManualCaseSummaryComponent,
    ProsecutionCaseDetailsComponent,
    DefendantDetailsComponent,
    CaseCreateSuccessComponent,
    OffenceDetailsComponent,
    ManualCaseDuplicatedProsecutorComponent,
    ManualCaseDetailSummaryComponent,
  ],
  exports: [
    ManualCaseCreateContainer,
    ManualCaseTypeComponent,
    ManualCaseProsecutorComponent,
    ManualCaseDefendantComponent,
    ManualCaseHearingDetailsComponent,
    ManualCaseHearingSummaryComponent,
    IndividualDefendantFormComponent,
    IndividualDefendantGuardianComponent,
    OrganisationDefendantFormComponent,
    ManualCaseOffenceComponent,
    EitherWayOffenceComponent,
    ManualCaseSummaryComponent,
    DefendantDetailsComponent,
    CaseCreateSuccessComponent,
    OffenceDetailsComponent,
    ManualCaseDuplicatedProsecutorComponent,
    ManualCaseDetailSummaryComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    PdkCoreModule,
    PdkFormModule,
    PdkDateInputModule,
    PdkTimeInputModule,
    PdkAutosuggestModule,
    PdkAccordionModule,
    PdkAlertModule,
    SharedModule,
    TranslateModule,
    PdkInsetTextModule,
    PdkGridModule,
    PdkSelectModule,
    PdkCheckboxInputModule,
    PdkErrorSummaryModule,
    PdkContextPanelModule,
    PdkCharacterCountModule,
    ReferenceDataModule,
    PdkCurrencyInputModule,
    ManualCaseRoutingModule,
    ProsecutorSearchModule,
  ],
  providers: [
    SummonsCodesGuard,
    RemandStatusesGuard,
    OffenceDateCodesGuard,
    AlcoholLevelMethodsGuard,
    PoliceForcesGuard,
    VerdictTypesGuard,
    MotReasonsGuard,
    ManualCaseNavigationService,
    ManualCaseDefendantStateService,
    ManualCaseOffenceStateService,
    CapitalizePipe,
    OffenceParsingService,
    OffenceWordingService,
  ],
})
export class ManualCaseModule {}
