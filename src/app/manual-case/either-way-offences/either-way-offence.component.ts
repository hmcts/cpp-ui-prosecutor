import { Location, KeyValuePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ValidationError, PdkGrid, PdkFormFieldComponent, PdkSelectComponent, PdkInsetTextComponent, PdkDateInputComponent, PdkRadioGroupComponent, PdkFormGroupComponent, PdkCore, PdkForm, PdkButtonDirective } from '@cpp/pdk';
import { ManualCaseDefendant } from '../../core/model/manual-case-defendant';
import { ManualCaseOffence } from '../../core/model/manual-case-offence';
import { VerdictType } from '../../core/model/reference-data-interfaces/verdicts';
import { SubmitData } from '../manual-case-create.container';
import { Option } from '../../core/model/global/option';
import { cloneDeep } from 'lodash';
import { ManualCaseOffenceStateService, OffenceIdsWithDefendants } from '../offences-state.service';
import { TranslateModule } from '@ngx-translate/core';
import { FullNamePipe } from '../../shared/pipes/full-name/full-name.pipe';

@Component({
    selector: 'either-way-offence',
    templateUrl: './either-way-offence.component.html',
    styleUrls: ['./either-way-offence.component.scss'],
    imports: [PdkGrid, PdkCore, PdkButtonDirective, PdkFormFieldComponent, PdkSelectComponent, PdkInsetTextComponent, PdkDateInputComponent, PdkRadioGroupComponent, PdkFormGroupComponent, FormsModule, TranslateModule, FullNamePipe, KeyValuePipe, PdkForm]
})
export class EitherWayOffenceComponent implements OnInit {
  private location = inject(Location);
  private offenceStateService = inject(ManualCaseOffenceStateService);

  @Input() manualCaseDefendants: ManualCaseDefendant[];
  @Input() pleaOptions: Option[];
  @Input() allocationDecisionOptions: any[];
  @Input() verdictsOptions: Option[];
  @Input() verdictsTypes: VerdictType[];
  @Input() initiationCode: string;

  @Output() submitFormData = new EventEmitter<SubmitData<ManualCaseDefendant[]>>();

  @ViewChild(NgForm) form: NgForm;

  offencesWithDefendants: OffenceIdsWithDefendants;

  pleaOption: [];
  editManualCaseDefendants: ManualCaseDefendant[];



  constructor() {}

  ngOnInit(): void {
    this.editManualCaseDefendants = cloneDeep(this.manualCaseDefendants);
    this.offencesWithDefendants = this.offenceStateService.getDefendantsGroupedByOffenceId(
      this.editManualCaseDefendants,
      this.initiationCode
    );
  }

  onErrors(errors: ValidationError[] | any) {
    if (errors && errors.length) {
      const element = document.querySelector(`#${errors[0].id}`);
      if (element) {
        element.scrollIntoView();
      }
    }
  }

  getDefedantOffence(defendant: ManualCaseDefendant, offenceId: string): ManualCaseOffence {
    return defendant.offences.find(offence => offence.offenceId === offenceId);
  }

  verdictChanged(event, offence: ManualCaseOffence) {
    const selectedVerdict = this.verdictsTypes.find(verdictType => verdictType.id === event.value);
    if (selectedVerdict && selectedVerdict.category && selectedVerdict.categoryType) {
      offence.verdict.verdictType.category = selectedVerdict.category;
      offence.verdict.verdictType.categoryType = selectedVerdict.categoryType;
    }
  }

  submitData(formData: any): void {
    this.submitFormData.emit({
      caseData: this.editManualCaseDefendants,
      navigateToNextPage: true
    });
  }

  back() {
    this.location.back();
  }

  resetFormforOffenceId(offenceId: string) {
    this.offencesWithDefendants[offenceId].offence.verdict = {
      verdictType: {
        id: undefined,
        category: undefined,
        categoryType: undefined
      },
      verdictDate: undefined
    };

    this.offencesWithDefendants[offenceId].offence.motReasonId = undefined;
  }
}
