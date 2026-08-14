import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { EitherWayOffenceComponent } from '../either-way-offence.component';
import { ManualCaseDefendant } from '../../../core/model/manual-case-defendant';
import { By } from '@angular/platform-browser';
import { ManualCaseOffenceStateService } from '../../offences-state.service';
import { OffenceModeOfTrialType } from '../../../core/model/reference-data-interfaces/offence-type';
import { provideRouter } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FullNamePipe } from '../../../shared/pipes/full-name/full-name.pipe';
import { provideTranslateService } from '@ngx-translate/core';
const mockDefendants = ([
  {
    id: 'c0121990-1eaf-4f05-ad4e-491e3aa4092e',
    individual: {
      personalInformation: {
        title: 'Mr',
        firstName: 'Joe',
        lastName: 'Bloggs'
      }
    },
    offences: [
      {
        offenceCode: 'RT88584B',
        offenceSequenceNumber: 1,
        offenceLegislation:
          'Contrary to section 5A(1)(a) of the Road Traffic Act 1988 and Schedule 2 to ' +
          `the Road Traffic Offenders Act 1988 and section 44 of the Magistrates' Courts Act 1980.`,
        offenceTitle:
          'Aid abet the driving of a motor vehicle with a proportion of a specified controlled drug above the specified limit',
        offenceId: '12af2be8-b257-4227-9cf0-3d77975ed7aa',
        offenceWording: 'some offence wording',
        plea: {
          pleaValue: 'INDICATED_GUILTY',
          pleaDate: '2020-10-10'
        },
        verdict: {
          verdictType: 'GUILTY',
          verdictDate: '2020-10-10'
        },
        modeOfTrialDerived: OffenceModeOfTrialType.EitherWay
      }
    ]
  },
  {
    id: '6c7f97ab-ed75-4414-8e2e-dbeadd9b282d',
    individual: {
      personalInformation: {
        title: 'Mrs',
        firstName: 'Jane',
        lastName: 'Smith'
      }
    },
    offences: [
      {
        offenceCode: 'WT88586C',
        offenceSequenceNumber: 2,
        offenceLegislation:
          'Contrary to section 5A(1)(a) of the Road Traffic Act 1988 and Schedule 2 to ' +
          `the Road Traffic Offenders Act 1988 and section 44 of the Magistrates' Courts Act 1980.`,
        offenceTitle:
          'Aid abet the driving of a motor vehicle with a proportion of a specified controlled drug above the specified limit',
        offenceId: '8ecd315e-c3d3-4e5e-ace7-0c0e7ee951b1',
        offenceWording: 'Caught Driving On Phone',
        plea: {
          pleaValue: 'GUILTY',
          pleaDate: '2020-10-10'
        },
        verdict: {
          verdictType: 'GUILTY',
          verdictDate: '2020-10-10'
        },
        modeOfTrialDerived: OffenceModeOfTrialType.EitherWay
      }
    ]
  },
  {
    id: '46e1c5f5-5e91-4655-9eda-43368640f218',
    individual: {
      personalInformation: {
        title: 'Mr',
        firstName: 'Fred',
        lastName: 'Davies'
      }
    },
    offences: [
      {
        offenceCode: 'ZT88589B',
        offenceSequenceNumber: 3,
        offenceLegislation:
          'Contrary to section 5A(1)(a) of the Road Traffic Act 1988 and Schedule 2 to ' +
          `the Road Traffic Offenders Act 1988 and section 44 of the Magistrates' Courts Act 1980.`,
        offenceTitle:
          'Aid abet the driving of a motor vehicle with a proportion of a specified controlled drug above the specified limit',
        offenceId: 'c9cb0f24-ac3b-4a76-9c67-1320196daf79',
        offenceWording: 'Drunk Driving',
        plea: {
          pleaValue: 'NOT_GUILTY',
          pleaDate: '2020-10-10'
        },
        verdict: {
          verdictType: 'GUILTY',
          verdictDate: '2020-10-10'
        },
        modeOfTrialDerived: OffenceModeOfTrialType.EitherWay
      }
    ]
  },
  {
    id: '46e1c5f5-5e91-4655-9eda-43368640f218',
    organisationName: 'Test organisation',
    documentationLanguage: 'E',
    hearingLanguage: 'E',
    address: {
      address1: '22',
      address2: 'Acacia Avenue',
      address3: 'Acacia Town',
      address4: '',
      address5: '',
      postcode: 'SW11 1JU'
    },
    offences: [
      {
        offenceCode: 'ZT88589B',
        offenceSequenceNumber: 4,
        offenceLegislation:
          'Contrary to section 5A(1)(a) of the Road Traffic Act 1988 and Schedule 2 to ' +
          `the Road Traffic Offenders Act 1988 and section 44 of the Magistrates' Courts Act 1980.`,
        offenceTitle:
          'Aid abet the driving of a motor vehicle with a proportion of a specified controlled drug above the specified limit',
        offenceId: '4fc9cb0f24-ac3b-4a76-9c67-1320196daf79',
        offenceWording: 'Drunk Driving',
        plea: {
          pleaValue: 'NOT_GUILTY',
          pleaDate: '2020-10-10'
        },
        verdict: {
          verdictType: 'GUILTY',
          verdictDate: '2020-10-10'
        },
        modeOfTrialDerived: OffenceModeOfTrialType.EitherWay
      }
    ]
  }
] as unknown) as ManualCaseDefendant[];

