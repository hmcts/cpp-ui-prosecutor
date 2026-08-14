import { Component, OnInit, EventEmitter, Output, ViewChild, Input, inject } from '@angular/core';
import { Location } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ManualCase } from '../../core/model/manual-case';
import { cloneDeep } from 'lodash';
import { ValidationError, PdkGrid, PdkFormFieldComponent, PdkRadioGroupComponent, PdkRadioButtonComponent, PdkInsetTextComponent, PdkFormGroupComponent, PdkAlertComponent, PdkErrorSummaryComponent, PdkForm, PdkCore, PdkTextInput, PdkInput, PdkButtonDirective } from '@cpp/pdk';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'manual-case-duplicated-prosecutor',
    templateUrl: './manual-case-duplicated-prosecutor.component.html',
    imports: [PdkGrid, PdkForm, PdkCore, PdkFormFieldComponent, PdkRadioGroupComponent, PdkRadioButtonComponent, PdkInsetTextComponent, PdkFormGroupComponent, PdkAlertComponent, TranslateModule, PdkErrorSummaryComponent, FormsModule, PdkButtonDirective, PdkTextInput, PdkInput] 
})
export class ManualCaseDuplicatedProsecutorComponent implements OnInit {
  private location = inject(Location);

  @Input() manualCaseDetail: ManualCase;
  @Output() submitFormData = new EventEmitter<ManualCase>();
  @ViewChild(NgForm) form: NgForm;

  oldValue: string;

  editManualCase: ManualCase;
  errors: ValidationError[] | any;
  requiresRefNumber = false;

  constructor() {}

  ngOnInit(): void {
    this.editManualCase = cloneDeep(this.manualCaseDetail);
    this.oldValue = this.editManualCase.prosecutorCaseReference;
  }

  submitData(): void {
    this.submitFormData.emit(this.editManualCase);
  }

  updateProsecutionReferenceNo(event: boolean) {
    if (!event) {
      delete this.editManualCase.prosecutorCaseReference;
    }
  }

  hasProsecutorReferenceNumber(): boolean {
    return Boolean(this.editManualCase.prosecutorCaseReference);
  }

  back() {
    this.location.back();
  }
}
