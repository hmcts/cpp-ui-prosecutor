import { Component, EventEmitter, Input, OnChanges, Output, ViewEncapsulation, inject } from '@angular/core';
import { ManualCase } from '../../core/model/manual-case';
import { ManualCaseDefendant } from '../../core/model/manual-case-defendant';
import { Location } from '@angular/common';
import { ManualCasePath } from '../manual-case.interface';
import { CourtCentreWithRooms, HearingType } from '../../core/model/global';
import { Nationality, BailStatus, AlcoholLevelMethod, PoliceForce, Ethnicity, EthnicityCode } from '../../core/model';
import { ManualCaseOffenceStateService } from '../offences-state.service';
import uuid from 'uuid/v4';
import { PleaType, Prosecutor } from '@cpp/reference-data';
import { VerdictType } from '../../core/model/reference-data-interfaces/verdicts';
import { MotReason } from '../../core/model/reference-data-interfaces/mot-reason';
import { PdkAlertComponent, PdkButtonDirective, PdkCore, PdkGridComponent, PdkTable } from "@cpp/pdk";
import { ProsecutionCaseDetailsComponent } from "./prosecution-case-details/prosecution-case-details.component";
import { ManualCaseHearingSummaryComponent } from "./manual-case-hearing-summary/manual-case-hearing-summary.component";
import { DefendantDetailsComponent } from "./manual-defendant-details/manual-defendant-details.component";
import { OffenceDetailsComponent } from "./manual-case-offence-details/manual-case-offence-details.component";
import { TranslateModule } from '@ngx-translate/core';
import { UpperCasePipe } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
@Component({
    selector: 'manual-case-summary',
    templateUrl: './case-summary.component.html',
    styleUrls: ['./case-summary.component.scss'],
    encapsulation: ViewEncapsulation.None,
    imports: [PdkTable, PdkCore, PdkButtonDirective, PdkAlertComponent, PdkGridComponent, ProsecutionCaseDetailsComponent, ManualCaseHearingSummaryComponent, DefendantDetailsComponent, OffenceDetailsComponent, TranslateModule, UpperCasePipe, CurrencyPipe]
})
export class ManualCaseSummaryComponent implements OnChanges {
  private location = inject(Location);
  private offenceStateService = inject(ManualCaseOffenceStateService);

  @Input() caseDetails: ManualCase;
  @Input() defendants: ManualCaseDefendant[];
  @Input() courtCentres: CourtCentreWithRooms[];
  @Input() hasNpp = true;
  @Input() nationalities: Nationality[];
  @Input() remandStatuses: BailStatus[];
  @Input() alcoholLevelMethods: AlcoholLevelMethod[];
  @Input() policeForces: PoliceForce[];
  @Input() hearingTypes: HearingType[];
  @Input() ethnicities: Ethnicity[];
  @Input() pleaTypes: PleaType[];
  @Input() prosecutors: Prosecutor[];
  @Input() verdictsTypes: VerdictType[];
  @Input() allocationDecisionTypes: MotReason[];
  @Input() observedEthnicities: EthnicityCode[];
  @Output() formSubmit = new EventEmitter();
  @Output() edit = new EventEmitter<ManualCasePath>();
  @Output() remove = new EventEmitter<any>();
  @Output() add = new EventEmitter<ManualCasePath>();

  defendantNames = [];
  victimAocpSurcharge: number;
  totalAocpFine: number;

  constructor() {}

  hasAllOffencesAocpEligible() {
    return this.defendants.every(defendant => {
      return (defendant.offences || []).every(offence => offence.aocpEligible);
    });
  }

  getVictimSurcharge(prosecutorCost) {
    // only valid for SJP which has only one defendant
    const fine = (this.defendants[0].offences || []).reduce(
      (total, offence) => total + Number(offence.aocpStandardPenalty),
      0
    );
    const fineAmount = Number(fine);
    const surcharge = (fineAmount * 10) / 100;
    const charge = surcharge > 34 ? surcharge : 34;
    this.totalAocpFine =
      this.defendants[0].offences.reduce(
        (total, offence) => total + (Number(offence.aocpStandardPenalty) + Number(offence.appliedCompensation || 0)),
        0
      ) +
      prosecutorCost +
      charge;
    return charge;
  }

  ngOnChanges(): void {
    this.defendantNames = this.defendants.reduce((names, defendant) => {
      if (!defendant.offences || defendant.offences.length <= 0) {
        names.push({
          firstName: defendant.individual.personalInformation.firstName,
          lastName: defendant.individual.personalInformation.lastName
        });
      }
      return names;
    }, []);
  }

  back() {
    this.location.back();
  }

  submitManualCase() {
    this.formSubmit.emit();
  }

  onEdit(event) {
    this.edit.emit(event);
  }

  onRemove(event) {
    this.remove.emit(event);
  }

  onAdd(event) {
    this.add.emit(event);
  }

  onAddTop() {
    this.offenceStateService.editOffence(this.createUUID());
    this.add.emit(ManualCasePath.NewOffence);
  }

  isSJP() {
    return this.caseDetails.initiationCode === 'J';
  }

  createUUID() {
    return uuid();
  }
}
