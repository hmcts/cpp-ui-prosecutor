import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ManualCase } from '../../../core/model/manual-case';
import { ManualCasePath } from '../../manual-case.interface';
import { CourtCentreWithRooms, PoliceForce } from '../../../core';
import { PdkCore, PdkDividerComponent, PdkGridComponent, PdkTable } from "@cpp/pdk";
import { TranslateModule } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'manual-case-detail-summary',
    templateUrl: './manual-case-detail-summary.component.html',
    styleUrls: ['./manual-case-detail-summary.component.scss'],
    imports: [PdkDividerComponent, PdkGridComponent, TranslateModule, DatePipe, PdkCore, PdkTable]
})
export class ManualCaseDetailSummaryComponent implements OnInit {
  @Input() manualCase: ManualCase;
  @Input() courtCentres: CourtCentreWithRooms[];
  @Input() policeForces: PoliceForce[];
  @Output() edit = new EventEmitter<ManualCasePath>();

  courtReceivedToName: string;
  courtReceivedFromName: string;
  policeForceName: string;

  constructor() {}

  ngOnInit() {
    this.courtReceivedToName = this.courtCentres.find(s => s.oucode === this.manualCase.courtReceivedToCode).name;
    this.courtReceivedFromName = this.courtCentres.find(s => s.oucode === this.manualCase.courtReceivedFromCode).name;
    this.policeForceName = this.policeForces.find(
      s => s.policeForceCode === this.manualCase.policeForceCode
    ).policeForceName;
  }

  onEdit() {
    this.edit.emit(ManualCasePath.EditCaseDetail);
  }

  isTrial() {
    return this.manualCase.initiationCode === 'T';
  }

  hasEitherWayType() {
    return this.isTrial() && !!this.manualCase.eitherWayType;
  }
}
