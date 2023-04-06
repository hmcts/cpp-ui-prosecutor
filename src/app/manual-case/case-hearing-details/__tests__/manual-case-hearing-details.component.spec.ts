import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManualCaseHearingDetailsComponent } from '../manual-case-hearing-details.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ControlContainer, NgForm } from '@angular/forms';
import {
  PdkCoreModule, PdkFormModule, PdkDateInputModule, PdkAutosuggestModule,
  PdkGridModule, PdkRadioInputModule,
  PdkTextareaModule, PdkInputModule
} from '@cpp/pdk';
import { MockPipesModule } from '../../../shared/pipes/mock-pipes';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ManualCase } from '../../../core/model/manual-case';
import { SharedModule } from '../../../shared';

describe('Manual case initial hearing', () => {
  let fixture: ComponentFixture<ManualCaseHearingDetailsComponent>;
  let component: ManualCaseHearingDetailsComponent;

  const manualCaseDetailsMock = {
    caseId: '',
    initiationCode: '',
    summonsCode: '',
    prosecutor: {},
    initialHearing: {
      hearingListingDirection: 'dir',
      courtHearingLocation: 'oucode',
      roomId: 'roomId'
    }
  } as ManualCase;

  beforeEach(() => {
    TestBed.configureCompiler({ preserveWhitespaces: false } as any).configureTestingModule({
      declarations: [ManualCaseHearingDetailsComponent],
      imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        PdkCoreModule,
        PdkFormModule,
        PdkInputModule,
        PdkDateInputModule,
        PdkAutosuggestModule,
        PdkRadioInputModule,
        PdkTextareaModule,
        PdkCoreModule,
        PdkGridModule,
        MockPipesModule,
        RouterTestingModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [ControlContainer, NgForm],
    });

    fixture = TestBed.createComponent(ManualCaseHearingDetailsComponent);
    component = fixture.componentInstance;
    component.manualCaseDetail = manualCaseDetailsMock;
    component.editManualCase = manualCaseDetailsMock;
    component.courtCentres = [{ oucode: 'oucode', courtrooms: [{ roomId: 'roomId', id: 'roomId' }] }] as any;
  });

  it('should render the component', () => {
    fixture.detectChanges();
    component.ngOnInit();
    expect(fixture).toMatchSnapshot();
  });

  it('should render the component 2', () => {
    component.editManualCase.initialHearing = undefined;
    fixture.detectChanges();
    component.ngOnInit();
    expect(fixture).toMatchSnapshot();
  });

  it('should submit with hearingListDirection', () => {
    component.manualCaseDetail = {
      initialHearing: {
        hearingListingDirection: 'dir'
      }
    } as any;
    component.hasCourtRoom = true;
    fixture.detectChanges();
    component.submitData();
    expect(component.editManualCase.initialHearing.hearingListingDirection).toBe(undefined);
  });

  it('should submit with hearingListDirection as false', () => {
    component.manualCaseDetail = {
      initialHearing: {
        hearingListingDirection: 'direction'
      }
    } as any;
    component.hasCourtRoom = false;
    fixture.detectChanges();
    component.submitData();
    expect(component.editManualCase.initialHearing.hearingListingDirection).toBe('direction');
  });

});
