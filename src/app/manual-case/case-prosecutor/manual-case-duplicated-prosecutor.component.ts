import { Component, OnInit, EventEmitter, Output, ViewChild, Input } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ManualCase } from '../../core/model/manual-case';
import { cloneDeep } from 'lodash';
import { ValidationError } from '@cpp/pdk';

@Component({
  selector: 'manual-case-duplicated-prosecutor',
  templateUrl: './manual-case-duplicated-prosecutor.component.html'
})
export class ManualCaseDuplicatedProsecutorComponent implements OnInit {
  @Input() manualCaseDetail: ManualCase;
  @Output() submitFormData = new EventEmitter<ManualCase>();
  @ViewChild(NgForm) form: NgForm;

  oldValue: string;

  editManualCase: ManualCase;
  errors: ValidationError[];
  requiresRefNumber = false;

  constructor(private location: Location) {}

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
