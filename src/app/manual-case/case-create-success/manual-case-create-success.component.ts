import { Component, Input } from '@angular/core';
import { ManualCase } from '../../core/model/manual-case';

@Component({
  selector: 'manual-case-create-success',
  templateUrl: './manual-case-create-success.component.html'
})
export class CaseCreateSuccessComponent {
  @Input() reference: { prosecutorCaseReference: string; caseId: string };
  @Input() caseDetails: ManualCase;

  constructor() {}

  get isTypeSjp() {
    return this.caseDetails.initiationCode === 'J';
  }

  get isSummons() {
    return this.caseDetails.initiationCode === 'S';
  }
}
