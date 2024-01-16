import {
  OnInit,
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ChangeDetectorRef,
  AfterContentChecked
} from '@angular/core';
import { ManualCase, InitialHearing } from '../../core/model/manual-case';
import { NgForm } from '@angular/forms';
import { ValidationError } from '@cpp/pdk';
import { cloneDeep } from 'lodash';
import { CourtCentreWithRooms, CourtRoom, HearingType } from '../../core';
import { Location } from '@angular/common';
import { JurisdictionCode } from 'src/app/core/model/global/courts-definitions';

@Component({
  selector: 'manual-case-hearing-details',
  templateUrl: './manual-case-hearing-details.html'
})
export class ManualCaseHearingDetailsComponent implements OnInit, AfterContentChecked {
  @Input() manualCaseDetail: ManualCase;
  @Input() courtCentres: CourtCentreWithRooms[];
  @Input() hearingTypes: HearingType[];
  @Output() submitFormData = new EventEmitter<ManualCase>();
  @ViewChild(NgForm) form: NgForm;

  private _hearingDurationFocused = false;
  hasCourtRoom = false;
  editManualCase: ManualCase;
  errors: ValidationError[];
  dateFilter: undefined;
  courtRoomSugestions: CourtRoom[] = [];
  courtCentreSuggestions: CourtCentreWithRooms[] = [];
  hearingTypeSuggestions: HearingType[] = [];

  jurisdictionTypeCode = JurisdictionCode;

  constructor(private cdr: ChangeDetectorRef, private location: Location) {}

  ngOnInit(): void {
    this.editManualCase = cloneDeep(this.manualCaseDetail);
    if (!this.editManualCase.initialHearing) {
      this.editManualCase.initialHearing = {
        hearingDuration: '0:20',
        hearingLanguage: 'E'
      } as InitialHearing;
    } else {
      if (this.editManualCase.initialHearing.roomId) {
        this.hasCourtRoom = true;
      }
    }
  }

  onChanges(options) {
    Object.assign(this.editManualCase.initialHearing, options);
  }

  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }

  get selectedCourtCentre(): CourtCentreWithRooms {
    return this.courtCentres.find(cc => cc.oucode === this.editManualCase.initialHearing.courtHearingLocation);
  }

  set selectedCourtCentre(courtCentreWithRooms: CourtCentreWithRooms) {
    this.editManualCase.initialHearing.courtHearingLocation =
      (courtCentreWithRooms && courtCentreWithRooms.oucode) || undefined;
  }

  get selectedCourtRoom(): CourtRoom {
    return this.selectedCourtCentre
      ? this.selectedCourtCentre.courtrooms.find(cr => cr.id === this.editManualCase.initialHearing.roomId)
      : undefined;
  }

  set selectedCourtRoom(courtRoom: CourtRoom) {
    this.editManualCase.initialHearing.roomId = (courtRoom && courtRoom.id) || undefined;
  }

  get selectedHearingType(): HearingType {
    return this.hearingTypes.find(ht => ht.code === this.editManualCase.initialHearing.hearingTypeCode);
  }

  set selectedHearingType(hearingType: HearingType) {
    this.editManualCase.initialHearing.hearingTypeCode = (hearingType && hearingType.code) || undefined;
  }

  get hearingDurationFocused(): boolean {
    return this._hearingDurationFocused;
  }

  set hearingDurationFocused(value) {
    this._hearingDurationFocused = value;
  }

  isTrialOrSentence() {
    return this.editManualCase.initiationCode === 'T' || this.editManualCase.initiationCode === 'CO';
  }

  setCourtCentresSuggestions(q: string) {
    this.courtCentreSuggestions =
      q.length > 0 ? this.courtCentres.filter(({ name }) => name.toLowerCase().includes(q.toLowerCase())) : [];
  }

  setCourtRoomSuggestions(q: string) {
    this.courtRoomSugestions =
      q.length > 0
        ? this.selectedCourtCentre.courtrooms.filter(({ name }) => name.toLowerCase().includes(q.toLowerCase()))
        : [];
  }

  setHearingTypeSuggestion(q: string) {
    this.hearingTypeSuggestions =
      q.length > 0
        ? this.hearingTypes.filter(({ description }) => description.toLowerCase().includes(q.toLowerCase()))
        : [];
  }

  submitData() {
    if (this.hasCourtRoom && this.editManualCase.initialHearing.hearingListingDirection) {
      delete this.editManualCase.initialHearing.hearingListingDirection;
    } else {
      this.editManualCase.initialHearing.hearingListingDirection = this.editManualCase.initialHearing
        .hearingListingDirection
        ? this.editManualCase.initialHearing.hearingListingDirection.slice(0, 1000)
        : undefined;
    }

    if (
      !this.hasCourtRoom &&
      this.editManualCase.initialHearing.roomId &&
      this.selectedCourtCentre.oucodeL1Code === JurisdictionCode.CROWN
    ) {
      delete this.editManualCase.initialHearing.roomId;
    }
    this.submitFormData.emit(this.editManualCase);
  }

  back() {
    this.location.back();
  }
}
