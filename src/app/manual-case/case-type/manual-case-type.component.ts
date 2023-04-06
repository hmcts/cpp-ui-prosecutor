import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  ViewChild,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { cloneDeep, merge } from 'lodash';
import { ValidationError } from '@cpp/pdk';
import { ManualCase } from '../../core/model/manual-case';
import { AppConfigService } from '../../config';

@Component({
  selector: 'manual-case-type',
  templateUrl: './manual-case-type.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManualCaseTypeComponent implements OnInit {
  get homepageUrl() {
    return this.appConfigService.getBaseUrl();
  }

  @Input() manualCaseDetail: ManualCase;
  @Input() hasNpp = true;
  @Input() summonsCodes: any[];
  @Output() submitFormData = new EventEmitter<ManualCase>();

  @ViewChild(NgForm) form: NgForm;
  errors: ValidationError[];
  editManualCase: ManualCase;

  constructor(private location: Location, private appConfigService: AppConfigService) {}

  ngOnInit(): void {
    this.editManualCase = cloneDeep(this.manualCaseDetail);
  }

  submitData(manualCase: ManualCase): void {
    if (this.editManualCase.initiationCode !== 'S') {
      delete this.editManualCase.summonsCode;
    }

    const submitData = merge(this.editManualCase, manualCase);
    this.submitFormData.emit(submitData);
  }

  back() {
    this.location.back();
  }
}
