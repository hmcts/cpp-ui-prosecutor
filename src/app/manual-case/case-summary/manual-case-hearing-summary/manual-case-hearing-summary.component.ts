import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CourtCentreWithRooms, HearingType } from '../../../core';
import { InitialHearing } from '../../../core/model/manual-case';
import { ManualCasePath } from '../../manual-case.interface';
import * as moment from 'moment';
import { PdkCore, PdkDividerComponent, PdkGridComponent, PdkTable } from '@cpp/pdk';
import { TitleCasePipe, LowerCasePipe, DatePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { DashPipe } from '../../../shared/pipes/dash/dash.pipe';

@Component({
  selector: 'manual-case-hearing-summary',
  templateUrl: './manual-case-hearing-summary.html',
  styleUrls: ['./manual-case-hearing-summary.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    PdkDividerComponent,
    PdkGridComponent,
    TranslateModule,
    DatePipe,
    TitleCasePipe,
    LowerCasePipe,
    DashPipe,
    PdkTable,
    PdkCore
  ]
})
export class ManualCaseHearingSummaryComponent implements OnInit {
  @Input() initialHearing: InitialHearing;
  @Input() courtCentres: CourtCentreWithRooms[];
  @Input() hearingTypes: HearingType[];
  @Output() edit = new EventEmitter<ManualCasePath>();
  courtCentreName: string;
  courtRoomName: string;
  hearingTypeDesc: string;
  duration: number;
  courtCentre: CourtCentreWithRooms = {
    id: null,
    name: null,
    courtrooms: []
  };

  constructor() {}

  ngOnInit() {
    this.courtCentre = this.courtCentres.find(cc => cc.oucode === this.initialHearing.courtHearingLocation);

    this.courtCentreName = this.getCourtName();
    if (this.initialHearing.roomId) {
      this.courtRoomName = this.getCourtRoomNameByID(this.initialHearing.roomId);
    }
    if (this.initialHearing.hearingTypeCode) {
      this.hearingTypeDesc = this.hearingTypes.find(cr => cr.code === this.initialHearing.hearingTypeCode).description;
    }
    this.duration = moment.duration(this.initialHearing.hearingDuration).asMinutes();
  }

  getCourtName(): string {
    return this.courtCentre.name;
  }

  getCourtRoomNameByID(id: string): string {
    return this.courtCentre.courtrooms.find(cr => cr.id === id).name;
  }

  onEdit() {
    this.edit.emit(ManualCasePath.EditHearing);
  }
}
