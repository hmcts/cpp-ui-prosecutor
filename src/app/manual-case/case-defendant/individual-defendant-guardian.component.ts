import { Component, Input, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { ControlContainer, FormsModule, NgForm } from '@angular/forms';
import { cloneDeep } from 'lodash';
import { ManualCaseDefendant } from '../../core/model/manual-case-defendant';
import {
  PdkInsetTextComponent,
  PdkGrid,
  PdkFormFieldComponent,
  PdkRadioGroupComponent,
  PdkRadioButtonComponent,
  PdkCore,
  PdkTextInput,
  PdkInput
} from '@cpp/pdk';
import { AddressInputComponent, EmailValidator, PhoneValidator } from '../../shared';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'individual-defendant-guardian',
  templateUrl: 'individual-defendant-guardian.component.html',
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    PdkInsetTextComponent,
    PdkGrid,
    PdkFormFieldComponent,
    PdkRadioGroupComponent,
    PdkRadioButtonComponent,
    AddressInputComponent,
    TranslateModule,
    FormsModule,
    PdkCore,
    PdkTextInput,
    PdkInput,
    PhoneValidator,
    EmailValidator
  ]
})
export class IndividualDefendantGuardianComponent implements OnChanges {
  @Input() manualCaseType: string;
  @Input() manualCaseDefendant: ManualCaseDefendant;

  param: { value: string } = { value: 'optional' };
  showGuardian: boolean;

  ngOnChanges() {
    this.manualCaseDefendant.individual.guardianType = this.getGuardianType();
  }

  getGuardianType() {
    if (
      this.manualCaseDefendant.individual.parentGuardianInformation.personalInformation.lastName ||
      this.manualCaseDefendant.individual.parentGuardianInformation.organisationName
    ) {
      this.showGuardian = true;
      return this.manualCaseDefendant.individual.parentGuardianInformation.organisationName &&
        this.manualCaseDefendant.individual.parentGuardianInformation.address.address1
        ? 'ORGANISATION'
        : 'INDIVIDUAL';
    }

    this.showGuardian = false;
    return '';
  }

  toggleGuardianForm() {
    this.showGuardian = !this.showGuardian;
  }

  removeGuardian() {
    const blankParentGuardianData = {
      personalInformation: {
        title: '',
        firstName: '',
        givenName2: '',
        lastName: '',
        address: {
          address1: '',
          address2: '',
          address3: '',
          address4: '',
          address5: '',
          postcode: ''
        },
        contactDetails: {
          primaryEmail: '',
          work: ''
        }
      },
      organisationName: '',
      companyTelephoneNumber: '',
      address: {
        address1: '',
        address2: '',
        address3: '',
        address4: '',
        address5: '',
        postcode: ''
      }
    };

    this.manualCaseDefendant.individual.parentGuardianInformation = cloneDeep(blankParentGuardianData);

    this.showGuardian = false;
  }

  sameAsDefendant() {
    if (this.manualCaseDefendant.individual.guardianType === 'INDIVIDUAL') {
      this.manualCaseDefendant.individual.parentGuardianInformation.personalInformation.address = cloneDeep(
        this.manualCaseDefendant.individual.personalInformation.address
      );
    }

    if (this.manualCaseDefendant.individual.guardianType === 'ORGANISATION') {
      this.manualCaseDefendant.individual.parentGuardianInformation.address = cloneDeep(
        this.manualCaseDefendant.individual.personalInformation.address
      );
    }
  }
}
