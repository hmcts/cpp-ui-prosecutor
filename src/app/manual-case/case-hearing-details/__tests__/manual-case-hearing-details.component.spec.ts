import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManualCaseHearingDetailsComponent } from '../manual-case-hearing-details.component';
import { FormsModule, ControlContainer, NgForm } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ManualCase } from '../../../core/model/manual-case';
import { AgeMockPipe } from '../../../shared/pipes/mock-pipes/age-mock.pipe';
import { TranslateMockPipe } from '../../../shared/pipes/mock-pipes/translate-mock.pipe';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';

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
    TestBed.configureTestingModule({
      imports: [FormsModule, AgeMockPipe, TranslateMockPipe, ManualCaseHearingDetailsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        ControlContainer,
        NgForm,
        provideRouter([]),
        provideTranslateService({
          lang: 'en',
          fallbackLang: 'en'
        })
      ]
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