describe('EitherWayOffenceComponent', () => {
  let component: EitherWayOffenceComponent;
  let fixture: ComponentFixture<EitherWayOffenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EitherWayOffenceComponent, FullNamePipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        ControlContainer,
        NgForm,
        ManualCaseOffenceStateService,
        provideRouter([]),
        { provide: ActivatedRoute, useValue: { snapshot: { params: { id: '123' } } } },
        provideTranslateService({
          lang: 'en',
          fallbackLang: 'en'
        })
      ]
    });

    fixture = TestBed.createComponent(EitherWayOffenceComponent);
    component = fixture.componentInstance;
    component.manualCaseDefendants = mockDefendants;
    component.initiationCode = 'CO';
    fixture.detectChanges();
  });

  it('should trigger submitFormData when the CONTINUE button is pressed and navigate to next page', () => {
    fixture.debugElement.query(By.css(`button[data-role='continue']`)).nativeElement.click();

    component.submitFormData.subscribe(data => {
      expect(data).toEqual({
        navigateToNextPage: true,
        defendantsWithOffences: mockDefendants
      });
    });
  });

  describe('when `initiationCode === "CO"', () => {
    it('should allow input of `pleaDate` if plea is `INDICATED_GUILTY`', () => {
      const pleaInput = fixture.debugElement.queryAll(By.css(`pdk-inset-text`));

      expect(pleaInput.length).toEqual(4);
      expect(pleaInput[0].nativeElement).toMatchSnapshot();
    });

    it('should allow input of `pleaDate` and `allocationDecision` if plea is `GUILTY`', () => {
      const pleaInput = fixture.debugElement.queryAll(By.css(`pdk-inset-text`));

      expect(pleaInput.length).toEqual(4);
      expect(pleaInput[1].nativeElement).toMatchSnapshot();
    });

    it('should allow input of `pleaDate`, `allocationDecision`, `verdict` and `verdictDate` if plea is `NOT_GUILTY`', () => {
      const pleaInput = fixture.debugElement.queryAll(By.css(`pdk-inset-text`));

      expect(pleaInput.length).toEqual(4);
      expect(pleaInput[2].nativeElement).toMatchSnapshot();
    });
  });
  describe('when `initiationCode === "T"', () => {
    it('should allow input of `allocationDecision`', () => {
      component.initiationCode = 'T';
      fixture.detectChanges();

      const selectInput = fixture.debugElement.queryAll(By.css(`pdk-select`));

      expect(selectInput.length).toEqual(4);
      expect(selectInput[0].nativeElement).toMatchSnapshot();
    });
  });
});
