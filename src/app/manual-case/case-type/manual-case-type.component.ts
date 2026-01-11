import { Component, OnInit, EventEmitter, Output, ViewChild, Input, ChangeDetectionStrategy, inject } from '@angular/core';
import { Location } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { cloneDeep, merge } from 'lodash';
import { ValidationError, PdkErrorSummaryComponent, PdkGrid, PdkFormFieldComponent, PdkRadioGroupComponent, PdkRadioButtonComponent, PdkInsetTextComponent, PdkFormGroupComponent, PdkForm, PdkCore, PdkButtonDirective } from '@cpp/pdk';
import { ManualCase } from '../../core/model/manual-case';
import { AppConfigService } from '../../config';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'manual-case-type',
    templateUrl: './manual-case-type.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [PdkErrorSummaryComponent, PdkGrid, PdkFormFieldComponent, PdkRadioGroupComponent, PdkRadioButtonComponent, PdkInsetTextComponent, PdkFormGroupComponent, FormsModule, TranslateModule, PdkForm, PdkButtonDirective, PdkCore]
})
export class ManualCaseTypeComponent implements OnInit {
  private location = inject(Location);
  private appConfigService = inject(AppConfigService);

  get homepageUrl() {
    return this.appConfigService.getBaseUrl();
  }

  @Input() manualCaseDetail: ManualCase;
  @Input() hasNpp = true;
  @Input() summonsCodes: any[];
  @Output() submitFormData = new EventEmitter<ManualCase>();

  @ViewChild(NgForm) form: NgForm;
  errors: ValidationError[] | any;
  editManualCase: ManualCase;

  constructor() {}

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
