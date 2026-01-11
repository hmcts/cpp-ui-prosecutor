import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import moment from 'moment';
import uuid from 'uuid/v4';
import { PleaType } from '@cpp/reference-data';
import { ManualCasePath } from '../../manual-case.interface';
import { ManualCaseDefendant, AlcoholLevelMethod } from '../../../core/model';
import { ManualCase } from '../../../core/model/manual-case';
import { ManualCaseOffenceStateService } from '../../offences-state.service';
import { ManualCaseOffence } from '../../../core/model/manual-case-offence';
import { VerdictType } from '../../../core/model/reference-data-interfaces/verdicts';
import { MotReason } from '../../../core/model/reference-data-interfaces/mot-reason';
import { PdkGrid, PdkDividerComponent, PdkCore, PdkTable } from "@cpp/pdk";
import { TranslateModule } from '@ngx-translate/core';
import { CurrencyPipe } from '@angular/common';
import { FullNamePipe } from '../../../shared/pipes/full-name/full-name.pipe';
import { LowerCasePipe, TitleCasePipe, DatePipe } from '@angular/common';
@Component({
    selector: 'manual-case-offence-details',
    templateUrl: './manual-case-offence-details.component.html',
    styleUrls: ['./manual-case-offence-details.component.scss'],
    imports: [PdkCore, PdkGrid, PdkTable, PdkDividerComponent, TranslateModule, DatePipe, CurrencyPipe, FullNamePipe, LowerCasePipe, TitleCasePipe]
})
export class OffenceDetailsComponent {
  private offenceStateService = inject(ManualCaseOffenceStateService);

  title: string;
  @Input() defendants: ManualCaseDefendant[];
  @Input() hasNpp = true;
  @Input() prosecutionCase: ManualCase;
  @Input() alcoholLevelMethods: AlcoholLevelMethod[];
  @Input() pleaTypes: PleaType[];
  @Input() verdictsTypes: VerdictType[];
  @Input() allocationDecisionTypes: MotReason[];
  @Output() edit = new EventEmitter<ManualCasePath>();
  @Output() add = new EventEmitter<ManualCasePath>();
  @Output() remove = new EventEmitter<any>();
  todayDate = moment().toISOString();

  constructor() {}

  onAdd() {
    this.offenceStateService.editOffence(this.createUUID());
    this.add.emit(ManualCasePath.NewOffence);
  }

  onEdit(offence: ManualCaseOffence) {
    this.offenceStateService.editOffence(offence.offenceId);
    this.edit.emit(ManualCasePath.EditOffence);
  }

  onRemove(defendantIndex, offenceIndex) {
    const defendant = this.defendants[defendantIndex];
    this.remove.emit({
      defendantId: defendant.id,
      offenceId: defendant.offences[offenceIndex].offenceId
    });
  }

  getAlcoholLevelMethod(methodCode?: string) {
    if (methodCode) {
      return this.alcoholLevelMethods.find(m => m.methodCode === methodCode).methodDescription;
    }
  }

  getPleaDescription(pleaValue: string) {
    if (this.pleaTypes) {
      return this.pleaTypes.find(item => item.pleaValue === pleaValue).pleaTypeDescription;
    }
  }

  getVerdictDescription(id: string) {
    if (this.verdictsTypes) {
      return this.verdictsTypes.find(item => item.id === id).description;
    }
  }

  getAllocationDecisionDescription(id: string) {
    if (this.allocationDecisionTypes) {
      return this.allocationDecisionTypes.find(item => item.id === id).description;
    }
  }

  createUUID() {
    return uuid();
  }
}
