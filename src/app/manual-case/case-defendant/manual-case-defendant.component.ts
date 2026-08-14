import { Component, OnInit, OnChanges, EventEmitter, Output, Input, inject } from '@angular/core';
import { Location } from '@angular/common';
import { cloneDeep } from 'lodash';
import { ManualCaseDefendant, BailStatus } from '../../core/model';
import { ValidationError, PdkGrid, PdkRadioGroupComponent, PdkRadioButtonComponent, PdkCore, PdkFieldsetComponent } from '@cpp/pdk';
import { ManualCaseDefendantStateService } from '../defendants-state.service';
import { ManualCase } from '../../core/model/manual-case';
import { Prosecutor } from '@cpp/reference-data';
import { IndividualDefendantFormComponent } from "./individual-defendant-form.component";
import { OrganisationDefendantFormComponent } from "./organisation-defendant-form.component";
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'manual-case-defendant',
    templateUrl: './manual-case-defendant.component.html',
    imports: [PdkCore, PdkGrid, PdkRadioGroupComponent, PdkRadioButtonComponent, IndividualDefendantFormComponent, OrganisationDefendantFormComponent, TranslateModule, FormsModule, PdkFieldsetComponent]
})
export class ManualCaseDefendantComponent implements OnInit, OnChanges {
  private location = inject(Location);
  private defendantStateService = inject(ManualCaseDefendantStateService);

  @Input() manualCaseDetail: ManualCase;
  @Input() manualCaseDefendants: ManualCaseDefendant[];
  @Input() manualCaseType: string;
  @Input() prosecutors: Prosecutor[];
  @Input() remandStatuses: BailStatus[];
  @Output() submitFormData = new EventEmitter<any>();

  editDefendant: ManualCaseDefendant;
  errors: ValidationError[];
  counter: string;
  defendantType: string;
  aliasesReset = false;
  iterateDefendant: boolean;

  constructor() {}

  ngOnChanges(): void {
    const defendants = cloneDeep(this.manualCaseDefendants);
    this.defendantStateService.initialise(defendants);
    this.iterateDefendant = this.defendantStateService.iterateDefendant;
  }

  ngOnInit(): void {
    this.editDefendant = this.defendantStateService.load();
    this.defendantType = this.getDefendantType(this.editDefendant);
    this.counter = this.defendantStateService.counter;
  }

  clearErrors() {
    this.errors = null;
  }

  getDefendantType(defendant: ManualCaseDefendant) {
    return defendant.organisationName && defendant.address.address1 ? 'ORGANISATION' : 'INDIVIDUAL';
  }

  isPoliceProsecutor() {
    const caseProsecutorId =
      this.manualCaseDetail.prosecutor && this.manualCaseDetail.prosecutor.prosecutionAuthorityId;
    const caseProsecutor = this.prosecutors.find(prosecutor => prosecutor.id === caseProsecutorId);
    return caseProsecutor ? caseProsecutor.policeFlag : false;
  }

  submitData(formData: any): void {
    let navigateToNextPage = true;

    if (formData.action === 'add') {
      this.editDefendant = this.defendantStateService.addNew();
      navigateToNextPage = false;
      this.aliasesReset = !this.aliasesReset;
    }

    if (formData.action === 'continue') {
      this.editDefendant = this.defendantStateService.next();
      navigateToNextPage = this.editDefendant === null;
    }

    if (!navigateToNextPage) {
      this.defendantType = this.getDefendantType(this.editDefendant);
      this.counter = this.defendantStateService.counter;

      this.clearErrors();
      window.scroll(0, 0);
    }

    this.submitFormData.emit({
      navigateToNextPage,
      defendantToStore: formData.defendantToStore
    });
  }

  displayErrors(errors: ValidationError[]) {
    this.errors = errors;

    if (errors && errors.length) {
      setTimeout(() => {
        const element = document.querySelector(`#${errors[0].id}`);
        if (element) {
          element.scrollIntoView();
        }
      }, 50);
    }
  }

  back() {
    this.editDefendant = this.defendantStateService.previous();

    if (this.editDefendant) {
      this.defendantType = this.getDefendantType(this.editDefendant);
      this.counter = this.defendantStateService.counter;
      this.clearErrors();
      window.scroll(0, 0);
    } else {
      this.location.back();
    }
  }
}
