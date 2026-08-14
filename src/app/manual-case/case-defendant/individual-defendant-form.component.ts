import { Component, Input, Output, EventEmitter, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import cleanDeep from 'clean-deep';
import { merge } from 'lodash';
import uuid from 'uuid/v4';
import {
  ValidationError,
  PdkFormFieldComponent,
  PdkDateInputComponent,
  PdkRadioGroupComponent,
  PdkRadioButtonComponent,
  PdkDetailsTextDirective,
  PdkInsetTextComponent,
  PdkFormGroupComponent,
  PdkCore,
  PdkForm,
  PdkTextInput,
  PdkInput,
  PdkButtonDirective,
  PdkResizeDirective,
  PdkDetailsDirective
} from '@cpp/pdk';
import { ManualCaseDefendant, BailStatus } from '../../core/model';
import { NationalityAutoSuggestComponent } from '../../shared/components/auto-suggest/nationality/nationality-auto-suggest.component';
import { EthnicityAutoSuggestComponent } from '../../shared/components/auto-suggest/Ethnicity/ethnicity-auto-suggest.component';
import { EthnicityCodeAutoSuggestComponent } from '../../shared/components/auto-suggest/EthnicityCode/ethnicity-code-auto-suggest.component';
import { AddressInputComponent } from '../../shared';
import { IndividualDefendantGuardianComponent } from './individual-defendant-guardian.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'individual-defendant-form',
  templateUrl: './individual-defendant-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    PdkForm,
    PdkCore,
    PdkTextInput,
    PdkInput,
    PdkButtonDirective,
    PdkFormFieldComponent,
    PdkDateInputComponent,
    PdkRadioGroupComponent,
    PdkRadioButtonComponent,
    NationalityAutoSuggestComponent,
    PdkDetailsTextDirective,
    EthnicityAutoSuggestComponent,
    EthnicityCodeAutoSuggestComponent,
    PdkInsetTextComponent,
    AddressInputComponent,
    IndividualDefendantGuardianComponent,
    TranslateModule,
    FormsModule,
    PdkFormGroupComponent,
    PdkResizeDirective,
    PdkDetailsDirective
  ]
})
export class IndividualDefendantFormComponent {
  @Input() manualCaseDefendant: ManualCaseDefendant;
  @Input() manualCaseType: string;
  @Input() remandStatuses: BailStatus[];
  @Input() aliasesReset: boolean;
  @Input() showAddButton: boolean;
  @Input() isPoliceProsecutor: boolean;
  @Output() formSubmit = new EventEmitter<any>();
  @Output() formError = new EventEmitter<ValidationError[]>();
  @Output() goBack = new EventEmitter();
  @ViewChild(NgForm) form: NgForm;

  param: { value: string } = { value: 'optional' };
  observedEthnicityOptions: { value: string; label: string }[];
  submitAction = '';

  constructor() {}

  getUuid() {
    return uuid();
  }

  get observedEthnicity() {
    return String(this.manualCaseDefendant.individual.personalInformation.observedEthnicity);
  }

  isSummons() {
    return this.manualCaseType === 'S';
  }

  isTrial() {
    return this.manualCaseType === 'T';
  }

  isTrialOrSentence() {
    return this.manualCaseType === 'T' || this.manualCaseType === 'CO';
  }

  isChargeTrialOrSentence() {
    return this.manualCaseType === 'C' || this.manualCaseType === 'T' || this.manualCaseType === 'CO';
  }

  onErrors(error: ValidationError[] | any) {
    if (error) {
      this.formError.emit(error);
    }
  }

  beforeSubmit(action: string): void {
    this.submitAction = action;
  }

  displayFixedAbode(): boolean {
    return this.manualCaseType !== 'J' && !this.isSummons();
  }

  submitData(formData: ManualCaseDefendant): void {
    // if (this.aliasInput && !this.aliasInput.aliasForm.valid) {
    //   return;
    // }

    if (!this.manualCaseDefendant.id) {
      this.manualCaseDefendant.id = this.getUuid();
    }

    let defendantToStore = merge(this.manualCaseDefendant, formData);

    delete defendantToStore.organisationName;
    delete defendantToStore.address;
    delete defendantToStore.emailAddress1;
    delete defendantToStore.telephoneNumberBusiness;
    delete defendantToStore.aliasForCorporate;

    if (defendantToStore.individual.personalInformation.observedEthnicity) {
      // Ethnicity code is sent as `string` from BE and create case expect integer
      defendantToStore.individual.personalInformation.observedEthnicity = Number(
        defendantToStore.individual.personalInformation.observedEthnicity
      );
    }

    if (
      defendantToStore.individual &&
      defendantToStore.individual.selfDefinedInformation &&
      this.isTrialOrSentence() === false
    ) {
      defendantToStore.individual.selfDefinedInformation.gender = 'NOT_SPECIFIED';
    }

    if (
      defendantToStore.individual.parentGuardianInformation &&
      (defendantToStore.individual.parentGuardianInformation.personalInformation.lastName ||
        defendantToStore.individual.parentGuardianInformation.organisationName)
    ) {
      if (defendantToStore.individual.guardianType === 'INDIVIDUAL') {
        defendantToStore.individual.parentGuardianInformation.gender = 'NOT_SPECIFIED';

        delete defendantToStore.individual.parentGuardianInformation.organisationName;
        delete defendantToStore.individual.parentGuardianInformation.address;
        delete defendantToStore.individual.parentGuardianInformation.companyTelephoneNumber;
      } else if (defendantToStore.individual.guardianType === 'ORGANISATION') {
        delete defendantToStore.individual.parentGuardianInformation.personalInformation;
        delete defendantToStore.individual.parentGuardianInformation.gender;
      } else {
        delete defendantToStore.individual.parentGuardianInformation;
      }
    } else {
      delete defendantToStore.individual.parentGuardianInformation;
    }

    if (!this.isChargeTrialOrSentence()) {
      delete defendantToStore.individual.selfDefinedInformation.nationality;
      delete defendantToStore.individual.selfDefinedInformation.additionalNationality;
      delete defendantToStore.pncIdentifier;
      delete defendantToStore.individual.selfDefinedInformation.ethnicity;
      delete defendantToStore.individual.personalInformation.observedEthnicity;
    }

    delete defendantToStore.individual.guardianType;
    defendantToStore = cleanDeep(defendantToStore) as ManualCaseDefendant;

    this.formSubmit.emit({ action: this.submitAction, defendantToStore });
  }

  back() {
    this.goBack.emit();
  }
}
