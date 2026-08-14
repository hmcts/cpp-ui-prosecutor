import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  Input,
  OnChanges,
  ViewChild,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  inject
} from '@angular/core';
import uuid from 'uuid/v4';
import { cloneDeep } from 'lodash';
import { Location, NgTemplateOutlet } from '@angular/common';
import { ManualCaseDefendant } from '../../core/model/manual-case-defendant';
import { ManualCaseOffence } from '../../core/model/manual-case-offence';
import { ManualCaseOffenceStateService } from '../offences-state.service';
import { take } from 'rxjs/operators';
import {
  ValidationError,
  PdkGrid,
  PdkErrorSummaryComponent,
  PdkFormFieldComponent,
  PdkDateInputComponent,
  PdkInsetTextComponent,
  PdkRadioGroupComponent,
  PdkCheckboxGroupComponent,
  PdkCheckboxComponent,
  PdkCurrencyInputComponent,
  PdkRadioButtonComponent,
  PdkFormGroupComponent,
  PdkForm,
  PdkCore,
  PdkTextInput,
  PdkInput,
  PdkButtonDirective
} from '@cpp/pdk';
import { OffenceParsingService } from '../case-offence-parsing/offence-parsing.service';
import { OffenceTypeDetails, OffenceDateCode, AlcoholLevelMethod, FormListOption } from '../../core';
import { PCFReferenceDataOffenceService } from '../../contexts/reference-data/pcf-reference-data-offence';
import { OffenceModeOfTrialType } from '../../core/model/reference-data-interfaces/offence-type';
import { DynamicParticularFormComponent } from './dynamic-particular-form.component';
import { OffenceWordingService } from '../case-offence-parsing/offence-wording.service';
import { OffenceWordingMessage } from '../../core/model/manual-case';
import { OffenceSearchComponent } from '../../shared';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'manual-case-offence',
  templateUrl: './manual-case-offence.component.html',
  styleUrls: ['./manual-case-offence.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    PdkForm,
    PdkCore,
    PdkGrid,
    PdkErrorSummaryComponent,
    PdkFormFieldComponent,
    PdkDateInputComponent,
    OffenceSearchComponent,
    PdkInsetTextComponent,
    DynamicParticularFormComponent,
    PdkRadioGroupComponent,
    PdkCheckboxGroupComponent,
    PdkCheckboxComponent,
    PdkCurrencyInputComponent,
    PdkRadioButtonComponent,
    PdkFormGroupComponent,
    TranslateModule,
    FormsModule,
    PdkTextInput,
    PdkInput,
    PdkButtonDirective,
    NgTemplateOutlet
  ]
})
export class ManualCaseOffenceComponent implements OnInit, OnChanges {
  private location = inject(Location);
  private referenceDataOffenceService = inject(PCFReferenceDataOffenceService);
  private offenceStateService = inject(ManualCaseOffenceStateService);
  private offenceParsingService = inject(OffenceParsingService);
  private offenceWordingService = inject(OffenceWordingService);
  private changeDetector = inject(ChangeDetectorRef);

  get formErrors(): ValidationError[] | null | any {
    return this._formErrors;
  }

  set formErrors(errors: ValidationError[] | null | any) {
    if (this._dynamicFormErrors && errors) {
      this._formErrors = this._dynamicFormErrors.concat(errors);
    } else {
      this._formErrors = errors;
    }
  }

  set dynamicFormErrors(errors: ValidationError[] | null) {
    this._formErrors = errors;
    this._dynamicFormErrors = errors;
  }

  @Input() manualCaseDefendants: ManualCaseDefendant[];
  @Input() hasNpp: boolean;
  @Input() offenceDateCodes: OffenceDateCode[];
  @Input() alcoholLevelMethods: AlcoholLevelMethod[];
  @Input() manualCaseType: string;
  @Input() iterateOffence: boolean;
  @Output() submitFormData = new EventEmitter<any>();
  @ViewChild(DynamicParticularFormComponent)
  dynamicForm: DynamicParticularFormComponent;
  @Input() editOffence: ManualCaseOffence;
  alcoholLevelMethodOptions = [];
  offenceDateCodesOptions: FormListOption[] = [];
  selectedDefendantIds = [];
  defendantOptions = [];
  counter: string;
  selectAll = false;
  submitAction = '';
  arrestDateValue: string;
  offenceSearchDate: string;
  private _formErrors: ValidationError[];
  private _dynamicFormErrors: ValidationError[];

  constructor() {}

  get getStartDateValue() {
    const dateSection = this.editOffence.dynamicParticularFormData.sections.find(section => section.type === 'DATE');

    return dateSection && dateSection.value ? dateSection.value : '';
  }

  get showChargeDate(): boolean {
    return this.manualCaseType === 'Q' || this.manualCaseType === 'C' || this.manualCaseType === 'J';
  }

  get showArrestDate(): boolean {
    return this.manualCaseType === 'C';
  }

  get showLaidDate(): boolean {
    return this.manualCaseType === 'S' && this.hasNpp;
  }

  ngOnChanges(): void {
    const defendants = cloneDeep(this.manualCaseDefendants);
    this.offenceStateService.initialise(defendants);
    this.iterateOffence = this.offenceStateService.iterateOffence;
  }

