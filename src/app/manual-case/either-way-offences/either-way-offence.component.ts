import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ValidationError } from '@cpp/pdk';
import { ManualCaseDefendant } from '../../core/model/manual-case-defendant';
import { ManualCaseOffence, VerdictType } from '../../core/model/manual-case-offence';
import { SubmitData } from '../manual-case-create.container';
import { Option } from '../../core/model/global/option';
import { cloneDeep } from 'lodash';
import { ManualCaseOffenceStateService, OffenceIdsWithDefendants } from '../offences-state.service';

@Component({
  selector: 'either-way-offence',
  templateUrl: './either-way-offence.component.html',
  styleUrls: ['./either-way-offence.component.scss']
})
export class EitherWayOffenceComponent implements OnInit {
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

  constructor(private location: Location, private offenceStateService: ManualCaseOffenceStateService) {}

  ngOnInit(): void {
    this.editManualCaseDefendants = cloneDeep(this.manualCaseDefendants);
    this.offencesWithDefendants = this.offenceStateService.getDefendantsGroupedByOffenceId(
      this.editManualCaseDefendants,
      this.initiationCode
    );
  }

  onErrors(errors: ValidationError[]) {
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
    offence.verdict.verdictType.category = selectedVerdict.category;
    offence.verdict.verdictType.categoryType = selectedVerdict.categoryType;
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
