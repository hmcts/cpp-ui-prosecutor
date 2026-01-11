import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlContainer, NgForm } from '@angular/forms';
import { PleaType } from '@cpp/reference-data';
import { OffenceDetailsComponent } from '../manual-case-offence-details.component';
import { ManualCaseOffenceStateService } from '../../../offences-state.service';
import { ManualCaseDefendant } from '../../../../core';
import { VerdictType } from '../../../../core/model/reference-data-interfaces/verdicts';
import { MotReason } from '../../../../core/model/reference-data-interfaces/mot-reason';
import { provideTranslateService } from '@ngx-translate/core';

const mockDefendants = [
  {
    offences: [
      {
        alcoholRelatedOffence: {
          alcoholLevelMethod: 'B',
          alcoholLevelAmount: '25'
        },
        offenceCode: 'RT88584B',
        offenceSequenceNumber: 1,
        offenceLegislation:
          'Contrary to section 5A(1)(a) of the Road Traffic Act 1988 and Schedule 2 to ' +
          `the Road Traffic Offenders Act 1988 and section 44 of the Magistrates' Courts Act 1980.`,
        offenceTitle:
          'Aid abet the driving of a motor vehicle with a proportion of a specified controlled drug above the specified limit',
        offenceId: '12af2be8-b257-4227-9cf0-3d77975ed7aa',
        offenceDateCode: 3,
        offenceCommittedDate: '2018-12-01',
        offenceWording: 'some offence wording',
        backDutyDateFrom: '2018-07-07',
        backDutyDateTo: '2018-09-09',
        arrestDate: '2019-03-02',
        chargeDate: '2019-05-02',
        backDuty: 250
      }
    ]
  },
  {
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
        offenceWording: 'Caught Driving On Phone'
      }
    ]
  },
  {
    id: '46e1c5f5-5e91-4655-9eda-43368640f218',
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
        offenceWording: 'Drunk Driving'
      }
    ]
  }
] as ManualCaseDefendant[];

const mockAlcoholBloodLevelMethods = [
  {
    id: 'id-1',
    seqNo: 1,
    methodCode: 'A',
    methodDescription: 'Blood'
  },
  {
    id: 'id-2',
    seqNo: 2,
    methodCode: 'B',
    methodDescription: 'Breath'
  }
];

describe('OffenceDetailsComponent', () => {
  let component: OffenceDetailsComponent;
  let fixture: ComponentFixture<OffenceDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [OffenceDetailsComponent],
      providers: [
        ControlContainer,
        NgForm,
        ManualCaseOffenceStateService,
        provideTranslateService({
          lang: 'en',
          fallbackLang: 'en'
        })
      ]
    });

    fixture = TestBed.createComponent(OffenceDetailsComponent);
    component = fixture.componentInstance;
    component.defendants = mockDefendants;
    component.alcoholLevelMethods = mockAlcoholBloodLevelMethods;
    jest.spyOn(component, 'createUUID').mockReturnValue('--mock-id--');
  });

  it('should render the component', () => {
    expect(fixture).toMatchSnapshot();
  });

  it('should getPleaDescription', () => {
    expect(component.getPleaDescription('abc')).toBe(undefined);
    component.pleaTypes = [{ pleaValue: 'abc', pleaTypeDescription: 'descriptioin' }] as PleaType[];
    fixture.detectChanges();
    expect(component.getPleaDescription('abc')).toBe('descriptioin');
  });

  it('should getVerdictDescription', () => {
    expect(component.getVerdictDescription('abc')).toBe(undefined);
    component.verdictsTypes = [{ id: 'abc', description: 'description' }] as VerdictType[];
    fixture.detectChanges();
    expect(component.getVerdictDescription('abc')).toBe('description');
  });

  it('should getAllocationDecisionDescription', () => {
    expect(component.getAllocationDecisionDescription('abc')).toBe(undefined);
    component.allocationDecisionTypes = [{ id: 'abc', description: 'description' }] as MotReason[];
    fixture.detectChanges();
    expect(component.getAllocationDecisionDescription('abc')).toBe('description');
  });

  it('getAlcoholLevelMethod should return expected alcohol level method description', () => {
    expect(component.getAlcoholLevelMethod('A')).toEqual('Blood');
    expect(component.getAlcoholLevelMethod()).toEqual(undefined);
  });

  it('should emit expected add offence path', () => {
    spyOn(component.add, 'emit');
    component.onAdd();
    expect(component.add.emit).toHaveBeenCalledWith('offence');
  });

  it('should emit edit offence path', () => {
    spyOn(component.edit, 'emit');
    component.onEdit(mockDefendants[2].offences[0]);
    expect(component.edit.emit).toHaveBeenCalledWith('edit-offence');
  });

  it('should emit remove defendant path', () => {
    spyOn(component.remove, 'emit');
    component.onRemove(2, 0);
    expect(component.remove.emit).toHaveBeenCalledWith({
      defendantId: '46e1c5f5-5e91-4655-9eda-43368640f218',
      offenceId: 'c9cb0f24-ac3b-4a76-9c67-1320196daf79'
    });
  });
});
