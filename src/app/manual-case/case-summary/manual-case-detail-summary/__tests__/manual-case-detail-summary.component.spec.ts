import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { ManualCase } from '../../../../core/model/manual-case';
import { ManualCaseDetailSummaryComponent } from '../manual-case-detail-summary.component';
import { CourtCentreWithRooms, PoliceForce } from '../../../../core';
import { provideTranslateService } from '@ngx-translate/core';

describe('ManualCaseDetailSummaryComponent', () => {
  let component: ManualCaseDetailSummaryComponent;
  let fixture: ComponentFixture<ManualCaseDetailSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ManualCaseDetailSummaryComponent],
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

    fixture = TestBed.createComponent(ManualCaseDetailSummaryComponent);
    component = fixture.componentInstance;
    component.manualCase = {
      initiationCode: 'T',
      dateReceived: '2018-12-10',
      trialReceiptType: 'Either way case',
      eitherWayType: 'Direction of Magistrate',
      courtReceivedToCode: '1B02B1',
      courtReceivedFromCode: 'B01CN00',
      policeForceCode: '2'
    } as ManualCase;

    component.courtCentres = [
      { oucode: '1B02B1', name: `Bexley Magistrates' Court` },
      { oucode: 'B01CN00', name: `Bromley Magistrates' Court` }
    ] as CourtCentreWithRooms[];

    component.policeForces = [
      { policeForceCode: '2', policeForceName: 'London' },
      { policeForceCode: '3', policeForceName: 'Cumbria' }
    ] as PoliceForce[];
  });

  it('should render the component', () => {
    expect(fixture).toMatchSnapshot();
  });

  it('should emit expected manual case path on change click', () => {
    spyOn(component.edit, 'emit');

    const nativeElement = fixture.nativeElement;
    const button = nativeElement.querySelector('a');
    button.dispatchEvent(new Event('click'));

    fixture.detectChanges();
    expect(component.edit.emit).toHaveBeenCalledWith('edit-case-detail');
  });

  it('isTrial should return true if initiationCode is T', () => {
    component.manualCase = { initiationCode: 'T' } as ManualCase;
    expect(component.isTrial()).toBeTruthy();
  });

  it('isTrial should return false if initiationCode is CO', () => {
    component.manualCase = { initiationCode: 'CO' } as ManualCase;
    expect(component.isTrial()).toBeFalsy();
  });

  it('hasEitherWayType should return true if initiationCode is T and eitherWayType has a value', () => {
    component.manualCase = { initiationCode: 'T', eitherWayType: 'something' } as ManualCase;
    expect(component.hasEitherWayType()).toBeTruthy();
  });

  it('hasEitherWayType should return false if initiationCode is T and eitherWayType has NO value', () => {
    component.manualCase = { initiationCode: 'T', eitherWayType: '' } as ManualCase;
    expect(component.hasEitherWayType()).toBeFalsy();
  });
});
