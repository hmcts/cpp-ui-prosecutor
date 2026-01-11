import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { ManualCaseHearingSummaryComponent } from '../manual-case-hearing-summary.component';
import { InitialHearing } from '../../../../core/model/manual-case';
import * as moment from 'moment';
import { HearingType } from '../../../../core';
import { provideTranslateService } from '@ngx-translate/core';

describe('Manual case Initial Hearing summary', () => {
  let component: ManualCaseHearingSummaryComponent;
  let fixture: ComponentFixture<ManualCaseHearingSummaryComponent>;

  const initialHearingMock = {
    courtHearingLocation: '1B02B1',
    roomId: '8e912353-3b5d-36c3-953e-ad3b94b19de3',
    hearingTypeCode: '2',
    dateOfHearing: '2100-10-18',
    timeOfHearing: '10:10',
    hearingDuration: '00:50',
    hearingLanguage: 'WELSH'
  } as InitialHearing;

  const courtCentresMock = [
    {
      id: '7e967376-eacf-4fca-9b30-21b0c5aad427',
      name: `Bexley Magistrates' Court`,
      oucode: '1B02B1',
      courtrooms: [
        {
          id: '8e912353-3b5d-36c3-953e-ad3b94b19de3',
          name: 'Courtroom 01'
        },
        {
          id: '1309d479-b08f-3576-8fa7-fd4e77c8d80c',
          name: 'Courtroom 02'
        }
      ]
    }
  ];

  const hearingTypesMock = [
    {
      id: 'test-hearing-type-id',
      code: '2',
      description: 'Show Cause',
      defaultDurationMin: 10
    }
  ] as HearingType[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ManualCaseHearingSummaryComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        ControlContainer,
        NgForm,
        provideTranslateService({
          lang: 'en',
          fallbackLang: 'en'
        })
      ]
    });

    fixture = TestBed.createComponent(ManualCaseHearingSummaryComponent);
    component = fixture.componentInstance;
    component.courtCentres = courtCentresMock;
    component.initialHearing = initialHearingMock;
    component.hearingTypes = hearingTypesMock;
  });

  it('should render the component', () => {
    expect(fixture).toMatchSnapshot();
  });

  it('should render the form with the hearingMock data', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const courtCentreName = component.getCourtName();
    const courtRoomName = component.getCourtRoomNameByID(initialHearingMock.roomId);
    const duration = moment.duration(initialHearingMock.hearingDuration).asMinutes() + ' COMMON.MINUTES';
    expect(compiled.querySelector('#hearing-court-name').textContent).toContain(courtCentreName);
    expect(compiled.querySelector('#hearing-room-name').textContent).toContain(courtRoomName);
    expect(compiled.querySelector('#hearing-type').textContent).toContain('Show Cause');
    expect(compiled.querySelector('#hearing-date').textContent).toContain('18 October 2100');
    expect(compiled.querySelector('#hearing-time').textContent).toContain('10:10 am');
    expect(compiled.querySelector('#hearing-duration').textContent).toContain(duration);
    expect(compiled.querySelector('#hearing-language').textContent).toContain('Welsh');
  });

  it('should display listing officer notes id roomId is not set', () => {
    const mockNotes = 'mock notes';
    component.initialHearing.roomId = undefined;
    component.initialHearing.hearingListingDirection = mockNotes;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#hearing-room-name').textContent).toContain('-');
    expect(compiled.querySelector('#hearing-room-name').textContent).toContain(mockNotes);
  });

  it('should emit expected manual case path on change click', () => {
    spyOn(component.edit, 'emit');
    const nativeElement = fixture.nativeElement;
    const button = nativeElement.querySelector('a');
    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(component.edit.emit).toHaveBeenCalledWith('edit-hearing');
  });
});