  ngOnInit(): void {
    this.editOffence = this.offenceStateService.load();
    this.refreshDefendants(this.editOffence.offenceId);

    if (this.offenceDateCodes) {
      this.offenceDateCodesOptions = this.offenceDateCodes.map(code => ({
        value: code.dateCode,
        label: code.dateCodeDescription
      }));
    }

    if (this.alcoholLevelMethods) {
      this.alcoholLevelMethodOptions = this.alcoholLevelMethods.map(code => ({
        value: code.methodCode,
        label: code.methodDescription
      }));
    }
  }

  update(event) {
    this.referenceDataOffenceService
      .getOffenceTypeById(event.offenceId)
      .pipe(take(1))
      .subscribe((offence: OffenceTypeDetails) => {
        this.offenceSearchDate = '';
        this.editOffence.offenceCommittedDate = undefined;
        this.editOffence.offenceCommittedEndDate = undefined;
        this.editOffence.standardOffenceWording = offence.standardoffencewording;
        this.editOffence.drugsOrAlcoholRelated = offence.drugsOrAlcoholRelated;
        this.editOffence.backDutyAllowed = offence.backDuty;
        this.editOffence.locationRequired = offence.locationRequired;
        this.editOffence.modeOfTrialDerived = offence.modeOfTrialDerived;

        if (this.editOffence.offenceCode !== event.cjsOffenceCode) {
          this.editOffence.offenceWording = event.pnldOffenceWording;
          this.editOffence.dynamicParticularFormData = this.offenceParsingService.parse(event.pnldOffenceWording);

          this.editOffence.offenceCode = event.cjsOffenceCode;
          this.editOffence.offenceLegislation = event.legislation;
          this.editOffence.offenceTitle = event.title;
          this.editOffence.aocpEligible = event.aocpEligible;
          this.editOffence.aocpStandardPenalty = event.aocpStandardPenalty;
        }
        this.changeDetector.markForCheck();
      });
  }

  isOffenceCodeRequired(offenceCode: string | null): boolean {
    return !Boolean(offenceCode);
  }

  toggleSelectAll(checked: boolean) {
    this.selectAll = checked;
    this.selectedDefendantIds = this.selectAll ? this.manualCaseDefendants.map(d => d.id) : [];
  }

  updateSelectedDefendants(defendantIds: string[]) {
    this.selectedDefendantIds = defendantIds;
    this.selectAll = this.editOffence.defendantOptions.length === defendantIds.length;
  }

  refreshDefendants(offenceId: string) {
    this.editOffence.defendantOptions = this.offenceStateService.getDefendantOptions(offenceId);
    this.selectAll = this.editOffence.defendantOptions.every(d => d.checked);

    this.selectedDefendantIds = this.offenceStateService.getSelectedDefendantIds(offenceId);
    this.counter = this.offenceStateService.counter;
  }

  beforeSubmit(action: string): void {
    this.submitAction = action;
  }

  dynamicFormChange(data: OffenceWordingMessage) {
    if (!!data) {
      this.editOffence.dynamicParticularFormData = data;
      this.updateOffenceWording();
    }
  }

  async submitData(formData: any) {
    if (this.dynamicForm.form && !(await this.dynamicForm.triggerFormSubmit())) {
      return;
    }

    const selectedDefendantIds = cloneDeep(formData.defendantIds);
    const isEditingEitherWayOffence =
      !!this.editOffence &&
      this.editOffence.modeOfTrialDerived &&
      this.editOffence.modeOfTrialDerived.toLowerCase() === OffenceModeOfTrialType.EitherWay;
    this.editOffence.offenceId = this.editOffence.offenceId || uuid();
    this.editOffence.prosecutorOfferAOCP = formData.prosecutorOfferAOCP;
    const manualCaseOffence = cloneDeep(this.editOffence);

    const defendantsWithOffences = this.offenceStateService.mapOffenceToDefendants(
      manualCaseOffence,
      this.manualCaseDefendants,
      selectedDefendantIds
    );

    let navigateToNextPage = true;

    if (this.submitAction === 'add') {
      this.editOffence = this.offenceStateService.addNew();
      navigateToNextPage = false;
    }

    if (this.submitAction === 'continue') {
      this.editOffence = this.offenceStateService.next();
      navigateToNextPage = this.editOffence === null;
    }

    if (!navigateToNextPage) {
      this.refreshDefendants(this.editOffence.offenceId);
      window.scroll(0, 0);
    }

    this.submitFormData.emit({
      navigateToNextPage,
      defendantsWithOffences,
      isEitherWayOffence: isEditingEitherWayOffence
    });
  }

  back() {
    this.editOffence = this.offenceStateService.previous();

    if (this.editOffence) {
      this.refreshDefendants(this.editOffence.offenceId);
      window.scroll(0, 0);
    } else {
      this.location.back();
    }
  }

  private updateOffenceWording() {
    this.editOffence.offenceWording = this.offenceWordingService.buildParticularWording(
      this.editOffence.dynamicParticularFormData.sections,
      this.offenceDateCodesOptions,
      this.editOffence
    );
  }
}
