import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ManualCaseDefendant } from '../../core/model/manual-case-defendant';
import { merge } from 'lodash';
import * as uuid from 'uuid/v4';
import { ValidationError } from '@cpp/pdk';

@Component({
  selector: 'organisation-defendant-form',
  templateUrl: './organisation-defendant-form.component.html',
})
export class OrganisationDefendantFormComponent {
  @Input() aliasesReset: boolean;
  @Input() isPoliceProsecutor: boolean;
  @Input() manualCaseDefendant: ManualCaseDefendant;
  @Input() manualCaseType: string;
  @Input() showAddButton: boolean;
  @Output() onSubmit = new EventEmitter<any>();
  @Output() onError = new EventEmitter<ValidationError[]>();
  @Output() onBack = new EventEmitter();
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

  onErrors(error: ValidationError[]) {
    if (error) {
      this.onError.emit(error);
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

    this.onSubmit.emit({ action: this.submitAction, defendantToStore });
  }

  back() {
    this.onBack.emit();
  }
}
