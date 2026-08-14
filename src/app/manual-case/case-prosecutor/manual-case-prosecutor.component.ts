import { Component, OnInit, EventEmitter, Output, ViewChild, Input, inject } from '@angular/core';
import moment from 'moment';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ManualCase, ManualCaseProsecutor } from '../../core/model/manual-case';
import uuid from 'uuid/v4';
import { cloneDeep } from 'lodash';
import {
  ValidationError,
  PdkErrorSummaryComponent,
  PdkGrid,
  PdkFormFieldComponent,
  PdkCurrencyInputComponent,
  PdkDateInputComponent,
  PdkFormGroupComponent,
  PdkTextColorDirective,
  PdkFillColorDirective,
  PdkForm,
  PdkCore,
  PdkTextInput,
  PdkInput,
  PdkButtonDirective
} from '@cpp/pdk';
import { Prosecutor, ProsecutorAutosuggestComponent } from '@cpp/reference-data';
import { ProsecutorType, filterByCpsFlag } from '../../core';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { DateValidator } from '../../shared';
@Component({
  selector: 'manual-case-prosecutor',
  templateUrl: './manual-case-prosecutor.component.html',
  styleUrls: ['./manual-case-prosecutor.component.scss'],
  imports: [
    PdkForm,
    PdkCore,
    PdkErrorSummaryComponent,
    PdkGrid,
    PdkFormFieldComponent,
    PdkCurrencyInputComponent,
    PdkDateInputComponent,
    PdkFormGroupComponent,
    TranslateModule,
    FormsModule,
    PdkTextColorDirective,
    PdkFillColorDirective,
    PdkButtonDirective,
    PdkTextInput,
    PdkInput,
    DateValidator,
    ProsecutorAutosuggestComponent
  ]
})
export class ManualCaseProsecutorComponent implements OnInit {
  private location = inject(Location);

  @Input() manualCaseDetail: ManualCase;
  @Input() nonPoliceProsecutor = { cpsFlag: true } as Prosecutor;
  @Input() prosecutorRouteType: ProsecutorType;
  @Input() nonCpsProsecutorCodes: string[] = [];
  @Output() submitFormData = new EventEmitter<ManualCase>();
  @ViewChild(NgForm) form: NgForm;

  editManualCase: ManualCase;
  errors: ValidationError[] | any = [];
  selectedProsecutorAuthority: Prosecutor;
  selectedCpsProsecutor?: Prosecutor;
  isTypeSjp = false;
  isTrialOrSentence = false;
  isTypeSummons = false;
  requiresRefNumber = false;
  focused = false;
  hasSingleProsecutorCode = false;
  filterByCps = (isCps = true) => filterByCpsFlag(isCps);

  constructor() {}

  ngOnInit(): void {
    this.editManualCase = cloneDeep(this.manualCaseDetail);
    this.isTypeSjp = this._isTypeSjp();
    this.isTrialOrSentence = this._isTrialOrSentence();
    this.isTypeSummons = this._isTypeSummons();
    this.hasSingleProsecutorCode = (this.nonCpsProsecutorCodes || []).length === 1;

    if (!this.editManualCase.prosecutor) {
      this.editManualCase.prosecutor = {} as ManualCaseProsecutor;
      this.editManualCase.originatingPoliceForce = {} as ManualCaseProsecutor;
      if (!this.nonPoliceProsecutor.cpsFlag) {
        this.editManualCase.prosecutor.summonsRequestReceivedDate = moment().format('YYYY-MM-DD');
        this.setManualCaseProsecutor(this.nonPoliceProsecutor);
      }
      return;
    }

    if (this.editManualCase.prosecutor) {
      this.selectedProsecutorAuthority = {
        id: this.editManualCase.prosecutor.prosecutionAuthorityId,
        fullName: this.editManualCase.prosecutor.name,
        standard: this.editManualCase.prosecutor.standard,
        address: this.editManualCase.prosecutor.address
      } as Prosecutor;

      this.selectedCpsProsecutor = {
        id: this.editManualCase.cpsOrganisationId,
        fullName: this.editManualCase.cpsOrganisationName
      } as Prosecutor;
    }

    if (this.editManualCase.cpsOrganisation) {
      this.selectedCpsProsecutor = {
        id: this.editManualCase.cpsOrganisationId,
        fullName: this.editManualCase.cpsOrganisationName
      } as Prosecutor;
    }
  }

  submitData(): void {
    this.submitFormData.emit(this.editManualCase);
  }

  getUuid() {
    return uuid();
  }

  _isTypeSjp(): boolean {
    return this.manualCaseDetail.initiationCode === 'J';
  }

  _isTypeSummons(): boolean {
    return this.manualCaseDetail.initiationCode === 'S';
  }

  _isTrialOrSentence(): boolean {
    return this.manualCaseDetail.initiationCode === 'T' || this.manualCaseDetail.initiationCode === 'CO';
  }

  updateProsecutionReferenceNo(event: boolean) {
    if (!event) {
      delete this.editManualCase.prosecutorCaseReference;
    }
  }

  hasProsecutorReferenceNumber(): boolean {
    return Boolean(this.editManualCase.prosecutorCaseReference);
  }

  setManualCaseProsecutor(prosecutionAuthority?: Prosecutor) {
    if (!prosecutionAuthority) {
      this.editManualCase.originatingOrganisation = undefined;
      return;
    }

    this.editManualCase.prosecutor.prosecutionAuthorityId = prosecutionAuthority.id;
    this.editManualCase.prosecutor.prosecutingAuthority = prosecutionAuthority.oucode;
    this.editManualCase.prosecutor.name = prosecutionAuthority.fullName;
    this.editManualCase.prosecutor.standard = prosecutionAuthority.standard;
    this.editManualCase.prosecutor.address = prosecutionAuthority.address;
    this.editManualCase.originatingOrganisation = prosecutionAuthority.oucode;
  }

  onSelectedProsecutionAuthority(prosecutionAuthority: Prosecutor) {
    this.setManualCaseProsecutor(prosecutionAuthority);
  }

  onSelectedCpsProsecutor(cpsProsecutor?: Prosecutor) {
    this.selectedCpsProsecutor = cpsProsecutor;
    if (!cpsProsecutor) {
      this.editManualCase.cpsOrganisation = undefined;
      this.editManualCase.cpsOrganisationId = undefined;
      this.editManualCase.cpsOrganisationName = undefined;
      return;
    }

    this.editManualCase.cpsOrganisation = cpsProsecutor.oucode ? cpsProsecutor.oucode : '';
    this.editManualCase.cpsOrganisationId = cpsProsecutor.id;
    this.editManualCase.cpsOrganisationName = cpsProsecutor.fullName;
  }

  standardProsecutors = (prosecutor: Prosecutor) => {
    if (!this.nonPoliceProsecutor.cpsFlag && this.nonCpsProsecutorCodes.length > 1) {
      return prosecutor.standard && this.nonCpsProsecutorCodes.includes(prosecutor.shortName);
    }

    return prosecutor.standard;
  };

  back() {
    this.location.back();
  }

  handleBackFocus() {
    this.focused = !this.focused;
  }

  hasNonProsecutorFullName() {
    return !!this.nonPoliceProsecutor && !!this.nonPoliceProsecutor.fullName;
  }
}
