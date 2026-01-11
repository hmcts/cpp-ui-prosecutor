import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ManualCaseDefendant } from '../../core/model/manual-case-defendant';
import { merge } from 'lodash';
import uuid from 'uuid/v4';
import {
  ValidationError,
  PdkFormFieldComponent,
  PdkRadioGroupComponent,
  PdkRadioButtonComponent,
  PdkFormGroupComponent,
  PdkCore,
  PdkForm,
  PdkTextInput,
  PdkInput,
  PdkButtonDirective,
  PdkResizeDirective
} from '@cpp/pdk';
import { AddressInputComponent, EmailValidator, PhoneValidator } from '../../shared';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'organisation-defendant-form',
  templateUrl: './organisation-defendant-form.component.html',
  imports: [
    PdkForm,
    PdkCore,
    PdkFormFieldComponent,
    AddressInputComponent,
    PdkRadioGroupComponent,
    PdkRadioButtonComponent,
    PdkFormGroupComponent,
    TranslateModule,
    FormsModule,
    PdkTextInput,
    PdkInput,
    PdkButtonDirective,
    PdkResizeDirective,
    PhoneValidator,
    EmailValidator
  ]
})
export class OrganisationDefendantFormComponent {
  @Input() aliasesReset: boolean;
  @Input() isPoliceProsecutor: boolean;
  @Input() manualCaseDefendant: ManualCaseDefendant;
  @Input() manualCaseType: string;
  @Input() showAddButton: boolean;
  @Output() formSubmit = new EventEmitter<any>();
  @Output() formError = new EventEmitter<ValidationError[]>();
  @Output() goBack = new EventEmitter();
  @ViewChild(NgForm) form: NgForm;

  param: { value: string } = { value: 'optional' };
  submitAction = '';

  constructor() {}

  isSummons() {
    return this.manualCaseType === 'S';
  }

  getUuid() {
    return uuid();
  }

  onErrors(error: ValidationError[] | any) {
    if (error) {
      this.formError.emit(error);
    }
  }

  beforeSubmit(action: string): void {
    this.submitAction = action;
  }

  submitData(formData: ManualCaseDefendant): void {
    if (!this.manualCaseDefendant.id) {
      this.manualCaseDefendant.id = this.getUuid();
    }

    const defendantToStore = merge(this.manualCaseDefendant, formData);
    delete defendantToStore.individual;
    delete defendantToStore.individualAliases;

    if (this.manualCaseType !== 'J') {
      delete defendantToStore.numPreviousConvictions;
    }

    this.formSubmit.emit({ action: this.submitAction, defendantToStore });
  }

  back() {
    this.goBack.emit();
  }
}
